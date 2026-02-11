import { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import {
  fetchDocuments,
  fetchCollectionGroup,
} from '@/lib/firestore-rest'
import { flattenObject, cn } from '@/lib/utils'
import type { SavedTable, DocumentData } from '@/lib/types'
import { db } from '@/lib/firebase'
import { trackQueryRun, trackQueryTableSaved, trackPageView } from '@/lib/metrics'
import { collection, query, getDocs, orderBy, doc, setDoc, serverTimestamp } from 'firebase/firestore'
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
  Flame,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Play,
  Save,
  Loader2,
  Check,
  AlertCircle,
  LogOut,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Database,
  Table,
  Terminal,
  Clock,
  Zap,
  Info,
  Plus,
  Rows3,
  Hash,
  Type,
  ToggleLeft,
  CalendarDays,
  List,
  Braces,
  HelpCircle,
} from 'lucide-react'
import alasql from 'alasql'
import DarkModeToggle from '@/components/DarkModeToggle'

// ---------- Types ----------

interface LoadedTable {
  savedTable: SavedTable
  alias: string
  data: Record<string, unknown>[]
  rowCount: number
  loading: boolean
  error: string | null
}

interface QueryResult {
  columns: string[]
  rows: Record<string, unknown>[]
  executionTime: number
  error: string | null
}

// ---------- Helpers ----------

/** Turn a table name like "User Profiles" into a safe SQL identifier like "user_profiles" */
function toSqlAlias(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
    .replace(/^(\d)/, '_$1') || 'table'
}

/** Make aliases unique */
function uniqueAlias(base: string, existing: string[]): string {
  if (!existing.includes(base)) return base
  let i = 2
  while (existing.includes(`${base}${i}`)) i++
  return `${base}${i}`
}

/** Coerce string values that look numeric into actual numbers so SQL aggregates work */
function coerceValue(val: unknown): unknown {
  if (val === null || val === undefined) return null
  if (typeof val === 'number') return val
  if (typeof val === 'boolean') return val
  if (typeof val === 'string') {
    const trimmed = val.trim()
    if (trimmed === '') return val
    // Check for numeric strings (integers, decimals, negative numbers)
    if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
      const num = Number(trimmed)
      if (!isNaN(num) && isFinite(num)) return num
    }
  }
  return val
}

interface Suggestion {
  text: string
  type: 'table' | 'column'
  detail?: string // e.g. table name for columns
}

// ---------- SQL Syntax Highlighting ----------

const SQL_KEYWORDS = new Set([
  'SELECT','FROM','WHERE','AND','OR','NOT','IN','IS','NULL','AS','ON',
  'JOIN','INNER','LEFT','RIGHT','CROSS','OUTER','FULL','GROUP','BY',
  'ORDER','HAVING','LIMIT','OFFSET','UNION','ALL','DISTINCT','INSERT',
  'INTO','VALUES','UPDATE','SET','DELETE','CREATE','DROP','ALTER','TABLE',
  'INDEX','VIEW','IF','EXISTS','BETWEEN','LIKE','CASE','WHEN','THEN',
  'ELSE','END','ASC','DESC','COUNT','SUM','AVG','MIN','MAX','CAST',
  'COALESCE','NULLIF','TRUE','FALSE','WITH','RECURSIVE','EXCEPT','INTERSECT',
])

const SQL_FUNCTIONS = new Set([
  'COUNT','SUM','AVG','MIN','MAX','COALESCE','NULLIF','CAST',
  'UPPER','LOWER','LENGTH','TRIM','SUBSTR','SUBSTRING','REPLACE',
  'ROUND','ABS','CEIL','FLOOR','NOW','DATE','YEAR','MONTH','DAY',
  'CONCAT','GROUP_CONCAT','IFNULL','IIF',
])

