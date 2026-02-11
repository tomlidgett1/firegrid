import type {
  FirestoreDocument,
  FirestoreValue,
  DocumentData,
  CollectionInfo,
  GCPProject,
} from './types'
import { parseFirestoreValue, toFirestoreFields } from './utils'

const FIRESTORE_BASE = 'https://firestore.googleapis.com/v1'
const RESOURCE_MANAGER_BASE = 'https://cloudresourcemanager.googleapis.com/v1'

// ---- GCP Projects ----

export async function listGCPProjects(
  accessToken: string
): Promise<GCPProject[]> {
  const res = await fetch(`${RESOURCE_MANAGER_BASE}/projects?filter=lifecycleState:ACTIVE`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `Failed to list projects: ${res.status}`)
  }

  const data = await res.json()
  return (data.projects ?? []).map(
    (p: { projectId: string; name: string; projectNumber: string }) => ({
      projectId: p.projectId,
      name: p.name,
      projectNumber: p.projectNumber,
    })
  )
}

// ---- Firestore Collections ----

export async function listCollections(
  accessToken: string,
  projectId: string,
  parentPath?: string
): Promise<CollectionInfo[]> {
  const dbPath = `projects/${projectId}/databases/(default)/documents`
  const docPath = parentPath ? `${dbPath}/${parentPath}` : dbPath

  const res = await fetch(`${FIRESTORE_BASE}/${docPath}:listCollectionIds`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pageSize: 100 }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `Failed to list collections: ${res.status}`)
  }

  const data = await res.json()
  const collectionIds: string[] = data.collectionIds ?? []

  const collections: CollectionInfo[] = await Promise.all(
    collectionIds.map(async (id) => {
      const collPath = parentPath ? `${parentPath}/${id}` : id
      try {
        // First check for real documents
        const countRes = await fetch(`${FIRESTORE_BASE}/${dbPath}/${collPath}?pageSize=1`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        const countData = await countRes.json()
        const docs = countData.documents ?? []

        if (docs.length > 0) {
          return { id, path: collPath, documentCount: null }
        }

        // No real docs — check for phantom/missing docs (documents that exist
        // only as path containers for subcollections)
        const missingRes = await fetch(
          `${FIRESTORE_BASE}/${dbPath}/${collPath}?pageSize=1&showMissing=true`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        const missingData = await missingRes.json()
        const missingDocs = missingData.documents ?? []

        if (missingDocs.length > 0) {
          // Phantom docs found — collection has subcollections but no field data
          return { id, path: collPath, documentCount: 0, hasSubcollections: true }
        }

        return { id, path: collPath, documentCount: 0 }
      } catch {
        return { id, path: collPath, documentCount: null }
      }
    })
  )

  return collections
}

// ---- Discover Sub-collections ----

/**
 * Paginates through ALL documents in a collection and returns just their IDs.
 * Lightweight — only document names are used, field data is discarded.
 */
async function listAllDocumentIds(
  accessToken: string,
  projectId: string,
  collectionPath: string,
  showMissing = false
): Promise<string[]> {
  const dbPath = `projects/${projectId}/databases/(default)/documents`
  const allIds: string[] = []
  let pageToken: string | undefined

  do {
    const url = new URL(`${FIRESTORE_BASE}/${dbPath}/${collectionPath}`)
    url.searchParams.set('pageSize', '300')
    if (showMissing) url.searchParams.set('showMissing', 'true')
    if (pageToken) url.searchParams.set('pageToken', pageToken)

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (!res.ok) break

    const data = await res.json()
    const docs: Array<{ name: string }> = data.documents ?? []
    for (const doc of docs) {
      allIds.push(extractDocId(doc.name))
    }
    pageToken = data.nextPageToken
    if (!pageToken || docs.length < 300) break
  } while (true)

  return allIds
}

/**
 * Discovers sub-collections by checking EVERY document in a collection.
 * Paginates all document IDs first, then checks each one for sub-collections
 * in concurrent batches for performance.
 */
export async function discoverSubCollections(
  accessToken: string,
  projectId: string,
  collectionPath: string
): Promise<string[]> {
  const subCollSet = new Set<string>()
  const dbPath = `projects/${projectId}/databases/(default)/documents`

  // 1. Fetch ALL document IDs in the collection
  let allDocIds = await listAllDocumentIds(accessToken, projectId, collectionPath)

  // 2. If no real documents found, try with showMissing=true to find phantom
  //    documents (documents that don't exist but have subcollections underneath)
  if (allDocIds.length === 0) {
    allDocIds = await listAllDocumentIds(accessToken, projectId, collectionPath, true)
    if (allDocIds.length === 0) return []
  }

  // 3. Check every document for sub-collections in concurrent batches
  const BATCH_SIZE = 50
  for (let i = 0; i < allDocIds.length; i += BATCH_SIZE) {
    const batch = allDocIds.slice(i, i + BATCH_SIZE)

    await Promise.all(
      batch.map(async (docId) => {
        try {
          const res = await fetch(
            `${FIRESTORE_BASE}/${dbPath}/${collectionPath}/${docId}:listCollectionIds`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ pageSize: 100 }),
            }
          )
          if (res.ok) {
            const data = await res.json()
            for (const id of (data.collectionIds ?? [])) {
              subCollSet.add(id)
            }
          }
        } catch {
          // Skip documents that fail
        }
      })
    )
  }

  return Array.from(subCollSet).sort()
}

