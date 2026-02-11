import { useEffect, useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { syncSales, loadSalesFromFirestore, getLightspeedConnection } from '@/lib/lightspeed'
import type { LightspeedSale, LightspeedConnection } from '@/lib/types'
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
  CreditCard,
  User,
  Calendar,
  Clock,
  Hash,
  X,
  AlertCircle,
  CheckCircle,
  Filter,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type SortField = 'completeTime' | 'total' | 'ticketNumber' | 'customerLastName'
type SortDir = 'asc' | 'desc'
type StatusFilter = 'all' | 'completed' | 'voided' | 'open'

export default function SalesPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [connection, setConnection] = useState<LightspeedConnection | null>(null)
  const [sales, setSales] = useState<LightspeedSale[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [syncMessage, setSyncMessage] = useState('')
  const [error, setError] = useState('')

  // Table state
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSaleId, setExpandedSaleId] = useState<string | null>(null)
  const [sortField, setSortField] = useState<SortField>('completeTime')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 25

  // Load connection and sales on mount
  useEffect(() => {
    if (!user?.uid) return

    async function load() {
      setLoading(true)
      try {
        const conn = await getLightspeedConnection(user!.uid)
        setConnection(conn)
        if (conn) {
          const loadedSales = await loadSalesFromFirestore(user!.uid)
          setSales(loadedSales)
        }
      } catch (err) {
        console.error('Failed to load sales:', err)
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
      // Reload sales from Firestore
      const loadedSales = await loadSalesFromFirestore(user.uid)
      setSales(loadedSales)
      // Refresh connection info (lastSalesSync)
      const conn = await getLightspeedConnection(user.uid)
      setConnection(conn)
      setSyncMessage(`Synced ${result.synced} sales successfully!`)
      setTimeout(() => setSyncMessage(''), 5000)
    } catch (err) {
      console.error('Sync failed:', err)
      setError(err instanceof Error ? err.message : 'Sync failed')
    } finally {
      setSyncing(false)
    }
  }, [user?.uid, syncing])

  // Filter + search + sort
  const filteredSales = useMemo(() => {
    let result = [...sales]

    // Status filter
    if (statusFilter === 'completed') {
      result = result.filter((s) => s.completed && !s.voided)
    } else if (statusFilter === 'voided') {
      result = result.filter((s) => s.voided)
    } else if (statusFilter === 'open') {
      result = result.filter((s) => !s.completed && !s.voided)
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (s) =>
          s.ticketNumber.toLowerCase().includes(q) ||
          s.saleID.includes(q) ||
          `${s.customerFirstName} ${s.customerLastName}`.toLowerCase().includes(q) ||
          `${s.employeeFirstName} ${s.employeeLastName}`.toLowerCase().includes(q) ||
          s.referenceNumber.toLowerCase().includes(q) ||
          s.saleLines.some((l) => l.itemDescription.toLowerCase().includes(q))
      )
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0
      switch (sortField) {
        case 'completeTime': {
          const dateA = a.completeTime || a.createTime || ''
          const dateB = b.completeTime || b.createTime || ''
          cmp = dateA.localeCompare(dateB)
          break
        }
        case 'total':
          cmp = a.total - b.total
          break
        case 'ticketNumber':
          cmp = a.ticketNumber.localeCompare(b.ticketNumber)
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
  }, [sales, searchQuery, sortField, sortDir, statusFilter])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredSales.length / pageSize))
  const paginatedSales = filteredSales.slice((currentPage - 1) * pageSize, currentPage * pageSize)

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

  const formatDateTime = (dateStr: string | null) => {
    if (!dateStr) return '—'
    try {
      return new Date(dateStr).toLocaleString('en-AU', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return dateStr
    }
  }

  const getSaleStatus = (sale: LightspeedSale) => {
    if (sale.voided) return { label: 'Voided', className: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20' }
    if (sale.completed) return { label: 'Completed', className: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20' }
    return { label: 'Open', className: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20' }
  }

  // Summary stats
  const stats = useMemo(() => {
    const completedSales = sales.filter((s) => s.completed && !s.voided)
    const totalRevenue = completedSales.reduce((sum, s) => sum + s.total, 0)
    const totalItems = completedSales.reduce(
      (sum, s) => sum + s.saleLines.reduce((ls, l) => ls + Math.abs(l.unitQuantity), 0),
      0
    )
    const avgSale = completedSales.length > 0 ? totalRevenue / completedSales.length : 0
    return {
      totalSales: completedSales.length,
      totalRevenue,
      totalItems,
      avgSale,
    }
  }, [sales])

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
        <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-8 max-w-sm text-center">
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
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
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
                Lightspeed Sales
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

      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Sync progress message */}
        <AnimatePresence>
          {syncMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-2"
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
          <div className="mb-4 bg-white dark:bg-gray-800 rounded-md border border-red-200 dark:border-red-800 px-4 py-3 flex items-center gap-2">
            <AlertCircle size={14} className="text-red-500" />
            <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
            <button onClick={() => setError('')} className="ml-auto text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Receipt size={14} className="text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Total Sales</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {stats.totalSales.toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={14} className="text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Total Revenue</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {formatCurrency(stats.totalRevenue)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Package size={14} className="text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Items Sold</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {stats.totalItems.toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-1">
              <ShoppingCart size={14} className="text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Avg. Sale</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {formatCurrency(stats.avgSale)}
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
              placeholder="Search sales, customers, items..."
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
            {filteredSales.length} {filteredSales.length === 1 ? 'sale' : 'sales'}
          </span>
        </div>

        {/* Sales Table */}
        {sales.length === 0 ? (
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
                    <th className="w-8" />
                    <SortableHeader
                      label="Date"
                      field="completeTime"
                      currentField={sortField}
                      currentDir={sortDir}
                      onSort={handleSort}
                      icon={<Calendar size={11} />}
                    />
                    <SortableHeader
                      label="Ticket #"
                      field="ticketNumber"
                      currentField={sortField}
                      currentDir={sortDir}
                      onSort={handleSort}
                      icon={<Hash size={11} />}
                    />
                    <SortableHeader
                      label="Customer"
                      field="customerLastName"
                      currentField={sortField}
                      currentDir={sortDir}
                      onSort={handleSort}
                      icon={<User size={11} />}
                    />
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Employee
                    </th>
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Items
                    </th>
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Subtotal
                    </th>
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Discount
                    </th>
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Tax
                    </th>
                    <SortableHeader
                      label="Total"
                      field="total"
                      currentField={sortField}
                      currentDir={sortDir}
                      onSort={handleSort}
                      icon={<DollarSign size={11} />}
                    />
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Payment
                    </th>
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {paginatedSales.map((sale) => {
                    const isExpanded = expandedSaleId === sale.saleID
                    const status = getSaleStatus(sale)
                    const itemCount = sale.saleLines.reduce(
                      (sum, l) => sum + Math.abs(l.unitQuantity),
                      0
                    )
                    const paymentNames = [...new Set(sale.salePayments.map((p) => p.paymentTypeName))].join(', ')

                    return (
                      <SaleRow
                        key={sale.saleID}
                        sale={sale}
                        isExpanded={isExpanded}
                        status={status}
                        itemCount={itemCount}
                        paymentNames={paymentNames}
                        formatCurrency={formatCurrency}
                        formatDate={formatDate}
                        formatDateTime={formatDateTime}
                        onToggle={() =>
                          setExpandedSaleId(isExpanded ? null : sale.saleID)
                        }
                      />
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  Page {currentPage} of {totalPages}
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
}: {
  label: string
  field: SortField
  currentField: SortField
  currentDir: SortDir
  onSort: (field: SortField) => void
  icon: React.ReactNode
}) {
  const isActive = currentField === field
  return (
    <th className="text-left px-4 py-2.5">
      <button
        onClick={() => onSort(field)}
        className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
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

// ---- Sale Row with Expandable Detail ----

function SaleRow({
  sale,
  isExpanded,
  status,
  itemCount,
  paymentNames,
  formatCurrency,
  formatDate,
  formatDateTime,
  onToggle,
}: {
  sale: LightspeedSale
  isExpanded: boolean
  status: { label: string; className: string }
  itemCount: number
  paymentNames: string
  formatCurrency: (val: number) => string
  formatDate: (dateStr: string | null) => string
  formatDateTime: (dateStr: string | null) => string
  onToggle: () => void
}) {
  return (
    <>
      <tr
        className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
        onClick={onToggle}
      >
        <td className="pl-3 py-3">
          <ChevronDown
            size={14}
            className={cn(
              'text-gray-400 transition-transform duration-200',
              isExpanded && 'rotate-180'
            )}
          />
        </td>
        <td className="px-4 py-3">
          <span className="text-xs text-gray-700 dark:text-gray-300">
            {formatDate(sale.completeTime || sale.createTime)}
          </span>
        </td>
        <td className="px-4 py-3">
          <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
            {sale.ticketNumber || sale.saleID}
          </span>
        </td>
        <td className="px-4 py-3">
          <span className="text-xs text-gray-700 dark:text-gray-300">
            {sale.customerFirstName || sale.customerLastName
              ? `${sale.customerFirstName} ${sale.customerLastName}`.trim()
              : '—'}
          </span>
        </td>
        <td className="px-4 py-3">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {sale.employeeFirstName || sale.employeeLastName
              ? `${sale.employeeFirstName} ${sale.employeeLastName}`.trim()
              : '—'}
          </span>
        </td>
        <td className="px-4 py-3">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        </td>
        <td className="px-4 py-3">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {formatCurrency(sale.calcSubtotal)}
          </span>
        </td>
        <td className="px-4 py-3">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {sale.calcDiscount > 0 ? `-${formatCurrency(sale.calcDiscount)}` : '—'}
          </span>
        </td>
        <td className="px-4 py-3">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatCurrency(sale.calcTax1 + sale.calcTax2)}
          </span>
        </td>
        <td className="px-4 py-3">
          <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
            {formatCurrency(sale.total)}
          </span>
        </td>
        <td className="px-4 py-3">
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px] block">
            {paymentNames || '—'}
          </span>
        </td>
        <td className="px-4 py-3">
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

      {/* Expanded detail */}
      <AnimatePresence>
        {isExpanded && (
          <tr>
            <td colSpan={12} className="p-0">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {/* Sale metadata */}
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                        Sale ID
                      </p>
                      <p className="text-xs font-mono text-gray-700 dark:text-gray-300">
                        {sale.saleID}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                        Created
                      </p>
                      <p className="text-xs text-gray-700 dark:text-gray-300">
                        {formatDateTime(sale.createTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                        Completed
                      </p>
                      <p className="text-xs text-gray-700 dark:text-gray-300">
                        {formatDateTime(sale.completeTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                        Shop
                      </p>
                      <p className="text-xs text-gray-700 dark:text-gray-300">
                        {sale.shopName || `Shop #${sale.shopID}`}
                      </p>
                    </div>
                    {sale.referenceNumber && (
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                          Reference
                        </p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">
                          {sale.referenceNumber}
                          {sale.referenceNumberSource && (
                            <span className="text-gray-400 ml-1">({sale.referenceNumberSource})</span>
                          )}
                        </p>
                      </div>
                    )}
                    {sale.calcTips > 0 && (
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                          Tips
                        </p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">
                          {formatCurrency(sale.calcTips)}
                        </p>
                      </div>
                    )}
                    {sale.change > 0 && (
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                          Change Given
                        </p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">
                          {formatCurrency(sale.change)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Sale Lines */}
                  {sale.saleLines.length > 0 && (
                    <div className="mb-4">
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 flex items-center gap-1">
                        <Package size={10} />
                        Line Items ({sale.saleLines.length})
                      </p>
                      <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-gray-50/60 dark:bg-gray-700/60 border-b border-gray-100 dark:border-gray-700">
                              <th className="text-left px-3 py-2 text-[10px] font-medium text-gray-500 dark:text-gray-400">
                                Item
                              </th>
                              <th className="text-left px-3 py-2 text-[10px] font-medium text-gray-500 dark:text-gray-400">
                                SKU
                              </th>
                              <th className="text-right px-3 py-2 text-[10px] font-medium text-gray-500 dark:text-gray-400">
                                Qty
                              </th>
                              <th className="text-right px-3 py-2 text-[10px] font-medium text-gray-500 dark:text-gray-400">
                                Unit Price
                              </th>
                              <th className="text-right px-3 py-2 text-[10px] font-medium text-gray-500 dark:text-gray-400">
                                Discount
                              </th>
                              <th className="text-right px-3 py-2 text-[10px] font-medium text-gray-500 dark:text-gray-400">
                                Tax
                              </th>
                              <th className="text-right px-3 py-2 text-[10px] font-medium text-gray-500 dark:text-gray-400">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {sale.saleLines.map((line) => (
                              <tr key={line.saleLineID}>
                                <td className="px-3 py-2">
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {line.itemDescription || `Item #${line.itemID}`}
                                  </span>
                                  {line.note && (
                                    <p className="text-[10px] text-gray-400 mt-0.5 italic">
                                      {line.note}
                                    </p>
                                  )}
                                </td>
                                <td className="px-3 py-2">
                                  <span className="font-mono text-gray-500 dark:text-gray-400">
                                    {line.customSku || line.upc || line.ean || '—'}
                                  </span>
                                </td>
                                <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">
                                  {line.unitQuantity}
                                </td>
                                <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">
                                  {formatCurrency(line.unitPrice)}
                                </td>
                                <td className="px-3 py-2 text-right text-gray-500 dark:text-gray-400">
                                  {line.calcLineDiscount > 0
                                    ? `-${formatCurrency(line.calcLineDiscount)}`
                                    : '—'}
                                </td>
                                <td className="px-3 py-2 text-right text-gray-500 dark:text-gray-400">
                                  {formatCurrency(line.calcTax1 + line.calcTax2)}
                                </td>
                                <td className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">
                                  {formatCurrency(line.calcTotal)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Payments */}
                  {sale.salePayments.length > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 flex items-center gap-1">
                        <CreditCard size={10} />
                        Payments ({sale.salePayments.length})
                      </p>
                      <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-gray-50/60 dark:bg-gray-700/60 border-b border-gray-100 dark:border-gray-700">
                              <th className="text-left px-3 py-2 text-[10px] font-medium text-gray-500 dark:text-gray-400">
                                Payment Type
                              </th>
                              <th className="text-right px-3 py-2 text-[10px] font-medium text-gray-500 dark:text-gray-400">
                                Amount
                              </th>
                              <th className="text-right px-3 py-2 text-[10px] font-medium text-gray-500 dark:text-gray-400">
                                Tip
                              </th>
                              <th className="text-left px-3 py-2 text-[10px] font-medium text-gray-500 dark:text-gray-400">
                                Date
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {sale.salePayments.map((payment) => (
                              <tr key={payment.salePaymentID}>
                                <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                                  {payment.paymentTypeName}
                                </td>
                                <td className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">
                                  {formatCurrency(payment.amount)}
                                </td>
                                <td className="px-3 py-2 text-right text-gray-500 dark:text-gray-400">
                                  {payment.tipAmount > 0
                                    ? formatCurrency(payment.tipAmount)
                                    : '—'}
                                </td>
                                <td className="px-3 py-2 text-gray-500 dark:text-gray-400">
                                  {formatDateTime(payment.createTime)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Totals summary */}
                  <div className="mt-4 flex justify-end">
                    <div className="w-56 space-y-1 text-xs">
                      <div className="flex justify-between text-gray-500 dark:text-gray-400">
                        <span>Subtotal</span>
                        <span>{formatCurrency(sale.calcSubtotal)}</span>
                      </div>
                      {sale.calcDiscount > 0 && (
                        <div className="flex justify-between text-gray-500 dark:text-gray-400">
                          <span>Discount</span>
                          <span>-{formatCurrency(sale.calcDiscount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-gray-500 dark:text-gray-400">
                        <span>Tax</span>
                        <span>{formatCurrency(sale.calcTax1 + sale.calcTax2)}</span>
                      </div>
                      <div className="flex justify-between font-medium text-gray-900 dark:text-gray-100 pt-1 border-t border-gray-200 dark:border-gray-600">
                        <span>Total</span>
                        <span>{formatCurrency(sale.total)}</span>
                      </div>
                      {sale.balance !== 0 && (
                        <div className="flex justify-between text-red-500">
                          <span>Balance Due</span>
                          <span>{formatCurrency(sale.balance)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  )
}