function highlightSql(code: string): string {
  // Escape HTML
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Tokenise and highlight
  return escaped.replace(
    // Match comments, strings, numbers, and words
    /(--[^\n]*)|('(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|(\b[a-zA-Z_]\w*\b)|([<>=!]+)|(\*)/g,
    (match, comment, str, num, word, operator, star) => {
      if (comment) return `<span class="sql-comment">${comment}</span>`
      if (str) return `<span class="sql-string">${str}</span>`
      if (num) return `<span class="sql-number">${num}</span>`
      if (word) {
        const upper = word.toUpperCase()
        if (SQL_KEYWORDS.has(upper)) return `<span class="sql-keyword">${word}</span>`
        if (SQL_FUNCTIONS.has(upper)) return `<span class="sql-function">${word}</span>`
        return match
      }
      if (operator) return `<span class="sql-operator">${operator}</span>`
      if (star) return `<span class="sql-operator">${star}</span>`
      return match
    }
  )
}

// ---------- Component ----------

export default function QueryPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialSql = searchParams.get('sql') || ''
  const shouldAutoRun = searchParams.get('autorun') === 'true'

  // Saved tables from Firestore
  const [savedTables, setSavedTables] = useState<SavedTable[]>([])
  const [loadingTables, setLoadingTables] = useState(true)

  // Loaded tables (in the workspace)
  const [loadedTables, setLoadedTables] = useState<LoadedTable[]>([])

  // SQL Editor
  const [sql, setSql] = useState(initialSql)
  const [executing, setExecuting] = useState(false)
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null)
  const [queryHistory, setQueryHistory] = useState<{ sql: string; time: Date; rowCount: number }[]>([])
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const highlightRef = useRef<HTMLPreElement>(null)

  // Autocomplete state
  const [acVisible, setAcVisible] = useState(false)
  const [acSuggestions, setAcSuggestions] = useState<Suggestion[]>([])
  const [acIndex, setAcIndex] = useState(0)
  const [acWordStart, setAcWordStart] = useState(0) // char index where current word starts
  const acRef = useRef<HTMLDivElement>(null)

  // Save result as table
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [saveTableName, setSaveTableName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Selected table for schema view
  const [selectedTableAlias, setSelectedTableAlias] = useState<string | null>(null)

  // Results table state
  const [sorting, setSorting] = useState<SortingState>([])

  // Track page view
  useEffect(() => {
    if (user?.uid) {
      trackPageView(user.uid, 'query_workbench')
    }
  }, [user?.uid])

  // ---------- Fetch saved tables ----------

  useEffect(() => {
    if (!user?.uid || !db) {
      setLoadingTables(false)
      return
    }
    setLoadingTables(true)
    const tablesRef = collection(db, 'users', user.uid, 'tables')
    const q = query(tablesRef, orderBy('updatedAt', 'desc'))
    getDocs(q)
      .then((snap) => {
        const tables: SavedTable[] = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          createdAt: d.data().createdAt?.toDate?.() ?? new Date(),
          updatedAt: d.data().updatedAt?.toDate?.() ?? new Date(),
        })) as SavedTable[]
        setSavedTables(tables)
      })
      .catch(() => setSavedTables([]))
      .finally(() => setLoadingTables(false))
  }, [user?.uid])

  // ---------- Auto-load all tables when savedTables are fetched ----------

  const loadedRef = useRef(false)

  useEffect(() => {
    if (loadedRef.current || !user?.accessToken || savedTables.length === 0) return
    loadedRef.current = true

    // Filter out query-based tables — they don't have real Firestore collections
    const realTables = savedTables.filter((t) => t.projectId !== '__query__')
    if (realTables.length === 0) return

    // Build aliases upfront so they're unique
    const aliases: string[] = []
    const entries: LoadedTable[] = realTables.map((table) => {
      const alias = uniqueAlias(toSqlAlias(table.tableName), aliases)
      aliases.push(alias)
      return {
        savedTable: table,
        alias,
        data: [],
        rowCount: 0,
        loading: true,
        error: null,
      }
    })

    setLoadedTables(entries)

    // Fetch data for each table in parallel
    entries.forEach(async (entry) => {
      try {
        let allDocs: DocumentData[] = []
        const maxPages = 10

        if (entry.savedTable.isCollectionGroup) {
          let lastDocPath: string | undefined
          for (let page = 0; page < maxPages; page++) {
            const result = await fetchCollectionGroup(
              user.accessToken!,
              entry.savedTable.projectId,
              entry.savedTable.collectionPath,
              100,
              lastDocPath
            )
            allDocs = [...allDocs, ...result.documents]
            lastDocPath = result.lastDocumentPath
            if (!lastDocPath) break
          }
        } else {
          let nextPageToken: string | undefined
          for (let page = 0; page < maxPages; page++) {
            const result = await fetchDocuments(
              user.accessToken!,
              entry.savedTable.projectId,
              entry.savedTable.collectionPath,
              100,
              nextPageToken
            )
            allDocs = [...allDocs, ...result.documents]
            nextPageToken = result.nextPageToken
            if (!nextPageToken) break
          }
        }

        const visibleCols = entry.savedTable.columns
          .filter((c) => c.visible)
          .sort((a, b) => a.order - b.order)

        const flatData = allDocs.map((d) => {
          const { __id, __path, __parentId, ...rest } = d
          const flat: Record<string, unknown> = {
            __id,
            ...(entry.savedTable.isCollectionGroup
              ? { __path: __path ?? '', __parentId: __parentId ?? '' }
              : {}),
            ...flattenObject(rest as Record<string, unknown>),
          }

          const row: Record<string, unknown> = {}
          for (const col of visibleCols) {
            const key = col.alias.replace(/[^a-zA-Z0-9_]/g, '_')
            row[key] = coerceValue(flat[col.sourcePath])
          }
          return row
        })

        setLoadedTables((prev) =>
          prev.map((t) =>
            t.alias === entry.alias
              ? { ...t, data: flatData, rowCount: flatData.length, loading: false }
              : t
          )
        )
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to load data'
        setLoadedTables((prev) =>
          prev.map((t) =>
            t.alias === entry.alias ? { ...t, loading: false, error: msg } : t
          )
        )
      }
    })
  }, [savedTables, user?.accessToken])

  // ---------- Auto-run query if opened from a saved query table ----------

  const autoRunRef = useRef(false)

  useEffect(() => {
    if (autoRunRef.current || !shouldAutoRun || !initialSql) return
    // Wait until at least some tables have finished loading
    const ready = loadedTables.length > 0 && loadedTables.some((t) => !t.loading && !t.error)
    const allDone = loadedTables.length > 0 && loadedTables.every((t) => !t.loading)
    if (!ready && !allDone) return
    // Also run if there are no real tables to load (query might be self-contained)
    if (loadedTables.length === 0 && loadingTables) return

    autoRunRef.current = true

    // Small delay to ensure alasql tables are registered
    setTimeout(() => {
      // Register loaded tables in alasql
      for (const t of loadedTables) {
        if (t.loading || t.error) continue
        alasql.tables[t.alias] = { data: t.data }
      }

      const start = performance.now()
      try {
        const result = alasql(initialSql.trim())
        const elapsed = performance.now() - start

        if (Array.isArray(result) && result.length > 0) {
          setQueryResult({ columns: Object.keys(result[0]), rows: result, executionTime: elapsed, error: null })
        } else if (Array.isArray(result)) {
          setQueryResult({ columns: [], rows: [], executionTime: elapsed, error: null })
        } else {
          setQueryResult({ columns: ['result'], rows: [{ result }], executionTime: elapsed, error: null })
        }
      } catch (err) {
        setQueryResult({
          columns: [],
          rows: [],
          executionTime: performance.now() - start,
          error: err instanceof Error ? err.message : 'Query failed',
        })
      }
    }, 100)
  }, [shouldAutoRun, initialSql, loadedTables, loadingTables])

  // ---------- Autocomplete ----------

  // Build the full list of available suggestions from loaded tables
  const allSuggestions = useMemo<Suggestion[]>(() => {
    const suggestions: Suggestion[] = []

    // Table names + column names
    for (const t of loadedTables) {
      if (t.loading || t.error) continue
      suggestions.push({ text: t.alias, type: 'table', detail: t.savedTable.tableName })

      // Columns from the first row
      if (t.data.length > 0) {
        const cols = Object.keys(t.data[0])
        for (const col of cols) {
          suggestions.push({ text: col, type: 'column', detail: t.alias })
          // Also add table.column format
          suggestions.push({ text: `${t.alias}.${col}`, type: 'column', detail: t.alias })
        }
      }
    }

    return suggestions
  }, [loadedTables])

  // Derive schema for the selected table
  const selectedTableSchema = useMemo(() => {
    if (!selectedTableAlias) return null
    const table = loadedTables.find((t) => t.alias === selectedTableAlias)
    if (!table || table.loading || table.error || table.data.length === 0) return null

    // Get columns from the data and infer types from actual values
    const cols = Object.keys(table.data[0])
    return cols.map((col) => {
      let inferredType = 'unknown'
      for (const row of table.data.slice(0, 20)) {
        const val = row[col]
        if (val === null || val === undefined) continue
        if (typeof val === 'number') {
          inferredType = Number.isInteger(val) ? 'integer' : 'float'
          break
        }
        if (typeof val === 'boolean') { inferredType = 'boolean'; break }
        if (typeof val === 'string') {
          if (/^\d{4}-\d{2}-\d{2}T/.test(val)) { inferredType = 'timestamp'; break }
          inferredType = 'string'
          break
        }
        if (Array.isArray(val)) { inferredType = 'array'; break }
        if (typeof val === 'object') { inferredType = 'map'; break }
      }
      return { name: col, type: inferredType }
    })
  }, [selectedTableAlias, loadedTables])

  // Determine context: what kind of suggestion should we show based on the preceding SQL?
  const getContext = useCallback((text: string, wordStart: number): 'table' | 'column' | 'any' => {
    // Look at the text before the current word, trimmed
    const before = text.slice(0, wordStart).trimEnd().toUpperCase()

    // After FROM / JOIN keywords → table names only
    if (/(?:FROM|JOIN|INNER\s+JOIN|LEFT\s+JOIN|RIGHT\s+JOIN|CROSS\s+JOIN|INTO)\s*$/i.test(before)) {
      return 'table'
    }

    // After SELECT, WHERE, ON, AND, OR, BY, SET, HAVING, WHEN, THEN → columns
    if (/(?:SELECT|WHERE|ON|AND|OR|ORDER\s+BY|GROUP\s+BY|HAVING|SET|WHEN|THEN|ELSE|CASE|,)\s*$/i.test(before)) {
      return 'column'
    }

    // After a comparison operator → columns
    if (/[=<>!]+\s*$/.test(before)) {
      return 'column'
    }

    return 'any'
  }, [])

  // Extract current word at cursor and filter suggestions
  const updateAutocomplete = useCallback(
    (value: string, cursorPos: number) => {
      // Walk backwards from cursor to find the start of the current word
      let start = cursorPos
      while (start > 0) {
        const ch = value[start - 1]
        if (/[\s,();=<>!+\-*/]/.test(ch)) break
        start--
      }

      const word = value.slice(start, cursorPos)

      if (word.length < 1) {
        setAcVisible(false)
        return
      }

      const context = getContext(value, start)
      const lower = word.toLowerCase()

      const filtered = allSuggestions
        .filter((s) => {
          // Must match the typed prefix
          if (!s.text.toLowerCase().startsWith(lower) || s.text.toLowerCase() === lower) return false
          // Context filtering
          if (context === 'table') return s.type === 'table'
          if (context === 'column') return s.type === 'column'
          return true
        })
        .slice(0, 12)

      // De-duplicate
      const seen = new Set<string>()
      const unique: Suggestion[] = []
      for (const s of filtered) {
        const key = s.text.toLowerCase()
        if (seen.has(key)) continue
        seen.add(key)
        unique.push(s)
      }

      if (unique.length === 0) {
        setAcVisible(false)
        return
      }

      setAcSuggestions(unique)
      setAcIndex(0)
      setAcWordStart(start)
      setAcVisible(true)
    },
    [allSuggestions, getContext]
  )

  // Accept a suggestion
  const acceptSuggestion = useCallback(
    (suggestion: Suggestion) => {
      const before = sql.slice(0, acWordStart)
      const after = sql.slice(editorRef.current?.selectionStart ?? sql.length)
      const newSql = before + suggestion.text + ' ' + after
      setSql(newSql)
      setAcVisible(false)

      // Restore cursor position after the inserted text
      requestAnimationFrame(() => {
        if (editorRef.current) {
          const pos = acWordStart + suggestion.text.length + 1
          editorRef.current.selectionStart = pos
          editorRef.current.selectionEnd = pos
          editorRef.current.focus()
        }
      })
    },
    [sql, acWordStart]
  )

  // Sync scroll between textarea and highlight overlay
  const syncScroll = useCallback(() => {
    if (editorRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = editorRef.current.scrollTop
      highlightRef.current.scrollLeft = editorRef.current.scrollLeft
    }
  }, [])

  // Handle input changes with autocomplete
  const handleSqlChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value
      const cursorPos = e.target.selectionStart
      setSql(value)
      updateAutocomplete(value, cursorPos)
    },
    [updateAutocomplete]
  )

  // ---------- Execute SQL ----------

  const executeQuery = useCallback(() => {
    if (!sql.trim()) return
    setExecuting(true)
    setQueryResult(null)

    // Use setTimeout to let UI update before running (alasql is synchronous)
    setTimeout(() => {
      const start = performance.now()

      try {
        // Register each loaded table as a temporary table in alasql
        for (const t of loadedTables) {
          if (t.loading || t.error) continue
          // Create table reference that alasql can use
          alasql.tables[t.alias] = { data: t.data }
        }

        const result = alasql(sql.trim())
        const elapsed = performance.now() - start

        if (Array.isArray(result) && result.length > 0) {
          const columns = Object.keys(result[0])
          setQueryResult({
            columns,
            rows: result,
            executionTime: elapsed,
            error: null,
          })
          setQueryHistory((prev) => [
            { sql: sql.trim(), time: new Date(), rowCount: result.length },
            ...prev.slice(0, 19),
          ])
          // Track query run
          if (user?.uid) trackQueryRun(user.uid, sql.trim())
        } else if (Array.isArray(result) && result.length === 0) {
          setQueryResult({
            columns: [],
            rows: [],
            executionTime: elapsed,
            error: null,
          })
          setQueryHistory((prev) => [
            { sql: sql.trim(), time: new Date(), rowCount: 0 },
            ...prev.slice(0, 19),
          ])
          // Track query run
          if (user?.uid) trackQueryRun(user.uid, sql.trim())
        } else {
          // For non-SELECT queries (e.g. count returned as number)
          setQueryResult({
            columns: ['result'],
            rows: [{ result }],
            executionTime: elapsed,
            error: null,
          })
          if (user?.uid) trackQueryRun(user.uid, sql.trim())
        }
      } catch (err) {
        const elapsed = performance.now() - start
        setQueryResult({
          columns: [],
          rows: [],
          executionTime: elapsed,
          error: err instanceof Error ? err.message : 'Query failed',
        })
      } finally {
        setExecuting(false)
      }
    }, 10)
  }, [sql, loadedTables])

  // Keyboard handler for editor (autocomplete + run)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl/Cmd+Enter to run
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      setAcVisible(false)
      executeQuery()
      return
    }

    // Autocomplete navigation
    if (acVisible && acSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const next = (acIndex + 1) % acSuggestions.length
        setAcIndex(next)
        acRef.current?.children[next]?.scrollIntoView({ block: 'nearest' })
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prev = (acIndex - 1 + acSuggestions.length) % acSuggestions.length
        setAcIndex(prev)
        acRef.current?.children[prev]?.scrollIntoView({ block: 'nearest' })
        return
      }
      if (e.key === 'Tab' || e.key === 'Enter') {
        // Only accept on Tab always; Enter only if autocomplete is visible
        if (e.key === 'Tab' || acVisible) {
          e.preventDefault()
          acceptSuggestion(acSuggestions[acIndex])
          return
        }
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        setAcVisible(false)
        return
      }
    }
  }

  // ---------- Save query result as a new table ----------

  const handleSaveResult = async () => {
    if (!queryResult || !queryResult.rows.length || !user?.uid || !db || !saveTableName.trim()) return
    setSaving(true)
    try {
      const id = crypto.randomUUID()
      const columns = queryResult.columns.map((col, idx) => ({
        id: col,
        sourcePath: col,
        alias: col,
        dataType: inferColumnType(queryResult.rows, col),
        visible: true,
        order: idx,
      }))

      // Save query table with the actual result data (capped at 2000 rows)
      const dataToSave = queryResult.rows.slice(0, 2000)

      await setDoc(doc(db, 'users', user.uid, 'tables', id), {
        tableName: saveTableName.trim(),
        projectId: '__query__',
        collectionPath: '__query__',
        isCollectionGroup: false,
        columns,
        querySql: sql.trim(),
        queryData: dataToSave,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      // Track query table save
      trackQueryTableSaved(user.uid, id, saveTableName.trim())

      setSaveSuccess(true)
      setTimeout(() => {
        navigate(`/query-table/${id}`)
      }, 800)
    } catch (err) {
      console.error('Save failed:', err)
    } finally {
      setSaving(false)
    }
  }

  // ---------- TanStack Table for results ----------

  const resultColumns = useMemo<ColumnDef<Record<string, unknown>>[]>(() => {
    if (!queryResult?.columns?.length) return []
    return queryResult.columns.map((col) => ({
      id: col,
      accessorFn: (row: Record<string, unknown>) => {
        const val = row[col]
        if (val === null || val === undefined) return ''
        if (typeof val === 'object') return JSON.stringify(val)
        return val
      },
      header: col,
      cell: (info) => {
        const val = info.getValue()
        if (val === '' || val === null || val === undefined) {
          return <span className="text-gray-300">null</span>
        }
        return <span className="truncate block max-w-[300px]">{String(val)}</span>
      },
      enableSorting: true,
    }))
  }, [queryResult])

  const resultTable = useReactTable({
    data: queryResult?.rows ?? [],
    columns: resultColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 50 } },
  })

  // ---------- Render ----------

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shrink-0">
        <div className="max-w-full mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-fire-500 rounded-md flex items-center justify-center">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">Firegrid</span>
            </div>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <div className="flex items-center gap-1.5">
              <Terminal size={14} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">SQL Query</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <button onClick={signOut} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* ======== Left Sidebar: Available Tables ======== */}
        <div className="w-72 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shrink-0 flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                <Database size={14} className="text-gray-400" />
                Tables
              </h3>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {loadedTables.every((t) => !t.loading)
                  ? `${loadedTables.filter((t) => !t.error).length} table${loadedTables.filter((t) => !t.error).length !== 1 ? 's' : ''} ready`
                  : 'Loading table data…'}
              </p>
            </div>
            <button
              onClick={() => {
                const firstTable = loadedTables.find((t) => !t.loading && !t.error)
                if (firstTable) {
                  navigate(`/project/${firstTable.savedTable.projectId}`)
                } else {
                  navigate('/dashboard')
                }
              }}
              className="flex items-center gap-1 text-[11px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md px-2 py-1 transition-colors"
            >
              <Plus size={12} />
              Add
            </button>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            {loadingTables ? (
              <div className="flex items-center gap-2 px-4 py-6 text-xs text-gray-400 justify-center">
                <Loader2 size={13} className="animate-spin" />
                Loading…
              </div>
            ) : savedTables.length === 0 ? (
              <div className="px-4 py-6 text-center text-xs text-gray-400">
                No saved tables yet.
              </div>
            ) : (
              <div className="py-1">
                {loadedTables.map((loaded) => {
                  const isSelected = selectedTableAlias === loaded.alias
                  return (
                    <button
                      key={loaded.alias}
                      onClick={() => {
                        if (!loaded.loading && !loaded.error) {
                          setSelectedTableAlias(isSelected ? null : loaded.alias)
                        }
                      }}
                      className={cn(
                        'w-full text-left px-4 py-2 flex items-center gap-2.5 transition-colors',
                        isSelected
                          ? 'bg-gray-100 dark:bg-gray-700'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700/40',
                        (loaded.loading || loaded.error) && 'opacity-50 cursor-default'
                      )}
                    >
                      {loaded.loading ? (
                        <Loader2 size={13} className="animate-spin text-gray-400 shrink-0" />
                      ) : loaded.error ? (
                        <AlertCircle size={13} className="text-red-400 shrink-0" />
                      ) : (
                        <Table size={13} className="text-gray-400 shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">
                          {loaded.savedTable.tableName}
                        </p>
                      </div>
                      {!loaded.loading && !loaded.error && (
                        <span className="text-[10px] text-gray-400 tabular-nums shrink-0">
                          {loaded.rowCount}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* ======== Schema Panel ======== */}
          {selectedTableAlias && selectedTableSchema && (() => {
            const selectedTable = loadedTables.find((t) => t.alias === selectedTableAlias)
            return (
            <div className="border-t border-gray-200 dark:border-gray-700 shrink-0 flex flex-col max-h-[45%]">
              <div className="px-4 py-2.5 flex items-center justify-between">
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
                    {selectedTable?.savedTable.tableName ?? selectedTableAlias}
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    <span className="font-mono">{selectedTableAlias}</span> · {selectedTableSchema.length} column{selectedTableSchema.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTableAlias(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-0.5"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <th className="text-[10px] font-medium text-gray-400 text-left px-4 py-1.5">Column</th>
                      <th className="text-[10px] font-medium text-gray-400 text-left px-4 py-1.5">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTableSchema.map((col, idx) => (
                      <tr
                        key={col.name}
                        className={cn(
                          'group',
                          idx !== selectedTableSchema.length - 1 && 'border-b border-gray-50 dark:border-gray-700/50'
                        )}
                      >
                        <td className="px-4 py-1.5 flex items-center gap-1.5">
                          <span className="text-[11px] font-mono text-gray-700 dark:text-gray-300 truncate">
                            {col.name}
                          </span>
                        </td>
                        <td className="px-4 py-1.5">
                          <span className={cn(
                            'inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-md',
                            col.type === 'string' && 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-700',
                            col.type === 'integer' && 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-700',
                            col.type === 'float' && 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-700',
                            col.type === 'boolean' && 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-700',
                            col.type === 'timestamp' && 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-700',
                            col.type === 'array' && 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-700',
                            col.type === 'map' && 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-700',
                            col.type === 'unknown' && 'text-gray-400 bg-gray-50 dark:text-gray-500 dark:bg-gray-700/50',
                          )}>
                            {col.type === 'string' && <Type size={9} />}
                            {col.type === 'integer' && <Hash size={9} />}
                            {col.type === 'float' && <Hash size={9} />}
                            {col.type === 'boolean' && <ToggleLeft size={9} />}
                            {col.type === 'timestamp' && <CalendarDays size={9} />}
                            {col.type === 'array' && <List size={9} />}
                            {col.type === 'map' && <Braces size={9} />}
                            {col.type === 'unknown' && <HelpCircle size={9} />}
                            {col.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            )
          })()}
        </div>

        {/* ======== Main Area: Editor + Results ======== */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* SQL Editor */}
          <div className="shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Terminal size={13} className="text-gray-400" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">SQL Editor</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400">
                  {navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl'}+Enter to run
                </span>
                <button
                  onClick={executeQuery}
                  disabled={executing || !sql.trim() || loadedTables.every((t) => t.loading)}
                  className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-medium rounded-md px-3 py-1.5 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {executing ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Play size={12} />
                  )}
                  Run Query
                </button>
              </div>
            </div>

            <div className="relative bg-gray-50/50 dark:bg-gray-800/50">
              {/* Textarea (bottom layer — handles input) */}
              <textarea
                ref={editorRef}
                value={sql}
                onChange={handleSqlChange}
                onKeyDown={handleKeyDown}
                onScroll={syncScroll}
                onBlur={() => {
                  // Delay hiding so click on suggestion works
                  setTimeout(() => setAcVisible(false), 150)
                }}
                placeholder={
                  loadedTables.length === 0
                    ? '-- Load tables from the sidebar first, then write SQL here\n-- Example: SELECT * FROM users WHERE age > 25'
                    : `-- Tables available: ${loadedTables.filter((t) => !t.loading && !t.error).map((t) => t.alias).join(', ')}\n-- Example: SELECT * FROM ${loadedTables[0]?.alias || 'table_name'} LIMIT 10`
                }
                className="relative z-[1] w-full h-36 px-4 py-3 font-mono text-sm text-transparent caret-gray-800 dark:caret-gray-200 bg-transparent resize-none focus:outline-none placeholder:text-gray-400 selection:bg-blue-200/50 dark:selection:bg-blue-500/30"
                spellCheck={false}
                autoComplete="off"
              />
              {/* Syntax highlight overlay (on top, pointer-events-none so clicks pass through) */}
              <pre
                ref={highlightRef}
                aria-hidden="true"
                className="absolute inset-0 z-[2] w-full h-36 px-4 py-3 font-mono text-sm overflow-hidden pointer-events-none whitespace-pre-wrap break-words m-0 border-0 bg-transparent"
                dangerouslySetInnerHTML={{ __html: highlightSql(sql) + '\n' }}
              />

              {/* Autocomplete dropdown */}
              {acVisible && acSuggestions.length > 0 && (
                <div
                  ref={acRef}
                  className="absolute left-4 bottom-1 z-30 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg py-1 max-h-52 overflow-y-auto w-72"
                >
                  {acSuggestions.map((s, idx) => (
                    <button
                      key={`${s.text}-${s.type}-${idx}`}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        acceptSuggestion(s)
                      }}
                      className={cn(
                        'w-full text-left px-3 py-1.5 flex items-center gap-2 text-xs transition-colors',
                        idx === acIndex ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      )}
                    >
                      <span
                        className={cn(
                          'shrink-0 w-[18px] text-center text-[9px] font-bold uppercase rounded px-0.5 py-px',
                          s.type === 'table' ? 'text-gray-600 bg-gray-200 dark:text-gray-300 dark:bg-gray-600' : 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-600'
                        )}
                      >
                        {s.type === 'table' ? 'T' : 'C'}
                      </span>
                      <span className="font-mono text-gray-800 dark:text-gray-200 truncate">{s.text}</span>
                      {s.detail && (
                        <span className="ml-auto text-[10px] text-gray-400 truncate shrink-0">
                          {s.detail}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Results toolbar */}
            {queryResult && (
              <div className="px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3 shrink-0">
                {queryResult.error ? (
                  <div className="flex items-center gap-1.5 text-red-600">
                    <AlertCircle size={13} />
                    <span className="text-xs font-medium">Query Error</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5">
                      <Check size={13} className="text-gray-500" />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {queryResult.rows.length} row{queryResult.rows.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Zap size={10} />
                      {queryResult.executionTime < 1
                        ? '<1ms'
                        : `${Math.round(queryResult.executionTime)}ms`}
                    </span>
                  </>
                )}

                <div className="ml-auto flex items-center gap-2">
                  {queryResult.rows.length > 0 && (
                    <button
                      onClick={() => {
                        setShowSaveDialog(true)
                        setSaveTableName('')
                      }}
                      className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 px-2.5 py-1.5 rounded-md transition-colors"
                    >
                      <Save size={12} />
                      Save as Table
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Results content */}
            <div className="flex-1 overflow-auto">
              {!queryResult && !executing && (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
                  <div className="w-12 h-12 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <Terminal size={20} className="text-gray-300" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Write a SQL query</p>
                    <p className="text-xs text-gray-400 max-w-sm">
                      Load your saved tables from the sidebar, then write SQL to query, join, and analyse your Firestore data.
                    </p>
                  </div>
                  {loadedTables.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-3 mt-2 max-w-md w-full">
                      <p className="text-[10px] font-medium text-gray-500 mb-2 flex items-center gap-1">
                        <Info size={10} />
                        Quick examples
                      </p>
                      <div className="space-y-1.5">
                        {loadedTables.filter((t) => !t.loading && !t.error).slice(0, 2).map((t) => (
                          <button
                            key={t.alias}
                            onClick={() => setSql(`SELECT * FROM ${t.alias} LIMIT 25`)}
                            className="w-full text-left text-[11px] font-mono text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded px-2.5 py-1.5 transition-colors"
                          >
                            SELECT * FROM {t.alias} LIMIT 25
                          </button>
                        ))}
                        {loadedTables.filter((t) => !t.loading && !t.error).length >= 2 && (
                          <button
                            onClick={() => {
                              const [a, b] = loadedTables.filter((t) => !t.loading && !t.error)
                              const aCol = a.data[0] ? Object.keys(a.data[0])[0] : '__id'
                              const bCol = b.data[0] ? Object.keys(b.data[0])[0] : '__id'
                              setSql(`SELECT a.*, b.*\nFROM ${a.alias} a\nJOIN ${b.alias} b ON a.${aCol} = b.${bCol}\nLIMIT 25`)
                            }}
                            className="w-full text-left text-[11px] font-mono text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded px-2.5 py-1.5 transition-colors"
                          >
                            SELECT a.*, b.* FROM ... JOIN ...
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {executing && (
                <div className="flex items-center justify-center h-full">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 size={16} className="animate-spin" />
                    Executing query…
                  </div>
                </div>
              )}

              {queryResult?.error && (
                <div className="p-4">
                  <div className="bg-white dark:bg-gray-800 rounded-md border border-red-200 dark:border-red-800 p-4 max-w-2xl">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-700 dark:text-red-400 mb-1">Query Error</p>
                        <pre className="text-xs text-red-600 font-mono whitespace-pre-wrap">
                          {queryResult.error}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {queryResult && !queryResult.error && queryResult.rows.length === 0 && (
                <div className="flex items-center justify-center h-full text-sm text-gray-400">
                  Query returned no results.
                </div>
              )}

              {queryResult && !queryResult.error && queryResult.rows.length > 0 && (
                <table className="w-full text-xs border-separate border-spacing-0">
                  <thead className="sticky top-0 z-10">
                    {resultTable.getHeaderGroups().map((headerGroup) => (
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
                    {resultTable.getRowModel().rows.map((row) => (
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
            </div>

            {/* Pagination */}
            {queryResult && !queryResult.error && resultTable.getPageCount() > 1 && (
              <div className="px-4 py-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => resultTable.setPageIndex(0)}
                    disabled={!resultTable.getCanPreviousPage()}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    <ChevronsLeft size={14} />
                  </button>
                  <button
                    onClick={() => resultTable.previousPage()}
                    disabled={!resultTable.getCanPreviousPage()}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mx-2 tabular-nums">
                    Page {resultTable.getState().pagination.pageIndex + 1} of {resultTable.getPageCount()}
                  </span>
                  <button
                    onClick={() => resultTable.nextPage()}
                    disabled={!resultTable.getCanNextPage()}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    <ChevronRight size={14} />
                  </button>
                  <button
                    onClick={() => resultTable.setPageIndex(resultTable.getPageCount() - 1)}
                    disabled={!resultTable.getCanNextPage()}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    <ChevronsRight size={14} />
                  </button>
                </div>
                <select
                  value={resultTable.getState().pagination.pageSize}
                  onChange={(e) => resultTable.setPageSize(Number(e.target.value))}
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

        {/* ======== Right Sidebar: History ======== */}
        {queryHistory.length > 0 && (
          <div className="w-64 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shrink-0 flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                <Clock size={13} className="text-gray-400" />
                History
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-2 space-y-1">
                {queryHistory.map((entry, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSql(entry.sql)}
                    className="w-full text-left rounded-md p-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <p className="text-[11px] font-mono text-gray-600 dark:text-gray-400 truncate group-hover:text-gray-800 dark:group-hover:text-gray-200">
                      {entry.sql}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-gray-400">
                        {entry.rowCount} row{entry.rowCount !== 1 ? 's' : ''}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {entry.time.toLocaleTimeString()}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======== Save as Table Dialog ======== */}
      {showSaveDialog && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 animate-in fade-in duration-200"
            onClick={() => setShowSaveDialog(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg p-6 w-full max-w-sm animate-in slide-in-from-bottom-4 zoom-in-95 duration-300 ease-out">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">Save Query Result as Table</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                This saves the column configuration. The query will be re-run when the table is opened.
              </p>
              <input
                type="text"
                placeholder="Table name…"
                value={saveTableName}
                onChange={(e) => setSaveTableName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && saveTableName.trim()) handleSaveResult()
                }}
                autoFocus
                className="w-full text-sm border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowSaveDialog(false)}
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveResult}
                  disabled={saving || !saveTableName.trim()}
                  className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-medium rounded-md px-3 py-1.5 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : saveSuccess ? (
                    <Check size={12} />
                  ) : (
                    <Save size={12} />
                  )}
                  {saveSuccess ? 'Saved!' : 'Save Table'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ---------- Utilities ----------

function inferColumnType(rows: Record<string, unknown>[], col: string): string {
  for (const row of rows.slice(0, 10)) {
    const val = row[col]
    if (val === null || val === undefined) continue
    if (typeof val === 'number') return Number.isInteger(val) ? 'integer' : 'double'
    if (typeof val === 'boolean') return 'boolean'
    if (typeof val === 'string') {
      if (/^\d{4}-\d{2}-\d{2}T/.test(val)) return 'timestamp'
      return 'string'
    }
    if (Array.isArray(val)) return 'array'
    if (typeof val === 'object') return 'map'
  }
  return 'unknown'
}
