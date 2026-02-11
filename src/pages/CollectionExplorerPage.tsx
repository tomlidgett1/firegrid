import { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import {
  listCollections,
  fetchDocuments,
  fetchCollectionGroup,
  updateDocument,
  deleteDocument,
  createDocument,
} from '@/lib/firestore-rest'
import type { CollectionInfo, DocumentData } from '@/lib/types'
import { cn } from '@/lib/utils'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type SortingState,
  type ColumnDef,
} from '@tanstack/react-table'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Flame,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Database,
  FileText,
  Loader2,
  AlertCircle,
  Search,
  Plus,
  RefreshCw,
  X,
  Trash2,
  Save,
  Copy,
  Check,
  FolderOpen,
  LogOut,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
} from 'lucide-react'
import ProjectSwitcher from '@/components/ProjectSwitcher'
import DarkModeToggle from '@/components/DarkModeToggle'

// ================================================================
// Helpers
// ================================================================

/** Format a value for display in a table cell */
function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof value === 'object') {
    const json = JSON.stringify(value)
    return json.length > 120 ? json.slice(0, 120) + '…' : json
  }
  const str = String(value)
  return str.length > 200 ? str.slice(0, 200) + '…' : str
}

/** Convert user-edited text back to a JS value, preserving original type when possible */
function parseEditValue(text: string, originalValue: unknown): unknown {
  const trimmed = text.trim()
  if (trimmed === '' || trimmed === 'null') return null

  // If original was boolean, parse as boolean
  if (typeof originalValue === 'boolean') {
    if (trimmed === 'true') return true
    if (trimmed === 'false') return false
    return trimmed // fallback to string
  }

  // If original was number, parse as number
  if (typeof originalValue === 'number') {
    const num = Number(trimmed)
    return isNaN(num) ? trimmed : num
  }

  // If original was object/array, parse as JSON
  if (typeof originalValue === 'object' && originalValue !== null) {
    try {
      return JSON.parse(trimmed)
    } catch {
      return trimmed
    }
  }

  // String — keep as string
  return text
}

// ================================================================
// Field schema inference for the Add Document form
// ================================================================

interface FieldSchemaEntry {
  name: string
  type: string
  coverage: number
  sampleValue: unknown
}

const FIELD_TYPES = ['string', 'integer', 'double', 'boolean', 'timestamp', 'array', 'map', 'null'] as const

function inferFieldType(value: unknown): string {
  if (value === null || value === undefined) return 'null'
  if (typeof value === 'boolean') return 'boolean'
  if (typeof value === 'number') return Number.isInteger(value) ? 'integer' : 'double'
  if (typeof value === 'string') {
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)) return 'timestamp'
    return 'string'
  }
  if (Array.isArray(value)) return 'array'
  if (typeof value === 'object') return 'map'
  return 'string'
}

function buildFieldSchema(documents: DocumentData[]): FieldSchemaEntry[] {
  const typeCountMap = new Map<string, Map<string, number>>()
  const sampleMap = new Map<string, unknown>()

  for (const doc of documents) {
    for (const [key, value] of Object.entries(doc)) {
      if (key.startsWith('__')) continue
      const type = inferFieldType(value)
      if (!typeCountMap.has(key)) typeCountMap.set(key, new Map())
      const tc = typeCountMap.get(key)!
      tc.set(type, (tc.get(type) ?? 0) + 1)
      if (!sampleMap.has(key) && value !== null && value !== undefined) {
        sampleMap.set(key, value)
      }
    }
  }

  return Array.from(typeCountMap.entries())
    .map(([name, typeCounts]) => {
      // Pick the most common non-null type
      let bestType = 'string'
      let bestCount = 0
      for (const [type, count] of typeCounts) {
        if (type !== 'null' && count > bestCount) {
          bestType = type
          bestCount = count
        }
      }
      const totalCount = Array.from(typeCounts.values()).reduce((a, b) => a + b, 0)
      return {
        name,
        type: bestType,
        coverage: documents.length > 0 ? totalCount / documents.length : 0,
        sampleValue: sampleMap.get(name) ?? null,
      }
    })
    .sort((a, b) => b.coverage - a.coverage)
}

function getDefaultFormValue(type: string): string {
  switch (type) {
    case 'string': return ''
    case 'integer': return '0'
    case 'double': return '0.0'
    case 'boolean': return 'false'
    case 'timestamp': return new Date().toISOString()
    case 'array': return '[]'
    case 'map': return '{}'
    case 'null': return ''
    default: return ''
  }
}

/** Convert a form field value string to the correct JS type for Firestore */
function convertFormValue(value: string, type: string): unknown {
  switch (type) {
    case 'string': return value
    case 'integer': { const n = parseInt(value, 10); return isNaN(n) ? 0 : n }
    case 'double': { const n = parseFloat(value); return isNaN(n) ? 0 : n }
    case 'boolean': return value === 'true'
    case 'timestamp': {
      // Ensure ISO format with timezone
      if (value && !value.endsWith('Z') && !value.includes('+')) {
        return value.includes('T') ? value + (value.length <= 16 ? ':00Z' : 'Z') : value + 'T00:00:00Z'
      }
      return value
    }
    case 'array': { try { return JSON.parse(value) } catch { return [] } }
    case 'map': { try { return JSON.parse(value) } catch { return {} } }
    case 'null': return null
    default: return value
  }
}

interface FormField {
  name: string
  type: string
  value: string
  enabled: boolean
  isCustom: boolean // true for user-added fields
}

/** Parse breadcrumb segments from a collection path */
function parseBreadcrumbs(path: string): { label: string; path: string; isDoc: boolean }[] {
  const segments = path.split('/')
  const crumbs: { label: string; path: string; isDoc: boolean }[] = []
  for (let i = 0; i < segments.length; i++) {
    crumbs.push({
      label: segments[i],
      path: segments.slice(0, i + 1).join('/'),
      isDoc: i % 2 === 1, // odd indices are document IDs
    })
  }
  return crumbs
}

// ================================================================
// Inline Cell Editor
// ================================================================

