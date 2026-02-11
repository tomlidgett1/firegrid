import { doc, getDoc, setDoc, collection, getDocs, query, orderBy, writeBatch, Timestamp, serverTimestamp, limit as fbLimit } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { LightspeedConnection, LightspeedSale, LightspeedSaleLine, LightspeedSalePayment } from '@/lib/types'

const LIGHTSPEED_CLIENT_ID = import.meta.env.VITE_LIGHTSPEED_CLIENT_ID as string
const LS_API_BASE = 'https://api.lightspeedapp.com/API/V3'

// ---- OAuth helpers ----

export function buildLightspeedAuthUrl(): string {
  const redirectUri = `${window.location.origin}/lightspeed/callback`
  const scope = 'employee:all'
  const state = crypto.randomUUID()
  // Store state for CSRF validation
  sessionStorage.setItem('ls_oauth_state', state)

  return (
    `https://cloud.lightspeedapp.com/auth/oauth/authorize` +
    `?response_type=code` +
    `&client_id=${encodeURIComponent(LIGHTSPEED_CLIENT_ID)}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&state=${encodeURIComponent(state)}`
  )
}

export async function exchangeCodeForTokens(code: string): Promise<{
  accessToken: string
  refreshToken: string
  expiresIn: number
}> {
  const redirectUri = `${window.location.origin}/lightspeed/callback`
  const res = await fetch('/api/lightspeed/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, redirectUri }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to exchange code for tokens')
  }

  return res.json()
}

export async function refreshAccessToken(refreshToken: string): Promise<{
  accessToken: string
  refreshToken: string
  expiresIn: number
}> {
  const res = await fetch('/api/lightspeed/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to refresh token')
  }

  return res.json()
}

// ---- Lightspeed API proxy ----

async function lsApiFetch(url: string, accessToken: string): Promise<{ data: unknown; rateLimitRemaining: string | null }> {
  const res = await fetch('/api/lightspeed/proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, accessToken }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    // If 401, token might be expired
    if (res.status === 401) {
      throw new Error('UNAUTHORIZED')
    }
    throw new Error(err.error || `API request failed: ${res.status}`)
  }

  return res.json()
}

// ---- Firestore helpers ----

export async function getLightspeedConnection(uid: string): Promise<LightspeedConnection | null> {
  if (!db) return null
  const docRef = doc(db, 'users', uid, 'integrations', 'lightspeed')
  const snap = await getDoc(docRef)
  if (!snap.exists()) return null
  const data = snap.data()
  return {
    accountId: data.accountId,
    accountName: data.accountName,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    expiresAt: data.expiresAt?.toDate?.() ?? new Date(),
    lastSalesSync: data.lastSalesSync?.toDate?.() ?? null,
    connectedAt: data.connectedAt?.toDate?.() ?? new Date(),
  }
}

