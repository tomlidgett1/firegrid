import { useEffect, useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { syncSales, loadSoldItemsFromFirestore, getLightspeedConnection } from '@/lib/lightspeed'
import type { LightspeedSoldItem, LightspeedConnection } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  RefreshCw,
  Loader2,
  ChevronDown,
  Search,
  ShoppingCart,
  DollarSign,
  Receipt,
  Package,
  Calendar,
  Hash,
  X,
  AlertCircle,
  CheckCircle,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type SortField = 'saleCompleteTime' | 'calcTotal' | 'itemDescription' | 'unitQuantity' | 'saleID' | 'customerLastName'
type SortDir = 'asc' | 'desc'
type StatusFilter = 'all' | 'completed' | 'voided' | 'open'

export default function SalesPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [connection, setConnection] = useState<LightspeedConnection | null>(null)
  const [items, setItems] = useState<LightspeedSoldItem[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [syncMessage, setSyncMessage] = useState('')
  const [error, setError] = useState('')

  // Table state
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('saleCompleteTime')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 50

  // Load connection and items on mount
  useEffect(() => {
    if (!user?.uid) return

    async function load() {
      setLoading(true)
      try {
        const conn = await getLightspeedConnection(user!.uid)
        setConnection(conn)
        if (conn) {
          const loaded = await loadSoldItemsFromFirestore(user!.uid)
          setItems(loaded)
        }
      } catch (err) {
        console.error('Failed to load items:', err)
        setError('Failed to load sales data')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [user?.uid])

  // Sync sales from Lightspeed
  const handleSync = useCallback(async () => {
    if (!user?.uid || syncing) return
    setSyncing(true)
    setSyncMessage('')
    setError('')

    try {
      const result = await syncSales(user.uid, (msg) => setSyncMessage(msg))
      const loaded = await loadSoldItemsFromFirestore(user.uid)
      setItems(loaded)
      const conn = await getLightspeedConnection(user.uid)
      setConnection(conn)
      setSyncMessage(`Synced ${result.synced} items successfully!`)
      setTimeout(() => setSyncMessage(''), 5000)
    } catch (err) {
      console.error('Sync failed:', err)
      setError(err instanceof Error ? err.message : 'Sync failed')
    } finally {
      setSyncing(false)
    }
  }, [user?.uid, syncing])

  // Filter + search + sort
  const filteredItems = useMemo(() => {
    let result = [...items]

    // Status filter
    if (statusFilter === 'completed') {
      result = result.filter((i) => i.saleCompleted && !i.saleVoided)
    } else if (statusFilter === 'voided') {
      result = result.filter((i) => i.saleVoided)
    } else if (statusFilter === 'open') {
      result = result.filter((i) => !i.saleCompleted && !i.saleVoided)
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (i) =>
          i.itemDescription.toLowerCase().includes(q) ||
          i.saleID.includes(q) ||
          i.ticketNumber.toLowerCase().includes(q) ||
          `${i.customerFirstName} ${i.customerLastName}`.toLowerCase().includes(q) ||
          i.customSku.toLowerCase().includes(q) ||
          i.upc.toLowerCase().includes(q) ||
          i.ean.toLowerCase().includes(q) ||
          i.referenceNumber.toLowerCase().includes(q) ||
          i.paymentTypes.toLowerCase().includes(q)
      )
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0
      switch (sortField) {
        case 'saleCompleteTime': {
          const dateA = a.saleCompleteTime || a.saleCreateTime || ''
          const dateB = b.saleCompleteTime || b.saleCreateTime || ''
          cmp = dateA.localeCompare(dateB)
          break
        }
        case 'calcTotal':
          cmp = a.calcTotal - b.calcTotal
          break
        case 'itemDescription':
          cmp = a.itemDescription.localeCompare(b.itemDescription)
          break
        case 'unitQuantity':
          cmp = a.unitQuantity - b.unitQuantity
          break
        case 'saleID':
          cmp = a.saleID.localeCompare(b.saleID)
          break
        case 'customerLastName':
          cmp = `${a.customerLastName} ${a.customerFirstName}`.localeCompare(
            `${b.customerLastName} ${b.customerFirstName}`
          )
          break
      }
      return sortDir === 'desc' ? -cmp : cmp
    })

    return result
  }, [items, searchQuery, sortField, sortDir, statusFilter])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize))
  const paginatedItems = filteredItems.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, statusFilter, sortField, sortDir])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(val)
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—'
    try {
      return new Date(dateStr).toLocaleDateString('en-AU', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  const getItemStatus = (item: LightspeedSoldItem) => {
    if (item.saleVoided) return { label: 'Voided', className: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20' }
    if (item.saleCompleted) return { label: 'Completed', className: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20' }
    return { label: 'Open', className: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20' }
  }

  // Summary stats
  const stats = useMemo(() => {
    const completedItems = items.filter((i) => i.saleCompleted && !i.saleVoided)
    const totalRevenue = completedItems.reduce((sum, i) => sum + i.calcTotal, 0)
    const totalQty = completedItems.reduce((sum, i) => sum + Math.abs(i.unitQuantity), 0)
    const uniqueSales = new Set(completedItems.map((i) => i.saleID))
    return {
      totalSales: uniqueSales.size,
      totalItems: completedItems.length,
      totalQty,
      totalRevenue,
    }
  }, [items])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader2 size={20} className="animate-spin text-gray-400" />
      </div>
    )
  }

  if (!connection) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 max-w-sm text-center">
          <AlertCircle size={24} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Lightspeed Not Connected
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Connect your Lightspeed account from the dashboard to view sales.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium rounded-md px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img src="/logo.png" alt="Firegrid" className="w-7 h-7 rounded-md" />
              <span className="font-semibold text-gray-900 dark:text-gray-100">Firegrid</span>
            </button>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <div className="flex items-center gap-1.5">
              <ShoppingCart size={14} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Items Sold
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {connection.accountName}
              {connection.lastSalesSync && (
                <span className="ml-2">
                  · Last sync: {connection.lastSalesSync.toLocaleString('en-AU')}
                </span>
              )}
            </div>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center gap-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-medium rounded-md px-3 py-1.5 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {syncing ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <RefreshCw size={12} />
              )}
              {syncing ? 'Syncing…' : 'Sync Sales'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Sync progress message */}
        <AnimatePresence>
          {syncMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-2"
            >
              {syncing ? (
                <Loader2 size={14} className="animate-spin text-gray-400" />
              ) : (
                <CheckCircle size={14} className="text-green-500" />
              )}
              <span className="text-sm text-gray-600 dark:text-gray-300">{syncMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        {error && (
          <div className="mb-4 bg-white dark:bg-gray-800 rounded-xl border border-red-200 dark:border-red-800 px-4 py-3 flex items-center gap-2">
            <AlertCircle size={14} className="text-red-500" />
            <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
            <button onClick={() => setError('')} className="ml-auto text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Receipt size={14} className="text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Unique Sales</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {stats.totalSales.toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Package size={14} className="text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Items Sold</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {stats.totalItems.toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-1">
              <ShoppingCart size={14} className="text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Total Qty</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {stats.totalQty.toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={14} className="text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Total Revenue</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {formatCurrency(stats.totalRevenue)}
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search items, sales, customers, SKUs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-md pl-9 pr-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Status filter tabs */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-0.5 rounded-md w-fit">
            {(['all', 'completed', 'voided', 'open'] as StatusFilter[]).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors',
                  statusFilter === status
                    ? 'text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-600 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/70 dark:hover:bg-gray-600/70'
                )}
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Result count */}
          <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* Items Table */}
        {items.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-12 text-center">
            <ShoppingCart size={24} className="text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">No sales data yet</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
              Click "Sync Sales" to fetch your Lightspeed sales data.
            </p>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="inline-flex items-center gap-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium rounded-md px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {syncing ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
              Sync Sales
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-700/60">
                    <SortableHeader
                      label="Date"
                      field="saleCompleteTime"
                      currentField={sortField}
                      currentDir={sortDir}
                      onSort={handleSort}
                      icon={<Calendar size={11} />}
                    />
                    <SortableHeader
                      label="Sale #"
                      field="saleID"
                      currentField={sortField}
                      currentDir={sortDir}
                      onSort={handleSort}
                      icon={<Hash size={11} />}
                    />
                    <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Ticket
                    </th>
                    <SortableHeader
                      label="Item"
                      field="itemDescription"
                      currentField={sortField}
                      currentDir={sortDir}
                      onSort={handleSort}
                      icon={<Package size={11} />}
                    />
                    <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                      SKU / UPC
                    </th>
                    <SortableHeader
                      label="Qty"
                      field="unitQuantity"
                      currentField={sortField}
                      currentDir={sortDir}
                      onSort={handleSort}
                    />
                    <th className="text-right px-3 py-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Unit Price
                    </th>
                    <th className="text-right px-3 py-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Discount
                    </th>
                    <th className="text-right px-3 py-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Tax
                    </th>
                    <SortableHeader
                      label="Line Total"
                      field="calcTotal"
                      currentField={sortField}
                      currentDir={sortDir}
                      onSort={handleSort}
                      icon={<DollarSign size={11} />}
                      align="right"
                    />
                    <SortableHeader
                      label="Customer"
                      field="customerLastName"
                      currentField={sortField}
                      currentDir={sortDir}
                      onSort={handleSort}
                      icon={<User size={11} />}
                    />
                    <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Payment
                    </th>
                    <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {paginatedItems.map((item) => {
                    const status = getItemStatus(item)
                    return (
                      <tr
                        key={item.saleLineID}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-3 py-2.5">
                          <span className="text-xs text-gray-700 dark:text-gray-300">
                            {formatDate(item.saleCompleteTime || item.saleCreateTime)}
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                            {item.saleID}
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                            {item.ticketNumber || '—'}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 max-w-[220px]">
                          <span className="text-xs text-gray-800 dark:text-gray-200 truncate block">
                            {item.itemDescription || `Item #${item.itemID}`}
                          </span>
                          {item.note && (
                            <p className="text-[10px] text-gray-400 mt-0.5 italic truncate">
                              {item.note}
                            </p>
                          )}
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                            {item.customSku || item.upc || item.ean || '—'}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-right">
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {item.unitQuantity}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-right">
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {formatCurrency(item.unitPrice)}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-right">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {item.calcLineDiscount > 0
                              ? `-${formatCurrency(item.calcLineDiscount)}`
                              : '—'}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-right">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatCurrency(item.calcTax1 + item.calcTax2)}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-right">
                          <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                            {formatCurrency(item.calcTotal)}
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="text-xs text-gray-700 dark:text-gray-300 truncate max-w-[120px] block">
                            {item.customerFirstName || item.customerLastName
                              ? `${item.customerFirstName} ${item.customerLastName}`.trim()
                              : '—'}
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[100px] block">
                            {item.paymentTypes || '—'}
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span
                            className={cn(
                              'inline-flex px-1.5 py-0.5 rounded-md text-[10px] font-medium',
                              status.className
                            )}
                          >
                            {status.label}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  Page {currentPage} of {totalPages} · {filteredItems.length} items
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

// ---- Sortable Header Component ----

function SortableHeader({
  label,
  field,
  currentField,
  currentDir,
  onSort,
  icon,
  align = 'left',
}: {
  label: string
  field: SortField
  currentField: SortField
  currentDir: SortDir
  onSort: (field: SortField) => void
  icon?: React.ReactNode
  align?: 'left' | 'right'
}) {
  const isActive = currentField === field
  return (
    <th className={cn('px-3 py-2.5', align === 'right' ? 'text-right' : 'text-left')}>
      <button
        onClick={() => onSort(field)}
        className={cn(
          'flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors',
          align === 'right' && 'ml-auto'
        )}
      >
        {icon}
        {label}
        {isActive && (
          <ChevronDown
            size={10}
            className={cn('transition-transform', currentDir === 'asc' && 'rotate-180')}
          />
        )}
      </button>
    </th>
  )
}