function InlineEditor({
  value,
  originalValue,
  onSave,
  onCancel,
}: {
  value: string
  originalValue: unknown
  onSave: (newValue: unknown) => void
  onCancel: () => void
}) {
  const [text, setText] = useState(value)
  const isComplex = typeof originalValue === 'object' && originalValue !== null
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    // Select all text on mount for easy replacement
    if (inputRef.current) {
      inputRef.current.select()
    }
  }, [])

  const handleSave = () => {
    const parsed = parseEditValue(text, originalValue)
    onSave(parsed)
  }

  if (isComplex) {
    return (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') { e.preventDefault(); onCancel() }
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); handleSave() }
        }}
        onBlur={handleSave}
        autoFocus
        rows={4}
        spellCheck={false}
        className="w-full min-w-[200px] text-xs font-mono bg-white dark:bg-gray-800 border-2 border-blue-400 dark:border-blue-500 rounded-md px-2 py-1.5 text-gray-900 dark:text-gray-100 focus:outline-none resize-y shadow-sm"
      />
    )
  }

  return (
    <input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') { e.preventDefault(); handleSave() }
        if (e.key === 'Escape') { e.preventDefault(); onCancel() }
        if (e.key === 'Tab') { e.preventDefault(); handleSave() }
      }}
      onBlur={handleSave}
      autoFocus
      spellCheck={false}
      className="w-full min-w-[100px] text-xs bg-white dark:bg-gray-800 border-2 border-blue-400 dark:border-blue-500 rounded-md px-2 py-1 text-gray-900 dark:text-gray-100 focus:outline-none shadow-sm"
    />
  )
}

// ================================================================
// Main Component
// ================================================================

