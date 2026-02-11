import { useEffect, useState, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { exportToCSV, exportToJSON, copyToClipboard } from '@/lib/utils'
import type { ColumnConfig, SavedTable } from '@/lib/types'
import { db } from '@/lib/firebase'
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore'
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
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Download,
  Copy,
  FileJson,
  Loader2,
  Check,
  AlertCircle,
  LogOut,
  Search,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Terminal,
  Columns3,
  FileSpreadsheet,
} from 'lucide-react'
import DarkModeToggle from '@/components/DarkModeToggle'

export default function QueryTablePage() {
  const { tableId } = useParams<{ tableId: string }>()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  // Data state
  const [tableName, setTableName] = useState('')
  const [columns, setColumns] = useState<ColumnConfig[]>([])
  const [querySql, setQuerySql] = useState('')
  const [sourceType, setSourceType] = useState<'query' | 'csv'>('query')
  const [flatDocs, setFlatDocs] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Table state
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [copied, setCopied] = useState(false)

  // Load saved table data
  useEffect(() => {
    if (!tableId || !user?.uid || !db) return

    const loadTable = async () => {
      setLoading(true)
      setError(null)
      try {
        const snap = await getDoc(doc(db!, 'users', user.uid, 'tables', tableId))
        if (!snap.exists()) {
          setError('Table not found')
          return
        }

        const data = snap.data() as Omit<SavedTable, 'id'> & { csvChunkCount?: number }
        setTableName(data.tableName)
        setColumns(data.columns ?? [])
        setQuerySql(data.querySql ?? data.collectionPath ?? '')
        const isCsv = data.projectId === '__csv__'
        setSourceType(isCsv ? 'csv' : 'query')

        if (isCsv && data.csvChunkCount && data.csvChunkCount > 0) {
          // Load CSV row data from Firestore subcollection chunks
          const chunksRef = collection(db!, 'users', user.uid, 'tables', tableId, 'csvChunks')
          const chunksSnap = await getDocs(query(chunksRef, orderBy('__name__')))
          const allRows: Record<string, unknown>[] = []
          // Sort by document ID (numeric string) to preserve order
          const sortedDocs = chunksSnap.docs.sort(
            (a, b) => Number(a.id) - Number(b.id)
          )
          for (const chunkDoc of sortedDocs) {
            const chunkData = chunkDoc.data()
            if (Array.isArray(chunkData.rows)) {
              allRows.push(...chunkData.rows)
            }
          }
          setFlatDocs(allRows)
        } else {
          // Fallback: inline queryData (for query tables or legacy small CSV tables)
          setFlatDocs(data.queryData ?? [])
        }
      } catch (err) {
        console.error('Failed to load query table:', err)
        setError(err instanceof Error ? err.message : 'Failed to load table')
      } finally {
        setLoading(false)
      }
    }

    loadTable()
  }, [tableId, user?.uid])

  // Column defs
  const visibleColumns = useMemo(
    () => columns.filter((c) => c.visible).sort((a, b) => a.order - b.order),
    [columns]
  )

  const tableColumns = useMemo<ColumnDef<Record<string, unknown>>[]>(
    () =>
      visibleColumns.map((col) => ({
        id: col.id,
        accessorFn: (row: Record<string, unknown>) => {
          const val = row[col.sourcePath]
          if (val === null || val === undefined) return ''
          if (typeof val === 'object') return JSON.stringify(val)
          return val
        },
        header: col.alias,
        cell: (info) => {
          const val = info.getValue()
          if (val === '' || val === null || val === undefined) {
            return <span className="text-gray-300">null</span>
          }
          return <span className="truncate block max-w-[300px]">{String(val)}</span>
        },
      })),
    [visibleColumns]
  )

  const table = useReactTable({
    data: flatDocs,
    columns: tableColumns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 50 } },
  })

  // Export
  const getExportData = useCallback((): Record<string, unknown>[] => {
    return table.getFilteredRowModel().rows.map((row) => {
      const obj: Record<string, unknown> = {}
      for (const col of visibleColumns) {
        const val = row.original[col.sourcePath]
        obj[col.alias] = val === null || val === undefined ? '' : val
      }
      return obj
    })
  }, [table, visibleColumns])

  const handleCopy = async () => {
    await copyToClipboard(getExportData())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ---- Render ----

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Loader2 size={16} className="animate-spin" />
          Loading table…
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-md border border-red-200 dark:border-red-800 p-6 max-w-md">
          <div className="flex items-start gap-3">
            <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-700">Error loading table</p>
              <p className="text-xs text-red-500 mt-1">{error}</p>
              <button onClick={() => navigate('/dashboard')} className="mt-3 text-xs text-gray-600 hover:text-gray-900">
                ← Back to dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shrink-0">
        <div className="max-w-full mx-auto px-6 h-14 flex items-center justify-between">
          {/* Left: Nav + breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 cursor-pointer">
              <img src="/logo.png" alt="Firegrid" className="w-7 h-7 rounded-md" />
              <span className="font-semibold text-gray-900 dark:text-gray-100">Firegrid</span>
            </button>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tableName}</span>
            <span className="text-[10px] font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-md flex items-center gap-1">
              {sourceType === 'csv' ? (
                <><FileSpreadsheet size={10} /> CSV Import</>
              ) : (
                <><Terminal size={10} /> SQL Query</>
              )}
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Open in SQL Editor — only for query tables */}
            {sourceType === 'query' && (
              <button
                onClick={() => navigate(`/query?sql=${encodeURIComponent(querySql)}&autorun=true`)}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 px-2.5 py-1.5 rounded-md transition-colors"
              >
                <Terminal size={13} />
                Open in SQL Editor
              </button>
            )}

            <div className="w-px h-6 bg-gray-200 dark:bg-gray-600 mx-1" />

            {/* Export buttons */}
            <button
              onClick={() => exportToCSV(getExportData(), tableName || 'query-result')}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 px-2.5 py-1.5 rounded-md transition-colors"
              title="Export CSV"
            >
              <Download size={14} />
              CSV
            </button>
            <button
              onClick={() => exportToJSON(getExportData(), tableName || 'query-result')}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 px-2.5 py-1.5 rounded-md transition-colors"
              title="Export JSON"
            >
              <FileJson size={14} />
              JSON
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 px-2.5 py-1.5 rounded-md transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>

            <div className="w-px h-6 bg-gray-200 dark:bg-gray-600 mx-1" />
            <DarkModeToggle />
            <button onClick={signOut} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Table Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3 shrink-0">
          <div className="relative flex-1 max-w-sm">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search across all columns…"
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
            />
          </div>

          <span className="text-xs text-gray-400 ml-auto tabular-nums">
            {table.getFilteredRowModel().rows.length} of {flatDocs.length} rows
          </span>
        </div>

        {/* SQL preview bar — only for query tables */}
        {sourceType === 'query' && querySql && (
          <div className="px-4 py-1.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shrink-0">
            <p className="text-[11px] text-gray-400 font-mono truncate" title={querySql}>
              <span className="text-gray-500 font-medium">SQL:</span> {querySql}
            </p>
          </div>
        )}

        {/* Table */}
        <div className="flex-1 overflow-auto">
          {visibleColumns.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
              <Columns3 size={24} className="text-gray-300" />
              <p className="text-sm">No columns configured</p>
            </div>
          ) : (
            <table className="w-full text-xs border-separate border-spacing-0">
              <thead className="sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="text-left px-3 py-2 font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap select-none"
                      >
                        {header.isPlaceholder ? null : (
                          <button
                            onClick={header.column.getToggleSortingHandler()}
                            className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getIsSorted() === 'asc' && <ChevronUp size={12} />}
                            {header.column.getIsSorted() === 'desc' && <ChevronDown size={12} />}
                          </button>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-3 py-2 text-gray-700 dark:text-gray-300 whitespace-nowrap max-w-[300px]">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {flatDocs.length === 0 && visibleColumns.length > 0 && (
            <div className="flex flex-col items-center justify-center h-48 text-sm text-gray-400 gap-2">
              <p>{sourceType === 'csv' ? 'No data in this CSV table.' : 'No data stored for this query.'}</p>
              {sourceType === 'query' && (
                <button
                  onClick={() => navigate(`/query?sql=${encodeURIComponent(querySql)}&autorun=true`)}
                  className="text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1.5 rounded-md transition-colors"
                >
                  Open in SQL Editor to re-run
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {table.getPageCount() > 1 && (
          <div className="px-4 py-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1">
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
              >
                <ChevronsLeft size={14} />
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-xs text-gray-500 dark:text-gray-400 mx-2 tabular-nums">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
              >
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
              >
                <ChevronsRight size={14} />
              </button>
            </div>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="text-xs border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md px-2 py-1 focus:outline-none"
            >
              {[25, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size} per page
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  )
}