// Discovers sub-collections by sampling documents from a collection group.
// Used for drilling deeper: e.g. find what's under transactions/{id}/...
export async function discoverSubCollectionsFromGroup(
  accessToken: string,
  projectId: string,
  collectionId: string
): Promise<string[]> {
  const subCollSet = new Set<string>()

  // Sample a few docs from the collection group
  const result = await fetchCollectionGroup(accessToken, projectId, collectionId, 5)

  // Check sub-collections on each sampled document
  await Promise.all(
    result.documents.slice(0, 3).map(async (doc) => {
      const docPath = doc.__path
      if (!docPath) return
      try {
        const subs = await listCollections(accessToken, projectId, docPath)
        for (const sub of subs) {
          subCollSet.add(sub.id)
        }
      } catch {
        // Silently skip
      }
    })
  )

  return Array.from(subCollSet).sort()
}

// ---- Fetch Documents (regular collection) ----

export async function fetchDocuments(
  accessToken: string,
  projectId: string,
  collectionPath: string,
  pageSize = 100,
  pageToken?: string
): Promise<{ documents: DocumentData[]; nextPageToken?: string }> {
  const dbPath = `projects/${projectId}/databases/(default)/documents`
  const url = new URL(`${FIRESTORE_BASE}/${dbPath}/${collectionPath}`)
  url.searchParams.set('pageSize', String(pageSize))
  if (pageToken) {
    url.searchParams.set('pageToken', pageToken)
  }

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `Failed to fetch documents: ${res.status}`)
  }

  const data = await res.json()
  const rawDocs: FirestoreDocument[] = data.documents ?? []

  const documents: DocumentData[] = rawDocs.map((doc) => {
    const parsed: DocumentData = {
      __id: extractDocId(doc.name),
      __path: extractRelativePath(doc.name, projectId),
    }
    if (doc.fields) {
      for (const [key, value] of Object.entries(doc.fields)) {
        parsed[key] = parseFirestoreValue(value as FirestoreValue)
      }
    }
    return parsed
  })

  return { documents, nextPageToken: data.nextPageToken }
}

// ---- Collection Group Query ----

// Fetches documents across ALL sub-collections with the given collectionId
// using Firestore's runQuery with allDescendants: true.
// E.g. collectionId = "transactions" fetches from customers/{id}/transactions across all parents.
export async function fetchCollectionGroup(
  accessToken: string,
  projectId: string,
  collectionId: string,
  pageSize = 100,
  lastDocPath?: string
): Promise<{ documents: DocumentData[]; lastDocumentPath?: string }> {
  const dbPath = `projects/${projectId}/databases/(default)/documents`

  interface StructuredQuery {
    from: Array<{ collectionId: string; allDescendants: boolean }>
    orderBy: Array<{ field: { fieldPath: string }; direction: string }>
    limit: number
    startAt?: {
      values: Array<{ referenceValue: string }>
      before: boolean
    }
  }

  const structuredQuery: StructuredQuery = {
    from: [{ collectionId, allDescendants: true }],
    orderBy: [{ field: { fieldPath: '__name__' }, direction: 'ASCENDING' }],
    limit: pageSize,
  }

  // Pagination: start after the last document from previous page
  if (lastDocPath) {
    structuredQuery.startAt = {
      values: [{ referenceValue: `${dbPath}/${lastDocPath}` }],
      before: false,
    }
  }

  const res = await fetch(`${FIRESTORE_BASE}/${dbPath}:runQuery`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ structuredQuery }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `Failed to query collection group: ${res.status}`)
  }

  const results: Array<{ document?: FirestoreDocument; readTime?: string }> = await res.json()

  const documents: DocumentData[] = []
  let lastPath: string | undefined

  for (const result of results) {
    if (!result.document) continue
    const doc = result.document
    const relPath = extractRelativePath(doc.name, projectId)
    const parsed: DocumentData = {
      __id: extractDocId(doc.name),
      __path: relPath,
      __parentId: extractParentDocId(doc.name),
    }
    if (doc.fields) {
      for (const [key, value] of Object.entries(doc.fields)) {
        parsed[key] = parseFirestoreValue(value as FirestoreValue)
      }
    }
    documents.push(parsed)
    lastPath = relPath
  }

  return {
    documents,
    lastDocumentPath: documents.length >= pageSize ? lastPath : undefined,
  }
}

