import { useEffect, useState, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { exportToCSV, exportToJSON, copyToClipboard, cn } from '@/lib/utils'
import type { ColumnConfig, SavedTable } from '@/lib/types'
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc, serverTimestamp, collection, getDocs, query, orderBy } from 'firebase/firestore'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type SortingState,
  type ColumnDef,
  type ColumnFiltersState,
} from '@tanstack/react-table'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Save,
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
  Pencil,
  X,
  Columns3,
  CheckSquare,
  Square,
  Eye,
  Settings2,
  GripVertical,
  FileSpreadsheet,
} from 'lucide-react'
import DarkModeToggle from '@/components/DarkModeToggle'

type ViewMode = 'view' | 'edit'

// ---- Column Row (reused from TableBuilderPage pattern) ----

function ColumnRow({
  col,
  draggable,
  editingAlias,
  aliasInput,
  setAliasInput,
  saveAlias,
  setEditingAlias,
  toggleColumn,
}: {
  col: ColumnConfig
  draggable: boolean
  editingAlias: string | null
  aliasInput: string
  setAliasInput: (v: string) => void
  saveAlias: (id: string) => void
  setEditingAlias: (id: string | null) => void
  toggleColumn: (id: string) => void
}) {
  const inner = (
    <div className="flex items-center gap-1.5 px-2 py-1.5">
      {draggable && (
        <GripVertical size={12} className="shrink-0 text-gray-300 dark:text-gray-600 cursor-grab active:cursor-grabbing" />
      )}
      <button onClick={() => toggleColumn(col.id)} className="shrink-0">
        {col.visible ? (
          <CheckSquare size={14} className="text-gray-600 dark:text-gray-300" />
        ) : (
          <Square size={14} className="text-gray-300 dark:text-gray-500" />
        )}
      </button>
      {editingAlias === col.id ? (
        <div className="flex-1 flex items-center gap-1 min-w-0">
          <input
            value={aliasInput}
            onChange={(e) => setAliasInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveAlias(col.id)
              if (e.key === 'Escape') setEditingAlias(null)
            }}
            autoFocus
            className="flex-1 min-w-0 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-md px-2 py-0.5 text-xs dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          />
          <button onClick={() => saveAlias(col.id)} className="shrink-0 p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
            <Check size={11} className="text-gray-600" />
          </button>
          <button onClick={() => setEditingAlias(null)} className="shrink-0 p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
            <X size={11} className="text-gray-400" />
          </button>
        </div>
      ) : (
        <>
          <span
            className={cn(
              'flex-1 min-w-0 text-xs truncate cursor-pointer',
              col.visible ? 'text-gray-800 dark:text-gray-200 font-medium' : 'text-gray-400 dark:text-gray-500'
            )}
            onClick={() => toggleColumn(col.id)}
          >
            {col.alias}
          </span>
          <span className="shrink-0 text-[10px] text-gray-400 dark:text-gray-500">{col.dataType}</span>
        </>
      )}
      {editingAlias !== col.id && (
        <button
          onClick={() => {
            setEditingAlias(col.id)
            setAliasInput(col.alias)
          }}
          className="shrink-0 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors opacity-0 group-hover:opacity-100"
          title="Rename"
        >
          <Pencil size={11} className="text-gray-400" />
        </button>
      )}
    </div>
  )

  if (draggable) {
    return (
      <Reorder.Item
        value={col}
        className="group mx-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors list-none"
        whileDrag={{ backgroundColor: 'rgba(0,0,0,0.04)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 6 }}
      >
        {inner}
      </Reorder.Item>
    )
  }

  return (
    <div className="group mx-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
      {inner}
    </div>
  )
}

// ---- Main Page ----

export default function CsvTablePage() {
  const { tableId } = useParams<{ tableId: string }>()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  // Mode
  const [mode, setMode] = useState<ViewMode>('view')

  // Data state
  const [tableName, setTableName] = useState('')
  const [columns, setColumns] = useState<ColumnConfig[]>([])
  const [flatDocs, setFlatDocs] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Table state
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  // UI state
  const [showColumnPanel, setShowColumnPanel] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [editingAlias, setEditingAlias] = useState<string | null>(null)
  const [editingHeader, setEditingHeader] = useState<string | null>(null)
  const [aliasInput, setAliasInput] = useState('')
  const [copied, setCopied] = useState(false)
  const [colSearch, setColSearch] = useState('')

  // ---- Load table data ----
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

        // Load row data from csvChunks subcollection
        if (data.csvChunkCount && data.csvChunkCount > 0) {
          const chunksRef = collection(db!, 'users', user.uid, 'tables', tableId, 'csvChunks')
          const chunksSnap = await getDocs(query(chunksRef, orderBy('__name__')))
          const allRows: Record<string, unknown>[] = []
          const sortedDocs = chunksSnap.docs.sort((a, b) => Number(a.id) - Number(b.id))
          for (const chunkDoc of sortedDocs) {
            const chunkData = chunkDoc.data()
            if (Array.isArray(chunkData.rows)) {
              allRows.push(...chunkData.rows)
            }
          }
          setFlatDocs(allRows)
        } else {
          // Fallback: inline queryData (for legacy/small tables)
          setFlatDocs(data.queryData ?? [])
        }
      } catch (err) {
        console.error('Failed to load CSV table:', err)
        setError(err instanceof Error ? err.message : 'Failed to load table')
      } finally {
        setLoading(false)
      }
    }

    loadTable()
  }, [tableId, user?.uid])

  // ---- Column helpers ----

  const visibleColumns = useMemo(
    () => columns.filter((c) => c.visible).sort((a, b) => a.order - b.order),
    [columns]
  )

  const visibleCount = columns.filter((c) => c.visible).length
  const allSelected = visibleCount === columns.length

  const toggleColumn = (colId: string) => {
    setColumns((prev) => prev.map((c) => (c.id === colId ? { ...c, visible: !c.visible } : c)))
  }

  const selectAll = () => setColumns((prev) => prev.map((c) => ({ ...c, visible: true })))
  const deselectAll = () => setColumns((prev) => prev.map((c) => ({ ...c, visible: false })))

  const saveAlias = (colId: string) => {
    setColumns((prev) =>
      prev.map((c) => (c.id === colId ? { ...c, alias: aliasInput || c.sourcePath } : c))
    )
    setEditingAlias(null)
    setEditingHeader(null)
  }

  const sortedColumns = useMemo(
    () => columns.slice().sort((a, b) => a.order - b.order),
    [columns]
  )

  const filteredColumns = useMemo(() => {
    if (!colSearch.trim()) return sortedColumns
    const q = colSearch.toLowerCase()
    return sortedColumns.filter(
      (c) =>
        c.sourcePath.toLowerCase().includes(q) ||
        c.alias.toLowerCase().includes(q) ||
        c.dataType.toLowerCase().includes(q)
    )
  }, [columns, colSearch])

  // ---- TanStack Table ----

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
        enableSorting: true,
        enableColumnFilter: true,
      })),
    [visibleColumns]
  )

  const table = useReactTable({
    data: flatDocs,
    columns: tableColumns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 50 } },
  })

  // ---- Save (columns/metadata only — row data stays in chunks) ----

  const handleSave = useCallback(async () => {
    if (!user?.uid || !tableId || !tableName.trim() || !db) return
    setSaving(true)
    setSaveError(null)
    try {
      await setDoc(
        doc(db, 'users', user.uid, 'tables', tableId),
        {
          tableName: tableName.trim(),
          columns,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      )

      setSaved(true)
      setTimeout(() => {
        setMode('view')
        setSaved(false)
      }, 800)
    } catch (err) {
      console.error('Save failed:', err)
      const msg = err instanceof Error ? err.message : 'Save failed'
      setSaveError(msg)
      setTimeout(() => setSaveError(null), 6000)
    } finally {
      setSaving(false)
    }
  }, [user?.uid, tableId, tableName, columns])

  // ---- Export ----

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

  // ---- Render: loading ----

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Loader2 size={16} className="animate-spin" />
          Loading CSV table…
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-md border border-red-200 dark:border-red-800 p-6 max-w-md">
          <div className="flex items-start gap-3">
            <AlertCircle size={16} className="text-red-500 dark:text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-700 dark:text-red-400">Error loading table</p>
              <p className="text-xs text-red-500 dark:text-red-400 mt-1">{error}</p>
              <button onClick={() => navigate('/dashboard')} className="mt-3 text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
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
      {/* ===== Header ===== */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shrink-0">
        <div className="px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-1 -ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-1.5 cursor-pointer">
              <img src="/logo.png" alt="Firegrid" className="w-6 h-6 rounded-md shrink-0" />
              <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">Firegrid</span>
            </button>
            <ChevronRight size={14} className="text-gray-300 dark:text-gray-600 shrink-0" />
            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate">{tableName}</span>
            <span className="text-[10px] font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-md shrink-0 flex items-center gap-1">
              <FileSpreadsheet size={10} />
              CSV
            </span>
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
          {/* Mode tabs + Columns toggle */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-0.5 rounded-md">
              <button
                onClick={() => setMode('view')}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors',
                  mode === 'view'
                    ? 'text-gray-800 bg-white shadow-sm dark:text-gray-100 dark:bg-gray-600'
                    : 'text-gray-500 hover:bg-gray-200/70 dark:text-gray-400 dark:hover:bg-gray-600/70'
                )}
              >
                <Eye size={13} />
                View
              </button>
              <button
                onClick={() => setMode('edit')}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors',
                  mode === 'edit'
                    ? 'text-gray-800 bg-white shadow-sm dark:text-gray-100 dark:bg-gray-600'
                    : 'text-gray-500 hover:bg-gray-200/70 dark:text-gray-400 dark:hover:bg-gray-600/70'
                )}
              >
                <Settings2 size={13} />
                Edit
              </button>
            </div>

            {mode === 'edit' && (
              <button
                onClick={() => setShowColumnPanel(!showColumnPanel)}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors',
                  showColumnPanel
                    ? 'text-gray-800 bg-gray-100 dark:text-gray-200 dark:bg-gray-700'
                    : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                )}
              >
                <Columns3 size={13} />
                Columns
                <span className="text-[10px] bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded-md tabular-nums">
                  {visibleCount}
                </span>
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search across all columns…"
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 bg-gray-50 dark:bg-gray-800"
            />
          </div>

          {/* Right: Save, export */}
          <div className="flex items-center gap-2 ml-auto shrink-0">
            {mode === 'edit' ? (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  placeholder="Table name…"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  className="text-xs border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md px-2.5 py-1.5 w-40 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
                />
                <button
                  onClick={handleSave}
                  disabled={saving || !tableName.trim()}
                  className="flex items-center gap-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-medium rounded-md px-3 py-1.5 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : saved ? (
                    <Check size={13} />
                  ) : (
                    <Save size={13} />
                  )}
                  {saved ? 'Saved!' : 'Save'}
                </button>
                {saveError && (
                  <span className="text-[11px] text-red-500 max-w-[140px] truncate" title={saveError}>
                    {saveError}
                  </span>
                )}
              </div>
            ) : (
              tableName && (
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{tableName}</span>
              )
            )}

            <div className="w-px h-5 bg-gray-200 dark:bg-gray-600" />

            <div className="flex items-center gap-0.5">
              <button
                onClick={() => exportToCSV(getExportData(), tableName || 'csv-table')}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Export as CSV"
              >
                <Download size={14} />
              </button>
              <button
                onClick={() => exportToJSON(getExportData(), tableName || 'csv-table')}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Export as JSON"
              >
                <FileJson size={14} />
              </button>
              <button
                onClick={handleCopy}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={copied ? 'Copied!' : 'Copy to clipboard'}
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ======== Column Configuration Panel (Edit mode only) ======== */}
        <AnimatePresence>
          {mode === 'edit' && showColumnPanel && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shrink-0 overflow-hidden"
            >
              <div className="w-[300px] h-full flex flex-col">
                {/* Panel Header */}
                <div className="px-3 pt-3 pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">Columns</h3>
                      <span className="text-[11px] text-gray-400 tabular-nums">
                        {visibleCount} of {columns.length}
                      </span>
                    </div>
                    <button
                      onClick={() => setShowColumnPanel(false)}
                      className="p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <X size={13} />
                    </button>
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search fields…"
                      value={colSearch}
                      onChange={(e) => setColSearch(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 text-xs border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
                    />
                    {colSearch && (
                      <button
                        onClick={() => setColSearch('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X size={11} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Select / Deselect all */}
                <div className="px-3 pb-2 flex items-center justify-between">
                  <button
                    onClick={allSelected ? deselectAll : selectAll}
                    className="text-[11px] font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    {allSelected ? 'Deselect all' : 'Select all'}
                  </button>
                </div>

                {/* Column List */}
                <div className="flex-1 overflow-y-auto border-t border-gray-100 dark:border-gray-700">
                  {filteredColumns.length === 0 ? (
                    <div className="px-3 py-6 text-center text-xs text-gray-400">
                      No fields matching &quot;{colSearch}&quot;
                    </div>
                  ) : colSearch.trim() ? (
                    <div className="py-1">
                      {filteredColumns.map((col) => (
                        <ColumnRow
                          key={col.id}
                          col={col}
                          draggable={false}
                          editingAlias={editingAlias}
                          aliasInput={aliasInput}
                          setAliasInput={setAliasInput}
                          saveAlias={saveAlias}
                          setEditingAlias={setEditingAlias}
                          toggleColumn={toggleColumn}
                        />
                      ))}
                    </div>
                  ) : (
                    <Reorder.Group
                      axis="y"
                      values={sortedColumns}
                      onReorder={(reordered) => {
                        setColumns(reordered.map((col, idx) => ({ ...col, order: idx })))
                      }}
                      className="py-1"
                    >
                      {sortedColumns.map((col) => (
                        <ColumnRow
                          key={col.id}
                          col={col}
                          draggable
                          editingAlias={editingAlias}
                          aliasInput={aliasInput}
                          setAliasInput={setAliasInput}
                          saveAlias={saveAlias}
                          setEditingAlias={setEditingAlias}
                          toggleColumn={toggleColumn}
                        />
                      ))}
                    </Reorder.Group>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ======== Main Table Area ======== */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Table */}
          <div className="flex-1 overflow-auto">
            {visibleCount === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                <Columns3 size={24} className="text-gray-300" />
                <p className="text-sm">No columns selected</p>
                <p className="text-xs">
                  {mode === 'edit'
                    ? 'Open the columns panel and select fields to display.'
                    : 'Switch to Edit mode to configure visible columns.'}
                </p>
                {mode !== 'edit' && (
                  <button
                    onClick={() => setMode('edit')}
                    className="mt-2 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1.5 rounded-md transition-colors"
                  >
                    Switch to Edit
                  </button>
                )}
              </div>
            ) : (
              <table className="w-full text-xs border-separate border-spacing-0">
                <thead className="sticky top-0 z-10">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="text-left px-3 py-2.5 font-medium text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap select-none"
                        >
                          {header.isPlaceholder ? null : editingHeader === header.column.id ? (
                            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                              <input
                                value={aliasInput}
                                onChange={(e) => setAliasInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') saveAlias(header.column.id)
                                  if (e.key === 'Escape') setEditingHeader(null)
                                }}
                                onBlur={() => saveAlias(header.column.id)}
                                autoFocus
                                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-md px-2 py-0.5 text-xs font-medium dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 min-w-[80px] normal-case tracking-normal"
                              />
                            </div>
                          ) : (
                            <button
                              onClick={header.column.getToggleSortingHandler()}
                              onDoubleClick={(e) => {
                                e.stopPropagation()
                                const col = columns.find((c) => c.id === header.column.id)
                                if (col) {
                                  setEditingHeader(header.column.id)
                                  setAliasInput(col.alias)
                                }
                              }}
                              className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {header.column.getIsSorted() === 'asc' && <ChevronUp size={11} />}
                              {header.column.getIsSorted() === 'desc' && <ChevronDown size={11} />}
                            </button>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row, rowIdx) => (
                    <tr
                      key={row.id}
                      className={cn(
                        'hover:bg-gray-100/60 dark:hover:bg-gray-700/40 transition-colors',
                        rowIdx % 2 === 0
                          ? 'bg-white dark:bg-gray-900'
                          : 'bg-gray-50/50 dark:bg-gray-800/50'
                      )}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-3 py-2 text-gray-700 dark:text-gray-300 whitespace-nowrap max-w-[300px] border-b border-gray-100 dark:border-gray-800"
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {flatDocs.length === 0 && visibleCount > 0 && (
              <div className="flex items-center justify-center h-48 text-sm text-gray-400">
                No data in this CSV table.
              </div>
            )}
          </div>

          {/* ===== Footer — Pagination + row count ===== */}
          <div className="px-4 py-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between shrink-0">
            <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
              {table.getFilteredRowModel().rows.length} of {flatDocs.length} rows
            </span>

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
        </div>
      </div>
    </div>
  )
}
