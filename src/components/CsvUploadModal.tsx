import { useState, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Papa from 'papaparse'
import {
  X,
  Upload,
  FileSpreadsheet,
  Loader2,
  AlertCircle,
  Check,
  Trash2,
  Table,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ---- Constants ----
const MAX_FILE_SIZE_MB = 10
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
const MAX_ROWS_WARNING = 5_000
const MAX_ROWS_HARD_LIMIT = 50_000
const PREVIEW_ROW_COUNT = 5

interface ParsedCsvData {
  headers: string[]
  rows: Record<string, unknown>[]
  totalRows: number
  errors: string[]
}

interface CsvUploadModalProps {
  open: boolean
  onClose: () => void
  onSave: (tableName: string, headers: string[], rows: Record<string, unknown>[]) => Promise<void>
}

function inferColumnType(values: unknown[]): string {
  let hasNumber = false
  let hasBoolean = false
  let hasTimestamp = false
  let hasString = false
  let samples = 0

  for (const val of values) {
    if (val === null || val === undefined || val === '') continue
    samples++
    if (samples > 50) break

    const str = String(val).trim()

    if (str === 'true' || str === 'false') {
      hasBoolean = true
      continue
    }
    if (/^\d{4}-\d{2}-\d{2}(T|\s)/.test(str)) {
      hasTimestamp = true
      continue
    }
    if (!isNaN(Number(str)) && str !== '') {
      hasNumber = true
      continue
    }
    hasString = true
  }

  if (samples === 0) return 'null'
  if (hasString) return 'string'
  if (hasTimestamp) return 'timestamp'
  if (hasBoolean) return 'boolean'
  if (hasNumber) return 'number'
  return 'string'
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function CsvUploadModal({ open, onClose, onSave }: CsvUploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  // State
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [parsing, setParsing] = useState(false)
  const [parsedData, setParsedData] = useState<ParsedCsvData | null>(null)
  const [parseError, setParseError] = useState<string | null>(null)
  const [tableName, setTableName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [showAllColumns, setShowAllColumns] = useState(false)

  // Reset state when modal closes
  const handleClose = useCallback(() => {
    setFile(null)
    setParsedData(null)
    setParseError(null)
    setTableName('')
    setSaving(false)
    setSaveError(null)
    setIsDragging(false)
    setShowAllColumns(false)
    onClose()
  }, [onClose])

  // Column type inference (memoised)
  const columnTypes = useMemo(() => {
    if (!parsedData) return new Map<string, string>()
    const map = new Map<string, string>()
    for (const header of parsedData.headers) {
      const values = parsedData.rows.map((r) => r[header])
      map.set(header, inferColumnType(values))
    }
    return map
  }, [parsedData])

  // ---- File validation & parsing ----
  const processFile = useCallback((selectedFile: File) => {
    setParseError(null)
    setSaveError(null)
    setParsedData(null)

    // Validate extension
    const name = selectedFile.name.toLowerCase()
    if (!name.endsWith('.csv') && !name.endsWith('.tsv') && !name.endsWith('.txt')) {
      setParseError('Invalid file type. Please upload a .csv file.')
      return
    }

    // Validate size
    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      setParseError(`File is too large (${formatFileSize(selectedFile.size)}). Maximum size is ${MAX_FILE_SIZE_MB} MB.`)
      return
    }

    if (selectedFile.size === 0) {
      setParseError('File is empty.')
      return
    }

    setFile(selectedFile)
    setParsing(true)

    // Derive default table name from filename
    const baseName = selectedFile.name.replace(/\.(csv|tsv|txt)$/i, '').replace(/[_-]/g, ' ')
    setTableName(baseName)

    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: 'greedy',
      dynamicTyping: false, // Keep everything as strings for safety, we do our own type inference
      transformHeader: (header: string) => header.trim(),
      complete: (results) => {
        setParsing(false)

        const headers = results.meta.fields ?? []
        if (headers.length === 0) {
          setParseError('No columns detected. Please ensure the CSV has a header row.')
          return
        }

        // Filter out fully empty columns
        const nonEmptyHeaders = headers.filter((h) => h.trim() !== '')
        if (nonEmptyHeaders.length === 0) {
          setParseError('All columns are empty. Please check your CSV file.')
          return
        }

        const rows = (results.data as Record<string, unknown>[]).slice(0, MAX_ROWS_HARD_LIMIT)

        // Collect parse errors (limit to first 5)
        const errors: string[] = []
        if (results.errors.length > 0) {
          for (const err of results.errors.slice(0, 5)) {
            errors.push(`Row ${err.row ?? '?'}: ${err.message}`)
          }
          if (results.errors.length > 5) {
            errors.push(`…and ${results.errors.length - 5} more errors`)
          }
        }

        if (rows.length === 0) {
          setParseError('No data rows found. The file only contains headers.')
          return
        }

        setParsedData({
          headers: nonEmptyHeaders,
          rows,
          totalRows: (results.data as unknown[]).length,
          errors,
        })
      },
      error: (err) => {
        setParsing(false)
        setParseError(`Failed to parse CSV: ${err.message}`)
      },
    })
  }, [])

  // ---- Drag & Drop handlers ----
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile) {
        processFile(droppedFile)
      }
    },
    [processFile]
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0]
      if (selectedFile) {
        processFile(selectedFile)
      }
      // Reset input so the same file can be re-selected
      e.target.value = ''
    },
    [processFile]
  )

  // ---- Save handler ----
  const handleSave = useCallback(async () => {
    if (!parsedData || !tableName.trim()) return
    setSaving(true)
    setSaveError(null)
    try {
      await onSave(tableName.trim(), parsedData.headers, parsedData.rows)
      handleClose()
    } catch (err) {
      console.error('Failed to save CSV table:', err)
      setSaveError(err instanceof Error ? err.message : 'Failed to save table')
    } finally {
      setSaving(false)
    }
  }, [parsedData, tableName, onSave, handleClose])

  // ---- Remove file ----
  const handleRemoveFile = useCallback(() => {
    setFile(null)
    setParsedData(null)
    setParseError(null)
    setTableName('')
    setSaveError(null)
    setShowAllColumns(false)
  }, [])

  // Preview columns to show
  const visibleColumns = showAllColumns
    ? (parsedData?.headers ?? [])
    : (parsedData?.headers ?? []).slice(0, 6)

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 animate-in fade-in duration-200"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
            className="relative bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col mx-4 animate-in slide-in-from-bottom-4 zoom-in-95 duration-300 ease-out"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700 shrink-0">
              <div className="flex items-center gap-2">
                <FileSpreadsheet size={16} className="text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Import CSV</h2>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {/* ---- Drop Zone / File Info ---- */}
              {!file ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    'border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors',
                    isDragging
                      ? 'border-gray-400 bg-gray-50 dark:border-gray-500 dark:bg-gray-700/50'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/30'
                  )}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <Upload size={20} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {isDragging ? 'Drop your CSV file here' : 'Drag and drop a CSV file here'}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        or click to browse · Max {MAX_FILE_SIZE_MB} MB
                      </p>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.tsv,.txt"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0">
                      <FileSpreadsheet size={16} className="text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {formatFileSize(file.size)}
                        {parsedData && (
                          <>
                            {' · '}
                            {parsedData.totalRows.toLocaleString()} rows · {parsedData.headers.length} columns
                          </>
                        )}
                      </p>
                    </div>
                    {!parsing && (
                      <button
                        onClick={handleRemoveFile}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0"
                        title="Remove file"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* ---- Parsing spinner ---- */}
              {parsing && (
                <div className="flex items-center justify-center gap-2 py-4 text-sm text-gray-500 dark:text-gray-400">
                  <Loader2 size={14} className="animate-spin" />
                  Parsing CSV…
                </div>
              )}

              {/* ---- Parse error ---- */}
              {parseError && (
                <div className="bg-white dark:bg-gray-800 rounded-md border border-red-200 dark:border-red-800 p-3 flex items-start gap-2.5">
                  <AlertCircle size={14} className="text-red-500 dark:text-red-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-red-600 dark:text-red-400">{parseError}</p>
                </div>
              )}

              {/* ---- Parsed data preview ---- */}
              {parsedData && !parseError && (
                <>
                  {/* Warnings */}
                  {parsedData.totalRows > MAX_ROWS_WARNING && parsedData.totalRows <= MAX_ROWS_HARD_LIMIT && (
                    <div className="bg-white dark:bg-gray-800 rounded-md border border-amber-200 dark:border-amber-800 p-3 flex items-start gap-2.5">
                      <AlertCircle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                      <p className="text-xs text-amber-700 dark:text-amber-400">
                        This file contains {parsedData.totalRows.toLocaleString()} rows. Large datasets may be slower to load.
                      </p>
                    </div>
                  )}

                  {parsedData.totalRows > MAX_ROWS_HARD_LIMIT && (
                    <div className="bg-white dark:bg-gray-800 rounded-md border border-amber-200 dark:border-amber-800 p-3 flex items-start gap-2.5">
                      <AlertCircle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                      <p className="text-xs text-amber-700 dark:text-amber-400">
                        File has {parsedData.totalRows.toLocaleString()} rows. Only the first {MAX_ROWS_HARD_LIMIT.toLocaleString()} rows will be imported.
                      </p>
                    </div>
                  )}

                  {parsedData.errors.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-md border border-amber-200 dark:border-amber-800 p-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <AlertCircle size={13} className="text-amber-500 shrink-0" />
                        <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                          {parsedData.errors.length} parsing {parsedData.errors.length === 1 ? 'warning' : 'warnings'}
                        </p>
                      </div>
                      <ul className="text-xs text-amber-600 dark:text-amber-400/80 space-y-0.5 ml-5">
                        {parsedData.errors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Table name input */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Table name
                    </label>
                    <input
                      type="text"
                      value={tableName}
                      onChange={(e) => setTableName(e.target.value)}
                      placeholder="Enter a name for this table…"
                      className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:border-gray-300 dark:focus:border-gray-500"
                    />
                  </div>

                  {/* Columns summary */}
                  <div>
                    <button
                      onClick={() => setShowAllColumns(!showAllColumns)}
                      className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      <Table size={13} className="text-gray-400" />
                      {parsedData.headers.length} columns detected
                      {parsedData.headers.length > 6 && (
                        <ChevronDown
                          className={cn(
                            'h-3 w-3 text-gray-400 transition-transform duration-200',
                            showAllColumns && 'rotate-180'
                          )}
                        />
                      )}
                    </button>
                    <div className="flex flex-wrap gap-1.5">
                      {visibleColumns.map((header) => (
                        <span
                          key={header}
                          className="inline-flex items-center gap-1 text-[11px] text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md"
                        >
                          {header}
                          <span className="text-gray-400 dark:text-gray-500">
                            {columnTypes.get(header) ?? 'string'}
                          </span>
                        </span>
                      ))}
                      {!showAllColumns && parsedData.headers.length > 6 && (
                        <button
                          onClick={() => setShowAllColumns(true)}
                          className="text-[11px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 px-2 py-1 transition-colors"
                        >
                          +{parsedData.headers.length - 6} more
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Data preview table */}
                  <div>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Preview (first {Math.min(PREVIEW_ROW_COUNT, parsedData.rows.length)} rows)
                    </p>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border-separate border-spacing-0">
                          <thead>
                            <tr>
                              {parsedData.headers.slice(0, 8).map((header) => (
                                <th
                                  key={header}
                                  className="text-left px-3 py-2 font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/60 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap"
                                >
                                  {header}
                                </th>
                              ))}
                              {parsedData.headers.length > 8 && (
                                <th className="text-left px-3 py-2 font-medium text-gray-400 bg-gray-50 dark:bg-gray-700/60 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap">
                                  +{parsedData.headers.length - 8}
                                </th>
                              )}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {parsedData.rows.slice(0, PREVIEW_ROW_COUNT).map((row, rowIdx) => (
                              <tr key={rowIdx} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                {parsedData.headers.slice(0, 8).map((header) => (
                                  <td
                                    key={header}
                                    className="px-3 py-1.5 text-gray-700 dark:text-gray-300 whitespace-nowrap max-w-[200px] truncate"
                                  >
                                    {row[header] === null || row[header] === undefined || row[header] === ''
                                      ? <span className="text-gray-300 dark:text-gray-600">—</span>
                                      : String(row[header])}
                                  </td>
                                ))}
                                {parsedData.headers.length > 8 && (
                                  <td className="px-3 py-1.5 text-gray-300 dark:text-gray-600">…</td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {parsedData && !parseError && (
              <div className="px-5 py-3.5 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between shrink-0">
                <div className="text-xs text-gray-400 dark:text-gray-500">
                  {parsedData.rows.length.toLocaleString()} rows will be imported
                </div>
                <div className="flex items-center gap-2">
                  {saveError && (
                    <span className="text-xs text-red-500 max-w-[200px] truncate" title={saveError}>
                      {saveError}
                    </span>
                  )}
                  <button
                    onClick={handleClose}
                    className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving || !tableName.trim()}
                    className="flex items-center gap-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-medium rounded-md px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Check size={13} />
                    )}
                    {saving ? 'Saving…' : 'Import & Save'}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
