import { doc, getDoc, setDoc, collection, getDocs, query, orderBy, writeBatch, Timestamp, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { LightspeedConnection, LightspeedSoldItem } from '@/lib/types'

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
    syncCursor: data.syncCursor ?? null,
    syncStartedAt: data.syncStartedAt?.toDate?.() ?? null,
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

/** Save sync-in-progress cursor so we can resume if interrupted */
async function updateSyncCursor(uid: string, cursor: string, syncStartedAt?: Date): Promise<void> {
  if (!db) return
  const docRef = doc(db, 'users', uid, 'integrations', 'lightspeed')
  const update: Record<string, unknown> = { syncCursor: cursor, updatedAt: serverTimestamp() }
  if (syncStartedAt) {
    update.syncStartedAt = Timestamp.fromDate(syncStartedAt)
  }
  await setDoc(docRef, update, { merge: true })
}

/** Mark sync as fully complete — set lastSalesSync, clear cursor */
async function completeSyncRun(uid: string, syncStartedAt: Date): Promise<void> {
  if (!db) return
  const docRef = doc(db, 'users', uid, 'integrations', 'lightspeed')
  await setDoc(
    docRef,
    {
      lastSalesSync: Timestamp.fromDate(syncStartedAt),
      syncCursor: null,
      syncStartedAt: null,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
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

// ---- Parse a single sale into flat sold-item rows ----

function parseSaleToItems(raw: Record<string, unknown>): LightspeedSoldItem[] {
  const customer = raw.Customer as Record<string, unknown> | undefined

  // Payment summary
  const rawPayments = raw.SalePayments as Record<string, unknown> | undefined
  let paymentTypeNames: string[] = []
  let paymentTotal = 0
  if (rawPayments?.SalePayment) {
    const payments = Array.isArray(rawPayments.SalePayment) ? rawPayments.SalePayment : [rawPayments.SalePayment]
    for (const pay of payments as Record<string, unknown>[]) {
      const pt = pay.PaymentType as Record<string, unknown> | undefined
      const name = String(pt?.name || 'Unknown')
      if (!paymentTypeNames.includes(name)) paymentTypeNames.push(name)
      paymentTotal += Number(pay.amount || 0)
    }
  }
  const paymentTypes = paymentTypeNames.join(', ')

  // Shared sale-level fields
  const saleBase = {
    saleID: String(raw.saleID || ''),
    saleCompleted: raw.completed === 'true' || raw.completed === true,
    saleArchived: raw.archived === 'true' || raw.archived === true,
    saleVoided: raw.voided === 'true' || raw.voided === true,
    saleCreateTime: String(raw.createTime || ''),
    saleUpdateTime: String(raw.updatetime || raw.updateTime || ''),
    saleCompleteTime: raw.completeTime ? String(raw.completeTime) : null,
    ticketNumber: String(raw.ticketNumber || ''),
    referenceNumber: String(raw.referenceNumber || ''),
    referenceNumberSource: String(raw.referenceNumberSource || ''),
    saleTotal: Number(raw.total || 0),
    saleSubtotal: Number(raw.calcSubtotal || 0),
    saleDiscount: Number(raw.calcDiscount || 0),
    saleTax1: Number(raw.calcTax1 || 0),
    saleTax2: Number(raw.calcTax2 || 0),
    saleTaxTotal: Number(raw.calcTax1 || 0) + Number(raw.calcTax2 || 0),
    salePayments: Number(raw.calcPayments || 0),
    saleTips: Number(raw.calcTips || 0),
    saleBalance: Number(raw.balance || 0),
    saleTotalDue: Number(raw.totalDue || 0),
    customerID: String(raw.customerID || '0'),
    customerFirstName: String(customer?.firstName || ''),
    customerLastName: String(customer?.lastName || ''),
    employeeID: String(raw.employeeID || '0'),
    registerID: String(raw.registerID || ''),
    shopID: String(raw.shopID || ''),
    paymentTypes,
    paymentTotal,
  }

  // Parse each SaleLine into a flat item row
  const rawLines = raw.SaleLines as Record<string, unknown> | undefined
  if (!rawLines?.SaleLine) return []

  const lines = Array.isArray(rawLines.SaleLine) ? rawLines.SaleLine : [rawLines.SaleLine]
  return lines.map((line: Record<string, unknown>) => {
    const item = line.Item as Record<string, unknown> | undefined
    return {
      ...saleBase,
      // Line item details
      saleLineID: String(line.saleLineID || ''),
      itemID: String(line.itemID || ''),
      itemDescription: String(item?.description || ''),
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
      lineCreateTime: String(line.createTime || ''),
      lineTimeStamp: String(line.timeStamp || ''),
      syncedAt: new Date(),
    } as LightspeedSoldItem
  })
}

// ---- Sync sales from Lightspeed to Firestore ----

/**
 * Fetches sales from Lightspeed and stores one document per item sold.
 *
 * Three modes:
 *   1. INCREMENTAL — `lastSalesSync` exists, no `syncCursor`:
 *      fetch `updateTime > lastSalesSync`, newest first (only new/changed data)
 *   2. RESUME HISTORICAL — `syncCursor` exists, no `lastSalesSync`:
 *      pick up an interrupted historical fetch, continuing backwards from cursor
 *   3. FRESH HISTORICAL — neither exists:
 *      fetch everything, newest first
 *
 * After each batch flush the cursor is saved to Firestore, so an interrupted
 * sync can be resumed without re-fetching already-stored items.
 */
export async function syncSales(
  uid: string,
  onProgress?: (message: string) => void
): Promise<{ synced: number; total: number }> {
  if (!db) throw new Error('Firestore not initialised')

  const { accessToken, accountId } = await ensureValidToken(uid)
  const conn = await getLightspeedConnection(uid)

  const lastSync = conn?.lastSalesSync
  const existingCursor = conn?.syncCursor
  const isIncremental = !!lastSync && !existingCursor
  const isResume = !!existingCursor && !lastSync

  // Record when this sync run started (for setting lastSalesSync on completion).
  // If resuming, reuse the original syncStartedAt so the window stays correct.
  const syncStartedAt = isResume && conn?.syncStartedAt
    ? conn.syncStartedAt
    : new Date()

  let totalItems = 0
  const FLUSH_LIMIT = 1000
  let buffer: LightspeedSoldItem[] = []
  let oldestUpdateTimeInRun: string | null = null

  // ---- Build initial URL ----
  const relations = '["SaleLines","SaleLines.Item","SalePayments","SalePayments.PaymentType","Customer","Customer.Contact"]'
  let nextUrl: string | null =
    `${LS_API_BASE}/Account/${accountId}/Sale.json` +
    `?load_relations=${encodeURIComponent(relations)}` +
    `&limit=100` +
    `&sort=-updateTime`

  if (isIncremental) {
    // Only fetch sales updated after the last completed sync
    const syncDateStr = lastSync!.toISOString().replace('Z', '+00:00')
    nextUrl += `&updateTime=${encodeURIComponent('>,' + syncDateStr)}`
    onProgress?.('Fetching new/updated sales since last sync...')
  } else if (isResume) {
    // Continue backwards from where we left off
    nextUrl += `&updateTime=${encodeURIComponent('<,' + existingCursor!)}`
    onProgress?.(`Resuming historical sync from ${existingCursor}...`)
  } else {
    // Fresh historical — fetch everything, newest first
    onProgress?.('Starting full historical sync (newest first)...')
  }

  while (nextUrl) {
    try {
      const { data } = await lsApiFetch(nextUrl, accessToken)
      const responseData = data as Record<string, unknown>
      const attrs = responseData['@attributes'] as Record<string, unknown> | undefined
      const rawSales = responseData.Sale

      if (!rawSales) break

      const salesArray = Array.isArray(rawSales) ? rawSales : [rawSales]

      // Flatten each sale into individual item rows
      for (const rawSale of salesArray) {
        const raw = rawSale as Record<string, unknown>
        const items = parseSaleToItems(raw)
        buffer = buffer.concat(items)

        // Track the oldest updateTime we've seen (for the cursor)
        const ut = String(raw.updatetime || raw.updateTime || '')
        if (ut && (!oldestUpdateTimeInRun || ut < oldestUpdateTimeInRun)) {
          oldestUpdateTimeInRun = ut
        }
      }

      onProgress?.(`Fetched ${totalItems + buffer.length} items...`)

      // Flush when buffer hits limit
      if (buffer.length >= FLUSH_LIMIT) {
        await flushItemsToFirestore(uid, buffer, onProgress, totalItems)
        totalItems += buffer.length
        buffer = []

        // Save cursor progress so we can resume if interrupted
        if (!isIncremental && oldestUpdateTimeInRun) {
          await updateSyncCursor(uid, oldestUpdateTimeInRun, syncStartedAt)
        }

        onProgress?.(`Stored ${totalItems} items so far, fetching more...`)
      }

      // Cursor-based pagination — follow the "next" URL
      const nextAttr = attrs?.next as string | undefined
      if (nextAttr && nextAttr.length > 0) {
        nextUrl = nextAttr.startsWith('http')
          ? nextAttr
          : `https://api.lightspeedapp.com${nextAttr}`
      } else {
        nextUrl = null
      }

      if (nextUrl) {
        await new Promise((r) => setTimeout(r, 500))
      }
    } catch (err) {
      if (err instanceof Error && err.message === 'UNAUTHORIZED') {
        await ensureValidToken(uid)
        continue
      }
      throw err
    }
  }

  // Flush remaining buffer
  if (buffer.length > 0) {
    await flushItemsToFirestore(uid, buffer, onProgress, totalItems)
    totalItems += buffer.length

    if (!isIncremental && oldestUpdateTimeInRun) {
      await updateSyncCursor(uid, oldestUpdateTimeInRun, syncStartedAt)
    }
  }

  // Sync run fully completed — mark done, clear cursor
  await completeSyncRun(uid, syncStartedAt)
  onProgress?.(`Sync complete! ${totalItems} items stored.`)

  return { synced: totalItems, total: totalItems }
}

// ---- Flush item rows to Firestore ----

async function flushItemsToFirestore(
  uid: string,
  items: LightspeedSoldItem[],
  onProgress?: (message: string) => void,
  offsetCount = 0
): Promise<void> {
  if (!db || items.length === 0) return

  onProgress?.(`Saving ${items.length} items to Firestore...`)

  const batchSize = 400
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = writeBatch(db)
    const chunk = items.slice(i, i + batchSize)

    for (const item of chunk) {
      // Document ID = saleLineID (unique per item sold)
      const itemRef = doc(db, 'users', uid, 'lightspeedSales', item.saleLineID)
      batch.set(itemRef, {
        ...item,
        syncedAt: serverTimestamp(),
      })
    }

    await batch.commit()
    onProgress?.(`Stored ${offsetCount + Math.min(i + batchSize, items.length)} items...`)
  }
}

// ---- Load sold items from Firestore ----

export async function loadSoldItemsFromFirestore(uid: string): Promise<LightspeedSoldItem[]> {
  if (!db) return []

  const ref = collection(db, 'users', uid, 'lightspeedSales')
  const q = query(ref, orderBy('saleCompleteTime', 'desc'))
  const snap = await getDocs(q)

  return snap.docs.map((d) => {
    const data = d.data()
    return {
      ...data,
      syncedAt: data.syncedAt?.toDate?.() ?? new Date(),
    } as LightspeedSoldItem
  })
}

// ---- Disconnect ----

export async function disconnectLightspeed(uid: string): Promise<void> {
  if (!db) throw new Error('Firestore not initialised')
  const { deleteDoc } = await import('firebase/firestore')
  const docRef = doc(db, 'users', uid, 'integrations', 'lightspeed')
  await deleteDoc(docRef)
}
