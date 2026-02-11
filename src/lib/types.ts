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

export interface LightspeedSaleLine {
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
  createTime: string
  timeStamp: string
}

export interface LightspeedSalePayment {
  salePaymentID: string
  amount: number
  tipAmount: number
  paymentTypeName: string
  paymentTypeID: string
  createTime: string
}

export interface LightspeedSale {
  saleID: string
  timeStamp: string
  completed: boolean
  archived: boolean
  voided: boolean
  createTime: string
  updateTime: string
  completeTime: string | null
  referenceNumber: string
  referenceNumberSource: string
  ticketNumber: string
  tax1Rate: number
  tax2Rate: number
  change: number
  tipEnabled: boolean
  receiptPreference: string
  displayableSubtotal: number
  calcDiscount: number
  calcTotal: number
  calcSubtotal: number
  calcTaxable: number
  calcNonTaxable: number
  calcAvgCost: number
  calcFIFOCost: number
  calcTax1: number
  calcTax2: number
  calcPayments: number
  calcTips: number
  total: number
  totalDue: number
  displayableTotal: number
  balance: number
  // Denormalised customer info
  customerID: string
  customerFirstName: string
  customerLastName: string
  // Denormalised employee info
  employeeID: string
  employeeFirstName: string
  employeeLastName: string
  // Shop / register
  registerID: string
  shopID: string
  shopName: string
  taxCategoryID: string
  // Line items + payments
  saleLines: LightspeedSaleLine[]
  salePayments: LightspeedSalePayment[]
  // Sync metadata
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