export async function saveLightspeedConnection(
  uid: string,
  data: {
    accountId: string
    accountName: string
    accessToken: string
    refreshToken: string
    expiresIn: number
  }
): Promise<void> {
  if (!db) throw new Error('Firestore not initialised')
  const docRef = doc(db, 'users', uid, 'integrations', 'lightspeed')
  const expiresAt = new Date(Date.now() + data.expiresIn * 1000)
  await setDoc(
    docRef,
    {
      accountId: data.accountId,
      accountName: data.accountName,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresAt: Timestamp.fromDate(expiresAt),
      connectedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
}

export async function updateLightspeedTokens(
  uid: string,
  accessToken: string,
  refreshToken: string,
  expiresIn: number
): Promise<void> {
  if (!db) throw new Error('Firestore not initialised')
  const docRef = doc(db, 'users', uid, 'integrations', 'lightspeed')
  const expiresAt = new Date(Date.now() + expiresIn * 1000)
  await setDoc(
    docRef,
    {
      accessToken,
      refreshToken,
      expiresAt: Timestamp.fromDate(expiresAt),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
}

async function updateLastSalesSync(uid: string): Promise<void> {
  if (!db) return
  const docRef = doc(db, 'users', uid, 'integrations', 'lightspeed')
  await setDoc(docRef, { lastSalesSync: serverTimestamp(), updatedAt: serverTimestamp() }, { merge: true })
}

/**
 * Ensure the access token is valid, refreshing if needed.
 * Returns a valid access token.
 */
export async function ensureValidToken(uid: string): Promise<{ accessToken: string; accountId: string }> {
  const conn = await getLightspeedConnection(uid)
  if (!conn) throw new Error('Lightspeed not connected')

  // Check if token is still valid (with 5-minute buffer)
  const now = new Date()
  const bufferMs = 5 * 60 * 1000
  if (conn.expiresAt.getTime() - bufferMs > now.getTime()) {
    return { accessToken: conn.accessToken, accountId: conn.accountId }
  }

  // Token expired or about to expire — refresh
  console.log('[Lightspeed] Refreshing access token...')
  const refreshed = await refreshAccessToken(conn.refreshToken)
  await updateLightspeedTokens(uid, refreshed.accessToken, refreshed.refreshToken, refreshed.expiresIn)

  return { accessToken: refreshed.accessToken, accountId: conn.accountId }
}

// ---- Lightspeed API calls ----

export async function fetchLightspeedAccount(accessToken: string): Promise<{ accountId: string; accountName: string }> {
  const { data } = await lsApiFetch(`${LS_API_BASE}/Account.json`, accessToken)
  const account = (data as Record<string, unknown>).Account as Record<string, unknown>
  return {
    accountId: String(account.accountID),
    accountName: String(account.name || 'Lightspeed Account'),
  }
}

// ---- Parse sale data from API response ----

function parseSaleFromApi(raw: Record<string, unknown>): LightspeedSale {
  const customer = raw.Customer as Record<string, unknown> | undefined
  const employee = raw.Employee as Record<string, unknown> | undefined
  const shop = raw.Shop as Record<string, unknown> | undefined

  // Parse SaleLines
  const rawLines = raw.SaleLines as Record<string, unknown> | undefined
  let saleLines: LightspeedSaleLine[] = []
  if (rawLines?.SaleLine) {
    const lines = Array.isArray(rawLines.SaleLine) ? rawLines.SaleLine : [rawLines.SaleLine]
    saleLines = lines.map((line: Record<string, unknown>) => {
      const item = line.Item as Record<string, unknown> | undefined
      return {
        saleLineID: String(line.saleLineID || ''),
        itemID: String(line.itemID || ''),
        itemDescription: String(item?.description || line.itemDescription || ''),
        unitQuantity: Number(line.unitQuantity || 0),
        unitPrice: Number(line.unitPrice || 0),
        avgCost: Number(line.avgCost || 0),
        fifoCost: Number(line.fifoCost || 0),
        normalPrice: Number(line.normalPrice || 0),
        discountAmount: Number(line.discountAmount || 0),
        discountPercent: Number(line.discountPercent || 0),
        tax: line.tax === 'true' || line.tax === true,
        tax1Rate: Number(line.tax1Rate || 0),
        tax2Rate: Number(line.tax2Rate || 0),
        calcTotal: Number(line.calcTotal || 0),
        calcSubtotal: Number(line.calcSubtotal || 0),
        calcTax1: Number(line.calcTax1 || 0),
        calcTax2: Number(line.calcTax2 || 0),
        calcLineDiscount: Number(line.calcLineDiscount || 0),
        taxTotal: Number(line.taxTotal || 0),
        isLayaway: line.isLayaway === 'true' || line.isLayaway === true,
        isWorkorder: line.isWorkorder === 'true' || line.isWorkorder === true,
        isSpecialOrder: line.isSpecialOrder === 'true' || line.isSpecialOrder === true,
        note: String((line.Note as Record<string, unknown>)?.note || ''),
        customSku: String(item?.customSku || ''),
        manufacturerSku: String(item?.manufacturerSku || ''),
        upc: String(item?.upc || ''),
        ean: String(item?.ean || ''),
        createTime: String(line.createTime || ''),
        timeStamp: String(line.timeStamp || ''),
      }
    })
  }

  // Parse SalePayments
  const rawPayments = raw.SalePayments as Record<string, unknown> | undefined
  let salePayments: LightspeedSalePayment[] = []
  if (rawPayments?.SalePayment) {
    const payments = Array.isArray(rawPayments.SalePayment) ? rawPayments.SalePayment : [rawPayments.SalePayment]
    salePayments = payments.map((pay: Record<string, unknown>) => {
      const paymentType = pay.PaymentType as Record<string, unknown> | undefined
      return {
        salePaymentID: String(pay.salePaymentID || ''),
        amount: Number(pay.amount || 0),
        tipAmount: Number(pay.tipAmount || 0),
        paymentTypeName: String(paymentType?.name || 'Unknown'),
        paymentTypeID: String(pay.paymentTypeID || ''),
        createTime: String(pay.createTime || ''),
      }
    })
  }

  return {
    saleID: String(raw.saleID || ''),
    timeStamp: String(raw.timeStamp || ''),
    completed: raw.completed === 'true' || raw.completed === true,
    archived: raw.archived === 'true' || raw.archived === true,
    voided: raw.voided === 'true' || raw.voided === true,
    createTime: String(raw.createTime || ''),
    updateTime: String(raw.updatetime || raw.updateTime || ''),
    completeTime: raw.completeTime ? String(raw.completeTime) : null,
    referenceNumber: String(raw.referenceNumber || ''),
    referenceNumberSource: String(raw.referenceNumberSource || ''),
    ticketNumber: String(raw.ticketNumber || ''),
    tax1Rate: Number(raw.tax1Rate || 0),
    tax2Rate: Number(raw.tax2Rate || 0),
    change: Number(raw.change || 0),
    tipEnabled: raw.tipEnabled === 'true' || raw.tipEnabled === true,
    receiptPreference: String(raw.receiptPreference || ''),
    displayableSubtotal: Number(raw.displayableSubtotal || 0),
    calcDiscount: Number(raw.calcDiscount || 0),
    calcTotal: Number(raw.calcTotal || 0),
    calcSubtotal: Number(raw.calcSubtotal || 0),
    calcTaxable: Number(raw.calcTaxable || 0),
    calcNonTaxable: Number(raw.calcNonTaxable || 0),
    calcAvgCost: Number(raw.calcAvgCost || 0),
    calcFIFOCost: Number(raw.calcFIFOCost || 0),
    calcTax1: Number(raw.calcTax1 || 0),
    calcTax2: Number(raw.calcTax2 || 0),
    calcPayments: Number(raw.calcPayments || 0),
    calcTips: Number(raw.calcTips || 0),
    total: Number(raw.total || 0),
    totalDue: Number(raw.totalDue || 0),
    displayableTotal: Number(raw.displayableTotal || 0),
    balance: Number(raw.balance || 0),
    customerID: String(raw.customerID || '0'),
    customerFirstName: String(customer?.firstName || ''),
    customerLastName: String(customer?.lastName || ''),
    employeeID: String(raw.employeeID || '0'),
    employeeFirstName: String(employee?.firstName || ''),
    employeeLastName: String(employee?.lastName || ''),
    registerID: String(raw.registerID || ''),
    shopID: String(raw.shopID || ''),
    shopName: String(shop?.name || ''),
    taxCategoryID: String(raw.taxCategoryID || ''),
    saleLines,
    salePayments,
    syncedAt: new Date(),
  }
}

// ---- Sync sales from Lightspeed to Firestore ----

/**
 * Fetches sales from Lightspeed and stores them in Firestore.
 * Uses lastSalesSync to only fetch updated sales (incremental sync).
 * Returns the number of sales synced.
 */
export async function syncSales(
  uid: string,
  onProgress?: (message: string) => void
): Promise<{ synced: number; total: number }> {
  if (!db) throw new Error('Firestore not initialised')

  const { accessToken, accountId } = await ensureValidToken(uid)
  const conn = await getLightspeedConnection(uid)
  const lastSync = conn?.lastSalesSync

  let allSales: LightspeedSale[] = []
  let offset = 0
  const pageSize = 100
  let hasMore = true

  onProgress?.('Fetching sales from Lightspeed...')

  while (hasMore) {
    // Build URL with relations and pagination
    let url =
      `${LS_API_BASE}/Account/${accountId}/Sale.json` +
      `?load_relations=${encodeURIComponent('["SaleLines","SaleLines.Item","SalePayments","SalePayments.PaymentType","Customer","Employee","Shop"]')}` +
      `&limit=${pageSize}` +
      `&offset=${offset}` +
      `&orderby=updatetime` +
      `&orderby_desc=1`

    // Incremental sync — only fetch sales updated after last sync
    if (lastSync) {
      const syncDateStr = lastSync.toISOString().replace('Z', '+00:00')
      url += `&updatetime=${encodeURIComponent('>,' + syncDateStr)}`
    }

    try {
      const { data } = await lsApiFetch(url, accessToken)
      const responseData = data as Record<string, unknown>
      const attrs = responseData['@attributes'] as Record<string, unknown> | undefined
      const rawSales = responseData.Sale

      if (!rawSales) {
        hasMore = false
        break
      }

      const salesArray = Array.isArray(rawSales) ? rawSales : [rawSales]
      const parsed = salesArray.map((s) => parseSaleFromApi(s as Record<string, unknown>))
      allSales = allSales.concat(parsed)

      onProgress?.(`Fetched ${allSales.length} sales...`)

      // Check if there are more pages
      const count = Number(attrs?.count || 0)
      if (salesArray.length < pageSize || allSales.length >= count) {
        hasMore = false
      } else {
        offset += pageSize
      }

      // Rate limit safety — small delay between pages
      if (hasMore) {
        await new Promise((r) => setTimeout(r, 500))
      }
    } catch (err) {
      if (err instanceof Error && err.message === 'UNAUTHORIZED') {
        // Try refreshing the token and retry
        const refreshed = await ensureValidToken(uid)
        // Will retry on next iteration with new token
        continue
      }
      throw err
    }
  }

  // Batch write to Firestore
  if (allSales.length > 0) {
    onProgress?.(`Saving ${allSales.length} sales to Firestore...`)

    // Firestore batch writes are limited to 500 operations
    const batchSize = 250 // Each sale = 1 write, leave room
    for (let i = 0; i < allSales.length; i += batchSize) {
      const batch = writeBatch(db)
      const chunk = allSales.slice(i, i + batchSize)

      for (const sale of chunk) {
        const saleRef = doc(db, 'users', uid, 'lightspeedSales', sale.saleID)
        batch.set(saleRef, {
          ...sale,
          syncedAt: serverTimestamp(),
          // Convert nested arrays to Firestore-friendly format
          saleLines: sale.saleLines.map((l) => ({ ...l })),
          salePayments: sale.salePayments.map((p) => ({ ...p })),
        })
      }

      await batch.commit()
      onProgress?.(`Saved ${Math.min(i + batchSize, allSales.length)} / ${allSales.length} sales...`)
    }
  }

  // Update last sync timestamp
  await updateLastSalesSync(uid)

  onProgress?.(`Sync complete! ${allSales.length} sales updated.`)

  return { synced: allSales.length, total: allSales.length }
}

// ---- Load sales from Firestore ----

export async function loadSalesFromFirestore(uid: string): Promise<LightspeedSale[]> {
  if (!db) return []

  const salesRef = collection(db, 'users', uid, 'lightspeedSales')
  const q = query(salesRef, orderBy('completeTime', 'desc'))
  const snap = await getDocs(q)

  return snap.docs.map((d) => {
    const data = d.data()
    return {
      ...data,
      syncedAt: data.syncedAt?.toDate?.() ?? new Date(),
    } as LightspeedSale
  })
}

// ---- Disconnect ----

export async function disconnectLightspeed(uid: string): Promise<void> {
  if (!db) throw new Error('Firestore not initialised')
  const { deleteDoc } = await import('firebase/firestore')
  const docRef = doc(db, 'users', uid, 'integrations', 'lightspeed')
  await deleteDoc(docRef)
}
