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

// ---- Lightspeed POS Integration ----
export interface LightspeedConnection {
  accountId: string
  accountName: string
  accessToken: string
  refreshToken: string
  expiresAt: Date
  lastSalesSync: Date | null
  connectedAt: Date
}

/**
 * One document per item sold — fully denormalised with sale context.
 * Stored at: users/{uid}/lightspeedSales/{saleLineID}
 */
export interface LightspeedSoldItem {
  // ---- Line item details ----
  saleLineID: string
  itemID: string
  itemDescription: string
  unitQuantity: number
  unitPrice: number
  avgCost: number
  fifoCost: number
  normalPrice: number
  discountAmount: number
  discountPercent: number
  tax: boolean
  tax1Rate: number
  tax2Rate: number
  calcTotal: number
  calcSubtotal: number
  calcTax1: number
  calcTax2: number
  calcLineDiscount: number
  taxTotal: number
  isLayaway: boolean
  isWorkorder: boolean
  isSpecialOrder: boolean
  note: string
  customSku: string
  manufacturerSku: string
  upc: string
  ean: string
  lineCreateTime: string
  lineTimeStamp: string

  // ---- Parent sale details ----
  saleID: string
  saleCompleted: boolean
  saleArchived: boolean
  saleVoided: boolean
  saleCreateTime: string
  saleUpdateTime: string
  saleCompleteTime: string | null
  ticketNumber: string
  referenceNumber: string
  referenceNumberSource: string
  saleTotal: number
  saleSubtotal: number
  saleDiscount: number
  saleTax1: number
  saleTax2: number
  saleTaxTotal: number
  salePayments: number
  saleTips: number
  saleBalance: number
  saleTotalDue: number

  // ---- Customer ----
  customerID: string
  customerFirstName: string
  customerLastName: string

  // ---- Employee / Shop / Register ----
  employeeID: string
  registerID: string
  shopID: string

  // ---- Payment summary (denormalised from SalePayments) ----
  paymentTypes: string
  paymentTotal: number

  // ---- Sync metadata ----
  syncedAt: Date
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