// ---- Sample Documents ----

export async function sampleDocuments(
  accessToken: string,
  projectId: string,
  collectionPath: string,
  sampleSize = 50
): Promise<DocumentData[]> {
  const result = await fetchDocuments(accessToken, projectId, collectionPath, sampleSize)
  return result.documents
}

export async function sampleCollectionGroup(
  accessToken: string,
  projectId: string,
  collectionId: string,
  sampleSize = 50
): Promise<DocumentData[]> {
  const result = await fetchCollectionGroup(accessToken, projectId, collectionId, sampleSize)
  return result.documents
}

// ---- Document CRUD ----

/** Fetch a single document by its full document path (e.g. "users/abc123") */
export async function fetchSingleDocument(
  accessToken: string,
  projectId: string,
  documentPath: string
): Promise<DocumentData> {
  const dbPath = `projects/${projectId}/databases/(default)/documents`

  const res = await fetch(`${FIRESTORE_BASE}/${dbPath}/${documentPath}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `Failed to fetch document: ${res.status}`)
  }

  const doc: FirestoreDocument = await res.json()
  const parsed: DocumentData = {
    __id: extractDocId(doc.name),
    __path: extractRelativePath(doc.name, projectId),
  }
  if (doc.fields) {
    for (const [key, value] of Object.entries(doc.fields)) {
      parsed[key] = parseFirestoreValue(value as FirestoreValue)
    }
  }
  return parsed
}

/** Update specific fields on a document */
export async function updateDocument(
  accessToken: string,
  projectId: string,
  documentPath: string,
  data: Record<string, unknown>
): Promise<void> {
  const dbPath = `projects/${projectId}/databases/(default)/documents`
  const fields = toFirestoreFields(data)

  const params = new URLSearchParams()
  for (const fp of Object.keys(fields)) {
    params.append('updateMask.fieldPaths', fp)
  }

  const res = await fetch(
    `${FIRESTORE_BASE}/${dbPath}/${documentPath}?${params.toString()}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    }
  )

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `Failed to update document: ${res.status}`)
  }
}

/** Delete a document by its path */
export async function deleteDocument(
  accessToken: string,
  projectId: string,
  documentPath: string
): Promise<void> {
  const dbPath = `projects/${projectId}/databases/(default)/documents`

  const res = await fetch(`${FIRESTORE_BASE}/${dbPath}/${documentPath}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `Failed to delete document: ${res.status}`)
  }
}

/** Create a new document in a collection. Returns the new document ID. */
export async function createDocument(
  accessToken: string,
  projectId: string,
  collectionPath: string,
  data: Record<string, unknown>,
  documentId?: string
): Promise<string> {
  const dbPath = `projects/${projectId}/databases/(default)/documents`
  const fields = toFirestoreFields(data)

  const url = new URL(`${FIRESTORE_BASE}/${dbPath}/${collectionPath}`)
  if (documentId) {
    url.searchParams.set('documentId', documentId)
  }

  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `Failed to create document: ${res.status}`)
  }

  const result = await res.json()
  return extractDocId(result.name)
}

// ---- Helpers ----

function extractDocId(fullPath: string): string {
  const parts = fullPath.split('/')
  return parts[parts.length - 1]
}

function extractRelativePath(fullPath: string, projectId: string): string {
  const prefix = `projects/${projectId}/databases/(default)/documents/`
  const idx = fullPath.indexOf(prefix)
  if (idx >= 0) return fullPath.slice(idx + prefix.length)
  return fullPath
}

function extractParentDocId(fullPath: string): string {
  // For path like projects/.../customers/abc123/transactions/tx1
  // the parent doc ID is abc123 (2 segments before the last)
  const parts = fullPath.split('/')
  return parts.length >= 3 ? parts[parts.length - 3] : ''
}
