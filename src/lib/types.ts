// ---- Auth ----
export interface AppUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  accessToken: string | null
}

// ---- GCP Projects ----
export interface GCPProject {
  projectId: string
  name: string
  projectNumber: string
}

// ---- Firestore Schema ----
export interface FieldInfo {
  path: string
  dataType: string
  coverage: number // 0-1
  sampleValues: unknown[]
}

export interface CollectionInfo {
  id: string
  path: string
  documentCount: number | null
  /** True when collection has no real documents but has phantom docs with subcollections */
  hasSubcollections?: boolean
}

export interface DocumentData {
  __id: string
  __path?: string
  __parentId?: string
  [key: string]: unknown
}

// ---- Table Builder ----
export interface ColumnConfig {
  id: string
  sourcePath: string
  alias: string
  dataType: string
  visible: boolean
  order: number
}

export interface SavedTable {
  id: string
  tableName: string
  projectId: string
  collectionPath: string
  isCollectionGroup?: boolean
  columns: ColumnConfig[]
  createdAt: Date
  updatedAt: Date
  // For query-based tables (projectId === '__query__')
  querySql?: string
  queryData?: Record<string, unknown>[]
}

// ---- Firestore REST API types ----
export interface FirestoreValue {
  stringValue?: string
  integerValue?: string
  doubleValue?: number
  booleanValue?: boolean
  timestampValue?: string
  nullValue?: null
  mapValue?: { fields: Record<string, FirestoreValue> }
  arrayValue?: { values?: FirestoreValue[] }
  referenceValue?: string
  geoPointValue?: { latitude: number; longitude: number }
}

export interface FirestoreDocument {
  name: string
  fields?: Record<string, FirestoreValue>
  createTime?: string
  updateTime?: string
}