export default function CollectionExplorerPage() {
  const { projectId, collectionPath: rawCollectionPath } = useParams<{
    projectId: string
    collectionPath?: string
  }>()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const collectionPath = rawCollectionPath ? decodeURIComponent(rawCollectionPath) : null
  // Group mode: ?group=1 means we use a collection group query (all subcollections with this name)
  const isGroupMode = searchParams.get('group') === '1'
  // In group mode, collectionPath is just the subcollection name (e.g. "orders")
  const groupCollectionId = isGroupMode ? collectionPath?.split('/').pop() ?? collectionPath : null

  // ---- Collection list state (picker view) ----
  const [collections, setCollections] = useState<CollectionInfo[]>([])
  const [loadingCollections, setLoadingCollections] = useState(false)
  const [collectionsError, setCollectionsError] = useState<string | null>(null)

  // ---- Document list state ----
  const [documents, setDocuments] = useState<DocumentData[]>([])
  const [loadingDocs, setLoadingDocs] = useState(true)
  const [docsError, setDocsError] = useState<string | null>(null)
  const [nextPageToken, setNextPageToken] = useState<string | undefined>()
  const [fetchingMore, setFetchingMore] = useState(false)

  // ---- Table columns (auto-discovered) ----
  const [discoveredFields, setDiscoveredFields] = useState<string[]>([])

  // ---- Inline editing ----
  const [editingCell, setEditingCell] = useState<{ docId: string; field: string } | null>(null)
  const [cellSaving, setCellSaving] = useState(false)
  const [cellError, setCellError] = useState<{ docId: string; field: string; msg: string } | null>(null)
  const [cellSuccess, setCellSuccess] = useState<{ docId: string; field: string } | null>(null)

  // ---- Delete ----
  const [docToDelete, setDocToDelete] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  // ---- Add document modal ----
  const [showAddModal, setShowAddModal] = useState(false)
  const [newDocId, setNewDocId] = useState('')
  const [newDocJson, setNewDocJson] = useState('{\n  \n}')
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)
  const [formMode, setFormMode] = useState<'form' | 'json'>('form')
  const [formFields, setFormFields] = useState<FormField[]>([])

  // ---- Field schema (derived from loaded documents) ----
  const fieldSchema = useMemo(() => buildFieldSchema(documents), [documents])

  // ---- Subcollection popover (per-row) ----
  const [subcollPopover, setSubcollPopover] = useState<{
    docId: string
    loading: boolean
    subcollections: string[]
  } | null>(null)
  const subcollRef = useRef<HTMLDivElement>(null)

  // ---- Toolbar subcollection dropdown ----
  const [availableSubcolls, setAvailableSubcolls] = useState<string[]>([])
  const [loadingSubcolls, setLoadingSubcolls] = useState(false)
  const [showSubcollDropdown, setShowSubcollDropdown] = useState(false)
  const [subcollDocId, setSubcollDocId] = useState('')
  const subcollDropdownRef = useRef<HTMLDivElement>(null)

  // ---- TanStack Table state ----
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  // ---- Copy feedback ----
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // ================================================================
  // Fetch collections (picker view)
  // ================================================================
  useEffect(() => {
    if (collectionPath || !user?.accessToken || !projectId) return
    setLoadingCollections(true)
    setCollectionsError(null)
    listCollections(user.accessToken, projectId)
      .then(setCollections)
      .catch((err) => setCollectionsError(err.message))
      .finally(() => setLoadingCollections(false))
  }, [user?.accessToken, projectId, collectionPath])

  // ================================================================
  // Fetch documents (table view) — supports both direct path and collection group mode
  // ================================================================
  const loadDocuments = useCallback(
    async (pageToken?: string) => {
      if (!user?.accessToken || !projectId || !collectionPath) return
      if (!pageToken) {
        setLoadingDocs(true)
        setDocuments([])
        setDocsError(null)
      } else {
        setFetchingMore(true)
      }

      try {
        let newDocs: DocumentData[] = []
        let newNextToken: string | undefined

        if (isGroupMode && groupCollectionId) {
          // Collection group query — fetch all docs from subcollections with this name
          const result = await fetchCollectionGroup(
            user.accessToken,
            projectId,
            groupCollectionId,
            100,
            pageToken
          )
          newDocs = result.documents
          newNextToken = result.lastDocumentPath
        } else {
          // Normal direct-path fetch
          const result = await fetchDocuments(
            user.accessToken,
            projectId,
            collectionPath,
            100,
            pageToken
          )
          newDocs = result.documents
          newNextToken = result.nextPageToken
        }

        const discoverFields = (docs: DocumentData[]) => {
          const fieldSet = new Set<string>()
          for (const doc of docs.slice(0, 50)) {
            for (const key of Object.keys(doc)) {
              if (!key.startsWith('__')) fieldSet.add(key)
            }
          }
          setDiscoveredFields(Array.from(fieldSet))
        }

        if (pageToken) {
          setDocuments((prev) => {
            const merged = [...prev, ...newDocs]
            discoverFields(merged)
            return merged
          })
        } else {
          setDocuments(newDocs)
          discoverFields(newDocs)
        }
        setNextPageToken(newNextToken)
      } catch (err) {
        setDocsError(err instanceof Error ? err.message : 'Failed to load documents')
      } finally {
        setLoadingDocs(false)
        setFetchingMore(false)
      }
    },
    [user?.accessToken, projectId, collectionPath, isGroupMode, groupCollectionId]
  )

  useEffect(() => {
    if (collectionPath) {
      setGlobalFilter('')
      setEditingCell(null)
      setSubcollPopover(null)
      setAvailableSubcolls([])
      setShowSubcollDropdown(false)
      setSubcollDocId('')
      loadDocuments()
    }
  }, [collectionPath, loadDocuments])

  // Close popovers on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (subcollRef.current && !subcollRef.current.contains(e.target as Node)) {
        setSubcollPopover(null)
      }
      if (subcollDropdownRef.current && !subcollDropdownRef.current.contains(e.target as Node)) {
        setShowSubcollDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // ================================================================
  // Auto-discover subcollections from a sample of loaded documents
  // ================================================================
  useEffect(() => {
    if (!user?.accessToken || !projectId || !collectionPath || documents.length === 0) return

    let cancelled = false
    setLoadingSubcolls(true)

    // Sample up to 10 documents spread across the collection
    const sampleSize = Math.min(10, documents.length)
    const step = Math.max(1, Math.floor(documents.length / sampleSize))
    const sampleDocs: DocumentData[] = []
    for (let i = 0; i < documents.length && sampleDocs.length < sampleSize; i += step) {
      sampleDocs.push(documents[i])
    }

    Promise.all(
      sampleDocs.map(async (doc) => {
        try {
          // In group mode, use the full __path; otherwise construct from collectionPath/docId
          const docPath = isGroupMode && doc.__path
            ? String(doc.__path)
            : `${collectionPath}/${doc.__id}`
          const subs = await listCollections(
            user.accessToken!,
            projectId!,
            docPath
          )
          return subs.map((s) => s.id)
        } catch {
          return []
        }
      })
    )
      .then((results) => {
        if (cancelled) return
        const allSubs = new Set<string>()
        for (const subs of results) {
          for (const s of subs) allSubs.add(s)
        }
        setAvailableSubcolls(Array.from(allSubs).sort())
      })
      .finally(() => {
        if (!cancelled) setLoadingSubcolls(false)
      })

    return () => {
      cancelled = true
    }
  }, [user?.accessToken, projectId, collectionPath, documents])

  // ================================================================
  // Inline cell save
  // ================================================================
  const handleCellSave = useCallback(
    async (docId: string, field: string, newValue: unknown) => {
      if (!user?.accessToken || !projectId) return

      const doc = documents.find((d) => d.__id === docId)
      if (!doc?.__path) return

      setCellSaving(true)
      setCellError(null)

      try {
        await updateDocument(user.accessToken, projectId, doc.__path, { [field]: newValue })

        // Update local state
        setDocuments((prev) =>
          prev.map((d) => (d.__id === docId ? { ...d, [field]: newValue } : d))
        )
        setEditingCell(null)

        // Flash green feedback
        setCellSuccess({ docId, field })
        setTimeout(() => setCellSuccess(null), 1200)
      } catch (err) {
        setCellError({
          docId,
          field,
          msg: err instanceof Error ? err.message : 'Failed to save',
        })
        // Keep editing open so the user can retry
      } finally {
        setCellSaving(false)
      }
    },
    [user?.accessToken, projectId, documents]
  )

  // ================================================================
  // Delete document
  // ================================================================
  const handleDelete = async () => {
    if (!user?.accessToken || !projectId || !docToDelete) return
    setDeleting(true)
    setDeleteError(null)

    const doc = documents.find((d) => d.__id === docToDelete)
    if (!doc?.__path) {
      setDeleteError('Document path not found')
      setDeleting(false)
      return
    }

    try {
      await deleteDocument(user.accessToken, projectId, doc.__path)
      setDocuments((prev) => prev.filter((d) => d.__id !== docToDelete))
      setDocToDelete(null)
      if (editingCell?.docId === docToDelete) setEditingCell(null)
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete')
    } finally {
      setDeleting(false)
    }
  }

  // ================================================================
  // Create document
  // ================================================================
  const handleCreate = async () => {
    if (!user?.accessToken || !projectId || !collectionPath) return
    setCreating(true)
    setCreateError(null)

    try {
      let data: Record<string, unknown>

      if (formMode === 'json') {
        data = JSON.parse(newDocJson)
        if (typeof data !== 'object' || Array.isArray(data) || data === null) {
          throw new Error('Document must be a JSON object')
        }
      } else {
        // Build document from form fields
        data = {}
        for (const field of formFields) {
          if (!field.enabled || !field.name.trim()) continue
          data[field.name.trim()] = convertFormValue(field.value, field.type)
        }
        if (Object.keys(data).length === 0) {
          throw new Error('Enable at least one field')
        }
      }

      await createDocument(
        user.accessToken,
        projectId,
        collectionPath,
        data,
        newDocId.trim() || undefined
      )

      setShowAddModal(false)
      setNewDocId('')
      setNewDocJson('{\n  \n}')
      await loadDocuments()
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Failed to create document')
    } finally {
      setCreating(false)
    }
  }

  // ================================================================
  // Subcollection discovery
  // ================================================================
  const handleShowSubcollections = useCallback(
    async (docId: string) => {
      if (!user?.accessToken || !projectId || !collectionPath) return

      // Toggle off if already showing
      if (subcollPopover?.docId === docId) {
        setSubcollPopover(null)
        return
      }

      // listCollections with a document path directly asks Firestore
      // "what subcollections does this document have?" — fast & accurate
      const docPath = `${collectionPath}/${docId}`
      setSubcollPopover({ docId, loading: true, subcollections: [] })

      try {
        const subs = await listCollections(user.accessToken, projectId, docPath)
        setSubcollPopover({
          docId,
          loading: false,
          subcollections: subs.map((s) => s.id),
        })
      } catch {
        setSubcollPopover({ docId, loading: false, subcollections: [] })
      }
    },
    [user?.accessToken, projectId, collectionPath, subcollPopover]
  )

  const navigateToCollection = (path: string) => {
    setEditingCell(null)
    setSubcollPopover(null)
    navigate(`/project/${projectId}/explore/${encodeURIComponent(path)}`)
  }

  const navigateToSubcollection = (subCollId: string, docId?: string) => {
    if (!collectionPath) return
    if (docId) {
      // Navigate to specific doc's subcollection
      navigateToCollection(`${collectionPath}/${docId}/${subCollId}`)
    } else {
      // Collection group query — show all docs with this subcollection name
      navigate(`/project/${projectId}/explore/${encodeURIComponent(subCollId)}?group=1`)
    }
  }

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  // ================================================================
  // TanStack Table
  // ================================================================

  const tableColumns = useMemo<ColumnDef<DocumentData>[]>(() => {
    const cols: ColumnDef<DocumentData>[] = [
      {
        id: '__id',
        accessorKey: '__id',
        header: 'Document ID',
        size: 200,
        enableSorting: true,
        cell: ({ getValue }) => (
          <span className="font-mono">{String(getValue())}</span>
        ),
      },
      // In group mode, show parent path so users can see which parent each doc belongs to
      ...(isGroupMode
        ? [
            {
              id: '__parentPath',
              accessorFn: (row: DocumentData) => {
                // Extract parent path: e.g. "users/user1/orders/order1" → "users/user1"
                const path = row.__path as string | undefined
                if (!path) return '—'
                const parts = path.split('/')
                // Remove last 2 segments (subcollection/docId) to get parent path
                return parts.length >= 3 ? parts.slice(0, -2).join('/') : path
              },
              header: 'Parent Path',
              size: 220,
              enableSorting: true,
              cell: ({ getValue }: { getValue: () => unknown }) => (
                <span className="font-mono text-gray-500 dark:text-gray-400 text-[11px] truncate block max-w-[220px]">
                  {String(getValue())}
                </span>
              ),
            } satisfies ColumnDef<DocumentData>,
          ]
        : []),
      ...discoveredFields.map(
        (field): ColumnDef<DocumentData> => ({
          id: field,
          accessorFn: (row) => row[field],
          header: field,
          size: 180,
          enableSorting: true,
          cell: ({ getValue }) => {
            const val = getValue()
            if (val === null || val === undefined) {
              return <span className="text-gray-300 dark:text-gray-600">null</span>
            }
            return <span className="truncate block max-w-[300px]">{formatCellValue(val)}</span>
          },
        })
      ),
    ]
    return cols
  }, [discoveredFields, isGroupMode])

  const table = useReactTable({
    data: documents,
    columns: tableColumns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 50 } },
    globalFilterFn: 'includesString',
  })

  const hasMore = !!nextPageToken
  const breadcrumbs = collectionPath ? parseBreadcrumbs(collectionPath) : []

  // ================================================================
  // COLLECTION PICKER VIEW
  // ================================================================
  if (!collectionPath) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <div className="px-4 h-12 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-1 -ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 bg-fire-500 rounded-md flex items-center justify-center shrink-0">
                  <Flame className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">Firegrid</span>
              </div>
              <ChevronRight size={14} className="text-gray-300 dark:text-gray-600 shrink-0" />
              <ProjectSwitcher currentProjectId={projectId} />
              <ChevronRight size={14} className="text-gray-300 dark:text-gray-600 shrink-0" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Explorer</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <DarkModeToggle />
              <button
                onClick={signOut}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <LogOut size={15} />
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 flex items-center gap-2">
              <Database size={18} className="text-gray-400" />
              Collection Explorer
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Select a collection to browse, edit, and manage documents.
            </p>
          </div>

          {collectionsError && (
            <div className="bg-white dark:bg-gray-800 rounded-md border border-red-200 dark:border-red-800 p-4 mb-4 flex items-start gap-3">
              <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-700 dark:text-red-400">Error loading collections</p>
                <p className="text-xs text-red-500 dark:text-red-400 mt-1">{collectionsError}</p>
              </div>
            </div>
          )}

          {loadingCollections ? (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Loader2 size={14} className="animate-spin" />
              Loading collections…
            </div>
          ) : collections.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">No collections found.</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Ensure Cloud Firestore is enabled and your security rules allow read access.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {collections.map((coll) => (
                <button
                  key={coll.path}
                  onClick={() => navigateToCollection(coll.path)}
                  className="group bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-4 text-left hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <FileText size={16} className="text-gray-500 dark:text-gray-400" />
                    </div>
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{coll.id}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {coll.documentCount !== null
                      ? coll.documentCount === 0
                        ? coll.hasSubcollections ? 'Subcollections only' : 'Empty'
                        : `${coll.documentCount}+ documents`
                      : 'Tap to explore'}
                  </p>
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    )
  }

  // ================================================================
  // FULL-PAGE TABLE VIEW
  // ================================================================

  if (loadingDocs) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Loader2 size={16} className="animate-spin" />
          Loading documents…
        </div>
      </div>
    )
  }

  if (docsError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-md border border-red-200 dark:border-red-800 p-6 max-w-md">
          <div className="flex items-start gap-3">
            <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-700 dark:text-red-400">Error loading data</p>
              <p className="text-xs text-red-500 dark:text-red-400 mt-1">{docsError}</p>
              <button
                onClick={() => navigate(-1)}
                className="mt-3 text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ← Go back
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
      {/* ===== Header ===== */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shrink-0">
        <div className="px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => navigate(`/project/${projectId}/explore`)}
              className="p-1 -ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 bg-fire-500 rounded-md flex items-center justify-center shrink-0">
                <Flame className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">Firegrid</span>
            </div>
            <ChevronRight size={14} className="text-gray-300 dark:text-gray-600 shrink-0" />
            <ProjectSwitcher currentProjectId={projectId} />
            <ChevronRight size={14} className="text-gray-300 dark:text-gray-600 shrink-0" />
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Explorer</span>
            <ChevronRight size={14} className="text-gray-300 dark:text-gray-600 shrink-0" />

            {/* Breadcrumbs for the collection path */}
            {isGroupMode ? (
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                  Group
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {groupCollectionId}
                </span>
              </div>
            ) : (
              breadcrumbs.map((crumb, i) => (
                <div key={crumb.path} className="flex items-center gap-1.5 shrink-0">
                  {i > 0 && <ChevronRight size={12} className="text-gray-300 dark:text-gray-600" />}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{crumb.label}</span>
                  ) : (
                    <button
                      onClick={() => {
                        if (!crumb.isDoc) navigateToCollection(crumb.path)
                      }}
                      className={cn(
                        'text-sm transition-colors',
                        crumb.isDoc
                          ? 'text-gray-400 dark:text-gray-500 cursor-default font-mono text-xs'
                          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                      )}
                    >
                      {crumb.label}
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <DarkModeToggle />
            <button
              onClick={signOut}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Sign out"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* ===== Toolbar ===== */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shrink-0">
        <div className="px-4 h-11 flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search across all fields…"
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:border-gray-300 dark:focus:border-gray-500 bg-gray-50 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          {/* Subcollections dropdown */}
          <div className="relative" ref={subcollDropdownRef}>
            <button
              onClick={() => setShowSubcollDropdown((prev) => !prev)}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors border',
                showSubcollDropdown
                  ? 'text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                  : 'text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              )}
            >
              <FolderOpen size={13} className="text-gray-400" />
              Subcollections
              {loadingSubcolls ? (
                <Loader2 size={10} className="animate-spin text-gray-400" />
              ) : availableSubcolls.length > 0 ? (
                <span className="text-[10px] bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded-md tabular-nums">
                  {availableSubcolls.length}
                </span>
              ) : null}
              <ChevronDown
                className={cn(
                  'h-3 w-3 text-gray-400 transition-transform duration-200',
                  showSubcollDropdown && 'rotate-180'
                )}
              />
            </button>

            <AnimatePresence>
              {showSubcollDropdown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-1.5 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg z-50 w-[320px] overflow-hidden max-h-[60vh] flex flex-col"
                >
                  {/* Sticky header */}
                  <div className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-700 shrink-0">
                    <p className="text-xs font-medium text-gray-900 dark:text-gray-100">
                      Navigate to Subcollection
                    </p>
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                      Discovered from sampled documents
                    </p>
                  </div>

                  {loadingSubcolls ? (
                    <div className="flex items-center gap-2 px-3 py-4 text-xs text-gray-400 shrink-0">
                      <Loader2 size={12} className="animate-spin" />
                      Scanning documents for subcollections…
                    </div>
                  ) : availableSubcolls.length === 0 ? (
                    <div className="px-3 py-4 text-xs text-gray-400 dark:text-gray-500 text-center shrink-0">
                      No subcollections found in sampled documents
                    </div>
                  ) : (
                    <>
                      {/* Scrollable subcollection list */}
                      <div className="px-1.5 py-1.5 overflow-y-auto flex-1 min-h-0">
                        {availableSubcolls.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => {
                              setShowSubcollDropdown(false)
                              navigateToSubcollection(sub, subcollDocId || undefined)
                            }}
                            className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-medium rounded-md transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          >
                            <FolderOpen size={12} className="text-gray-400 shrink-0" />
                            <span className="flex-1 text-left">{sub}</span>
                            <ChevronRight size={11} className="text-gray-300 shrink-0" />
                          </button>
                        ))}
                      </div>

                      {/* Sticky footer: optional doc filter */}
                      <div className="px-3 pt-1 pb-2.5 border-t border-gray-100 dark:border-gray-700 shrink-0">
                        <label className="block text-[10px] font-medium text-gray-400 dark:text-gray-500 mb-1 uppercase tracking-wider">
                          Filter by document (optional)
                        </label>
                        <select
                          value={subcollDocId}
                          onChange={(e) => setSubcollDocId(e.target.value)}
                          className="w-full text-xs border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 font-mono"
                        >
                          <option value="">All documents (collection group)</option>
                          {documents.map((d) => (
                            <option key={d.__id} value={d.__id}>
                              {d.__id}
                            </option>
                          ))}
                        </select>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                          {subcollDocId
                            ? `Will navigate to ${subcollDocId}'s subcollection`
                            : 'Shows all documents across all parents'}
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 ml-auto shrink-0">
            <span className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
              {documents.length} docs{hasMore ? '+' : ''}
            </span>

            <div className="w-px h-5 bg-gray-200 dark:bg-gray-600" />

            <button
              onClick={() => loadDocuments()}
              disabled={loadingDocs}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-40"
              title="Refresh"
            >
              <RefreshCw size={14} className={loadingDocs ? 'animate-spin' : ''} />
            </button>

            {!isGroupMode && (
              <button
                onClick={() => {
                  setShowAddModal(true)
                  setCreateError(null)
                  setNewDocId('')
                  setFormMode('form')
                  // Initialise form fields from the collection's schema
                  setFormFields(
                    fieldSchema.map((f) => ({
                      name: f.name,
                      type: f.type,
                      value: getDefaultFormValue(f.type),
                      enabled: f.coverage >= 0.5, // auto-enable common fields
                      isCustom: false,
                    }))
                  )
                  // Also build a matching JSON template
                  const template: Record<string, unknown> = {}
                  for (const f of fieldSchema.filter((f) => f.coverage >= 0.5)) {
                    template[f.name] = convertFormValue(getDefaultFormValue(f.type), f.type)
                  }
                  setNewDocJson(JSON.stringify(template, null, 2))
                }}
                className="flex items-center gap-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-medium rounded-md px-3 py-1.5 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                <Plus size={13} />
                Add Document
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ===== Table ===== */}
      <div className="flex-1 overflow-auto" ref={subcollRef}>
        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
            <FileText size={24} className="text-gray-300 dark:text-gray-600" />
            <p className="text-sm">No documents in this collection</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">Click "Add Document" to create one.</p>
          </div>
        ) : (
          <table className="w-full text-xs border-separate border-spacing-0">
            <thead className="sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, hIdx) => {
                    const isIdCol = hIdx === 0
                    return (
                      <th
                        key={header.id}
                        className={cn(
                          'text-left px-3 py-2.5 font-medium text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap select-none',
                          isIdCol && 'sticky left-0 z-20 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-gray-200 dark:after:bg-gray-700'
                        )}
                      >
                        {header.isPlaceholder ? null : (
                          <button
                            onClick={header.column.getToggleSortingHandler()}
                            className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getIsSorted() === 'asc' && <ChevronUp size={11} />}
                            {header.column.getIsSorted() === 'desc' && <ChevronDown size={11} />}
                          </button>
                        )}
                      </th>
                    )
                  })}
                  {/* Actions column header — sticky right */}
                  <th className="w-24 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky right-0 z-20 after:absolute after:left-0 after:top-0 after:bottom-0 after:w-px after:bg-gray-200 dark:after:bg-gray-700" />
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, rowIdx) => {
                const doc = row.original
                const isSubcollOpen = subcollPopover?.docId === doc.__id
                return (
                  <tr
                    key={row.id}
                    className={cn(
                      'group transition-colors',
                      rowIdx % 2 === 0
                        ? 'bg-white dark:bg-gray-900'
                        : 'bg-gray-50/50 dark:bg-gray-800/50',
                      isSubcollOpen && 'bg-gray-50 dark:bg-gray-800'
                    )}
                  >
                    {row.getVisibleCells().map((cell, cIdx) => {
                      const fieldId = cell.column.id
                      const isIdCol = fieldId === '__id'
                      const isEditing = editingCell?.docId === doc.__id && editingCell?.field === fieldId
                      const isSaved = cellSuccess?.docId === doc.__id && cellSuccess?.field === fieldId
                      const hasError = cellError?.docId === doc.__id && cellError?.field === fieldId
                      const originalValue = doc[fieldId]

                      // Row background for sticky cols
                      const rowBg = rowIdx % 2 === 0
                        ? 'bg-white dark:bg-gray-900'
                        : 'bg-gray-50 dark:bg-gray-800'
                      const rowBgHover = isSubcollOpen ? 'bg-gray-50 dark:bg-gray-800' : rowBg

                      return (
                        <td
                          key={cell.id}
                          onDoubleClick={() => {
                            if (isIdCol || cellSaving) return
                            setEditingCell({ docId: doc.__id, field: fieldId })
                            setCellError(null)
                          }}
                          className={cn(
                            'px-3 py-2 whitespace-nowrap max-w-[300px] border-b border-gray-100 dark:border-gray-800 transition-colors',
                            isIdCol
                              ? 'text-gray-800 dark:text-gray-200'
                              : 'text-gray-700 dark:text-gray-300 cursor-pointer',
                            !isIdCol && !isEditing && 'hover:bg-blue-50/50 dark:hover:bg-blue-900/10',
                            isSaved && 'bg-green-50 dark:bg-green-900/20',
                            hasError && 'bg-red-50 dark:bg-red-900/20',
                            // Sticky left for ID column
                            cIdx === 0 && `sticky left-0 z-[5] ${rowBgHover} after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-gray-100 dark:after:bg-gray-800`
                          )}
                        >
                          {isEditing ? (
                            <div className="min-w-[120px]">
                              <InlineEditor
                                value={
                                  typeof originalValue === 'object' && originalValue !== null
                                    ? JSON.stringify(originalValue, null, 2)
                                    : originalValue === null || originalValue === undefined
                                      ? ''
                                      : String(originalValue)
                                }
                                originalValue={originalValue}
                                onSave={(newValue) => handleCellSave(doc.__id, fieldId, newValue)}
                                onCancel={() => setEditingCell(null)}
                              />
                              {hasError && (
                                <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                                  <AlertCircle size={9} />
                                  {cellError?.msg}
                                </p>
                              )}
                            </div>
                          ) : isIdCol ? (
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono truncate max-w-[160px]">{doc.__id}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleCopyId(doc.__id)
                                }}
                                className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-gray-500 transition-all shrink-0"
                                title="Copy ID"
                              >
                                {copiedId === doc.__id ? (
                                  <Check size={11} className="text-green-500" />
                                ) : (
                                  <Copy size={11} />
                                )}
                              </button>
                            </div>
                          ) : (
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          )}
                        </td>
                      )
                    })}

                    {/* Actions cell — sticky right */}
                    <td
                      className={cn(
                        'px-3 py-2 border-b border-gray-100 dark:border-gray-800 text-right sticky right-0 z-[5]',
                        rowIdx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800',
                        isSubcollOpen && 'bg-gray-50 dark:bg-gray-800',
                        'after:absolute after:left-0 after:top-0 after:bottom-0 after:w-px after:bg-gray-100 dark:after:bg-gray-800'
                      )}
                    >
                      <div className="relative flex items-center gap-1 justify-end">
                        <button
                          onClick={() => handleShowSubcollections(doc.__id)}
                          className={cn(
                            'p-1 rounded-md transition-colors',
                            isSubcollOpen
                              ? 'text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700'
                              : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                          )}
                          title="Subcollections"
                        >
                          <FolderOpen size={13} />
                        </button>
                        <button
                          onClick={() => {
                            setDocToDelete(doc.__id)
                            setDeleteError(null)
                          }}
                          className="p-1 rounded-md text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                          title="Delete document"
                        >
                          <Trash2 size={13} />
                        </button>

                        {/* Subcollection dropdown */}
                        <AnimatePresence>
                          {isSubcollOpen && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -4 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -4 }}
                              transition={{ duration: 0.15 }}
                              className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg z-50 min-w-[220px] overflow-hidden"
                            >
                              <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
                                <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
                                  Subcollections of <span className="font-mono text-gray-700 dark:text-gray-300">{doc.__id}</span>
                                </p>
                              </div>
                              <div className="p-1.5">
                                {subcollPopover?.loading ? (
                                  <div className="flex items-center gap-1.5 px-2 py-2 text-xs text-gray-400">
                                    <Loader2 size={11} className="animate-spin" />
                                    Discovering…
                                  </div>
                                ) : subcollPopover?.subcollections.length === 0 ? (
                                  <p className="px-2 py-2 text-xs text-gray-400 dark:text-gray-500">
                                    No subcollections found
                                  </p>
                                ) : (
                                  subcollPopover?.subcollections.map((sub) => (
                                    <button
                                      key={sub}
                                      onClick={() => navigateToSubcollection(sub, doc.__id)}
                                      className="w-full flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                                    >
                                      <FolderOpen size={12} className="text-gray-400 shrink-0" />
                                      {sub}
                                      <ChevronRight size={11} className="text-gray-300 ml-auto shrink-0" />
                                    </button>
                                  ))
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* ===== Footer ===== */}
      {documents.length > 0 && (
        <div className="px-4 py-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between shrink-0">
          {/* Left: row info + load more */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
              {table.getFilteredRowModel().rows.length} of {documents.length} rows
            </span>
            {hasMore && (
              <button
                onClick={() => loadDocuments(nextPageToken)}
                disabled={fetchingMore}
                className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
              >
                {fetchingMore && <Loader2 size={11} className="animate-spin" />}
                Load more…
              </button>
            )}
          </div>

          {/* Centre: Pagination */}
          {table.getPageCount() > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-30 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronsLeft size={14} />
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-30 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-xs text-gray-500 dark:text-gray-400 mx-2 tabular-nums">
                {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
              </span>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-30 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-30 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronsRight size={14} />
              </button>
            </div>
          )}

          {/* Right: page size */}
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="text-xs border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md px-2 py-1 focus:outline-none"
          >
            {[25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size} rows
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ============================================================ */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ============================================================ */}
      <AnimatePresence>
        {docToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/40 animate-in fade-in duration-200"
              onClick={() => !deleting && setDocToDelete(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
              className="relative bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-xl w-full max-w-sm mx-4 p-5 animate-in slide-in-from-bottom-4 zoom-in-95 duration-300 ease-out"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-md bg-red-50 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                  <AlertTriangle size={16} className="text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Delete Document</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Permanently delete{' '}
                    <span className="font-mono font-medium text-gray-700 dark:text-gray-300">{docToDelete}</span>
                    ? This cannot be undone.
                  </p>
                  {deleteError && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-2 flex items-center gap-1">
                      <AlertCircle size={11} />
                      {deleteError}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 mt-4">
                <button
                  onClick={() => setDocToDelete(null)}
                  disabled={deleting}
                  className="text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 px-3 py-1.5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center gap-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50"
                >
                  {deleting ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                  {deleting ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* ADD DOCUMENT MODAL */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/40 animate-in fade-in duration-200"
              onClick={() => !creating && setShowAddModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
              className="relative bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-xl w-full max-w-xl mx-4 overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-4 zoom-in-95 duration-300 ease-out"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 dark:border-gray-700 shrink-0">
                <div className="flex items-center gap-2">
                  <Plus size={16} className="text-gray-400" />
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Add Document</h2>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">
                    {fieldSchema.length} fields discovered
                  </span>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  disabled={creating}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {/* Document ID */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Document ID
                    <span className="text-gray-400 font-normal ml-1">(optional – auto-generated if empty)</span>
                  </label>
                  <input
                    type="text"
                    value={newDocId}
                    onChange={(e) => setNewDocId(e.target.value)}
                    placeholder="e.g. my-custom-id"
                    className="w-full text-sm font-mono border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:border-gray-300 dark:focus:border-gray-500"
                  />
                </div>

                {/* Mode toggle */}
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-0.5 rounded-md w-fit">
                  <button
                    onClick={() => setFormMode('form')}
                    className={cn(
                      'flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors',
                      formMode === 'form'
                        ? 'text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-600 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/70 dark:hover:bg-gray-600/70'
                    )}
                  >
                    Form
                  </button>
                  <button
                    onClick={() => {
                      // Sync form → JSON when switching
                      if (formMode === 'form') {
                        const obj: Record<string, unknown> = {}
                        for (const f of formFields) {
                          if (f.enabled && f.name.trim()) {
                            obj[f.name.trim()] = convertFormValue(f.value, f.type)
                          }
                        }
                        setNewDocJson(JSON.stringify(obj, null, 2))
                      }
                      setFormMode('json')
                    }}
                    className={cn(
                      'flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors',
                      formMode === 'json'
                        ? 'text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-600 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/70 dark:hover:bg-gray-600/70'
                    )}
                  >
                    JSON
                  </button>
                </div>

                {/* FORM MODE */}
                {formMode === 'form' ? (
                  <div className="space-y-1.5">
                    {/* Column headers */}
                    <div className="flex items-center gap-2 px-1 text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      <div className="w-5" />
                      <div className="w-[130px] shrink-0">Field</div>
                      <div className="w-[80px] shrink-0">Type</div>
                      <div className="flex-1">Value</div>
                      <div className="w-6" />
                    </div>

                    {formFields.map((field, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'flex items-start gap-2 rounded-md px-1 py-1.5 transition-colors',
                          field.enabled
                            ? 'bg-white dark:bg-gray-800'
                            : 'bg-gray-50 dark:bg-gray-800/50 opacity-50'
                        )}
                      >
                        {/* Enable toggle */}
                        <input
                          type="checkbox"
                          checked={field.enabled}
                          onChange={() =>
                            setFormFields((prev) =>
                              prev.map((f, i) => (i === idx ? { ...f, enabled: !f.enabled } : f))
                            )
                          }
                          className="mt-1.5 shrink-0 rounded border-gray-300 dark:border-gray-600 text-gray-900 focus:ring-gray-200"
                        />

                        {/* Field name */}
                        {field.isCustom ? (
                          <input
                            type="text"
                            value={field.name}
                            onChange={(e) =>
                              setFormFields((prev) =>
                                prev.map((f, i) => (i === idx ? { ...f, name: e.target.value } : f))
                              )
                            }
                            placeholder="fieldName"
                            className="w-[130px] shrink-0 text-xs font-mono bg-transparent border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 text-gray-900 dark:text-gray-100 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-500"
                          />
                        ) : (
                          <div className="w-[130px] shrink-0 text-xs font-mono text-gray-800 dark:text-gray-200 pt-1 truncate" title={field.name}>
                            {field.name}
                          </div>
                        )}

                        {/* Type selector */}
                        <select
                          value={field.type}
                          onChange={(e) =>
                            setFormFields((prev) =>
                              prev.map((f, i) =>
                                i === idx
                                  ? { ...f, type: e.target.value, value: getDefaultFormValue(e.target.value) }
                                  : f
                              )
                            )
                          }
                          className="w-[80px] shrink-0 text-[11px] bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-1.5 py-1 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-500"
                        >
                          {FIELD_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>

                        {/* Value input — varies by type */}
                        <div className="flex-1 min-w-0">
                          {field.type === 'boolean' ? (
                            <select
                              value={field.value}
                              onChange={(e) =>
                                setFormFields((prev) =>
                                  prev.map((f, i) => (i === idx ? { ...f, value: e.target.value } : f))
                                )
                              }
                              disabled={!field.enabled}
                              className="w-full text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-500"
                            >
                              <option value="true">true</option>
                              <option value="false">false</option>
                            </select>
                          ) : field.type === 'null' ? (
                            <div className="text-xs text-gray-400 dark:text-gray-500 italic pt-1">null</div>
                          ) : field.type === 'array' || field.type === 'map' ? (
                            <textarea
                              value={field.value}
                              onChange={(e) =>
                                setFormFields((prev) =>
                                  prev.map((f, i) => (i === idx ? { ...f, value: e.target.value } : f))
                                )
                              }
                              disabled={!field.enabled}
                              spellCheck={false}
                              rows={2}
                              placeholder={field.type === 'array' ? '["item1", "item2"]' : '{"key": "value"}'}
                              className="w-full text-xs font-mono bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 text-gray-900 dark:text-gray-100 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-500 resize-y disabled:opacity-50"
                            />
                          ) : field.type === 'timestamp' ? (
                            <input
                              type="datetime-local"
                              value={field.value.replace('Z', '').slice(0, 16)}
                              onChange={(e) =>
                                setFormFields((prev) =>
                                  prev.map((f, i) => (i === idx ? { ...f, value: e.target.value + ':00Z' } : f))
                                )
                              }
                              disabled={!field.enabled}
                              className="w-full text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-500 disabled:opacity-50"
                            />
                          ) : (
                            <input
                              type={field.type === 'integer' || field.type === 'double' ? 'number' : 'text'}
                              step={field.type === 'double' ? 'any' : field.type === 'integer' ? '1' : undefined}
                              value={field.value}
                              onChange={(e) =>
                                setFormFields((prev) =>
                                  prev.map((f, i) => (i === idx ? { ...f, value: e.target.value } : f))
                                )
                              }
                              disabled={!field.enabled}
                              placeholder={field.type === 'string' ? 'Enter text…' : '0'}
                              className="w-full text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 text-gray-900 dark:text-gray-100 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-500 disabled:opacity-50"
                            />
                          )}
                        </div>

                        {/* Remove button (only for custom fields) */}
                        {field.isCustom ? (
                          <button
                            onClick={() =>
                              setFormFields((prev) => prev.filter((_, i) => i !== idx))
                            }
                            className="mt-0.5 p-0.5 text-gray-300 hover:text-red-500 transition-colors shrink-0"
                            title="Remove field"
                          >
                            <X size={12} />
                          </button>
                        ) : (
                          <div className="w-6 shrink-0" />
                        )}
                      </div>
                    ))}

                    {/* Add custom field */}
                    <button
                      onClick={() =>
                        setFormFields((prev) => [
                          ...prev,
                          { name: '', type: 'string', value: '', enabled: true, isCustom: true },
                        ])
                      }
                      className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors mt-2 px-1"
                    >
                      <Plus size={12} />
                      Add custom field
                    </button>
                  </div>
                ) : (
                  /* JSON MODE */
                  <textarea
                    value={newDocJson}
                    onChange={(e) => {
                      setNewDocJson(e.target.value)
                      setCreateError(null)
                    }}
                    spellCheck={false}
                    rows={14}
                    className="w-full text-xs font-mono bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-md p-3 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:border-gray-300 dark:focus:border-gray-500 resize-none"
                  />
                )}

                {createError && (
                  <div className="text-xs text-red-600 dark:text-red-400 flex items-start gap-1.5">
                    <AlertCircle size={12} className="shrink-0 mt-0.5" />
                    {createError}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between shrink-0">
                <div className="text-[10px] text-gray-400 dark:text-gray-500">
                  {formMode === 'form'
                    ? `${formFields.filter((f) => f.enabled).length} of ${formFields.length} fields enabled`
                    : 'Raw JSON mode'}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddModal(false)}
                    disabled={creating}
                    className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors px-3 py-1.5"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={creating}
                    className="flex items-center gap-1.5 text-xs font-medium text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors disabled:opacity-40"
                  >
                    {creating ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                    {creating ? 'Creating…' : 'Create Document'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
