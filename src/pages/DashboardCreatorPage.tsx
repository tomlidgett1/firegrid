import { useEffect, useState, useCallback, useRef, useLayoutEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import type { SavedTable, ColumnConfig } from '@/lib/types'
import { collection, query, getDocs, orderBy, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { trackDashboardSaved, trackPageView } from '@/lib/metrics'
import { cn, flattenObject } from '@/lib/utils'
import { fetchDocuments, fetchCollectionGroup } from '@/lib/firestore-rest'
// Custom grid — no third-party grid library
import { motion, AnimatePresence } from 'framer-motion'
import {
  LogOut,
  Loader2,
  Plus,
  X,
  Table,
  GripVertical,
  ChevronLeft,
  LayoutDashboard,
  Search,
  Terminal,
  Eye,
  AlertCircle,
  RefreshCw,
  Maximize2,
  Minimize2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Check,
  Pencil,
  Lock,
  Type,
  AlignLeft,
  Minus,
  ChevronDown,
  Gauge,
  Settings2,
  BarChart3,
  TrendingUp,
  Filter,
  Trash2,
  EyeOff,
  Copy,
  Calculator,
  Wand2,
  Grid3X3,
  Rows3,
  Columns3,
  Paintbrush,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import DarkModeToggle from '@/components/DarkModeToggle'
// (no external grid CSS needed)

type WidgetType = 'table' | 'heading' | 'text' | 'divider' | 'metric' | 'chart' | 'pivot'

type AggregationType = 'count' | 'sum' | 'average' | 'min' | 'max' | 'count_distinct'

type FilterOperator =
  | 'equals'
  | 'not_equals'
  | 'contains'
  | 'not_contains'
  | 'starts_with'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'is_empty'
  | 'is_not_empty'

interface WidgetFilter {
  id: string
  column: string
  operator: FilterOperator
  value: string
}

type MetricLayout = 'centered' | 'left' | 'minimal'
type MetricValueSize = 'sm' | 'md' | 'lg' | 'xl'

interface MetricConfig {
  tableId: string
  aggregation: AggregationType
  column: string           // column sourcePath to aggregate (ignored for 'count')
  dateColumn?: string      // optional date column for time filtering
  timeframe?: 'all' | '7d' | '30d' | '90d' | 'this_month' | 'this_year'
  prefix?: string          // e.g. "$"
  suffix?: string          // e.g. "%"
  label: string            // display name
  // Display options
  layout?: MetricLayout      // 'centered' (default), 'left', 'minimal'
  titleSize?: MetricValueSize  // 'sm', 'md' (default), 'lg', 'xl'
  valueSize?: MetricValueSize // 'sm', 'md' (default), 'lg', 'xl'
  showLabel?: boolean         // default true
  colour?: string             // value colour
}

type DateTruncation = 'none' | 'day' | 'week' | 'month' | 'year'

type ChartType = 'bar' | 'line'

interface ChartConfig {
  chartType?: ChartType     // defaults to 'bar'
  tableId: string
  categoryColumn: string    // X-axis — group by this column
  valueColumn: string       // Y-axis — column to aggregate (ignored for count)
  aggregation: AggregationType
  dateColumn?: string
  timeframe?: 'all' | '7d' | '30d' | '90d' | 'this_month' | 'this_year'
  dateTruncate?: DateTruncation  // truncate category dates for grouping
  label: string
  maxBars?: number          // limit to top N data points
  sortBy?: 'value' | 'category' // how to sort data
  colour?: string           // chart colour hex
}

type ElementFontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
type ElementAlign = 'left' | 'center' | 'right'

interface ElementConfig {
  fontSize?: ElementFontSize
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
  align?: ElementAlign
  colour?: string
}

interface PivotValueConfig {
  id: string
  column: string
  aggregation: AggregationType
  label?: string
}

interface PivotConfig {
  tableId: string
  rowColumns: string[]      // field(s) for row grouping
  colColumns: string[]      // field(s) for column grouping
  values: PivotValueConfig[]
}

type CondFormatOperator = 'gt' | 'gte' | 'lt' | 'lte' | 'eq' | 'neq' | 'contains' | 'not_contains' | 'is_empty' | 'is_not_empty' | 'between'
type CondFormatTarget = 'cell' | 'row'
type CondFormatStyle = 'bg' | 'text' | 'bold' | 'italic'

interface ConditionalFormatRule {
  id: string
  column: string                 // column key / sourcePath to evaluate
  operator: CondFormatOperator
  value: string                  // comparison value (empty for is_empty/is_not_empty)
  value2?: string                // second value for 'between'
  style: CondFormatStyle         // what to apply
  colour: string                 // hex colour for bg/text styles
  target: CondFormatTarget       // apply to cell or whole row
  enabled: boolean
}

interface CustomColumn {
  id: string
  name: string              // display name
  formula: string           // expression e.g. "[Revenue] - [Cost]"
  formatPrefix?: string     // e.g. "$"
  formatSuffix?: string     // e.g. "%"
}

interface DashboardWidget {
  i: string
  type: WidgetType
  // Table-specific
  tableId: string
  tableName: string
  displayName?: string                        // user-set override for widget title
  columnAliases?: Record<string, string>      // per-widget column header overrides
  hiddenColumns?: string[]                    // sourcePaths of columns hidden on this widget
  customColumns?: CustomColumn[]              // calculated formula columns
  columnOrder?: string[]                      // ordered list of column keys (source + custom)
  // Element-specific
  content?: string
  elementConfig?: ElementConfig
  // Metric-specific
  metricConfig?: MetricConfig
  // Chart-specific
  chartConfig?: ChartConfig
  // Pivot-specific
  pivotConfig?: PivotConfig
  // Conditional formatting
  conditionalFormats?: ConditionalFormatRule[]
  // Filters
  filters?: WidgetFilter[]
  // Layout
  x: number
  y: number
  w: number
  h: number
  minW?: number
  minH?: number
}

interface SavedDashboard {
  id: string
  name: string
  widgets: Omit<DashboardWidget, 'minW' | 'minH'>[]
  createdAt: Date
  updatedAt: Date
}

const GRID_COLS = 24
const GRID_MAX_W = 24 // max usable width (matches GRID_COLS; right padding handled via gridWidth measurement)
const ROW_HEIGHT = 4
const WIDGET_MIN_W = 4
const WIDGET_MIN_H = 20
const MARGIN_X = 8
const MARGIN_Y = 4

/* ---- Custom grid position helpers ---- */
function getColWidth(containerWidth: number) {
  return (containerWidth - MARGIN_X * (GRID_COLS - 1)) / GRID_COLS
}
function gridToPixel(gx: number, gy: number, gw: number, gh: number, containerWidth: number) {
  const cw = getColWidth(containerWidth)
  return {
    left: Math.round(gx * (cw + MARGIN_X)),
    top: Math.round(gy * (ROW_HEIGHT + MARGIN_Y)),
    width: Math.round(gw * cw + Math.max(0, gw - 1) * MARGIN_X),
    height: Math.round(gh * ROW_HEIGHT + Math.max(0, gh - 1) * MARGIN_Y),
  }
}
function pixelToGrid(px: number, py: number, containerWidth: number) {
  const cw = getColWidth(containerWidth)
  return {
    x: Math.max(0, Math.round(px / (cw + MARGIN_X))),
    y: Math.max(0, Math.round(py / (ROW_HEIGHT + MARGIN_Y))),
  }
}
function pixelSizeToGrid(pw: number, ph: number, containerWidth: number) {
  const cw = getColWidth(containerWidth)
  return {
    w: Math.max(1, Math.round((pw + MARGIN_X) / (cw + MARGIN_X))),
    h: Math.max(1, Math.round((ph + MARGIN_Y) / (ROW_HEIGHT + MARGIN_Y))),
  }
}

export default function DashboardCreatorPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { dashboardId } = useParams<{ dashboardId?: string }>()

  const [savedTables, setSavedTables] = useState<SavedTable[]>([])
  const [loadingTables, setLoadingTables] = useState(true)
  const [widgets, setWidgets] = useState<DashboardWidget[]>([])
  const [showTablePicker, setShowTablePicker] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [editMode, setEditMode] = useState(!dashboardId) // new dashboards start in edit mode
  const [configuringWidgetId, setConfiguringWidgetId] = useState<string | null>(null)
  const pickerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const gridContainerRef = useRef<HTMLDivElement>(null)
  const [gridWidth, setGridWidth] = useState(0)

  // Save state
  const [currentDashboardId, setCurrentDashboardId] = useState<string | null>(dashboardId ?? null)
  const [dashboardName, setDashboardName] = useState('Untitled Dashboard')
  const [isEditingName, setIsEditingName] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [loadingDashboard, setLoadingDashboard] = useState(!!dashboardId)

  // Measure grid container width reliably with ResizeObserver
  // Re-run when loadingDashboard changes so we catch the <main> appearing after load
  useLayoutEffect(() => {
    const el = gridContainerRef.current
    if (!el) return

    const measure = () => {
      // Subtract 16px so elements don't touch the right edge
      const w = Math.floor(el.clientWidth) - 16
      if (w > 0) setGridWidth(w)
    }

    measure()

    const observer = new ResizeObserver(() => measure())
    observer.observe(el)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [loadingDashboard])
  const nameInputRef = useRef<HTMLInputElement>(null)
  const initialLoadDone = useRef(false)
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const currentDashboardIdRef = useRef<string | null>(currentDashboardId)
  // Custom drag / resize transient state (ref for perf, counter to trigger re-render)
  const dragStateRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null)
  const resizeStateRef = useRef<{ id: string; deltaW: number; deltaH: number; deltaX: number; deltaY: number } | null>(null)
  const [, forceRender] = useState(0)
  const rafIdRef = useRef(0)
  // Always-current widgets ref so event listeners don't use stale data
  const widgetsRef = useRef(widgets)
  widgetsRef.current = widgets
  const gridWidthRef = useRef(gridWidth)
  gridWidthRef.current = gridWidth
  // Snapshot of widget positions captured at drag start, for split detection
  const preDragPositions = useRef<Map<string, { x: number; y: number; w: number; h: number }>>(new Map())

  // Track page view
  useEffect(() => {
    if (user?.uid) {
      trackPageView(user.uid, 'dashboard_builder', { dashboardId: dashboardId ?? 'new' })
    }
  }, [user?.uid, dashboardId])

  // Fetch saved tables
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

  // Load existing dashboard
  useEffect(() => {
    if (!dashboardId || !user?.uid || !db) {
      setLoadingDashboard(false)
      initialLoadDone.current = true
      return
    }

    setLoadingDashboard(true)
    getDoc(doc(db, 'users', user.uid, 'dashboards', dashboardId))
      .then((snap) => {
        if (snap.exists()) {
          const data = snap.data()
          setDashboardName(data.name ?? 'Untitled Dashboard')
          const elementDefaults: Record<string, { minW: number; minH: number }> = {
            heading: { minW: 4, minH: 6 },
            text:    { minW: 4, minH: 8 },
            divider: { minW: 4, minH: 3 },
            metric:  { minW: 3, minH: 16 },
            chart:   { minW: 6, minH: 28 },
            pivot:   { minW: 6, minH: 28 },
          }
          const loaded: DashboardWidget[] = (data.widgets ?? []).map((w: DashboardWidget) => {
            const wType = w.type || 'table'
            const mins = wType === 'table'
              ? { minW: WIDGET_MIN_W, minH: WIDGET_MIN_H }
              : elementDefaults[wType] ?? { minW: 4, minH: 2 }
            // Migrate from 48-col grid to 24-col: scale x and w by 0.5
            const needsMigration = w.w > GRID_COLS || w.x >= GRID_COLS
            const migrated = needsMigration
              ? { x: Math.round(w.x / 2), w: Math.max(mins.minW, Math.round(w.w / 2)) }
              : {}
            return { ...w, type: wType, ...mins, ...migrated }
          })
          setWidgets(loaded)
          setCurrentDashboardId(dashboardId)
        }
      })
      .catch((err) => {
        console.error('Failed to load dashboard:', err)
      })
      .finally(() => {
        setLoadingDashboard(false)
        // Small delay so the initial widget/name state changes don't trigger unsaved
        setTimeout(() => { initialLoadDone.current = true }, 100)
      })
  }, [dashboardId, user?.uid])

  // Close picker on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowTablePicker(false)
        setSearchQuery('')
      }
    }
    if (showTablePicker) {
      document.addEventListener('mousedown', handleClickOutside)
      setTimeout(() => searchInputRef.current?.focus(), 50)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showTablePicker])


  // Focus name input when editing
  useEffect(() => {
    if (isEditingName) {
      setTimeout(() => {
        nameInputRef.current?.focus()
        nameInputRef.current?.select()
      }, 50)
    }
  }, [isEditingName])

  const addWidget = useCallback(
    (table: SavedTable) => {
      const maxY = widgets.reduce((max, w) => Math.max(max, w.y + w.h), 0)
      const newWidget: DashboardWidget = {
        i: `widget-${Date.now()}`,
        type: 'table',
        tableId: table.id,
        tableName: table.tableName,
        x: 0,
        y: maxY,
        w: 12,
        h: 56,
        minW: WIDGET_MIN_W,
        minH: WIDGET_MIN_H,
      }
      setWidgets((prev) => [...prev, newWidget])
      setShowTablePicker(false)
      setSearchQuery('')
    },
    [widgets]
  )

  const addElement = useCallback(
    (elType: 'heading' | 'text' | 'divider' | 'metric' | 'chart' | 'pivot', chartType?: ChartType) => {
      const maxY = widgets.reduce((max, w) => Math.max(max, w.y + w.h), 0)
      const defaults: Record<string, { w: number; h: number; minW: number; minH: number; content: string }> = {
        heading: { w: 12, h: 8, minW: 4, minH: 6, content: 'Untitled Heading' },
        text:    { w: 12, h: 12, minW: 4, minH: 8, content: 'Enter your text here...' },
        divider: { w: GRID_MAX_W, h: 4, minW: 4, minH: 3, content: '' },
        metric:  { w: 6, h: 20, minW: 3, minH: 16, content: '' },
        chart:   { w: 12, h: 48, minW: 6, minH: 28, content: '' },
        pivot:   { w: 12, h: 56, minW: 6, minH: 28, content: '' },
      }
      const d = defaults[elType]
      const newWidget: DashboardWidget = {
        i: `element-${Date.now()}`,
        type: elType,
        tableId: '',
        tableName: '',
        content: d.content,
        x: 0,
        y: maxY,
        w: d.w,
        h: d.h,
        minW: d.minW,
        minH: d.minH,
        ...(elType === 'chart' && chartType ? { chartConfig: { chartType, tableId: '', categoryColumn: '', valueColumn: '', aggregation: 'count' as AggregationType, label: '' } } : {}),
        ...(elType === 'pivot' ? { pivotConfig: { tableId: '', rowColumns: [], colColumns: [], values: [] } } : {}),
      }
      setWidgets((prev) => [...prev, newWidget])
      setShowTablePicker(false)
      if (elType === 'metric' || elType === 'chart' || elType === 'pivot') {
        setConfiguringWidgetId(newWidget.i)
      }
    },
    [widgets]
  )

  const removeWidget = useCallback((widgetId: string) => {
    setWidgets((prev) => prev.filter((w) => w.i !== widgetId))
    setConfiguringWidgetId((prev) => prev === widgetId ? null : prev)
  }, [])

  const duplicateWidget = useCallback((widgetId: string) => {
    setWidgets((prev) => {
      const source = prev.find((w) => w.i === widgetId)
      if (!source) return prev
      const maxY = prev.reduce((max, w) => Math.max(max, w.y + w.h), 0)
      const clone: DashboardWidget = {
        ...JSON.parse(JSON.stringify(source)),
        i: `${source.type}-${Date.now()}`,
        y: maxY,
        x: source.x,
      }
      return [...prev, clone]
    })
  }, [])

  const updateWidgetContent = useCallback((widgetId: string, content: string) => {
    setWidgets((prev) => prev.map((w) => w.i === widgetId ? { ...w, content } : w))
  }, [])

  const updateWidgetMetricConfig = useCallback((widgetId: string, config: MetricConfig) => {
    setWidgets((prev) => prev.map((w) => w.i === widgetId ? { ...w, metricConfig: config } : w))
  }, [])

  const updateWidgetChartConfig = useCallback((widgetId: string, config: ChartConfig) => {
    setWidgets((prev) => prev.map((w) => w.i === widgetId ? { ...w, chartConfig: config } : w))
  }, [])

  const updateWidgetElementConfig = useCallback((widgetId: string, config: ElementConfig) => {
    setWidgets((prev) => prev.map((w) => w.i === widgetId ? { ...w, elementConfig: config } : w))
  }, [])

  const updateWidgetPivotConfig = useCallback((widgetId: string, config: PivotConfig) => {
    setWidgets((prev) => prev.map((w) => w.i === widgetId ? { ...w, pivotConfig: config } : w))
  }, [])

  const updateWidgetConditionalFormats = useCallback((widgetId: string, rules: ConditionalFormatRule[]) => {
    setWidgets((prev) => prev.map((w) => w.i === widgetId ? { ...w, conditionalFormats: rules } : w))
  }, [])

  const updateWidgetDisplayName = useCallback((widgetId: string, displayName: string) => {
    setWidgets((prev) => prev.map((w) => w.i === widgetId ? { ...w, displayName } : w))
  }, [])

  const updateWidgetColumnAlias = useCallback((widgetId: string, sourcePath: string, alias: string) => {
    setWidgets((prev) => prev.map((w) => {
      if (w.i !== widgetId) return w
      const columnAliases = { ...(w.columnAliases ?? {}), [sourcePath]: alias }
      return { ...w, columnAliases }
    }))
  }, [])

  const updateWidgetFilters = useCallback((widgetId: string, filters: WidgetFilter[]) => {
    setWidgets((prev) => prev.map((w) => w.i === widgetId ? { ...w, filters } : w))
  }, [])

  const updateWidgetHiddenColumns = useCallback((widgetId: string, hiddenColumns: string[]) => {
    setWidgets((prev) => prev.map((w) => w.i === widgetId ? { ...w, hiddenColumns } : w))
  }, [])

  const updateWidgetColumnOrder = useCallback((widgetId: string, columnOrder: string[]) => {
    setWidgets((prev) => prev.map((w) => w.i === widgetId ? { ...w, columnOrder } : w))
  }, [])

  const autoLayoutDashboard = useCallback(() => {
    setWidgets((prev) => {
      if (prev.length === 0) return prev

      // Sort widgets into type groups with priority ordering
      const metrics = prev.filter((w) => w.type === 'metric')
      const headings = prev.filter((w) => w.type === 'heading')
      const texts = prev.filter((w) => w.type === 'text')
      const dividers = prev.filter((w) => w.type === 'divider')
      const charts = prev.filter((w) => w.type === 'chart')
      const pivots = prev.filter((w) => w.type === 'pivot')
      const tables = prev.filter((w) => w.type === 'table' || !w.type)

      const GAP = 2 // vertical gap in row units (ROW_HEIGHT=4, so 2 units = 8px)
      let cursorY = 0

      const placed: DashboardWidget[] = []

      // Helper: place a row of items side by side, auto-sizing width
      const placeRow = (items: DashboardWidget[], height: number, minItemW: number) => {
        if (items.length === 0) return
        const count = items.length
        // Fit as many per row as possible
        const perRow = Math.min(count, Math.floor(GRID_MAX_W / minItemW))
        const itemW = Math.floor(GRID_MAX_W / perRow)

        for (let i = 0; i < items.length; i++) {
          const col = i % perRow
          const row = Math.floor(i / perRow)
          const x = col * itemW
          // Last item in row stretches to fill
          const w = col === perRow - 1 ? GRID_MAX_W - x : itemW
          placed.push({
            ...items[i],
            x,
            y: cursorY + row * (height + GAP),
            w,
            h: height,
          })
        }
        const totalRows = Math.ceil(items.length / perRow)
        cursorY += totalRows * (height + GAP)
      }

      // Helper: place items full width stacked
      const placeFullWidth = (items: DashboardWidget[], height: number) => {
        for (const item of items) {
          placed.push({
            ...item,
            x: 0,
            y: cursorY,
            w: GRID_MAX_W,
            h: height,
          })
          cursorY += height + GAP
        }
      }

      // 1. Headings at the very top (full width, compact)
      if (headings.length > 0) {
        placeFullWidth(headings, 8)
      }

      // 2. Text blocks (full width)
      if (texts.length > 0) {
        placeFullWidth(texts, 12)
      }

      // 3. Divider
      if (metrics.length > 0 && (headings.length > 0 || texts.length > 0)) {
        // Add a small gap
        cursorY += GAP
      }

      // 4. Metric cards — arrange in a row (auto-fit 3-4 per row)
      if (metrics.length > 0) {
        const metricMinW = 6
        placeRow(metrics, 20, metricMinW)
      }

      // 5. Dividers between sections
      if (dividers.length > 0) {
        placeFullWidth(dividers.slice(0, 1), 4)
        // Extra dividers get dropped at the end
      }

      // 6. Charts — 2 per row if multiple, full width if single
      if (charts.length > 0) {
        if (charts.length === 1) {
          placeFullWidth(charts, 48)
        } else {
          placeRow(charts, 48, 12)
        }
      }

      // 7. Pivot tables
      if (pivots.length > 0) {
        if (pivots.length === 1) {
          placeFullWidth(pivots, 56)
        } else {
          placeRow(pivots, 56, 12)
        }
      }

      // 8. Tables — full width, generous height
      if (tables.length > 0) {
        if (tables.length === 1) {
          placeFullWidth(tables, 56)
        } else {
          for (const t of tables) {
            placed.push({
              ...t,
              x: 0,
              y: cursorY,
              w: GRID_MAX_W,
              h: 56,
            })
            cursorY += 56 + GAP
          }
        }
      }

      // Place any remaining dividers
      if (dividers.length > 1) {
        for (const d of dividers.slice(1)) {
          placed.push({ ...d, x: 0, y: cursorY, w: GRID_MAX_W, h: 4 })
          cursorY += 4 + GAP
        }
      }

      return placed
    })
  }, [])

  const toggleFullWidth = useCallback((widgetId: string) => {
    setWidgets((prev) =>
      prev.map((w) => {
        if (w.i !== widgetId) return w
        const isCurrentlyFull = w.x === 0 && w.w >= GRID_MAX_W
        if (isCurrentlyFull) {
          return { ...w, x: 0, w: 12 }
        }
        return { ...w, x: 0, w: GRID_MAX_W }
      })
    )
  }, [])

  /* ---- Custom drag handler ---- */
  const startDrag = useCallback((widgetId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startY = e.clientY

    // Snapshot all positions for split detection
    const snap = new Map<string, { x: number; y: number; w: number; h: number }>()
    widgetsRef.current.forEach((w) => snap.set(w.i, { x: w.x, y: w.y, w: w.w, h: w.h }))
    preDragPositions.current = snap

    setIsDragging(true)
    dragStateRef.current = { id: widgetId, offsetX: 0, offsetY: 0 }
    forceRender((n) => n + 1)

    const onMove = (me: MouseEvent) => {
      dragStateRef.current = { id: widgetId, offsetX: me.clientX - startX, offsetY: me.clientY - startY }
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = requestAnimationFrame(() => forceRender((n) => n + 1))
    }

    const onUp = (me: MouseEvent) => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(rafIdRef.current)

      const dx = me.clientX - startX
      const dy = me.clientY - startY
      const w = widgetsRef.current.find((ww) => ww.i === widgetId)
      if (w) {
        const gw = gridWidthRef.current
        const pos = gridToPixel(w.x, w.y, w.w, w.h, gw)
        const ng = pixelToGrid(pos.left + dx, pos.top + dy, gw)
        const newX = Math.max(0, Math.min(ng.x, GRID_COLS - w.w))
        const newY = Math.max(0, ng.y)

        // Check overlap for split
        const draggedNew = { x: newX, y: newY, w: w.w, h: w.h }
        let bestTarget: { id: string; overlapPct: number } | null = null
        preDragPositions.current.forEach((tp, tid) => {
          if (tid === widgetId) return
          const yOver = draggedNew.y < tp.y + tp.h && draggedNew.y + draggedNew.h > tp.y
          const xOver = draggedNew.x < tp.x + tp.w && draggedNew.x + draggedNew.w > tp.x
          if (!yOver || !xOver) return
          const ox = Math.min(draggedNew.x + draggedNew.w, tp.x + tp.w) - Math.max(draggedNew.x, tp.x)
          const oy = Math.min(draggedNew.y + draggedNew.h, tp.y + tp.h) - Math.max(draggedNew.y, tp.y)
          const pct = (ox * oy) / (tp.w * tp.h)
          if (pct > 0.1 && (!bestTarget || pct > bestTarget.overlapPct)) {
            bestTarget = { id: tid, overlapPct: pct }
          }
        })

        if (bestTarget) {
          const targetPos = preDragPositions.current.get(bestTarget.id)!
          const halfW = Math.max(Math.floor(GRID_MAX_W / 2), 4)
          const topY = Math.min(draggedNew.y, targetPos.y)
          const maxH = Math.max(draggedNew.h, targetPos.h)
          setWidgets((prev) =>
            prev.map((ww) => {
              if (ww.i === bestTarget!.id) return { ...ww, x: 0, y: topY, w: halfW, h: maxH }
              if (ww.i === widgetId) return { ...ww, x: halfW, y: topY, w: GRID_MAX_W - halfW, h: maxH }
              return ww
            })
          )
        } else {
          setWidgets((prev) =>
            prev.map((ww) => (ww.i === widgetId ? { ...ww, x: newX, y: newY } : ww))
          )
        }
      }

      dragStateRef.current = null
      setIsDragging(false)
      forceRender((n) => n + 1)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [])

  /* ---- Custom resize handler ---- */
  const startResize = useCallback((widgetId: string, handle: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startY = e.clientY

    setIsDragging(true)
    resizeStateRef.current = { id: widgetId, deltaW: 0, deltaH: 0, deltaX: 0, deltaY: 0 }
    forceRender((n) => n + 1)

    const onMove = (me: MouseEvent) => {
      const dx = me.clientX - startX
      const dy = me.clientY - startY
      let dw = 0, dh = 0, dxPos = 0, dyPos = 0
      if (handle.includes('e')) dw = dx
      if (handle.includes('s')) dh = dy
      if (handle.includes('w')) { dw = -dx; dxPos = dx }
      if (handle.includes('n')) { dh = -dy; dyPos = dy }
      resizeStateRef.current = { id: widgetId, deltaW: dw, deltaH: dh, deltaX: dxPos, deltaY: dyPos }
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = requestAnimationFrame(() => forceRender((n) => n + 1))
    }

    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(rafIdRef.current)

      const rs = resizeStateRef.current
      const w = widgetsRef.current.find((ww) => ww.i === widgetId)
      if (w && rs) {
        const gw = gridWidthRef.current
        const orig = gridToPixel(w.x, w.y, w.w, w.h, gw)
        const newPxW = Math.max(50, orig.width + rs.deltaW)
        const newPxH = Math.max(20, orig.height + rs.deltaH)
        const newPxL = orig.left + rs.deltaX
        const newPxT = orig.top + rs.deltaY
        const newPos = pixelToGrid(newPxL, newPxT, gw)
        const newSize = pixelSizeToGrid(newPxW, newPxH, gw)
        const minW = w.minW ?? WIDGET_MIN_W
        const minH = w.minH ?? WIDGET_MIN_H
        const clampedW = Math.max(minW, Math.min(newSize.w, GRID_MAX_W - newPos.x))
        const clampedH = Math.max(minH, newSize.h)
        setWidgets((prev) =>
          prev.map((ww) =>
            ww.i === widgetId
              ? { ...ww, x: Math.max(0, newPos.x), y: Math.max(0, newPos.y), w: clampedW, h: clampedH }
              : ww
          )
        )
      }

      resizeStateRef.current = null
      setIsDragging(false)
      forceRender((n) => n + 1)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [])

  // Keep ref in sync for use inside autosave
  useEffect(() => {
    currentDashboardIdRef.current = currentDashboardId
  }, [currentDashboardId])

  // Core save function (used by autosave and manual trigger)
  const performSave = useCallback(async (
    widgetsToSaveRaw: DashboardWidget[],
    nameToSave: string
  ) => {
    if (!user?.uid || !db || !nameToSave.trim()) return
    setSaving(true)
    setSaveStatus('saving')
    try {
      const id = currentDashboardIdRef.current ?? crypto.randomUUID()
      const widgetsToSave = widgetsToSaveRaw.map(({ minW, minH, ...rest }) => rest)

      const isNew = !currentDashboardIdRef.current
      const payload: Record<string, unknown> = {
        name: nameToSave.trim(),
        widgets: widgetsToSave,
        updatedAt: serverTimestamp(),
      }
      if (isNew) {
        payload.createdAt = serverTimestamp()
      }

      await setDoc(
        doc(db, 'users', user.uid, 'dashboards', id),
        payload,
        { merge: true }
      )

      // Track dashboard save metric
      trackDashboardSaved(user.uid, id, nameToSave.trim(), widgetsToSave.length, isNew)

      if (!currentDashboardIdRef.current) {
        setCurrentDashboardId(id)
        currentDashboardIdRef.current = id
        // Update URL without triggering React Router remount
        window.history.replaceState(null, '', `/dashboard-builder/${id}`)
      }

      setSaveStatus('saved')
      setTimeout(() => setSaveStatus((s) => s === 'saved' ? 'idle' : s), 2000)
    } catch (err) {
      console.error('Save failed:', err)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus((s) => s === 'error' ? 'idle' : s), 3000)
    } finally {
      setSaving(false)
    }
  }, [user?.uid])

  // Autosave: debounced 1.5s after any change to widgets or name
  useEffect(() => {
    if (!initialLoadDone.current) return
    if (widgets.length === 0) return // Don't save empty dashboards

    if (autosaveTimer.current) clearTimeout(autosaveTimer.current)
    autosaveTimer.current = setTimeout(() => {
      performSave(widgets, dashboardName)
    }, 1500)

    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current)
    }
  }, [widgets, dashboardName, performSave])

  // Keyboard shortcut: Cmd/Ctrl+S to save immediately
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        if (widgets.length === 0) return
        if (autosaveTimer.current) clearTimeout(autosaveTimer.current)
        performSave(widgets, dashboardName)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [widgets, dashboardName, performSave])

  const getTableForWidget = useCallback(
    (tableId: string) => savedTables.find((t) => t.id === tableId),
    [savedTables]
  )

  const filteredTables = savedTables.filter((t) =>
    t.tableName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addedTableIds = new Set(widgets.map((w) => w.tableId))

  // Grid canvas minimum height — ensures there's always room to drag below the last widget
  const canvasMinHeight = useMemo(() => {
    if (!editMode) return undefined
    const maxBottom = widgets.reduce((max, w) => Math.max(max, (w.y + w.h) * (ROW_HEIGHT + MARGIN_Y)), 0)
    return Math.max(window.innerHeight, maxBottom + 600)
  }, [editMode, widgets])

  // Show loading spinner while loading a saved dashboard
  if (loadingDashboard) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Loader2 size={16} className="animate-spin" />
          Loading dashboard…
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shrink-0 z-50">
        <div className="px-6 h-14 flex items-center justify-between">
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
            <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
              <LayoutDashboard size={14} className="text-gray-400" />
              {isEditingName && editMode ? (
                <input
                  ref={nameInputRef}
                  type="text"
                  value={dashboardName}
                  onChange={(e) => setDashboardName(e.target.value)}
                  onBlur={() => {
                    if (!dashboardName.trim()) setDashboardName('Untitled Dashboard')
                    setIsEditingName(false)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (!dashboardName.trim()) setDashboardName('Untitled Dashboard')
                      setIsEditingName(false)
                    }
                    if (e.key === 'Escape') {
                      setIsEditingName(false)
                    }
                  }}
                  className="text-sm font-medium text-gray-900 dark:text-gray-100 bg-transparent border-b border-gray-300 dark:border-gray-500 focus:border-gray-500 focus:outline-none px-0 py-0 w-48"
                />
              ) : editMode ? (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="flex items-center gap-1.5 font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors group/name"
                >
                  {dashboardName}
                  <Pencil size={11} className="text-gray-300 group-hover/name:text-gray-500 transition-colors" />
                </button>
              ) : (
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {dashboardName}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</span>
            {user?.photoURL && (
              <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full" />
            )}
            <DarkModeToggle />
            <button
              onClick={signOut}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              title="Sign out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Edit / View mode toggle */}
            <div className="flex items-center bg-gray-100 p-0.5 rounded-md w-fit">
              <button
                onClick={() => setEditMode(false)}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors',
                  !editMode
                    ? 'text-gray-800 bg-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-200/70'
                )}
              >
                <Lock className="h-3 w-3" />
                View
              </button>
              <button
                onClick={() => setEditMode(true)}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors',
                  editMode
                    ? 'text-gray-800 bg-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-200/70'
                )}
              >
                <Pencil className="h-3 w-3" />
                Edit
              </button>
            </div>

            {editMode && (
              <>
                <div className="h-5 w-px bg-gray-200 mx-1" />
                <div className="relative" ref={pickerRef}>
                  <button
                    onClick={() => setShowTablePicker(!showTablePicker)}
                    className="flex items-center gap-1 bg-gray-900 text-white text-xs font-medium rounded-md px-2.5 py-1.5 hover:bg-gray-800 transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                    Add
                    <ChevronDown className={cn('h-3 w-3 text-gray-400 transition-transform duration-200', showTablePicker && 'rotate-180')} />
                  </button>

                  {/* Combined Add Dropdown */}
                  <AnimatePresence>
                    {showTablePicker && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.04, 0.62, 0.23, 0.98],
                        }}
                        className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden z-50"
                      >
                        {/* Elements section */}
                        <div className="p-2">
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-1.5 mb-1.5">Elements</p>
                          {([
                            { type: 'heading' as const, icon: Type, label: 'Heading', chart: undefined },
                            { type: 'text' as const, icon: AlignLeft, label: 'Text', chart: undefined },
                            { type: 'divider' as const, icon: Minus, label: 'Divider', chart: undefined },
                            { type: 'metric' as const, icon: Gauge, label: 'Metric', chart: undefined },
                            { type: 'chart' as const, icon: BarChart3, label: 'Bar Chart', chart: 'bar' as ChartType },
                            { type: 'chart' as const, icon: TrendingUp, label: 'Line Chart', chart: 'line' as ChartType },
                            { type: 'pivot' as const, icon: Grid3X3, label: 'Pivot Table', chart: undefined },
                          ]).map(({ type, icon: Icon, label, chart }) => (
                            <button
                              key={label}
                              onClick={() => addElement(type, chart)}
                              className="w-full flex items-center gap-2.5 px-2 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                            >
                              <Icon size={14} className="text-gray-400 shrink-0" />
                              {label}
                            </button>
                          ))}
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-700" />

                        {/* Tables section */}
                        <div className="p-2 pb-1.5">
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-1.5 mb-1.5">Tables</p>
                          <div className="relative px-0.5">
                            <Search
                              size={13}
                              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                              ref={searchInputRef}
                              type="text"
                              placeholder="Search tables..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full text-xs border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md pl-7 pr-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-300"
                            />
                          </div>
                        </div>
                        <div className="max-h-48 overflow-y-auto px-2 pb-2">
                          {loadingTables ? (
                            <div className="flex items-center gap-2 text-xs text-gray-500 py-4 justify-center">
                              <Loader2 size={13} className="animate-spin" />
                              Loading tables…
                            </div>
                          ) : filteredTables.length === 0 ? (
                            <div className="py-4 text-center">
                              <p className="text-xs text-gray-500">
                                {searchQuery ? 'No matching tables.' : 'No saved tables yet.'}
                              </p>
                            </div>
                          ) : (
                            filteredTables.map((table) => {
                              const isAdded = addedTableIds.has(table.id)
                              return (
                                <button
                                  key={table.id}
                                  onClick={() => addWidget(table)}
                                  className={cn(
                                    'w-full flex items-center gap-2.5 px-2 py-1.5 text-left rounded-md transition-colors cursor-pointer',
                                    isAdded
                                      ? 'opacity-50'
                                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                  )}
                                >
                                  <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center shrink-0">
                                    <Table size={12} className="text-gray-400" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
                                      {table.tableName}
                                    </p>
                                    <p className="text-[10px] text-gray-400 truncate leading-tight">
                                      {table.projectId === '__query__' ? 'SQL Query' : table.collectionPath}
                                    </p>
                                  </div>
                                  {isAdded && (
                                    <span className="text-[9px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md shrink-0">
                                      Added
                                    </span>
                                  )}
                                </button>
                              )
                            })
                          )}
                        </div>

                        {/* Build table link */}
                        <div className="border-t border-gray-100 dark:border-gray-700" />
                        <div className="p-2">
                          <button
                            onClick={() => {
                              setShowTablePicker(false)
                              const proj = savedTables.find((t) => t.projectId && t.projectId !== '__query__')
                              navigate(proj ? `/project/${proj.projectId}` : '/dashboard')
                            }}
                            className="w-full flex items-center gap-2.5 px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                          >
                            <Plus size={14} className="text-gray-400 shrink-0" />
                            Build a New Table
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {widgets.length > 0 && (
                  <>
                    <div className="h-5 w-px bg-gray-200 mx-1" />
                    <button
                      onClick={autoLayoutDashboard}
                      className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                      title="Auto-format dashboard layout"
                    >
                      <Wand2 className="h-3 w-3" />
                      Auto-layout
                    </button>
                  </>
                )}
              </>
            )}

            <div className="h-5 w-px bg-gray-200 mx-1" />

            <span className="text-xs text-gray-400">
              {widgets.length} {widgets.length === 1 ? 'item' : 'items'} on canvas
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Autosave status */}
            <div className="flex items-center gap-1.5 text-xs text-gray-400 min-w-[80px] justify-end">
              {saveStatus === 'saving' && (
                <>
                  <Loader2 size={11} className="animate-spin text-gray-400" />
                  <span>Saving…</span>
                </>
              )}
              {saveStatus === 'saved' && (
                <>
                  <Check size={11} className="text-green-500" />
                  <span className="text-green-600">Saved</span>
                </>
              )}
              {saveStatus === 'error' && (
                <>
                  <AlertCircle size={11} className="text-red-400" />
                  <span className="text-red-500">Save failed</span>
                </>
              )}
              {saveStatus === 'idle' && currentDashboardId && (
                <>
                  <Check size={11} className="text-gray-300" />
                  <span>All changes saved</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body: grid + optional side panel */}
      <div className="flex flex-1 min-h-0">
      {/* Grid Canvas — full width, no max constraint */}
      <main className="flex-1 px-6 py-6 overflow-y-auto min-w-0" style={{ overflowX: 'clip' }}>
        <div ref={gridContainerRef} className="w-full">
        {widgets.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-16 h-16 bg-white rounded-xl border border-gray-200 flex items-center justify-center mb-4 shadow-sm">
              <LayoutDashboard size={24} className="text-gray-300" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              {editMode ? 'Start building your dashboard' : 'Nothing here yet'}
            </h3>
            <p className="text-sm text-gray-500 mb-5 text-center max-w-sm">
              {editMode
                ? 'Add tables and elements to the canvas. Drag to reposition, resize from corners.'
                : 'Switch to Edit mode to add content to this dashboard.'}
            </p>
            {editMode && (
              <button
                onClick={() => setShowTablePicker(true)}
                className="flex items-center gap-1.5 bg-gray-900 text-white text-sm font-medium rounded-md px-4 py-2 hover:bg-gray-800 transition-colors"
              >
                <Plus size={14} />
                Add to Dashboard
              </button>
            )}
          </div>
        ) : gridWidth > 0 ? (
          /* Grid Layout */
          <div
            className={cn(
              'dashboard-grid relative',
              isDragging && 'is-dragging',
              !editMode && 'view-mode'
            )}
          >
            {/* Custom absolute-positioned grid canvas */}
            <div
              className="relative"
              style={{ minHeight: canvasMinHeight }}
            >
              {widgets.map((widget) => {
                const pos = gridToPixel(widget.x, widget.y, widget.w, widget.h, gridWidth)
                const drag = dragStateRef.current
                const rsz = resizeStateRef.current
                const isDrag = drag?.id === widget.i
                const isRsz = rsz?.id === widget.i

                let left = pos.left
                let top = pos.top
                let width = pos.width
                let height = pos.height

                if (isDrag && drag) {
                  left += drag.offsetX
                  top += drag.offsetY
                }
                if (isRsz && rsz) {
                  left += rsz.deltaX
                  top += rsz.deltaY
                  width = Math.max(50, width + rsz.deltaW)
                  height = Math.max(20, height + rsz.deltaH)
                }

                const renderWidget = () => {
                  if (widget.type === 'table' || !widget.type) {
                    const table = getTableForWidget(widget.tableId)
                    return (
                      <WidgetCard
                        widget={widget}
                        table={table}
                        accessToken={user?.accessToken ?? null}
                        isFullWidth={widget.x === 0 && widget.w >= GRID_MAX_W}
                        editMode={editMode}
                        onRemove={() => removeWidget(widget.i)}
                        onDuplicate={() => duplicateWidget(widget.i)}
                        onToggleFullWidth={() => toggleFullWidth(widget.i)}
                        onDisplayNameChange={(name) => updateWidgetDisplayName(widget.i, name)}
                        onColumnAliasChange={(sourcePath, alias) => updateWidgetColumnAlias(widget.i, sourcePath, alias)}
                        onFiltersChange={(filters) => updateWidgetFilters(widget.i, filters)}
                        onHiddenColumnsChange={(cols) => updateWidgetHiddenColumns(widget.i, cols)}
                        onColumnOrderChange={(order) => updateWidgetColumnOrder(widget.i, order)}
                        onOpenConfig={() => setConfiguringWidgetId(widget.i)}
                        onOpenTable={() => {
                          if (!table) return
                          if (table.projectId === '__query__') {
                            navigate(`/query-table/${table.id}`)
                          } else {
                            navigate(
                              `/project/${table.projectId}/collection/${encodeURIComponent(table.collectionPath)}?tableId=${table.id}&mode=view${table.isCollectionGroup ? '&group=true' : ''}`
                            )
                          }
                        }}
                      />
                    )
                  }
                  if (widget.type === 'metric') {
                    return (
                      <MetricCard
                        widget={widget}
                        savedTables={savedTables}
                        accessToken={user?.accessToken ?? null}
                        editMode={editMode}
                        onRemove={() => removeWidget(widget.i)}
                        onDuplicate={() => duplicateWidget(widget.i)}
                        onOpenConfig={() => setConfiguringWidgetId(widget.i)}
                        onLabelChange={(label) => {
                          if (widget.metricConfig) {
                            updateWidgetMetricConfig(widget.i, { ...widget.metricConfig, label })
                          }
                        }}
                        onFiltersChange={(filters) => updateWidgetFilters(widget.i, filters)}
                      />
                    )
                  }
                  if (widget.type === 'chart') {
                    return (
                      <ChartCard
                        widget={widget}
                        savedTables={savedTables}
                        accessToken={user?.accessToken ?? null}
                        editMode={editMode}
                        onRemove={() => removeWidget(widget.i)}
                        onDuplicate={() => duplicateWidget(widget.i)}
                        onOpenConfig={() => setConfiguringWidgetId(widget.i)}
                        onLabelChange={(label) => {
                          if (widget.chartConfig) {
                            updateWidgetChartConfig(widget.i, { ...widget.chartConfig, label })
                          }
                        }}
                        onFiltersChange={(filters) => updateWidgetFilters(widget.i, filters)}
                      />
                    )
                  }
                  if (widget.type === 'pivot') {
                    return (
                      <PivotCard
                        widget={widget}
                        savedTables={savedTables}
                        accessToken={user?.accessToken ?? null}
                        editMode={editMode}
                        onRemove={() => removeWidget(widget.i)}
                        onDuplicate={() => duplicateWidget(widget.i)}
                        onOpenConfig={() => setConfiguringWidgetId(widget.i)}
                        onDisplayNameChange={(name) => updateWidgetDisplayName(widget.i, name)}
                        onPivotConfigChange={(config) => updateWidgetPivotConfig(widget.i, config)}
                      />
                    )
                  }
                  return (
                    <ElementCard
                      widget={widget}
                      editMode={editMode}
                      isSelected={configuringWidgetId === widget.i}
                      onRemove={() => removeWidget(widget.i)}
                      onDuplicate={() => duplicateWidget(widget.i)}
                      onContentChange={(content) => updateWidgetContent(widget.i, content)}
                      onOpenConfig={() => setConfiguringWidgetId(widget.i)}
                    />
                  )
                }

                return (
                  <div
                    key={widget.i}
                    data-widget-id={widget.i}
                    className={cn(
                      'group absolute',
                      isDrag && 'z-50 opacity-95 shadow-lg',
                      isRsz && 'z-50',
                      isDragging && !isDrag && !isRsz && 'opacity-50',
                    )}
                    style={{
                      left,
                      top,
                      width,
                      height,
                      transition: (isDrag || isRsz || isDragging) ? 'none' : 'left 150ms ease, top 150ms ease, width 150ms ease, height 150ms ease',
                      willChange: (isDrag || isRsz) ? 'left, top, width, height' : undefined,
                    }}
                    onMouseDown={(e) => {
                      if (!editMode) return
                      const handle = (e.target as HTMLElement).closest('.widget-drag-handle')
                      if (handle) startDrag(widget.i, e)
                    }}
                  >
                    <div className="w-full h-full overflow-hidden">
                      {renderWidget()}
                    </div>

                    {/* Resize handles (edit mode only) */}
                    {editMode && (
                      <>
                        {/* East */}
                        <div
                          className="absolute top-0 right-[-4px] w-[10px] h-full cursor-e-resize group/rh"
                          onMouseDown={(e) => startResize(widget.i, 'e', e)}
                        >
                          <div className="absolute right-[3px] top-1/2 -translate-y-1/2 w-[4px] h-[24px] rounded-sm bg-gray-300 opacity-0 group-hover:opacity-100 group-hover/rh:opacity-100 transition-opacity" />
                        </div>
                        {/* West */}
                        <div
                          className="absolute top-0 left-[-4px] w-[10px] h-full cursor-w-resize group/rh"
                          onMouseDown={(e) => startResize(widget.i, 'w', e)}
                        >
                          <div className="absolute left-[3px] top-1/2 -translate-y-1/2 w-[4px] h-[24px] rounded-sm bg-gray-300 opacity-0 group-hover:opacity-100 group-hover/rh:opacity-100 transition-opacity" />
                        </div>
                        {/* South */}
                        <div
                          className="absolute bottom-[-4px] left-0 h-[10px] w-full cursor-s-resize group/rh"
                          onMouseDown={(e) => startResize(widget.i, 's', e)}
                        >
                          <div className="absolute bottom-[3px] left-1/2 -translate-x-1/2 h-[4px] w-[24px] rounded-sm bg-gray-300 opacity-0 group-hover:opacity-100 group-hover/rh:opacity-100 transition-opacity" />
                        </div>
                        {/* Southeast corner */}
                        <div
                          className="absolute bottom-[-4px] right-[-4px] w-[14px] h-[14px] cursor-se-resize group/rh"
                          onMouseDown={(e) => startResize(widget.i, 'se', e)}
                        >
                          <div className="absolute right-[2px] bottom-[2px] w-[8px] h-[8px] rounded-sm bg-gray-300 opacity-0 group-hover:opacity-100 group-hover/rh:opacity-100 transition-opacity" />
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}
        </div>
      </main>

      {/* Right side config panel */}
      <AnimatePresence>
        {configuringWidgetId && (() => {
          const cWidget = widgets.find((w) => w.i === configuringWidgetId)
          if (!cWidget) return null
          // All widget types now have config panels
          const hasConfigPanel = ['table', 'metric', 'chart', 'heading', 'text', 'pivot'].includes(cWidget.type) || !cWidget.type
          if (!hasConfigPanel) return null
          return (
            <motion.aside
              key="config-panel"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 340, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="bg-white border-l border-gray-200 shrink-0 overflow-hidden h-full"
            >
              <div className="w-[340px] h-full">
                {(cWidget.type === 'table' || !cWidget.type) ? (
                  <TableConfigPanel
                    key={configuringWidgetId}
                    widget={cWidget}
                    table={getTableForWidget(cWidget.tableId)}
                    onHiddenColumnsChange={(cols) => updateWidgetHiddenColumns(cWidget.i, cols)}
                    onColumnAliasChange={(sp, alias) => updateWidgetColumnAlias(cWidget.i, sp, alias)}
                    onColumnOrderChange={(order) => updateWidgetColumnOrder(cWidget.i, order)}
                    onConditionalFormatsChange={(rules) => updateWidgetConditionalFormats(cWidget.i, rules)}
                    onClose={() => setConfiguringWidgetId(null)}
                  />
                ) : cWidget.type === 'metric' ? (
                  <MetricConfigPanel
                    key={configuringWidgetId}
                    widget={cWidget}
                    savedTables={savedTables}
                    onApply={(config) => {
                      updateWidgetMetricConfig(cWidget.i, config)
                    }}
                    onClose={() => setConfiguringWidgetId(null)}
                  />
                ) : cWidget.type === 'chart' ? (
                  <ChartConfigPanel
                    key={configuringWidgetId}
                    widget={cWidget}
                    savedTables={savedTables}
                    onApply={(config) => {
                      updateWidgetChartConfig(cWidget.i, config)
                    }}
                    onClose={() => setConfiguringWidgetId(null)}
                  />
                ) : (cWidget.type === 'heading' || cWidget.type === 'text') ? (
                  <ElementConfigPanel
                    key={configuringWidgetId}
                    widget={cWidget}
                    onApply={(config) => updateWidgetElementConfig(cWidget.i, config)}
                    onClose={() => setConfiguringWidgetId(null)}
                  />
                ) : cWidget.type === 'pivot' ? (
                  <PivotConfigPanel
                    key={configuringWidgetId}
                    widget={cWidget}
                    savedTables={savedTables}
                    onApply={(config) => updateWidgetPivotConfig(cWidget.i, config)}
                    onConditionalFormatsChange={(rules) => updateWidgetConditionalFormats(cWidget.i, rules)}
                    onClose={() => setConfiguringWidgetId(null)}
                  />
                ) : null}
              </div>
            </motion.aside>
          )
        })()}
      </AnimatePresence>
      </div>

      {/* Custom grid styling */}
      <style>{`
        .widget-drag-handle { cursor: grab; }
        .widget-drag-handle:active { cursor: grabbing; }
      `}</style>
    </div>
  )
}

/* ---- Sort helpers ---- */

type SortDir = 'asc' | 'desc' | null

function compareCellValues(a: unknown, b: unknown): number {
  // Nulls/undefined always last
  if (a == null && b == null) return 0
  if (a == null) return 1
  if (b == null) return -1

  // Numbers
  if (typeof a === 'number' && typeof b === 'number') return a - b

  // Booleans
  if (typeof a === 'boolean' && typeof b === 'boolean') return a === b ? 0 : a ? -1 : 1

  // Default: string comparison
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' })
}

function sortRows(
  rows: Record<string, unknown>[],
  sortCol: string | null,
  sortDir: SortDir
): Record<string, unknown>[] {
  if (!sortCol || !sortDir) return rows
  const sorted = [...rows].sort((a, b) => {
    const cmp = compareCellValues(a[sortCol], b[sortCol])
    return sortDir === 'desc' ? -cmp : cmp
  })
  return sorted
}

/* ---- Filter helpers ---- */

const FILTER_OPERATORS: { value: FilterOperator; label: string }[] = [
  { value: 'equals', label: 'Equals' },
  { value: 'not_equals', label: 'Does not equal' },
  { value: 'contains', label: 'Contains' },
  { value: 'not_contains', label: 'Does not contain' },
  { value: 'starts_with', label: 'Starts with' },
  { value: 'gt', label: 'Greater than' },
  { value: 'gte', label: 'Greater or equal' },
  { value: 'lt', label: 'Less than' },
  { value: 'lte', label: 'Less or equal' },
  { value: 'is_empty', label: 'Is empty' },
  { value: 'is_not_empty', label: 'Is not empty' },
]

function applyWidgetFilters(
  rows: Record<string, unknown>[],
  filters: WidgetFilter[] | undefined
): Record<string, unknown>[] {
  if (!filters || filters.length === 0) return rows

  return rows.filter((row) =>
    filters.every((f) => {
      if (!f.column || !f.operator) return true
      const raw = row[f.column]
      const strVal = raw == null ? '' : String(raw).toLowerCase()
      const filterVal = (f.value ?? '').toLowerCase()

      switch (f.operator) {
        case 'equals': return strVal === filterVal
        case 'not_equals': return strVal !== filterVal
        case 'contains': return strVal.includes(filterVal)
        case 'not_contains': return !strVal.includes(filterVal)
        case 'starts_with': return strVal.startsWith(filterVal)
        case 'gt': {
          const a = parseFloat(String(raw)); const b = parseFloat(f.value)
          return !isNaN(a) && !isNaN(b) && a > b
        }
        case 'gte': {
          const a = parseFloat(String(raw)); const b = parseFloat(f.value)
          return !isNaN(a) && !isNaN(b) && a >= b
        }
        case 'lt': {
          const a = parseFloat(String(raw)); const b = parseFloat(f.value)
          return !isNaN(a) && !isNaN(b) && a < b
        }
        case 'lte': {
          const a = parseFloat(String(raw)); const b = parseFloat(f.value)
          return !isNaN(a) && !isNaN(b) && a <= b
        }
        case 'is_empty': return raw == null || String(raw).trim() === ''
        case 'is_not_empty': return raw != null && String(raw).trim() !== ''
        default: return true
      }
    })
  )
}

/* ---- Column right-click context menu ---- */

interface ColumnMenuAction {
  type: 'sort_asc' | 'sort_desc' | 'clear_sort' | 'filter' | 'rename' | 'hide_column'
}

function ColumnContextMenu({
  x,
  y,
  colKey,
  displayName,
  editMode,
  sortCol,
  sortDir,
  onAction,
  onClose,
}: {
  x: number
  y: number
  colKey: string
  displayName: string
  editMode: boolean
  sortCol: string | null
  sortDir: SortDir
  onAction: (action: ColumnMenuAction) => void
  onClose: () => void
}) {
  const menuRef = useRef<HTMLDivElement>(null)

  // Clamp position to viewport
  const [pos, setPos] = useState({ top: y, left: x })
  useLayoutEffect(() => {
    const menuW = 180
    const menuH = 200
    let left = x
    let top = y
    if (left + menuW > window.innerWidth - 8) left = window.innerWidth - menuW - 8
    if (left < 8) left = 8
    if (top + menuH > window.innerHeight - 8) top = window.innerHeight - menuH - 8
    if (top < 8) top = 8
    setPos({ top, left })
  }, [x, y])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  // Close on scroll
  useEffect(() => {
    const handler = () => onClose()
    window.addEventListener('scroll', handler, true)
    return () => window.removeEventListener('scroll', handler, true)
  }, [onClose])

  const isSortedAsc = sortCol === colKey && sortDir === 'asc'
  const isSortedDesc = sortCol === colKey && sortDir === 'desc'
  const isSorted = sortCol === colKey && sortDir !== null

  const items: { label: string; icon: React.ReactNode; action: ColumnMenuAction; active?: boolean; danger?: boolean; show?: boolean; separator?: boolean }[] = [
    { label: 'Sort ascending', icon: <ArrowUp size={12} />, action: { type: 'sort_asc' }, active: isSortedAsc, show: true },
    { label: 'Sort descending', icon: <ArrowDown size={12} />, action: { type: 'sort_desc' }, active: isSortedDesc, show: true },
    { label: 'Clear sort', icon: <X size={12} />, action: { type: 'clear_sort' }, show: isSorted },
    { label: `Filter by "${displayName}"`, icon: <Filter size={12} />, action: { type: 'filter' }, show: true, separator: true },
    { label: 'Rename column', icon: <Pencil size={12} />, action: { type: 'rename' }, show: editMode },
    { label: 'Hide column', icon: <EyeOff size={12} />, action: { type: 'hide_column' }, show: true },
  ]

  return createPortal(
    <div
      ref={menuRef}
      style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 9999 }}
      className="bg-white border border-gray-200 rounded-md shadow-lg w-[180px] py-1 animate-in fade-in zoom-in-95 duration-100"
    >
      {items.filter((i) => i.show).map((item, idx) => (
        <div key={idx}>
          {item.separator && <div className="my-1 border-t border-gray-100" />}
          <button
            onClick={() => { onAction(item.action); onClose() }}
            className={cn(
              'w-full flex items-center gap-2 px-3 py-1.5 text-[11px] transition-colors cursor-pointer',
              item.active ? 'text-gray-900 bg-gray-50 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
          <span className="shrink-0 text-gray-400">{item.icon}</span>
          <span className="truncate">{item.label}</span>
        </button>
        </div>
      ))}
    </div>,
    document.body
  )
}

function FilterPanel({
  filters,
  columns,
  onChange,
  onClose,
  anchorRef,
}: {
  filters: WidgetFilter[]
  columns: string[]
  onChange: (filters: WidgetFilter[]) => void
  onClose: () => void
  anchorRef: React.RefObject<HTMLButtonElement | null>
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)

  // Position the panel below the anchor button
  useLayoutEffect(() => {
    if (!anchorRef.current) return
    const rect = anchorRef.current.getBoundingClientRect()
    let left = rect.left
    // Clamp so it doesn't overflow the right edge
    const panelW = 340
    if (left + panelW > window.innerWidth - 16) {
      left = window.innerWidth - panelW - 16
    }
    if (left < 8) left = 8
    setPos({ top: rect.bottom + 4, left })
  }, [anchorRef])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node) && anchorRef.current && !anchorRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose, anchorRef])

  const addFilter = () => {
    onChange([...filters, { id: `f-${Date.now()}`, column: columns[0] ?? '', operator: 'contains', value: '' }])
  }

  const updateFilter = (id: string, patch: Partial<WidgetFilter>) => {
    onChange(filters.map((f) => f.id === id ? { ...f, ...patch } : f))
  }

  const removeFilter = (id: string) => {
    onChange(filters.filter((f) => f.id !== id))
  }

  const noValueOps: FilterOperator[] = ['is_empty', 'is_not_empty']

  if (!pos) return null

  return createPortal(
    <div
      ref={panelRef}
      style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 9999 }}
      className="bg-white border border-gray-200 rounded-md shadow-lg w-[340px] max-h-[320px] overflow-auto"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
        <span className="text-xs font-medium text-gray-700">Filters</span>
        <button onClick={onClose} className="p-0.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          <X size={12} />
        </button>
      </div>

      <div className="p-2 space-y-2">
        {filters.length === 0 && (
          <p className="text-[10px] text-gray-400 text-center py-2">No filters applied</p>
        )}

        {filters.map((f) => (
          <div key={f.id} className="flex items-start gap-1.5">
            <div className="flex-1 space-y-1">
              <select
                value={f.column}
                onChange={(e) => updateFilter(f.id, { column: e.target.value })}
                className="w-full text-[10px] border border-gray-200 rounded-md px-2 py-1 text-gray-700 bg-white focus:outline-none focus:border-gray-400"
              >
                {columns.map((col) => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
              <select
                value={f.operator}
                onChange={(e) => updateFilter(f.id, { operator: e.target.value as FilterOperator })}
                className="w-full text-[10px] border border-gray-200 rounded-md px-2 py-1 text-gray-700 bg-white focus:outline-none focus:border-gray-400"
              >
                {FILTER_OPERATORS.map((op) => (
                  <option key={op.value} value={op.value}>{op.label}</option>
                ))}
              </select>
              {!noValueOps.includes(f.operator) && (
                <input
                  type="text"
                  value={f.value}
                  onChange={(e) => updateFilter(f.id, { value: e.target.value })}
                  placeholder="Value…"
                  className="w-full text-[10px] border border-gray-200 rounded-md px-2 py-1 text-gray-700 bg-white focus:outline-none focus:border-gray-400 placeholder:text-gray-300"
                />
              )}
            </div>
            <button
              onClick={() => removeFilter(f.id)}
              className="mt-0.5 p-1 text-gray-300 hover:text-red-500 transition-colors rounded-md hover:bg-gray-50 cursor-pointer shrink-0"
            >
              <Trash2 size={11} />
            </button>
          </div>
        ))}
      </div>

      <div className="px-2 pb-2">
        <button
          onClick={addFilter}
          className="w-full flex items-center justify-center gap-1 text-[10px] font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md py-1.5 transition-colors cursor-pointer"
        >
          <Plus size={10} />
          Add filter
        </button>
      </div>
    </div>,
    document.body
  )
}

/* ---- Formula evaluator ---- */
function evaluateFormula(
  formula: string,
  row: Record<string, unknown>,
  prefix?: string,
  suffix?: string
): unknown {
  try {
    // Replace [ColumnName] references with actual values
    let expr = formula
    const refPattern = /\[([^\]]+)\]/g
    const refs: { name: string; value: number }[] = []
    let match: RegExpExecArray | null
    while ((match = refPattern.exec(formula)) !== null) {
      const colName = match[1]
      // Find value by sourcePath, alias, or custom column key
      let raw: unknown = undefined
      for (const [key, val] of Object.entries(row)) {
        if (key === colName || key.endsWith(`.${colName}`)) {
          raw = val
          break
        }
      }
      const num = raw != null ? parseFloat(String(raw)) : NaN
      if (isNaN(num)) return '—'
      refs.push({ name: colName, value: num })
      expr = expr.replace(match[0], `__ref${refs.length - 1}__`)
    }

    // Handle IF(condition, trueVal, falseVal)
    const ifPattern = /IF\s*\((.+?),(.+?),(.+?)\)/gi
    expr = expr.replace(ifPattern, (_, cond, trueVal, falseVal) => {
      // Replace comparison operators
      let evalCond = cond.trim()
      // Replace refs in condition
      for (let i = 0; i < refs.length; i++) {
        evalCond = evalCond.replace(new RegExp(`__ref${i}__`, 'g'), String(refs[i].value))
      }
      // Simple evaluation: support =, !=, >, <, >=, <=
      const compMatch = evalCond.match(/^(.+?)\s*(>=|<=|!=|=|>|<)\s*(.+)$/)
      if (compMatch) {
        const left = parseFloat(compMatch[1])
        const right = parseFloat(compMatch[3])
        const op = compMatch[2]
        let result = false
        if (op === '=' || op === '==') result = left === right
        else if (op === '!=') result = left !== right
        else if (op === '>') result = left > right
        else if (op === '<') result = left < right
        else if (op === '>=') result = left >= right
        else if (op === '<=') result = left <= right
        return result ? trueVal.trim() : falseVal.trim()
      }
      return falseVal.trim()
    })

    // Replace remaining refs with numeric values
    for (let i = 0; i < refs.length; i++) {
      expr = expr.replace(new RegExp(`__ref${i}__`, 'g'), String(refs[i].value))
    }

    // Handle common functions: ROUND, ABS, CEIL, FLOOR, MIN, MAX
    expr = expr.replace(/ROUND\s*\((.+?)\)/gi, (_, inner) => {
      const num = parseFloat(inner)
      return isNaN(num) ? inner : String(Math.round(num))
    })
    expr = expr.replace(/ABS\s*\((.+?)\)/gi, (_, inner) => {
      const num = parseFloat(inner)
      return isNaN(num) ? inner : String(Math.abs(num))
    })
    expr = expr.replace(/CEIL\s*\((.+?)\)/gi, (_, inner) => {
      const num = parseFloat(inner)
      return isNaN(num) ? inner : String(Math.ceil(num))
    })
    expr = expr.replace(/FLOOR\s*\((.+?)\)/gi, (_, inner) => {
      const num = parseFloat(inner)
      return isNaN(num) ? inner : String(Math.floor(num))
    })

    // Safely evaluate arithmetic expression (only numbers and operators)
    const sanitised = expr.replace(/[^0-9+\-*/().%\s]/g, '')
    if (!sanitised.trim()) return '—'
    // eslint-disable-next-line no-eval
    const result = Function(`"use strict"; return (${sanitised})`)()
    if (typeof result !== 'number' || isNaN(result)) return '—'
    const formatted = Number.isInteger(result)
      ? result.toLocaleString()
      : result.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    return `${prefix ?? ''}${formatted}${suffix ?? ''}`
  } catch {
    return '—'
  }
}

/* ---- Widget Card Component ---- */

function WidgetCard({
  widget,
  table,
  accessToken,
  isFullWidth,
  editMode,
  onRemove,
  onDuplicate,
  onToggleFullWidth,
  onDisplayNameChange,
  onColumnAliasChange,
  onFiltersChange,
  onHiddenColumnsChange,
  onColumnOrderChange,
  onOpenConfig,
  onOpenTable,
}: {
  widget: DashboardWidget
  table: SavedTable | undefined
  accessToken: string | null
  isFullWidth: boolean
  editMode: boolean
  onRemove: () => void
  onDuplicate: () => void
  onToggleFullWidth: () => void
  onDisplayNameChange: (name: string) => void
  onColumnAliasChange: (sourcePath: string, alias: string) => void
  onFiltersChange: (filters: WidgetFilter[]) => void
  onHiddenColumnsChange: (cols: string[]) => void
  onColumnOrderChange: (order: string[]) => void
  onOpenConfig: () => void
  onOpenTable: () => void
}) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fetchKey, setFetchKey] = useState(0)
  const [sortCol, setSortCol] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)

  // Inline rename state for widget title
  const [editingTitle, setEditingTitle] = useState(false)
  const [draftTitle, setDraftTitle] = useState('')
  const titleInputRef = useRef<HTMLInputElement>(null)

  // Inline rename state for column headers
  const [editingColKey, setEditingColKey] = useState<string | null>(null)
  const [draftColName, setDraftColName] = useState('')
  const colInputRef = useRef<HTMLInputElement>(null)

  // Filter panel state
  const [showFilters, setShowFilters] = useState(false)
  const filterBtnRef = useRef<HTMLButtonElement>(null)

  // Column context menu state
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; colKey: string; displayName: string } | null>(null)

  // Fetch live data for this widget
  useEffect(() => {
    if (!table) return

    // Query tables: use stored queryData
    if (table.projectId === '__query__') {
      if (table.queryData && table.queryData.length > 0) {
        setRows(table.queryData)
      }
      return
    }

    // Firestore tables: fetch live data via REST API
    if (!accessToken) return

    let cancelled = false
    setLoading(true)
    setError(null)

    const load = async () => {
      try {
        let documents
        if (table.isCollectionGroup) {
          const result = await fetchCollectionGroup(
            accessToken,
            table.projectId,
            table.collectionPath,
            100
          )
          documents = result.documents
        } else {
          const result = await fetchDocuments(
            accessToken,
            table.projectId,
            table.collectionPath,
            100
          )
          documents = result.documents
        }

        if (cancelled) return

        // Flatten just like TableBuilderPage does
        const flattened = documents.map((d) => {
          const { __id, __path, __parentId, ...rest } = d
          return {
            __id,
            ...(table.isCollectionGroup
              ? { __path: __path ?? '', __parentId: __parentId ?? '' }
              : {}),
            ...flattenObject(rest as Record<string, unknown>),
          }
        })
        setRows(flattened)
      } catch (err) {
        if (cancelled) return
        console.error(`Failed to fetch data for ${table.tableName}:`, err)
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [table?.id, accessToken, fetchKey])

  const handleRetry = useCallback(() => {
    setFetchKey((k) => k + 1)
  }, [])

  const handleSort = useCallback((colKey: string) => {
    setSortCol((prev) => {
      if (prev !== colKey) {
        setSortDir('asc')
        return colKey
      }
      // Cycle: asc → desc → none
      setSortDir((d) => {
        if (d === 'asc') return 'desc'
        if (d === 'desc') return null
        return 'asc'
      })
      return colKey
    })
  }, [])

  // Clear sort when switching to a column that ended up null
  useEffect(() => {
    if (sortDir === null) setSortCol(null)
  }, [sortDir])

  // Auto-focus title input
  useEffect(() => {
    if (editingTitle) setTimeout(() => { titleInputRef.current?.focus(); titleInputRef.current?.select() }, 50)
  }, [editingTitle])

  // Auto-focus column input
  useEffect(() => {
    if (editingColKey) setTimeout(() => { colInputRef.current?.focus(); colInputRef.current?.select() }, 50)
  }, [editingColKey])

  const commitTitle = () => {
    setEditingTitle(false)
    const trimmed = draftTitle.trim()
    if (trimmed && trimmed !== (widget.displayName || table?.tableName || '')) {
      onDisplayNameChange(trimmed)
    }
  }

  const commitColRename = () => {
    if (!editingColKey) return
    setEditingColKey(null)
    const trimmed = draftColName.trim()
    if (trimmed) {
      onColumnAliasChange(editingColKey, trimmed)
    }
  }

  const handleColumnContextAction = useCallback((action: ColumnMenuAction, colKey: string, displayName: string) => {
    switch (action.type) {
      case 'sort_asc':
        setSortCol(colKey)
        setSortDir('asc')
        break
      case 'sort_desc':
        setSortCol(colKey)
        setSortDir('desc')
        break
      case 'clear_sort':
        setSortCol(null)
        setSortDir(null)
        break
      case 'filter': {
        const existing = widget.filters ?? []
        const newFilter: WidgetFilter = { id: `f-${Date.now()}`, column: colKey, operator: 'contains', value: '' }
        onFiltersChange([...existing, newFilter])
        setShowFilters(true)
        break
      }
      case 'rename':
        if (editMode) {
          setDraftColName(displayName)
          setEditingColKey(colKey)
        }
        break
      case 'hide_column': {
        const current = widget.hiddenColumns ?? []
        if (!current.includes(colKey)) {
          onHiddenColumnsChange([...current, colKey])
        }
        break
      }
    }
  }, [widget.filters, widget.hiddenColumns, editMode, onFiltersChange, onHiddenColumnsChange])

  if (!table) {
    return (
      <div className="h-full bg-white rounded-md border border-gray-200 flex items-center justify-center">
        <p className="text-xs text-gray-400">Table not found</p>
      </div>
    )
  }

  const hiddenSet = new Set(widget.hiddenColumns ?? [])
  const visibleSourceCols = table.columns.filter((c) => c.visible && !hiddenSet.has(c.sourcePath))
  // Build a unified column list mixing source + custom columns
  type UnifiedCol = { key: string; displayName: string; isCustom: boolean; customCol?: CustomColumn; sourceCol?: ColumnConfig }
  const customCols = widget.customColumns ?? []
  const allUnifiedCols: UnifiedCol[] = [
    ...visibleSourceCols.map((c) => ({
      key: c.sourcePath,
      displayName: widget.columnAliases?.[c.sourcePath] || c.alias || c.sourcePath,
      isCustom: false,
      sourceCol: c,
    })),
    ...customCols.filter((cc) => !hiddenSet.has(`custom:${cc.id}`)).map((cc) => ({
      key: `custom:${cc.id}`,
      displayName: cc.name,
      isCustom: true,
      customCol: cc,
    })),
  ]

  // Apply column ordering if set
  const orderedCols = widget.columnOrder
    ? widget.columnOrder.map((k) => allUnifiedCols.find((c) => c.key === k)).filter(Boolean) as UnifiedCol[]
    : allUnifiedCols
  // Add any cols not in order list (new columns)
  const orderedSet = new Set(widget.columnOrder ?? [])
  const unordered = allUnifiedCols.filter((c) => !orderedSet.has(c.key))
  const visibleCols = [...orderedCols, ...unordered]

  // Compute custom column values
  const computedRows = rows.map((row) => {
    const extendedRow = { ...row }
    for (const cc of customCols) {
      extendedRow[`custom:${cc.id}`] = evaluateFormula(cc.formula, row, cc.formatPrefix, cc.formatSuffix)
    }
    return extendedRow
  })

  // Show all columns when full width, otherwise cap at 6
  const previewCols = isFullWidth ? visibleCols : visibleCols.slice(0, 6)
  const hiddenColCount = isFullWidth ? 0 : Math.max(0, visibleCols.length - 6)
  const removedColCount = (widget.hiddenColumns ?? []).length
  const filteredRows = applyWidgetFilters(computedRows, widget.filters)
  const displayRows = sortRows(filteredRows, sortCol, sortDir)
  const activeFilterCount = (widget.filters ?? []).filter((f) => f.column && f.operator).length

  return (
    <div className="h-full bg-white rounded-md border border-gray-200 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Widget Header — draggable in edit mode */}
      <div className={cn(
        'widget-drag-handle flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50/50 shrink-0 select-none',
        editMode ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
      )}>
        <div className="flex items-center gap-2 min-w-0">
          {editMode && <GripVertical size={14} className="text-gray-300 shrink-0" />}
          {editingTitle && editMode ? (
            <input
              ref={titleInputRef}
              type="text"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onBlur={commitTitle}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitTitle()
                if (e.key === 'Escape') setEditingTitle(false)
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-full text-xs font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-gray-500 focus:outline-none py-0"
            />
          ) : (
            <h4
              className={cn('text-xs font-medium text-gray-900 truncate', editMode && 'cursor-text')}
              onDoubleClick={() => {
                if (!editMode) return
                setDraftTitle(widget.displayName || table.tableName)
                setEditingTitle(true)
              }}
            >
              {widget.displayName || table.tableName}
            </h4>
          )}
        </div>
        <div className="flex items-center gap-0.5 shrink-0 relative" onMouseDown={(e) => e.stopPropagation()}>
          <button
            ref={filterBtnRef}
            onClick={() => setShowFilters((v) => !v)}
            className={cn(
              'p-1 transition-colors rounded-md hover:bg-gray-100 cursor-pointer relative',
              activeFilterCount > 0 ? 'text-gray-600' : 'text-gray-300 hover:text-gray-600'
            )}
            title="Filter"
          >
            <Filter size={12} />
            {activeFilterCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gray-700 text-white text-[7px] font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          {showFilters && (
            <FilterPanel
              filters={widget.filters ?? []}
              columns={visibleCols.map((c) => c.key)}
              onChange={onFiltersChange}
              onClose={() => setShowFilters(false)}
              anchorRef={filterBtnRef}
            />
          )}
          {editMode && (
            <button
              onClick={onToggleFullWidth}
              className={cn(
                'p-1 transition-colors rounded-md hover:bg-gray-100 cursor-pointer',
                isFullWidth ? 'text-gray-500' : 'text-gray-300 hover:text-gray-600'
              )}
              title={isFullWidth ? 'Restore size' : 'Full width'}
            >
              {isFullWidth ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
            </button>
          )}
          <button
            onClick={onOpenTable}
            className="p-1 text-gray-300 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 cursor-pointer"
            title="Open table"
          >
            <Eye size={12} />
          </button>
          {editMode && (
            <>
              <button
                onClick={onOpenConfig}
                className="p-1 text-gray-300 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 cursor-pointer"
                title="Configure table"
              >
                <Settings2 size={12} />
              </button>
              <button
                onClick={onDuplicate}
                className="p-1 text-gray-300 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 cursor-pointer"
                title="Duplicate"
              >
                <Copy size={12} />
              </button>
              <button
                onClick={onRemove}
                className="p-1 text-gray-300 hover:text-red-500 transition-colors rounded-md hover:bg-gray-100 cursor-pointer"
                title="Remove from dashboard"
              >
                <X size={12} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Widget Body */}
      <div className="flex-1 overflow-hidden">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin text-gray-300" />
            <p className="text-[10px] text-gray-400">Loading data…</p>
          </div>
        ) : error ? (
          <div className="h-full flex flex-col items-center justify-center gap-2 px-4">
            <AlertCircle size={16} className="text-gray-300" />
            <p className="text-[10px] text-gray-500 text-center leading-tight">{error}</p>
            <button
              onClick={handleRetry}
              className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-700 transition-colors"
            >
              <RefreshCw size={10} />
              Retry
            </button>
          </div>
        ) : previewCols.length > 0 ? (
          <div className="overflow-auto h-full">
            <table className="w-full text-[11px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gray-50">
                  {previewCols.map((col) => {
                    const colKey = col.key
                    const isActive = sortCol === colKey
                    const displayColName = col.displayName
                    const isEditingCol = editingColKey === colKey && editMode
                    return (
                      <th
                        key={colKey}
                        onClick={() => { if (!isEditingCol) handleSort(colKey) }}
                        onDoubleClick={(e) => {
                          if (!editMode) return
                          e.stopPropagation()
                          setDraftColName(displayColName)
                          setEditingColKey(colKey)
                        }}
                        onContextMenu={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setContextMenu({ x: e.clientX, y: e.clientY, colKey, displayName: displayColName })
                        }}
                        className={cn(
                          'text-left px-2 py-1.5 text-[10px] font-medium whitespace-nowrap border-b border-gray-100 select-none hover:bg-gray-100 transition-colors group/th',
                          col.isCustom ? 'text-gray-500 italic' : 'text-gray-500',
                          isEditingCol ? 'cursor-text' : 'cursor-pointer'
                        )}
                      >
                        {isEditingCol ? (
                          <input
                            ref={colInputRef}
                            type="text"
                            value={draftColName}
                            onChange={(e) => setDraftColName(e.target.value)}
                            onBlur={commitColRename}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') commitColRename()
                              if (e.key === 'Escape') setEditingColKey(null)
                            }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                            className="w-full text-[10px] font-medium text-gray-700 bg-transparent border-b border-gray-300 focus:border-gray-500 focus:outline-none py-0"
                          />
                        ) : (
                          <span className="inline-flex items-center gap-1">
                            {col.isCustom && <Calculator size={9} className="text-gray-400" />}
                            {displayColName}
                            {isActive && sortDir === 'asc' ? (
                              <ArrowUp size={10} className="text-gray-700" />
                            ) : isActive && sortDir === 'desc' ? (
                              <ArrowDown size={10} className="text-gray-700" />
                            ) : (
                              <ArrowUpDown size={10} className="text-gray-300 opacity-0 group-hover/th:opacity-100 transition-opacity" />
                            )}
                          </span>
                        )}
                      </th>
                    )
                  })}
                  {hiddenColCount > 0 && (
                    <th className="text-left px-2 py-1.5 text-[10px] font-medium text-gray-400 whitespace-nowrap border-b border-gray-100">
                      +{hiddenColCount} more
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {displayRows.length > 0 ? (
                  displayRows.slice(0, 100).map((row, idx) => {
                    // Pre-compute row-level conditional styles once per row
                    const condRules = widget.conditionalFormats
                    return (
                    <tr
                      key={idx}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                    >
                      {previewCols.map((col) => {
                        const colKey = col.isCustom ? col.key : col.sourceCol!.sourcePath
                        const cellStyle = getCondStyle(condRules, row, colKey, 'cell')
                        return (
                        <td
                          key={col.key}
                          className={cn(
                            'px-2 py-1 text-gray-600 whitespace-nowrap truncate',
                            isFullWidth ? 'max-w-[200px]' : 'max-w-[120px]'
                          )}
                          style={cellStyle}
                        >
                          {col.isCustom
                            ? formatCellValue(row[col.key])
                            : formatCellValue(row[col.sourceCol!.sourcePath] ?? row[col.sourceCol!.alias])}
                        </td>
                        )
                      })}
                      {hiddenColCount > 0 && (
                        <td className="px-2 py-1 text-gray-300">…</td>
                      )}
                    </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={previewCols.length + (hiddenColCount > 0 ? 1 : 0)}
                      className="px-2 py-4 text-center text-[10px] text-gray-400"
                    >
                      No data in this collection
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-xs text-gray-400">No columns configured</p>
          </div>
        )}
      </div>

      {/* Column context menu */}
      {contextMenu && (
        <ColumnContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          colKey={contextMenu.colKey}
          displayName={contextMenu.displayName}
          editMode={editMode}
          sortCol={sortCol}
          sortDir={sortDir}
          onAction={(action) => handleColumnContextAction(action, contextMenu.colKey, contextMenu.displayName)}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* Widget Footer */}
      <div className="flex items-center justify-between px-3 py-1.5 border-t border-gray-100 bg-gray-50/30 shrink-0">
        <span className="text-[10px] text-gray-400">
          {visibleCols.length} columns
          {rows.length > 0 && ` · ${activeFilterCount > 0 ? `${filteredRows.length} of ${rows.length}` : rows.length} rows`}
          {activeFilterCount > 0 && ` · ${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''}`}
          {sortCol && sortDir && ` · Sorted by ${sortCol} ${sortDir}`}
          {loading && ' · Loading…'}
        </span>
        <div className="flex items-center gap-2">
          {removedColCount > 0 && (
            <button
              onClick={() => onHiddenColumnsChange([])}
              onMouseDown={(e) => e.stopPropagation()}
              className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors cursor-pointer flex items-center gap-0.5"
              title="Show all hidden columns"
            >
              <EyeOff size={9} />
              {removedColCount} hidden
            </button>
          )}
          <span className="text-[10px] text-gray-400">
            {table.projectId === '__query__' ? 'SQL' : table.collectionPath}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ---- Element Card Component ---- */

function ElementCard({
  widget,
  editMode,
  isSelected,
  onRemove,
  onDuplicate,
  onContentChange,
  onOpenConfig,
}: {
  widget: DashboardWidget
  editMode: boolean
  isSelected?: boolean
  onRemove: () => void
  onDuplicate: () => void
  onContentChange: (content: string) => void
  onOpenConfig?: () => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [localContent, setLocalContent] = useState(widget.content ?? '')
  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const elCfg = widget.elementConfig ?? {}

  // Font size class map
  const fontSizeMap: Record<ElementFontSize, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  }
  const fontWeightMap: Record<string, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }
  const alignMap: Record<ElementAlign, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  useEffect(() => {
    setLocalContent(widget.content ?? '')
  }, [widget.content])

  useEffect(() => {
    if (isEditing) {
      setTimeout(() => {
        if (widget.type === 'heading') {
          inputRef.current?.focus()
          inputRef.current?.select()
        } else if (widget.type === 'text') {
          textareaRef.current?.focus()
          textareaRef.current?.select()
        }
      }, 50)
    }
  }, [isEditing, widget.type])

  const commitEdit = () => {
    setIsEditing(false)
    if (localContent !== widget.content) {
      onContentChange(localContent)
    }
  }

  // Divider element
  if (widget.type === 'divider') {
    return (
      <div className={cn(
        'h-full flex items-center px-4 relative group/el',
        editMode && 'widget-drag-handle cursor-grab active:cursor-grabbing'
      )}>
        <div className="w-full border-t border-gray-200 dark:border-gray-600" />
        {editMode && (
          <div className="absolute top-1 right-1 flex items-center gap-0.5 opacity-0 group-hover/el:opacity-100">
            <button
              onClick={(e) => { e.stopPropagation(); onDuplicate() }}
              onMouseDown={(e) => e.stopPropagation()}
              className="p-0.5 text-gray-300 hover:text-gray-600 transition-colors rounded-md hover:bg-white cursor-pointer"
              title="Duplicate"
            >
              <Copy size={12} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onRemove() }}
              onMouseDown={(e) => e.stopPropagation()}
              className="p-0.5 text-gray-300 hover:text-red-500 transition-colors rounded-md hover:bg-white cursor-pointer"
              title="Remove divider"
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>
    )
  }

  // Heading element
  if (widget.type === 'heading') {
    const headingFontSize = fontSizeMap[elCfg.fontSize ?? 'base']
    const headingFontWeight = fontWeightMap[elCfg.fontWeight ?? 'semibold']
    const headingAlign = alignMap[elCfg.align ?? 'left']

    return (
      <div
        className={cn(
          'h-full flex flex-col relative group/el rounded-md border-2 transition-colors',
          isSelected ? 'border-gray-400 dark:border-gray-500' : 'border-transparent',
          editMode && !isSelected && 'hover:border-gray-200 dark:hover:border-gray-700',
          editMode && 'widget-drag-handle cursor-grab active:cursor-grabbing'
        )}
        onClick={(e) => {
          if (editMode && !isEditing && onOpenConfig) {
            e.stopPropagation()
            onOpenConfig()
          }
        }}
      >
        <div className={cn('flex-1 flex items-center px-3', headingAlign)}>
          {isEditing && editMode ? (
            <input
              ref={inputRef}
              type="text"
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitEdit()
                if (e.key === 'Escape') { setLocalContent(widget.content ?? ''); setIsEditing(false) }
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className={cn('w-full bg-transparent border-b border-gray-300 focus:border-gray-500 focus:outline-none text-gray-900 dark:text-gray-100', headingFontSize, headingFontWeight)}
            />
          ) : (
            <h3
              className={cn(
                'text-gray-900 dark:text-gray-100 truncate w-full',
                headingFontSize, headingFontWeight,
                editMode && 'cursor-text'
              )}
              style={elCfg.colour ? { color: elCfg.colour } : undefined}
              onDoubleClick={(e) => { e.stopPropagation(); editMode && setIsEditing(true) }}
            >
              {widget.content || 'Untitled Heading'}
            </h3>
          )}
        </div>
        {editMode && (
          <div className="absolute top-1 right-1 flex items-center gap-0.5 opacity-0 group-hover/el:opacity-100 transition-opacity" onMouseDown={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => { e.stopPropagation(); setIsEditing(true) }}
              className="p-0.5 text-gray-300 hover:text-gray-600 transition-colors rounded-md hover:bg-white cursor-pointer"
              title="Edit heading"
            >
              <Pencil size={11} />
            </button>
            {onOpenConfig && (
              <button
                onClick={(e) => { e.stopPropagation(); onOpenConfig() }}
                className="p-0.5 text-gray-300 hover:text-gray-600 transition-colors rounded-md hover:bg-white cursor-pointer"
                title="Configure"
              >
                <Settings2 size={11} />
              </button>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); onDuplicate() }}
              className="p-0.5 text-gray-300 hover:text-gray-600 transition-colors rounded-md hover:bg-white cursor-pointer"
              title="Duplicate"
            >
              <Copy size={12} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onRemove() }}
              className="p-0.5 text-gray-300 hover:text-red-500 transition-colors rounded-md hover:bg-white cursor-pointer"
              title="Remove heading"
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>
    )
  }

  // Text element
  const textFontSize = fontSizeMap[elCfg.fontSize ?? 'sm']
  const textFontWeight = fontWeightMap[elCfg.fontWeight ?? 'normal']
  const textAlign = alignMap[elCfg.align ?? 'left']

  return (
    <div
      className={cn(
        'h-full flex flex-col relative group/el rounded-md border-2 transition-colors',
        isSelected ? 'border-gray-400 dark:border-gray-500' : 'border-transparent',
        editMode && !isSelected && 'hover:border-gray-200 dark:hover:border-gray-700',
        editMode && 'widget-drag-handle cursor-grab active:cursor-grabbing',
      )}
      onClick={(e) => {
        if (editMode && !isEditing && onOpenConfig) {
          e.stopPropagation()
          onOpenConfig()
        }
      }}
    >
      <div className={cn('flex-1 overflow-auto px-3 py-2', textAlign)}>
        {isEditing && editMode ? (
          <textarea
            ref={textareaRef}
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === 'Escape') { setLocalContent(widget.content ?? ''); setIsEditing(false) }
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-full text-sm text-gray-700 dark:text-gray-300 bg-transparent border border-gray-200 rounded-md p-2 focus:border-gray-400 focus:outline-none resize-none"
          />
        ) : (
          <p
            className={cn(
              'text-gray-600 dark:text-gray-400 whitespace-pre-wrap',
              textFontSize, textFontWeight,
              editMode && 'cursor-text'
            )}
            style={elCfg.colour ? { color: elCfg.colour } : undefined}
            onDoubleClick={(e) => { e.stopPropagation(); editMode && setIsEditing(true) }}
          >
            {widget.content || 'Enter your text here...'}
          </p>
        )}
      </div>
      {editMode && (
        <div className="absolute top-1 right-1 flex items-center gap-0.5 opacity-0 group-hover/el:opacity-100 transition-opacity" onMouseDown={(e) => e.stopPropagation()}>
          <button
            onClick={(e) => { e.stopPropagation(); setIsEditing(true) }}
            className="p-0.5 text-gray-300 hover:text-gray-600 transition-colors rounded-md hover:bg-white cursor-pointer"
            title="Edit text"
          >
            <Pencil size={11} />
          </button>
          {onOpenConfig && (
            <button
              onClick={(e) => { e.stopPropagation(); onOpenConfig() }}
              className="p-0.5 text-gray-300 hover:text-gray-600 transition-colors rounded-md hover:bg-white cursor-pointer"
              title="Configure"
            >
              <Settings2 size={11} />
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onDuplicate() }}
            className="p-0.5 text-gray-300 hover:text-gray-600 transition-colors rounded-md hover:bg-white cursor-pointer"
            title="Duplicate"
          >
            <Copy size={12} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onRemove() }}
            className="p-0.5 text-gray-300 hover:text-red-500 transition-colors rounded-md hover:bg-white cursor-pointer"
            title="Remove text block"
          >
            <X size={12} />
          </button>
        </div>
      )}
    </div>
  )
}

/* ---- Metric helpers ---- */

const AGGREGATION_LABELS: Record<AggregationType, string> = {
  count: 'Count',
  sum: 'Sum',
  average: 'Average',
  min: 'Min',
  max: 'Max',
  count_distinct: 'Count Distinct',
}

const TIMEFRAME_LABELS: Record<string, string> = {
  all: 'All Time',
  '7d': 'Last 7 Days',
  '30d': 'Last 30 Days',
  '90d': 'Last 90 Days',
  this_month: 'This Month',
  this_year: 'This Year',
}

function getTimeframeStart(tf: string): Date | null {
  const now = new Date()
  switch (tf) {
    case '7d': return new Date(now.getTime() - 7 * 86400000)
    case '30d': return new Date(now.getTime() - 30 * 86400000)
    case '90d': return new Date(now.getTime() - 90 * 86400000)
    case 'this_month': return new Date(now.getFullYear(), now.getMonth(), 1)
    case 'this_year': return new Date(now.getFullYear(), 0, 1)
    default: return null
  }
}

function parseDate(v: unknown): Date | null {
  if (v instanceof Date) return v
  if (typeof v === 'string') {
    const d = new Date(v)
    return isNaN(d.getTime()) ? null : d
  }
  if (typeof v === 'number') return new Date(v)
  return null
}

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

/** Pretty-format a date: "Jan 5th", "Jan 5th 2024", "Jan 2025", "2025" etc. */
function formatDatePretty(d: Date, trunc: DateTruncation = 'day'): string {
  switch (trunc) {
    case 'year': return String(d.getFullYear())
    case 'month': return `${MONTH_SHORT[d.getMonth()]} ${d.getFullYear()}`
    case 'week':
    case 'day': return `${MONTH_SHORT[d.getMonth()]} ${ordinal(d.getDate())}`
    default: return `${MONTH_SHORT[d.getMonth()]} ${ordinal(d.getDate())}, ${d.getFullYear()}`
  }
}

/** Truncate a date to a period boundary for grouping */
function truncateDate(d: Date, trunc: DateTruncation): Date {
  switch (trunc) {
    case 'day': return new Date(d.getFullYear(), d.getMonth(), d.getDate())
    case 'week': {
      const day = d.getDay() // 0=Sun
      const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Mon start
      return new Date(d.getFullYear(), d.getMonth(), diff)
    }
    case 'month': return new Date(d.getFullYear(), d.getMonth(), 1)
    case 'year': return new Date(d.getFullYear(), 0, 1)
    default: return d
  }
}

/** Detect if a value looks like a date string */
function looksLikeDate(v: unknown): boolean {
  if (typeof v !== 'string') return false
  // ISO format, Firestore timestamp, or common date patterns
  return /^\d{4}-\d{2}-\d{2}/.test(v) || /^\d{4}\/\d{2}\/\d{2}/.test(v) || /\d{4}-\d{2}-\d{2}T/.test(v)
}

function computeMetric(
  rows: Record<string, unknown>[],
  config: MetricConfig
): number | null {
  // Apply date filter
  let filtered = rows
  const start = getTimeframeStart(config.timeframe ?? 'all')
  if (start && config.dateColumn) {
    filtered = rows.filter((r) => {
      const d = parseDate(r[config.dateColumn!])
      return d ? d >= start : false
    })
  }

  const { aggregation, column } = config

  if (aggregation === 'count') return filtered.length

  if (!column) return null

  if (aggregation === 'count_distinct') {
    const unique = new Set(filtered.map((r) => String(r[column] ?? '')))
    return unique.size
  }

  // Extract numeric values
  const nums = filtered
    .map((r) => {
      const v = r[column]
      if (typeof v === 'number') return v
      if (typeof v === 'string') { const n = parseFloat(v); return isNaN(n) ? null : n }
      return null
    })
    .filter((n): n is number => n !== null)

  if (nums.length === 0) return null

  switch (aggregation) {
    case 'sum': return nums.reduce((a, b) => a + b, 0)
    case 'average': return nums.reduce((a, b) => a + b, 0) / nums.length
    case 'min': return Math.min(...nums)
    case 'max': return Math.max(...nums)
    default: return null
  }
}

function formatMetricValue(value: number | null, prefix?: string, suffix?: string): string {
  if (value === null) return '—'
  // Format with commas, max 2 decimal places
  const formatted = Number.isInteger(value)
    ? value.toLocaleString()
    : value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
  return `${prefix ?? ''}${formatted}${suffix ?? ''}`
}

/* ---- Metric Card Component ---- */

function MetricCard({
  widget,
  savedTables,
  accessToken,
  editMode,
  onRemove,
  onDuplicate,
  onOpenConfig,
  onLabelChange,
  onFiltersChange,
}: {
  widget: DashboardWidget
  savedTables: SavedTable[]
  accessToken: string | null
  editMode: boolean
  onRemove: () => void
  onDuplicate: () => void
  onOpenConfig: () => void
  onLabelChange: (label: string) => void
  onFiltersChange: (filters: WidgetFilter[]) => void
}) {
  const config = widget.metricConfig
  const isConfigured = !!config?.tableId && !!config?.aggregation

  const [rows, setRows] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Filter panel
  const [showFilters, setShowFilters] = useState(false)
  const filterBtnRef = useRef<HTMLButtonElement>(null)

  // Inline label editing
  const [editingLabel, setEditingLabel] = useState(false)
  const [draftLabel, setDraftLabel] = useState('')
  const labelInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editingLabel) setTimeout(() => { labelInputRef.current?.focus(); labelInputRef.current?.select() }, 50)
  }, [editingLabel])

  const commitLabel = () => {
    setEditingLabel(false)
    const trimmed = draftLabel.trim()
    if (trimmed && trimmed !== config?.label) {
      onLabelChange(trimmed)
    }
  }

  useEffect(() => {
    if (!isConfigured) return
    const table = savedTables.find((t) => t.id === config!.tableId)
    if (!table) return

    if (table.projectId === '__query__') {
      if (table.queryData && table.queryData.length > 0) setRows(table.queryData)
      return
    }
    if (!accessToken) return

    let cancelled = false
    setLoading(true)
    setError(null)

    const load = async () => {
      try {
        let documents
        if (table.isCollectionGroup) {
          const result = await fetchCollectionGroup(accessToken, table.projectId, table.collectionPath, 500)
          documents = result.documents
        } else {
          const result = await fetchDocuments(accessToken, table.projectId, table.collectionPath, 500)
          documents = result.documents
        }
        if (cancelled) return
        const flattened = documents.map((d) => {
          const { __id, __path, __parentId, ...rest } = d
          return { __id, ...(table.isCollectionGroup ? { __path: __path ?? '', __parentId: __parentId ?? '' } : {}), ...flattenObject(rest as Record<string, unknown>) }
        })
        setRows(flattened)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally { if (!cancelled) setLoading(false) }
    }
    load()
    return () => { cancelled = true }
  }, [isConfigured ? config?.tableId : null, accessToken, savedTables])

  const filteredRows = applyWidgetFilters(rows, widget.filters)
  const computedValue = isConfigured && filteredRows.length > 0 ? computeMetric(filteredRows, config!) : null
  const activeFilterCount = (widget.filters ?? []).filter((f) => f.column && f.operator).length
  const metricTable = isConfigured ? savedTables.find((t) => t.id === config!.tableId) : undefined
  const filterColumns = metricTable ? metricTable.columns.filter((c) => c.visible).map((c) => c.sourcePath) : (rows.length > 0 ? Object.keys(rows[0]).filter((k) => !k.startsWith('__')) : [])

  const layout = config?.layout ?? 'centered'
  const titleSize = config?.titleSize ?? 'sm'
  const valueSize = config?.valueSize ?? 'md'
  const showLabel = config?.showLabel !== false
  const metricColour = config?.colour

  const titleSizeCls: Record<MetricValueSize, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  }

  const valueSizeCls: Record<MetricValueSize, string> = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-5xl',
  }

  const labelBlock = showLabel && isConfigured && !loading && !error && (
    editingLabel && editMode ? (
      <input
        ref={labelInputRef}
        type="text"
        value={draftLabel}
        onChange={(e) => setDraftLabel(e.target.value)}
        onBlur={commitLabel}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commitLabel()
          if (e.key === 'Escape') setEditingLabel(false)
        }}
        onMouseDown={(e) => e.stopPropagation()}
        className={cn(
          'font-semibold text-gray-900 bg-transparent border-b border-gray-300 focus:border-gray-500 focus:outline-none',
          titleSizeCls[titleSize],
          layout === 'centered' ? 'text-center w-full mb-1' : 'w-full mb-0.5'
        )}
      />
    ) : (
      <p
        className={cn(
          'font-semibold text-gray-900 truncate max-w-full',
          titleSizeCls[titleSize],
          layout === 'centered' ? 'mb-1' : 'mb-0.5',
          editMode && 'cursor-text'
        )}
        onDoubleClick={() => {
          if (!editMode) return
          setDraftLabel(config!.label)
          setEditingLabel(true)
        }}
      >
        {config!.label}
      </p>
    )
  )

  const valueBlock = isConfigured && !loading && !error && (
    <p
      className={cn('font-bold tabular-nums tracking-tight truncate max-w-full', valueSizeCls[valueSize])}
      style={metricColour ? { color: metricColour } : undefined}
    >
      {formatMetricValue(computedValue, config!.prefix, config!.suffix)}
    </p>
  )

  return (
    <div className={cn(
      'h-full bg-white rounded-md border border-gray-200 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow group/metric relative',
      layout === 'centered' && 'items-center justify-center',
      layout === 'left' && 'justify-center',
      layout === 'minimal' && 'justify-end',
      editMode && 'widget-drag-handle cursor-grab active:cursor-grabbing'
    )}>
      {/* Top-right controls */}
      <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 z-10" onMouseDown={(e) => e.stopPropagation()}>
        {isConfigured && (
          <div className="relative">
            <button
              ref={filterBtnRef}
              onClick={() => setShowFilters((v) => !v)}
              className={cn(
                'p-1 transition-colors rounded-md hover:bg-gray-100 cursor-pointer relative',
                activeFilterCount > 0 ? 'text-gray-600' : 'text-gray-300 hover:text-gray-600',
                activeFilterCount === 0 && !showFilters && 'opacity-0 group-hover/metric:opacity-100'
              )}
              title="Filter data"
            >
              <Filter size={11} />
              {activeFilterCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gray-700 text-white text-[7px] font-bold rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {showFilters && (
              <FilterPanel
                filters={widget.filters ?? []}
                columns={filterColumns}
                onChange={onFiltersChange}
                onClose={() => setShowFilters(false)}
                anchorRef={filterBtnRef}
              />
            )}
          </div>
        )}
        {editMode && (
          <>
            <button onClick={onOpenConfig} className="p-1 text-gray-300 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 cursor-pointer opacity-0 group-hover/metric:opacity-100" title="Configure metric">
              <Settings2 size={11} />
            </button>
            <button onClick={onDuplicate} className="p-1 text-gray-300 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 cursor-pointer opacity-0 group-hover/metric:opacity-100" title="Duplicate">
              <Copy size={12} />
            </button>
            <button onClick={onRemove} className="p-1 text-gray-300 hover:text-red-500 transition-colors rounded-md hover:bg-gray-100 cursor-pointer opacity-0 group-hover/metric:opacity-100" title="Remove metric">
              <X size={12} />
            </button>
          </>
        )}
      </div>

      {!isConfigured ? (
        <div className="text-center flex-1 flex flex-col items-center justify-center">
          <Gauge size={20} className="text-gray-200 mx-auto mb-2" />
          <p className="text-xs text-gray-400">Not configured</p>
          {editMode && (
            <button onClick={onOpenConfig} onMouseDown={(e) => e.stopPropagation()} className="mt-1.5 text-[10px] text-gray-500 hover:text-gray-700 underline cursor-pointer">Configure</button>
          )}
        </div>
      ) : loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 size={18} className="animate-spin text-gray-300" />
        </div>
      ) : error ? (
        <div className="text-center px-4 flex-1 flex flex-col items-center justify-center">
          <AlertCircle size={16} className="text-gray-300 mx-auto mb-1" />
          <p className="text-[10px] text-gray-500">{error}</p>
        </div>
      ) : layout === 'centered' ? (
        <div className="text-center px-4">
          {labelBlock}
          {valueBlock}
        </div>
      ) : layout === 'left' ? (
        <div className="px-4">
          {labelBlock}
          {valueBlock}
        </div>
      ) : /* minimal */ (
        <div className="px-3 pb-3">
          {valueBlock}
          {labelBlock}
        </div>
      )}
    </div>
  )
}

/* ---- Chart helpers ---- */

const CHART_COLOUR_DEFAULT = '#6366F1'
const CHART_COLOUR_PRESETS = [
  '#6366F1', // indigo
  '#3B82F6', // blue
  '#06B6D4', // cyan
  '#10B981', // emerald
  '#F59E0B', // amber
  '#EF4444', // red
  '#EC4899', // pink
  '#8B5CF6', // violet
  '#F97316', // orange
  '#14B8A6', // teal
  '#64748B', // slate
  '#1F2937', // charcoal
]

function buildChartData(
  rows: Record<string, unknown>[],
  config: ChartConfig
): { name: string; value: number }[] {
  // Apply date filter
  let filtered = rows
  const start = getTimeframeStart(config.timeframe ?? 'all')
  if (start && config.dateColumn) {
    filtered = rows.filter((r) => {
      const d = parseDate(r[config.dateColumn!])
      return d ? d >= start : false
    })
  }

  // Group by category column (with optional date truncation)
  const trunc = config.dateTruncate ?? 'none'
  const groups = new Map<string, unknown[]>()
  const groupSortKeys = new Map<string, number>() // for chronological sorting of dates

  for (const row of filtered) {
    const raw = row[config.categoryColumn]
    let cat: string

    if (trunc !== 'none') {
      const d = parseDate(raw)
      if (d) {
        const truncated = truncateDate(d, trunc)
        cat = formatDatePretty(truncated, trunc)
        // Store timestamp for chronological sort
        if (!groupSortKeys.has(cat)) groupSortKeys.set(cat, truncated.getTime())
      } else {
        cat = String(raw ?? '(empty)')
      }
    } else {
      // Auto-detect dates and format nicely even without truncation
      const d = parseDate(raw)
      if (d && looksLikeDate(raw)) {
        cat = formatDatePretty(d, 'none')
        if (!groupSortKeys.has(cat)) groupSortKeys.set(cat, d.getTime())
      } else {
        cat = String(raw ?? '(empty)')
      }
    }

    if (!groups.has(cat)) groups.set(cat, [])
    groups.get(cat)!.push(row)
  }

  // Aggregate per group
  const data: { name: string; value: number }[] = []

  for (const [cat, groupRows] of groups.entries()) {
    let val: number

    if (config.aggregation === 'count') {
      val = groupRows.length
    } else if (config.aggregation === 'count_distinct') {
      const unique = new Set(groupRows.map((r) => String((r as Record<string, unknown>)[config.valueColumn] ?? '')))
      val = unique.size
    } else {
      const nums = groupRows
        .map((r) => {
          const v = (r as Record<string, unknown>)[config.valueColumn]
          if (typeof v === 'number') return v
          if (typeof v === 'string') { const n = parseFloat(v); return isNaN(n) ? null : n }
          return null
        })
        .filter((n): n is number => n !== null)

      if (nums.length === 0) { val = 0 }
      else if (config.aggregation === 'sum') val = nums.reduce((a, b) => a + b, 0)
      else if (config.aggregation === 'average') val = nums.reduce((a, b) => a + b, 0) / nums.length
      else if (config.aggregation === 'min') val = Math.min(...nums)
      else if (config.aggregation === 'max') val = Math.max(...nums)
      else val = 0
    }

    data.push({ name: cat, value: Math.round(val * 100) / 100 })
  }

  // Sort
  if (config.sortBy === 'value') {
    data.sort((a, b) => b.value - a.value)
  } else {
    // Chronological sort if we have date keys, otherwise alphabetical
    const hasDateKeys = groupSortKeys.size > 0
    if (hasDateKeys) {
      data.sort((a, b) => (groupSortKeys.get(a.name) ?? 0) - (groupSortKeys.get(b.name) ?? 0))
    } else {
      data.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    }
  }

  // Limit bars
  const max = config.maxBars ?? 20
  return data.slice(0, max)
}

/* ---- Chart Card Component ---- */

function ChartCard({
  widget,
  savedTables,
  accessToken,
  editMode,
  onRemove,
  onDuplicate,
  onOpenConfig,
  onLabelChange,
  onFiltersChange,
}: {
  widget: DashboardWidget
  savedTables: SavedTable[]
  accessToken: string | null
  editMode: boolean
  onRemove: () => void
  onDuplicate: () => void
  onOpenConfig: () => void
  onLabelChange: (label: string) => void
  onFiltersChange: (filters: WidgetFilter[]) => void
}) {
  const config = widget.chartConfig
  const isConfigured = !!config?.tableId && !!config?.categoryColumn

  // Data
  const [rows, setRows] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Filter panel
  const [showFilters, setShowFilters] = useState(false)
  const filterBtnRef = useRef<HTMLButtonElement>(null)

  // Inline title editing
  const [editingTitle, setEditingTitle] = useState(false)
  const [draftTitle, setDraftTitle] = useState('')
  const titleInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editingTitle) setTimeout(() => { titleInputRef.current?.focus(); titleInputRef.current?.select() }, 50)
  }, [editingTitle])

  const commitTitle = () => {
    setEditingTitle(false)
    const trimmed = draftTitle.trim()
    if (trimmed && trimmed !== config?.label) {
      onLabelChange(trimmed)
    }
  }

  // Fetch data
  useEffect(() => {
    const tableId = isConfigured ? config!.tableId : null
    if (!tableId) return

    const table = savedTables.find((t) => t.id === tableId)
    if (!table) return

    if (table.projectId === '__query__') {
      if (table.queryData && table.queryData.length > 0) setRows(table.queryData)
      return
    }

    if (!accessToken) return

    let cancelled = false
    setLoading(true)
    setError(null)

    const load = async () => {
      try {
        let documents
        if (table.isCollectionGroup) {
          const result = await fetchCollectionGroup(accessToken, table.projectId, table.collectionPath, 500)
          documents = result.documents
        } else {
          const result = await fetchDocuments(accessToken, table.projectId, table.collectionPath, 500)
          documents = result.documents
        }
        if (cancelled) return
        const flattened = documents.map((d) => {
          const { __id, __path, __parentId, ...rest } = d
          return {
            __id,
            ...(table.isCollectionGroup ? { __path: __path ?? '', __parentId: __parentId ?? '' } : {}),
            ...flattenObject(rest as Record<string, unknown>),
          }
        })
        setRows(flattened)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [isConfigured ? config?.tableId : null, accessToken, savedTables])

  const filteredRows = applyWidgetFilters(rows, widget.filters)
  const chartData = isConfigured && filteredRows.length > 0 ? buildChartData(filteredRows, config!) : []
  const activeFilterCount = (widget.filters ?? []).filter((f) => f.column && f.operator).length

  // ----- Display card -----
  const table = isConfigured ? savedTables.find((t) => t.id === config!.tableId) : undefined
  const filterColumns = table ? table.columns.filter((c) => c.visible).map((c) => c.sourcePath) : (rows.length > 0 ? Object.keys(rows[0]).filter((k) => !k.startsWith('__')) : [])

  return (
    <div className="h-full bg-white rounded-md border border-gray-200 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow group/chart">
      {/* Header */}
      <div className={cn(
        'widget-drag-handle flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50/50 shrink-0 select-none',
        editMode ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
      )}>
        <div className="flex items-center gap-2 min-w-0">
          {editMode && <GripVertical size={14} className="text-gray-300 shrink-0" />}
          {editingTitle && editMode ? (
            <input
              ref={titleInputRef}
              type="text"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onBlur={commitTitle}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitTitle()
                if (e.key === 'Escape') setEditingTitle(false)
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-full text-xs font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-gray-500 focus:outline-none py-0"
            />
          ) : (
            <h4
              className={cn('text-xs font-medium text-gray-900 truncate', editMode && 'cursor-text')}
              onDoubleClick={() => {
                if (!editMode) return
                setDraftTitle(config?.label || 'Bar Chart')
                setEditingTitle(true)
              }}
            >
              {config?.label || 'Bar Chart'}
            </h4>
          )}
        </div>
        <div className="flex items-center gap-0.5 shrink-0 relative" onMouseDown={(e) => e.stopPropagation()}>
          <button
            ref={filterBtnRef}
            onClick={() => setShowFilters((v) => !v)}
            className={cn(
              'p-1 transition-colors rounded-md hover:bg-gray-100 cursor-pointer relative',
              activeFilterCount > 0 ? 'text-gray-600' : 'text-gray-300 hover:text-gray-600'
            )}
            title="Filter data"
          >
            <Filter size={12} />
            {activeFilterCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gray-700 text-white text-[7px] font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          {showFilters && (
            <FilterPanel
              filters={widget.filters ?? []}
              columns={filterColumns}
              onChange={onFiltersChange}
              onClose={() => setShowFilters(false)}
              anchorRef={filterBtnRef}
            />
          )}
          {editMode && (
            <>
              <button onClick={onOpenConfig} className="p-1 text-gray-300 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 cursor-pointer" title="Configure chart">
                <Settings2 size={12} />
              </button>
              <button onClick={onDuplicate} className="p-1 text-gray-300 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 cursor-pointer" title="Duplicate">
                <Copy size={12} />
              </button>
              <button onClick={onRemove} className="p-1 text-gray-300 hover:text-red-500 transition-colors rounded-md hover:bg-gray-100 cursor-pointer" title="Remove chart">
                <X size={12} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Chart body */}
      <div className="flex-1 overflow-hidden px-4 pt-2 pb-3">
        {!isConfigured ? (
          <div className="h-full flex flex-col items-center justify-center">
            {(config?.chartType ?? 'bar') === 'line' ? <TrendingUp size={24} className="text-gray-200 mb-2" /> : <BarChart3 size={24} className="text-gray-200 mb-2" />}
            <p className="text-xs text-gray-400">Not configured</p>
            {editMode && (
              <button onClick={onOpenConfig} className="mt-1.5 text-[10px] text-gray-500 hover:text-gray-700 underline cursor-pointer">Configure</button>
            )}
          </div>
        ) : loading ? (
          <div className="h-full flex flex-col items-center justify-center">
            <Loader2 size={18} className="animate-spin text-gray-300 mb-1" />
            <p className="text-[10px] text-gray-400">Loading…</p>
          </div>
        ) : error ? (
          <div className="h-full flex flex-col items-center justify-center">
            <AlertCircle size={16} className="text-gray-300 mb-1" />
            <p className="text-[10px] text-gray-500">{error}</p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <BarChart3 size={20} className="text-gray-200 mb-1" />
            <p className="text-[10px] text-gray-400">No data to display</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {(() => {
              const maxLabelLen = Math.max(...chartData.map((d) => String(d.name).length))
              const shouldAngle = chartData.length > 6 || maxLabelLen > 8
              const xTickHeight = shouldAngle ? Math.min(90, Math.max(40, maxLabelLen * 3.2 + 16)) : 24
              const chartColour = config?.colour ?? CHART_COLOUR_DEFAULT
              const interval = chartData.length > 40 ? Math.floor(chartData.length / 20) : chartData.length > 20 ? Math.floor(chartData.length / 12) : 0
              const isLine = (config?.chartType ?? 'bar') === 'line'

              const CustomXTick = ({ x, y, payload }: { x: number; y: number; payload: { value: string } }) => {
                const label = String(payload.value)
                const display = label.length > 14 ? label.slice(0, 12) + '…' : label
                return (
                  <g transform={`translate(${x},${y + 8})`}>
                    <text
                      x={0} y={0}
                      textAnchor={shouldAngle ? 'end' : 'middle'}
                      transform={shouldAngle ? 'rotate(-40)' : undefined}
                      fontSize={10}
                      fill="#9CA3AF"
                    >
                      {display}
                    </text>
                  </g>
                )
              }

              const sharedChildren = (
                <>
                  <defs>
                    <linearGradient id={`chartGrad-${widget.i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={chartColour} stopOpacity={isLine ? 0.15 : 0.85} />
                      <stop offset="100%" stopColor={chartColour} stopOpacity={isLine ? 0.01 : 0.5} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#F3F4F6" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={CustomXTick as never}
                    tickLine={false}
                    axisLine={false}
                    interval={interval}
                    height={xTickHeight}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#B0B5BD' }}
                    tickLine={false}
                    axisLine={false}
                    width={40}
                    tickFormatter={(v) => {
                      if (typeof v !== 'number') return String(v)
                      if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(v >= 10_000_000 ? 0 : 1)}M`
                      if (v >= 1_000) return `${(v / 1_000).toFixed(v >= 10_000 ? 0 : 1)}k`
                      return String(v)
                    }}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.[0]) return null
                      const val = payload[0].value as number
                      return (
                        <div className="bg-gray-900 text-white px-3 py-1.5 rounded-md shadow-lg text-xs">
                          <p className="font-medium">{label}</p>
                          <p className="text-gray-300 tabular-nums">{val.toLocaleString()}</p>
                        </div>
                      )
                    }}
                    cursor={isLine ? { stroke: chartColour, strokeWidth: 1, strokeDasharray: '4 4' } : { fill: `${chartColour}10`, radius: 4 }}
                  />
                </>
              )

              if (isLine) {
                return (
                  <LineChart data={chartData} margin={{ top: 4, right: 8, left: -8, bottom: shouldAngle ? 4 : 0 }}>
                    {sharedChildren}
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={chartColour}
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#fff', stroke: chartColour, strokeWidth: 2 }}
                      activeDot={{ r: 5, fill: chartColour, stroke: '#fff', strokeWidth: 2 }}
                      fill={`url(#chartGrad-${widget.i})`}
                      animationDuration={600}
                      animationEasing="ease-out"
                    />
                  </LineChart>
                )
              }

              return (
                <BarChart data={chartData} margin={{ top: 4, right: 8, left: -8, bottom: shouldAngle ? 4 : 0 }} barCategoryGap="20%">
                  {sharedChildren}
                  <Bar
                    dataKey="value"
                    fill={`url(#chartGrad-${widget.i})`}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={56}
                    animationDuration={600}
                    animationEasing="ease-out"
                  />
                </BarChart>
              )
            })()}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

/* ───────── Conditional Format Helpers ───────── */

const COND_OP_LABELS: Record<CondFormatOperator, string> = {
  gt: '>', gte: '≥', lt: '<', lte: '≤', eq: '=', neq: '≠',
  contains: 'contains', not_contains: 'doesn\'t contain',
  is_empty: 'is empty', is_not_empty: 'is not empty', between: 'between',
}

const COND_STYLE_LABELS: Record<CondFormatStyle, string> = {
  bg: 'Background', text: 'Text colour', bold: 'Bold', italic: 'Italic',
}

const PRESET_COLOURS = [
  '#dcfce7', '#fef9c3', '#fee2e2', '#dbeafe', '#f3e8ff', '#fce7f3', '#e0f2fe', '#ffedd5',
  '#16a34a', '#ca8a04', '#dc2626', '#2563eb', '#9333ea', '#db2777', '#0891b2', '#ea580c',
]

/** Evaluate a single conditional format rule against a row. */
function evalCondRule(rule: ConditionalFormatRule, row: Record<string, unknown>): boolean {
  if (!rule.enabled) return false
  const raw = row[rule.column]
  const str = raw != null ? String(raw) : ''
  const num = raw != null ? parseFloat(String(raw)) : NaN
  const cmpNum = parseFloat(rule.value)

  switch (rule.operator) {
    case 'gt': return !isNaN(num) && !isNaN(cmpNum) && num > cmpNum
    case 'gte': return !isNaN(num) && !isNaN(cmpNum) && num >= cmpNum
    case 'lt': return !isNaN(num) && !isNaN(cmpNum) && num < cmpNum
    case 'lte': return !isNaN(num) && !isNaN(cmpNum) && num <= cmpNum
    case 'eq': return str === rule.value || (!isNaN(num) && !isNaN(cmpNum) && num === cmpNum)
    case 'neq': return str !== rule.value
    case 'contains': return str.toLowerCase().includes(rule.value.toLowerCase())
    case 'not_contains': return !str.toLowerCase().includes(rule.value.toLowerCase())
    case 'is_empty': return raw == null || str === ''
    case 'is_not_empty': return raw != null && str !== ''
    case 'between': {
      const lo = parseFloat(rule.value)
      const hi = parseFloat(rule.value2 ?? '')
      return !isNaN(num) && !isNaN(lo) && !isNaN(hi) && num >= lo && num <= hi
    }
    default: return false
  }
}

/** Compute inline style object for a cell given all conditional format rules. */
function getCondStyle(
  rules: ConditionalFormatRule[] | undefined,
  row: Record<string, unknown>,
  columnKey: string,
  target: 'cell'
): React.CSSProperties {
  if (!rules || rules.length === 0) return {}
  const style: React.CSSProperties = {}
  for (const rule of rules) {
    if (!rule.enabled) continue
    // For cell-targeted rules, only match the specific column
    // For row-targeted rules, apply to every column
    if (rule.target === 'cell' && rule.column !== columnKey) continue
    if (!evalCondRule(rule, row)) continue
    switch (rule.style) {
      case 'bg': style.backgroundColor = rule.colour; break
      case 'text': style.color = rule.colour; break
      case 'bold': style.fontWeight = 600; break
      case 'italic': style.fontStyle = 'italic'; break
    }
  }
  return style
}

/** Shared conditional formatting editor used by Table and Pivot config panels. */
function ConditionalFormattingSection({
  rules,
  columns,
  onChange,
}: {
  rules: ConditionalFormatRule[]
  columns: { key: string; label: string }[]
  onChange: (rules: ConditionalFormatRule[]) => void
}) {
  const [expanded, setExpanded] = useState(rules.length > 0)

  const addRule = () => {
    const newRule: ConditionalFormatRule = {
      id: `cf-${Date.now()}`,
      column: columns[0]?.key ?? '',
      operator: 'gt',
      value: '',
      style: 'bg',
      colour: '#dcfce7',
      target: 'cell',
      enabled: true,
    }
    onChange([...rules, newRule])
    setExpanded(true)
  }

  const updateRule = (id: string, patch: Partial<ConditionalFormatRule>) => {
    onChange(rules.map((r) => r.id === id ? { ...r, ...patch } : r))
  }

  const removeRule = (id: string) => {
    onChange(rules.filter((r) => r.id !== id))
  }

  const needsValue = (op: CondFormatOperator) => !['is_empty', 'is_not_empty'].includes(op)
  const needsColour = (style: CondFormatStyle) => ['bg', 'text'].includes(style)

  return (
    <div className="border-t border-gray-100">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-1.5 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
          <Paintbrush size={10} />
          Conditional Formatting
          {rules.length > 0 && (
            <span className="ml-1 text-[9px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-md">{rules.length}</span>
          )}
        </span>
        <ChevronDown className={cn('h-3 w-3 text-gray-400 transition-transform duration-200', expanded && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 space-y-2">
              {rules.length === 0 && (
                <p className="text-[10px] text-gray-400 py-1">No rules yet. Add one to highlight cells based on their values.</p>
              )}

              {rules.map((rule) => (
                <div key={rule.id} className="bg-white border border-gray-200 rounded-md p-2.5 space-y-2">
                  {/* Row 1: column, operator, enable/delete */}
                  <div className="flex items-center gap-1.5">
                    <select
                      value={rule.column}
                      onChange={(e) => updateRule(rule.id, { column: e.target.value })}
                      className="flex-1 text-[10px] border border-gray-200 rounded-md px-1.5 py-1 text-gray-700 bg-white focus:outline-none focus:border-gray-400 min-w-0 truncate"
                    >
                      {columns.map((c) => (
                        <option key={c.key} value={c.key}>{c.label}</option>
                      ))}
                    </select>
                    <select
                      value={rule.operator}
                      onChange={(e) => updateRule(rule.id, { operator: e.target.value as CondFormatOperator })}
                      className="text-[10px] border border-gray-200 rounded-md px-1.5 py-1 text-gray-700 bg-white focus:outline-none focus:border-gray-400"
                    >
                      {Object.entries(COND_OP_LABELS).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => updateRule(rule.id, { enabled: !rule.enabled })}
                      className={cn('p-0.5 transition-colors rounded cursor-pointer', rule.enabled ? 'text-gray-500' : 'text-gray-300')}
                      title={rule.enabled ? 'Disable rule' : 'Enable rule'}
                    >
                      {rule.enabled ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                    </button>
                    <button
                      onClick={() => removeRule(rule.id)}
                      className="p-0.5 text-gray-300 hover:text-red-500 transition-colors rounded cursor-pointer"
                      title="Delete rule"
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>

                  {/* Row 2: value(s) */}
                  {needsValue(rule.operator) && (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={rule.value}
                        onChange={(e) => updateRule(rule.id, { value: e.target.value })}
                        placeholder="Value"
                        className="flex-1 text-[10px] border border-gray-200 rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:border-gray-400"
                      />
                      {rule.operator === 'between' && (
                        <>
                          <span className="text-[9px] text-gray-400">and</span>
                          <input
                            type="text"
                            value={rule.value2 ?? ''}
                            onChange={(e) => updateRule(rule.id, { value2: e.target.value })}
                            placeholder="Value 2"
                            className="flex-1 text-[10px] border border-gray-200 rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:border-gray-400"
                          />
                        </>
                      )}
                    </div>
                  )}

                  {/* Row 3: style, colour, target */}
                  <div className="flex items-center gap-1.5">
                    <select
                      value={rule.style}
                      onChange={(e) => updateRule(rule.id, { style: e.target.value as CondFormatStyle })}
                      className="text-[10px] border border-gray-200 rounded-md px-1.5 py-1 text-gray-700 bg-white focus:outline-none focus:border-gray-400"
                    >
                      {Object.entries(COND_STYLE_LABELS).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>

                    {needsColour(rule.style) && (
                      <div className="flex items-center gap-1">
                        <input
                          type="color"
                          value={rule.colour}
                          onChange={(e) => updateRule(rule.id, { colour: e.target.value })}
                          className="w-5 h-5 rounded border border-gray-200 cursor-pointer p-0"
                        />
                        <div className="flex gap-0.5">
                          {PRESET_COLOURS.slice(0, 8).map((c) => (
                            <button
                              key={c}
                              onClick={() => updateRule(rule.id, { colour: c })}
                              className={cn('w-3.5 h-3.5 rounded-sm border cursor-pointer transition-transform hover:scale-125', rule.colour === c ? 'border-gray-500 scale-110' : 'border-gray-200')}
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex-1" />

                    <select
                      value={rule.target}
                      onChange={(e) => updateRule(rule.id, { target: e.target.value as CondFormatTarget })}
                      className="text-[10px] border border-gray-200 rounded-md px-1.5 py-1 text-gray-700 bg-white focus:outline-none focus:border-gray-400"
                    >
                      <option value="cell">Cell</option>
                      <option value="row">Entire row</option>
                    </select>
                  </div>

                  {/* Preview swatch */}
                  <div
                    className="text-[9px] px-2 py-1 rounded-md border border-gray-100 inline-block"
                    style={
                      rule.style === 'bg' ? { backgroundColor: rule.colour } :
                      rule.style === 'text' ? { color: rule.colour } :
                      rule.style === 'bold' ? { fontWeight: 600 } :
                      rule.style === 'italic' ? { fontStyle: 'italic' } : {}
                    }
                  >
                    Sample text
                  </div>
                </div>
              ))}

              <button
                onClick={addRule}
                className="flex items-center gap-1 text-[10px] font-medium text-gray-500 hover:text-gray-700 transition-colors cursor-pointer px-1 py-1"
              >
                <Plus size={10} />
                Add rule
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ───────── Config Panel: Table ───────── */
function TableConfigPanel({
  widget,
  table,
  onHiddenColumnsChange,
  onColumnAliasChange,
  onColumnOrderChange,
  onConditionalFormatsChange,
  onClose,
}: {
  widget: DashboardWidget
  table: SavedTable | undefined
  onHiddenColumnsChange: (cols: string[]) => void
  onColumnAliasChange: (sourcePath: string, alias: string) => void
  onColumnOrderChange: (order: string[]) => void
  onConditionalFormatsChange: (rules: ConditionalFormatRule[]) => void
  onClose: () => void
}) {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [draftName, setDraftName] = useState('')
  const renameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editingKey && renameInputRef.current) {
      renameInputRef.current.focus()
      renameInputRef.current.select()
    }
  }, [editingKey])

  const hiddenSet = new Set(widget.hiddenColumns ?? [])
  const sourceCols = table?.columns.filter((c) => c.visible) ?? []

  type ColItem = { key: string; name: string }
  const allCols: ColItem[] = sourceCols.map((c) => ({
    key: c.sourcePath,
    name: widget.columnAliases?.[c.sourcePath] || c.alias || c.sourcePath,
  }))

  // Apply ordering
  const orderedCols = widget.columnOrder
    ? widget.columnOrder.map((k) => allCols.find((c) => c.key === k)).filter(Boolean) as ColItem[]
    : allCols
  const orderedSet = new Set(widget.columnOrder ?? [])
  const unorderedCols = allCols.filter((c) => !orderedSet.has(c.key))
  const displayList = [...orderedCols, ...unorderedCols]

  const toggleSelection = (key: string) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const selectAll = () => {
    if (selectedKeys.size === displayList.length) {
      setSelectedKeys(new Set())
    } else {
      setSelectedKeys(new Set(displayList.map((c) => c.key)))
    }
  }

  const toggleVisibility = (key: string) => {
    const hidden = widget.hiddenColumns ?? []
    if (hiddenSet.has(key)) {
      onHiddenColumnsChange(hidden.filter((k) => k !== key))
    } else {
      onHiddenColumnsChange([...hidden, key])
    }
  }

  const hideSelected = () => {
    const hidden = widget.hiddenColumns ?? []
    const toHide = [...selectedKeys].filter((k) => !hiddenSet.has(k))
    if (toHide.length > 0) {
      onHiddenColumnsChange([...hidden, ...toHide])
    }
    setSelectedKeys(new Set())
  }

  const showSelected = () => {
    const hidden = widget.hiddenColumns ?? []
    onHiddenColumnsChange(hidden.filter((k) => !selectedKeys.has(k)))
    setSelectedKeys(new Set())
  }

  const moveColumn = (key: string, direction: 'up' | 'down') => {
    const currentOrder = displayList.map((c) => c.key)
    const idx = currentOrder.indexOf(key)
    if (idx < 0) return
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= currentOrder.length) return
    const newOrder = [...currentOrder]
    ;[newOrder[idx], newOrder[swapIdx]] = [newOrder[swapIdx], newOrder[idx]]
    onColumnOrderChange(newOrder)
  }

  const commitRename = () => {
    if (!editingKey) return
    const trimmed = draftName.trim()
    if (trimmed) {
      onColumnAliasChange(editingKey, trimmed)
    }
    setEditingKey(null)
  }

  const visibleCount = displayList.filter((c) => !hiddenSet.has(c.key)).length
  const hiddenCount = displayList.length - visibleCount
  const selectedHiddenCount = [...selectedKeys].filter((k) => hiddenSet.has(k)).length
  const selectedVisibleCount = selectedKeys.size - selectedHiddenCount

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-2">
          <Table size={14} className="text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-900">Configure Table</h3>
        </div>
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 cursor-pointer">
          <X size={14} />
        </button>
      </div>

      {/* Bulk actions bar */}
      <AnimatePresence>
        {selectedKeys.size > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden border-b border-gray-100"
          >
            <div className="px-4 py-2 flex items-center gap-2 bg-gray-50">
              <span className="text-[10px] font-medium text-gray-600">{selectedKeys.size} selected</span>
              <div className="flex-1" />
              {selectedVisibleCount > 0 && (
                <button
                  onClick={hideSelected}
                  className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                >
                  <EyeOff size={10} />
                  Hide
                </button>
              )}
              {selectedHiddenCount > 0 && (
                <button
                  onClick={showSelected}
                  className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                >
                  <Eye size={10} />
                  Show
                </button>
              )}
              <button
                onClick={() => setSelectedKeys(new Set())}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded cursor-pointer"
              >
                <X size={10} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-auto">
        {/* Column header */}
        <div className="px-4 pt-3 pb-1.5 flex items-center justify-between">
          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
            Columns ({visibleCount}{hiddenCount > 0 ? ` / ${displayList.length}` : ''})
          </p>
          <button
            onClick={selectAll}
            className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            {selectedKeys.size === displayList.length ? 'Deselect all' : 'Select all'}
          </button>
        </div>

        <div className="px-2 pb-2">
          {displayList.map((col, idx) => {
            const isHidden = hiddenSet.has(col.key)
            const isSelected = selectedKeys.has(col.key)
            const isEditing = editingKey === col.key

            return (
              <div
                key={col.key}
                className={cn(
                  'group/col flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs transition-colors',
                  isSelected && !isHidden && 'bg-gray-100',
                  isSelected && isHidden && 'bg-gray-100 opacity-50',
                  !isSelected && isHidden && 'opacity-40',
                  !isSelected && !isHidden && 'hover:bg-gray-50'
                )}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleSelection(col.key)}
                  className={cn(
                    'w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors cursor-pointer',
                    isSelected
                      ? 'bg-gray-700 border-gray-700'
                      : 'border-gray-300 hover:border-gray-400'
                  )}
                >
                  {isSelected && <Check size={8} className="text-white" />}
                </button>

                {/* Reorder arrows */}
                <div className="flex flex-col gap-0.5 opacity-0 group-hover/col:opacity-100 transition-opacity shrink-0">
                  <button
                    onClick={() => moveColumn(col.key, 'up')}
                    disabled={idx === 0}
                    className="p-0 text-gray-300 hover:text-gray-500 disabled:opacity-20 cursor-pointer disabled:cursor-default"
                  >
                    <ArrowUp size={8} />
                  </button>
                  <button
                    onClick={() => moveColumn(col.key, 'down')}
                    disabled={idx === displayList.length - 1}
                    className="p-0 text-gray-300 hover:text-gray-500 disabled:opacity-20 cursor-pointer disabled:cursor-default"
                  >
                    <ArrowDown size={8} />
                  </button>
                </div>

                {/* Column name — double-click to rename */}
                {isEditing ? (
                  <input
                    ref={renameInputRef}
                    type="text"
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    onBlur={commitRename}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') commitRename()
                      if (e.key === 'Escape') setEditingKey(null)
                    }}
                    className="flex-1 min-w-0 text-xs text-gray-700 bg-transparent border-b border-gray-400 focus:border-gray-600 focus:outline-none py-0"
                  />
                ) : (
                  <span
                    onDoubleClick={() => {
                      setDraftName(col.name)
                      setEditingKey(col.key)
                    }}
                    className={cn(
                      'flex-1 truncate select-none cursor-default',
                      isHidden ? 'line-through text-gray-400' : 'text-gray-700'
                    )}
                    title="Double-click to rename"
                  >
                    {col.name}
                  </span>
                )}

                {/* Visibility toggle */}
                <button
                  onClick={() => toggleVisibility(col.key)}
                  className={cn(
                    'p-0.5 transition-colors rounded cursor-pointer shrink-0',
                    isHidden
                      ? 'text-gray-300 hover:text-gray-600'
                      : 'text-gray-300 hover:text-gray-600 opacity-0 group-hover/col:opacity-100'
                  )}
                  title={isHidden ? 'Show column' : 'Hide column'}
                >
                  {isHidden ? <EyeOff size={10} /> : <Eye size={10} />}
                </button>
              </div>
            )
          })}
        </div>

        {/* Show all hidden */}
        {hiddenCount > 0 && (
          <div className="px-4 py-2 border-t border-gray-100">
            <button
              onClick={() => onHiddenColumnsChange([])}
              className="text-[10px] text-gray-500 hover:text-gray-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Eye size={10} />
              Show all {hiddenCount} hidden column{hiddenCount > 1 ? 's' : ''}
            </button>
          </div>
        )}

        {/* Conditional Formatting */}
        <ConditionalFormattingSection
          rules={widget.conditionalFormats ?? []}
          columns={allCols.map((c) => ({ key: c.key, label: c.name }))}
          onChange={onConditionalFormatsChange}
        />
      </div>
    </div>
  )
}

/* ───────── Config Panel: Metric ───────── */
function MetricConfigPanel({
  widget,
  savedTables,
  onApply,
  onClose,
}: {
  widget: DashboardWidget
  savedTables: SavedTable[]
  onApply: (config: MetricConfig) => void
  onClose: () => void
}) {
  const config = widget.metricConfig
  const [draftTableId, setDraftTableId] = useState(config?.tableId ?? '')
  const [draftAgg, setDraftAgg] = useState<AggregationType>(config?.aggregation ?? 'count')
  const [draftColumn, setDraftColumn] = useState(config?.column ?? '')
  const [draftDateColumn, setDraftDateColumn] = useState(config?.dateColumn ?? '')
  const [draftTimeframe, setDraftTimeframe] = useState(config?.timeframe ?? 'all')
  const [draftPrefix, setDraftPrefix] = useState(config?.prefix ?? '')
  const [draftSuffix, setDraftSuffix] = useState(config?.suffix ?? '')
  const [draftLabel, setDraftLabel] = useState(config?.label ?? '')
  const [draftLayout, setDraftLayout] = useState<MetricLayout>(config?.layout ?? 'centered')
  const [draftTitleSize, setDraftTitleSize] = useState<MetricValueSize>(config?.titleSize ?? 'sm')
  const [draftValueSize, setDraftValueSize] = useState<MetricValueSize>(config?.valueSize ?? 'md')
  const [draftShowLabel, setDraftShowLabel] = useState(config?.showLabel !== false)
  const [draftColour, setDraftColour] = useState(config?.colour ?? '')

  const draftTable = savedTables.find((t) => t.id === draftTableId)
  const draftColumns = draftTable?.columns.filter((c) => c.visible) ?? []
  const dateColumns = draftColumns.filter((c) =>
    ['timestamp', 'date', 'time', 'datetime'].some((t) => c.dataType.toLowerCase().includes(t)) ||
    ['createdAt', 'updatedAt', 'created_at', 'updated_at', 'date', 'timestamp'].includes(c.sourcePath)
  )
  const needsColumn = draftAgg !== 'count'

  // Auto-apply on every change
  useEffect(() => {
    if (!draftTableId) return
    if (needsColumn && !draftColumn) return
    const newConfig: MetricConfig = {
      tableId: draftTableId,
      aggregation: draftAgg,
      column: draftColumn,
      label: draftLabel || `${AGGREGATION_LABELS[draftAgg]}${draftColumn ? ` of ${draftColumn}` : ''}`,
      ...(draftDateColumn ? { dateColumn: draftDateColumn } : {}),
      ...(draftTimeframe !== 'all' ? { timeframe: draftTimeframe } : {}),
      ...(draftPrefix ? { prefix: draftPrefix } : {}),
      ...(draftSuffix ? { suffix: draftSuffix } : {}),
      layout: draftLayout,
      titleSize: draftTitleSize,
      valueSize: draftValueSize,
      showLabel: draftShowLabel,
      ...(draftColour ? { colour: draftColour } : {}),
    }
    onApply(newConfig)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftTableId, draftAgg, draftColumn, draftDateColumn, draftTimeframe, draftPrefix, draftSuffix, draftLabel, draftLayout, draftTitleSize, draftValueSize, draftShowLabel, draftColour])

  const inputCls = 'w-full mt-0.5 text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-white'

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-2">
          <Gauge size={14} className="text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-900">Configure Metric</h3>
        </div>
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 cursor-pointer">
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-3">
        <div>
          <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Label</label>
          <input type="text" value={draftLabel} onChange={(e) => setDraftLabel(e.target.value)} placeholder="e.g. Total Revenue" className={inputCls} />
        </div>

        <div>
          <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Data Source</label>
          <select value={draftTableId} onChange={(e) => { setDraftTableId(e.target.value); setDraftColumn(''); setDraftDateColumn('') }} className={inputCls}>
            <option value="">Select a table…</option>
            {savedTables.map((t) => (<option key={t.id} value={t.id}>{t.tableName}</option>))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Aggregation</label>
          <select value={draftAgg} onChange={(e) => { setDraftAgg(e.target.value as AggregationType); if (e.target.value === 'count') setDraftColumn('') }} className={inputCls}>
            {Object.entries(AGGREGATION_LABELS).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
          </select>
        </div>

        {needsColumn && draftTableId && (
          <div>
            <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Column</label>
            <select value={draftColumn} onChange={(e) => setDraftColumn(e.target.value)} className={inputCls}>
              <option value="">Select column…</option>
              {draftColumns.map((c) => (
                <option key={c.id} value={c.sourcePath}>{c.alias || c.sourcePath}</option>
              ))}
            </select>
            <p className="text-[9px] text-gray-400 mt-0.5">Numeric values stored as text will be parsed automatically</p>
          </div>
        )}

        {draftTableId && dateColumns.length > 0 && (
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Date Column</label>
              <select value={draftDateColumn} onChange={(e) => setDraftDateColumn(e.target.value)} className={inputCls}>
                <option value="">None</option>
                {dateColumns.map((c) => (<option key={c.id} value={c.sourcePath}>{c.alias || c.sourcePath}</option>))}
              </select>
            </div>
            {draftDateColumn && (
              <div className="flex-1">
                <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Timeframe</label>
                <select value={draftTimeframe} onChange={(e) => setDraftTimeframe(e.target.value as MetricConfig['timeframe'])} className={inputCls}>
                  {Object.entries(TIMEFRAME_LABELS).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
                </select>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Prefix</label>
            <input type="text" value={draftPrefix} onChange={(e) => setDraftPrefix(e.target.value)} placeholder="$ £ €" className={inputCls} />
          </div>
          <div className="flex-1">
            <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Suffix</label>
            <input type="text" value={draftSuffix} onChange={(e) => setDraftSuffix(e.target.value)} placeholder="% users" className={inputCls} />
          </div>
        </div>

        {/* ── Display section ── */}
        <div className="pt-2 border-t border-gray-100">
          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-2">Display</p>

          <div className="space-y-3">
            {/* Layout */}
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Layout</label>
              <div className="flex items-center bg-gray-100 p-0.5 rounded-md w-fit mt-1">
                {([['centered', 'Centre'], ['left', 'Left'], ['minimal', 'Minimal']] as [MetricLayout, string][]).map(([val, lbl]) => (
                  <button
                    key={val}
                    onClick={() => setDraftLayout(val)}
                    className={cn(
                      'px-2.5 py-1 text-[10px] font-medium rounded-md transition-colors cursor-pointer',
                      draftLayout === val ? 'text-gray-800 bg-white shadow-sm' : 'text-gray-500 hover:bg-gray-200/70'
                    )}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>

            {/* Title size */}
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Title Size</label>
              <div className="flex items-center bg-gray-100 p-0.5 rounded-md w-fit mt-1">
                {([['sm', 'S'], ['md', 'M'], ['lg', 'L'], ['xl', 'XL']] as [MetricValueSize, string][]).map(([val, lbl]) => (
                  <button
                    key={val}
                    onClick={() => setDraftTitleSize(val)}
                    className={cn(
                      'px-2.5 py-1 text-[10px] font-medium rounded-md transition-colors cursor-pointer min-w-[28px] text-center',
                      draftTitleSize === val ? 'text-gray-800 bg-white shadow-sm' : 'text-gray-500 hover:bg-gray-200/70'
                    )}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>

            {/* Value size */}
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Value Size</label>
              <div className="flex items-center bg-gray-100 p-0.5 rounded-md w-fit mt-1">
                {([['sm', 'S'], ['md', 'M'], ['lg', 'L'], ['xl', 'XL']] as [MetricValueSize, string][]).map(([val, lbl]) => (
                  <button
                    key={val}
                    onClick={() => setDraftValueSize(val)}
                    className={cn(
                      'px-2.5 py-1 text-[10px] font-medium rounded-md transition-colors cursor-pointer min-w-[28px] text-center',
                      draftValueSize === val ? 'text-gray-800 bg-white shadow-sm' : 'text-gray-500 hover:bg-gray-200/70'
                    )}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>

            {/* Show label toggle */}
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Show Label</label>
              <button
                onClick={() => setDraftShowLabel((v) => !v)}
                className={cn(
                  'w-8 h-[18px] rounded-full transition-colors relative cursor-pointer',
                  draftShowLabel ? 'bg-gray-700' : 'bg-gray-300'
                )}
              >
                <span className={cn(
                  'absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white transition-transform shadow-sm',
                  draftShowLabel ? 'left-[16px]' : 'left-[2px]'
                )} />
              </button>
            </div>

            {/* Value colour */}
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Value Colour</label>
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                <button
                  onClick={() => setDraftColour('')}
                  className={cn(
                    'w-5 h-5 rounded-full border-2 transition-colors cursor-pointer bg-gray-900',
                    !draftColour ? 'border-gray-400 ring-1 ring-gray-300' : 'border-transparent'
                  )}
                  title="Default"
                />
                {CHART_COLOUR_PRESETS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setDraftColour(c)}
                    className={cn(
                      'w-5 h-5 rounded-full border-2 transition-colors cursor-pointer',
                      draftColour === c ? 'border-gray-400 ring-1 ring-gray-300' : 'border-transparent'
                    )}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

/* ───────── Config Panel: Chart ───────── */
function ChartConfigPanel({
  widget,
  savedTables,
  onApply,
  onClose,
}: {
  widget: DashboardWidget
  savedTables: SavedTable[]
  onApply: (config: ChartConfig) => void
  onClose: () => void
}) {
  const config = widget.chartConfig
  const [draftTableId, setDraftTableId] = useState(config?.tableId ?? '')
  const [draftCategoryCol, setDraftCategoryCol] = useState(config?.categoryColumn ?? '')
  const [draftValueCol, setDraftValueCol] = useState(config?.valueColumn ?? '')
  const [draftAgg, setDraftAgg] = useState<AggregationType>(config?.aggregation ?? 'count')
  const [draftDateColumn, setDraftDateColumn] = useState(config?.dateColumn ?? '')
  const [draftTimeframe, setDraftTimeframe] = useState(config?.timeframe ?? 'all')
  const [draftLabel, setDraftLabel] = useState(config?.label ?? '')
  const [draftMaxBars, setDraftMaxBars] = useState(config?.maxBars ?? 20)
  const [draftSortBy, setDraftSortBy] = useState<'value' | 'category'>(config?.sortBy ?? 'value')
  const [draftDateTruncate, setDraftDateTruncate] = useState<DateTruncation>(config?.dateTruncate ?? 'none')
  const [draftColour, setDraftColour] = useState(config?.colour ?? CHART_COLOUR_DEFAULT)
  const [draftChartType, setDraftChartType] = useState<ChartType>(config?.chartType ?? 'bar')

  const draftTable = savedTables.find((t) => t.id === draftTableId)
  const draftColumns = draftTable?.columns.filter((c) => c.visible) ?? []
  const dateColumns = draftColumns.filter((c) =>
    ['timestamp', 'date', 'time', 'datetime'].some((t) => c.dataType.toLowerCase().includes(t)) ||
    ['createdAt', 'updatedAt', 'created_at', 'updated_at', 'date', 'timestamp'].includes(c.sourcePath)
  )

  const selectedCatCol = draftColumns.find((c) => c.sourcePath === draftCategoryCol)
  const isCategoryDate = selectedCatCol && (
    ['timestamp', 'date', 'time', 'datetime'].some((t) => selectedCatCol.dataType.toLowerCase().includes(t)) ||
    ['createdAt', 'updatedAt', 'created_at', 'updated_at', 'date', 'timestamp'].includes(selectedCatCol.sourcePath)
  )

  const canApply = draftTableId && draftCategoryCol && (draftAgg === 'count' || draftValueCol)

  // Auto-apply on every change
  useEffect(() => {
    if (!canApply) return
    const newConfig: ChartConfig = {
      chartType: draftChartType,
      tableId: draftTableId,
      categoryColumn: draftCategoryCol,
      valueColumn: draftValueCol,
      aggregation: draftAgg,
      label: draftLabel || `${AGGREGATION_LABELS[draftAgg]} by ${draftCategoryCol}`,
      maxBars: draftMaxBars,
      sortBy: draftSortBy,
      ...(draftDateTruncate !== 'none' ? { dateTruncate: draftDateTruncate } : {}),
      ...(draftDateColumn ? { dateColumn: draftDateColumn } : {}),
      ...(draftTimeframe !== 'all' ? { timeframe: draftTimeframe } : {}),
      ...(draftColour !== CHART_COLOUR_DEFAULT ? { colour: draftColour } : {}),
    }
    onApply(newConfig)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftChartType, draftTableId, draftCategoryCol, draftValueCol, draftAgg, draftLabel, draftMaxBars, draftSortBy, draftDateTruncate, draftDateColumn, draftTimeframe, draftColour])

  const inputCls = 'w-full mt-0.5 text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-white'
  const sectionLabel = 'text-[9px] font-semibold text-gray-400 uppercase tracking-widest mt-1 mb-1'

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-2">
          {(config?.chartType ?? 'bar') === 'line' ? <TrendingUp size={14} className="text-gray-400" /> : <BarChart3 size={14} className="text-gray-400" />}
          <h3 className="text-sm font-semibold text-gray-900">Configure Chart</h3>
        </div>
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 cursor-pointer">
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-3">
        {/* ── Chart Type ── */}
        <div>
          <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Chart Type</label>
          <div className="flex items-center bg-gray-100 p-0.5 rounded-md w-fit mt-1">
            <button
              onClick={() => setDraftChartType('bar')}
              className={cn(
                'flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors',
                draftChartType === 'bar' ? 'text-gray-800 bg-white shadow-sm' : 'text-gray-600 hover:bg-gray-200/70'
              )}
            >
              <BarChart3 className="h-3 w-3" />
              Bar
            </button>
            <button
              onClick={() => setDraftChartType('line')}
              className={cn(
                'flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors',
                draftChartType === 'line' ? 'text-gray-800 bg-white shadow-sm' : 'text-gray-600 hover:bg-gray-200/70'
              )}
            >
              <TrendingUp className="h-3 w-3" />
              Line
            </button>
          </div>
        </div>

        {/* ── Title ── */}
        <div>
          <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Chart Title</label>
          <input type="text" value={draftLabel} onChange={(e) => setDraftLabel(e.target.value)} placeholder="e.g. Revenue by Region" className={inputCls} />
        </div>

        {/* ── Data Source ── */}
        <p className={sectionLabel}>Data</p>
        <div>
          <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Table</label>
          <select value={draftTableId} onChange={(e) => { setDraftTableId(e.target.value); setDraftCategoryCol(''); setDraftValueCol(''); setDraftDateColumn('') }} className={inputCls}>
            <option value="">Select a table…</option>
            {savedTables.map((t) => (<option key={t.id} value={t.id}>{t.tableName}</option>))}
          </select>
        </div>

        {/* ── X-Axis ── */}
        {draftTableId && (
          <>
            <p className={sectionLabel}>X-Axis (Categories)</p>
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Column</label>
              <select value={draftCategoryCol} onChange={(e) => { setDraftCategoryCol(e.target.value); setDraftDateTruncate('none') }} className={inputCls}>
                <option value="">Select column…</option>
                {draftColumns.map((c) => (<option key={c.id} value={c.sourcePath}>{c.alias || c.sourcePath}</option>))}
              </select>
            </div>

            {draftCategoryCol && isCategoryDate && (
              <div>
                <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Group Dates By</label>
                <select value={draftDateTruncate} onChange={(e) => setDraftDateTruncate(e.target.value as DateTruncation)} className={inputCls}>
                  <option value="none">Exact value</option>
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                  <option value="year">Year</option>
                </select>
              </div>
            )}
          </>
        )}

        {/* ── Y-Axis ── */}
        {draftTableId && (
          <>
            <p className={sectionLabel}>Y-Axis (Values)</p>
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Aggregation</label>
              <select value={draftAgg} onChange={(e) => { setDraftAgg(e.target.value as AggregationType); if (e.target.value === 'count') setDraftValueCol('') }} className={inputCls}>
                {Object.entries(AGGREGATION_LABELS).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
              </select>
            </div>

            {draftAgg !== 'count' && (
              <div>
                <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Value Column</label>
                <select value={draftValueCol} onChange={(e) => setDraftValueCol(e.target.value)} className={inputCls}>
                  <option value="">Select column…</option>
                  {draftColumns.map((c) => (<option key={c.id} value={c.sourcePath}>{c.alias || c.sourcePath}</option>))}
                </select>
                <p className="text-[9px] text-gray-400 mt-0.5">Numeric values stored as text will be parsed automatically</p>
              </div>
            )}
          </>
        )}

        {/* ── Date Filter (optional) ── */}
        {draftTableId && dateColumns.length > 0 && (
          <>
            <p className={sectionLabel}>Date Filter (optional)</p>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Date Column</label>
                <select value={draftDateColumn} onChange={(e) => setDraftDateColumn(e.target.value)} className={inputCls}>
                  <option value="">None</option>
                  {dateColumns.map((c) => (<option key={c.id} value={c.sourcePath}>{c.alias || c.sourcePath}</option>))}
                </select>
              </div>
              {draftDateColumn && (
                <div className="flex-1">
                  <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Timeframe</label>
                  <select value={draftTimeframe} onChange={(e) => setDraftTimeframe(e.target.value as ChartConfig['timeframe'])} className={inputCls}>
                    {Object.entries(TIMEFRAME_LABELS).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
                  </select>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── Display ── */}
        {draftTableId && (
          <>
            <p className={sectionLabel}>Display</p>
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Colour</label>
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                {CHART_COLOUR_PRESETS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setDraftColour(c)}
                    className={cn(
                      'w-6 h-6 rounded-full transition-all cursor-pointer border-2',
                      draftColour === c ? 'border-gray-900 scale-110' : 'border-transparent hover:scale-110'
                    )}
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Sort By</label>
                <select value={draftSortBy} onChange={(e) => setDraftSortBy(e.target.value as 'value' | 'category')} className={inputCls}>
                  <option value="value">Value (desc)</option>
                  <option value="category">Category (A-Z)</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Max Bars</label>
                <input type="number" min={1} max={100} value={draftMaxBars} onChange={(e) => setDraftMaxBars(Math.max(1, parseInt(e.target.value) || 20))} className={inputCls} />
              </div>
            </div>
          </>
        )}
      </div>

    </div>
  )
}

/* ───────── Config Panel: Element (Heading / Text) ───────── */

function ElementConfigPanel({
  widget,
  onApply,
  onClose,
}: {
  widget: DashboardWidget
  onApply: (config: ElementConfig) => void
  onClose: () => void
}) {
  const config = widget.elementConfig ?? {}
  const [draftFontSize, setDraftFontSize] = useState<ElementFontSize>(config.fontSize ?? (widget.type === 'heading' ? 'base' : 'sm'))
  const [draftFontWeight, setDraftFontWeight] = useState<string>(config.fontWeight ?? (widget.type === 'heading' ? 'semibold' : 'normal'))
  const [draftAlign, setDraftAlign] = useState<ElementAlign>(config.align ?? 'left')
  const [draftColour, setDraftColour] = useState(config.colour ?? '')

  const isHeading = widget.type === 'heading'

  // Auto-apply
  useEffect(() => {
    const newConfig: ElementConfig = {
      fontSize: draftFontSize,
      fontWeight: draftFontWeight as ElementConfig['fontWeight'],
      align: draftAlign,
      ...(draftColour ? { colour: draftColour } : {}),
    }
    onApply(newConfig)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftFontSize, draftFontWeight, draftAlign, draftColour])

  const inputCls = 'w-full mt-0.5 text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-white'

  const fontSizeOptions: { value: ElementFontSize; label: string }[] = [
    { value: 'xs', label: 'XS' },
    { value: 'sm', label: 'S' },
    { value: 'base', label: 'M' },
    { value: 'lg', label: 'L' },
    { value: 'xl', label: 'XL' },
    { value: '2xl', label: '2XL' },
    { value: '3xl', label: '3XL' },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-2">
          {isHeading ? <Type size={14} className="text-gray-400" /> : <AlignLeft size={14} className="text-gray-400" />}
          <h3 className="text-sm font-semibold text-gray-900">Configure {isHeading ? 'Heading' : 'Text'}</h3>
        </div>
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 cursor-pointer">
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Font Size */}
        <div>
          <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Font Size</label>
          <div className="flex items-center bg-gray-100 p-0.5 rounded-md w-fit mt-1">
            {fontSizeOptions.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setDraftFontSize(value)}
                className={cn(
                  'px-2 py-1 text-[10px] font-medium rounded-md transition-colors cursor-pointer min-w-[28px] text-center',
                  draftFontSize === value ? 'text-gray-800 bg-white shadow-sm' : 'text-gray-500 hover:bg-gray-200/70'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Font Weight */}
        <div>
          <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Font Weight</label>
          <div className="flex items-center bg-gray-100 p-0.5 rounded-md w-fit mt-1">
            {([['normal', 'Normal'], ['medium', 'Medium'], ['semibold', 'Semi'], ['bold', 'Bold']] as [string, string][]).map(([val, lbl]) => (
              <button
                key={val}
                onClick={() => setDraftFontWeight(val)}
                className={cn(
                  'px-2.5 py-1 text-[10px] font-medium rounded-md transition-colors cursor-pointer',
                  draftFontWeight === val ? 'text-gray-800 bg-white shadow-sm' : 'text-gray-500 hover:bg-gray-200/70'
                )}
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>

        {/* Alignment */}
        <div>
          <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Alignment</label>
          <div className="flex items-center bg-gray-100 p-0.5 rounded-md w-fit mt-1">
            {([['left', 'Left'], ['center', 'Centre'], ['right', 'Right']] as [ElementAlign, string][]).map(([val, lbl]) => (
              <button
                key={val}
                onClick={() => setDraftAlign(val)}
                className={cn(
                  'px-2.5 py-1 text-[10px] font-medium rounded-md transition-colors cursor-pointer',
                  draftAlign === val ? 'text-gray-800 bg-white shadow-sm' : 'text-gray-500 hover:bg-gray-200/70'
                )}
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>

        {/* Colour */}
        <div>
          <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Text Colour</label>
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <button
              onClick={() => setDraftColour('')}
              className={cn(
                'w-5 h-5 rounded-full border-2 transition-colors cursor-pointer bg-gray-900',
                !draftColour ? 'border-gray-400 ring-1 ring-gray-300' : 'border-transparent'
              )}
              title="Default"
            />
            {CHART_COLOUR_PRESETS.map((c) => (
              <button
                key={c}
                onClick={() => setDraftColour(c)}
                className={cn(
                  'w-5 h-5 rounded-full border-2 transition-colors cursor-pointer',
                  draftColour === c ? 'border-gray-400 ring-1 ring-gray-300' : 'border-transparent'
                )}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <div className="mt-2">
            <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Custom Hex</label>
            <input
              type="text"
              value={draftColour}
              onChange={(e) => setDraftColour(e.target.value)}
              placeholder="#000000"
              className={inputCls}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ───────── Config Panel: Pivot Table ───────── */

function PivotConfigPanel({
  widget,
  savedTables,
  onApply,
  onConditionalFormatsChange,
  onClose,
}: {
  widget: DashboardWidget
  savedTables: SavedTable[]
  onApply: (config: PivotConfig) => void
  onConditionalFormatsChange: (rules: ConditionalFormatRule[]) => void
  onClose: () => void
}) {
  const config = widget.pivotConfig
  const [draftTableId, setDraftTableId] = useState(config?.tableId ?? '')
  const [draftRowCols, setDraftRowCols] = useState<string[]>(config?.rowColumns ?? [])
  const [draftColCols, setDraftColCols] = useState<string[]>(config?.colColumns ?? [])
  const [draftValues, setDraftValues] = useState<PivotValueConfig[]>(config?.values ?? [])

  const draftTable = savedTables.find((t) => t.id === draftTableId)
  const draftColumns = draftTable?.columns.filter((c) => c.visible) ?? []

  // Auto-apply on every change
  useEffect(() => {
    if (!draftTableId) return
    const newConfig: PivotConfig = {
      tableId: draftTableId,
      rowColumns: draftRowCols,
      colColumns: draftColCols,
      values: draftValues,
    }
    onApply(newConfig)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftTableId, draftRowCols, draftColCols, draftValues])

  const addValue = () => {
    setDraftValues((prev) => [...prev, { id: `pv-${Date.now()}`, column: '', aggregation: 'sum' }])
  }

  const updateValue = (id: string, patch: Partial<PivotValueConfig>) => {
    setDraftValues((prev) => prev.map((v) => v.id === id ? { ...v, ...patch } : v))
  }

  const removeValue = (id: string) => {
    setDraftValues((prev) => prev.filter((v) => v.id !== id))
  }

  const toggleCol = (list: string[], setList: (v: string[]) => void, col: string) => {
    if (list.includes(col)) {
      setList(list.filter((c) => c !== col))
    } else {
      setList([...list, col])
    }
  }

  const inputCls = 'w-full mt-0.5 text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-white'

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-2">
          <Grid3X3 size={14} className="text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-900">Configure Pivot Table</h3>
        </div>
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 cursor-pointer">
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Data Source */}
        <div>
          <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Data Source</label>
          <select
            value={draftTableId}
            onChange={(e) => { setDraftTableId(e.target.value); setDraftRowCols([]); setDraftColCols([]); setDraftValues([]) }}
            className={inputCls}
          >
            <option value="">Select a table…</option>
            {savedTables.map((t) => (<option key={t.id} value={t.id}>{t.tableName}</option>))}
          </select>
        </div>

        {draftTableId && (
          <>
            {/* Row Fields */}
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <Rows3 size={10} />
                Row Fields
              </label>
              <p className="text-[9px] text-gray-400 mb-1.5">Group rows by these columns</p>
              <div className="space-y-1 max-h-32 overflow-auto">
                {draftColumns.map((c) => {
                  const isActive = draftRowCols.includes(c.sourcePath)
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggleCol(draftRowCols, setDraftRowCols, c.sourcePath)}
                      className={cn(
                        'w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-md transition-colors cursor-pointer',
                        isActive ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'
                      )}
                    >
                      <div className={cn(
                        'w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors',
                        isActive ? 'bg-gray-700 border-gray-700' : 'border-gray-300'
                      )}>
                        {isActive && <Check size={8} className="text-white" />}
                      </div>
                      <span className="truncate">{c.alias || c.sourcePath}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Column Fields */}
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <Columns3 size={10} />
                Column Fields
              </label>
              <p className="text-[9px] text-gray-400 mb-1.5">Pivot columns by these fields</p>
              <div className="space-y-1 max-h-32 overflow-auto">
                {draftColumns.map((c) => {
                  const isActive = draftColCols.includes(c.sourcePath)
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggleCol(draftColCols, setDraftColCols, c.sourcePath)}
                      className={cn(
                        'w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-md transition-colors cursor-pointer',
                        isActive ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'
                      )}
                    >
                      <div className={cn(
                        'w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors',
                        isActive ? 'bg-gray-700 border-gray-700' : 'border-gray-300'
                      )}>
                        {isActive && <Check size={8} className="text-white" />}
                      </div>
                      <span className="truncate">{c.alias || c.sourcePath}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Values */}
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <Calculator size={10} />
                Values (Aggregations)
              </label>
              <p className="text-[9px] text-gray-400 mb-1.5">Computed values in the pivot cells</p>
              <div className="space-y-2">
                {draftValues.map((v) => (
                  <div key={v.id} className="flex items-start gap-1.5 bg-gray-50 rounded-md p-2">
                    <div className="flex-1 space-y-1">
                      <select
                        value={v.column}
                        onChange={(e) => updateValue(v.id, { column: e.target.value })}
                        className="w-full text-[10px] border border-gray-200 rounded-md px-2 py-1 text-gray-700 bg-white focus:outline-none focus:border-gray-400"
                      >
                        <option value="">Select column…</option>
                        {draftColumns.map((c) => (
                          <option key={c.id} value={c.sourcePath}>{c.alias || c.sourcePath}</option>
                        ))}
                      </select>
                      <select
                        value={v.aggregation}
                        onChange={(e) => updateValue(v.id, { aggregation: e.target.value as AggregationType })}
                        className="w-full text-[10px] border border-gray-200 rounded-md px-2 py-1 text-gray-700 bg-white focus:outline-none focus:border-gray-400"
                      >
                        {Object.entries(AGGREGATION_LABELS).map(([k, lab]) => (
                          <option key={k} value={k}>{lab}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={v.label ?? ''}
                        onChange={(e) => updateValue(v.id, { label: e.target.value })}
                        placeholder="Label (optional)"
                        className="w-full text-[10px] border border-gray-200 rounded-md px-2 py-1 text-gray-700 bg-white focus:outline-none focus:border-gray-400 placeholder:text-gray-300"
                      />
                    </div>
                    <button
                      onClick={() => removeValue(v.id)}
                      className="mt-0.5 p-1 text-gray-300 hover:text-red-500 transition-colors rounded-md hover:bg-white cursor-pointer shrink-0"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addValue}
                className="w-full flex items-center justify-center gap-1 text-[10px] font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md py-2 mt-2 transition-colors cursor-pointer border border-dashed border-gray-200"
              >
                <Plus size={10} />
                Add value
              </button>
            </div>
          </>
        )}

        {/* Conditional Formatting */}
        {draftTableId && (
          <ConditionalFormattingSection
            rules={widget.conditionalFormats ?? []}
            columns={[
              ...draftRowCols.map((c) => ({ key: c, label: c })),
              ...draftValues.map((v) => ({ key: v.column || v.id, label: v.label || `${AGGREGATION_LABELS[v.aggregation]}${v.column ? ` of ${v.column}` : ''}` })),
            ]}
            onChange={onConditionalFormatsChange}
          />
        )}
      </div>
    </div>
  )
}

/* ───────── Pivot Table Card ───────── */

function PivotCard({
  widget,
  savedTables,
  accessToken,
  editMode,
  onRemove,
  onDuplicate,
  onOpenConfig,
  onDisplayNameChange,
  onPivotConfigChange,
}: {
  widget: DashboardWidget
  savedTables: SavedTable[]
  accessToken: string | null
  editMode: boolean
  onRemove: () => void
  onDuplicate: () => void
  onOpenConfig: () => void
  onDisplayNameChange: (name: string) => void
  onPivotConfigChange: (config: PivotConfig) => void
}) {
  const config = widget.pivotConfig
  const [rows, setRows] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Inline rename state — title
  const [editingTitle, setEditingTitle] = useState(false)
  const [draftTitle, setDraftTitle] = useState('')
  const titleInputRef = useRef<HTMLInputElement>(null)

  // Inline rename state — column headers
  const [editingColIdx, setEditingColIdx] = useState<number | null>(null)
  const [draftColLabel, setDraftColLabel] = useState('')
  const colInputRef = useRef<HTMLInputElement>(null)

  // Column resize state
  const [colWidths, setColWidths] = useState<Record<number, number>>({})
  const resizingCol = useRef<{ idx: number; startX: number; startW: number } | null>(null)
  const thRefs = useRef<Map<number, HTMLTableCellElement>>(new Map())

  const startColResize = useCallback((colIdx: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const th = thRefs.current.get(colIdx)
    const startW = th ? th.getBoundingClientRect().width : 100
    const startX = e.clientX
    resizingCol.current = { idx: colIdx, startX, startW }

    const onMove = (me: MouseEvent) => {
      if (!resizingCol.current) return
      const delta = me.clientX - resizingCol.current.startX
      const newW = Math.max(40, resizingCol.current.startW + delta)
      setColWidths((prev) => ({ ...prev, [resizingCol.current!.idx]: newW }))
    }
    const onUp = () => {
      resizingCol.current = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [])

  const table = savedTables.find((t) => t.id === config?.tableId)

  // Auto-focus title input
  useEffect(() => {
    if (editingTitle) setTimeout(() => { titleInputRef.current?.focus(); titleInputRef.current?.select() }, 50)
  }, [editingTitle])

  // Auto-focus column rename input
  useEffect(() => {
    if (editingColIdx !== null) setTimeout(() => { colInputRef.current?.focus(); colInputRef.current?.select() }, 50)
  }, [editingColIdx])

  // Fetch data
  useEffect(() => {
    if (!config?.tableId || !table) return
    if (table.projectId === '__query__') {
      if ((table as unknown as { queryData?: Record<string, unknown>[] }).queryData) {
        setRows((table as unknown as { queryData: Record<string, unknown>[] }).queryData)
      }
      return
    }
    if (!accessToken) return

    let cancelled = false
    setLoading(true)
    setError(null)

    const load = async () => {
      try {
        let documents
        if (table.isCollectionGroup) {
          const result = await fetchCollectionGroup(accessToken, table.projectId, table.collectionPath, 1000)
          documents = result.documents
        } else {
          const result = await fetchDocuments(accessToken, table.projectId, table.collectionPath, 1000)
          documents = result.documents
        }
        if (cancelled) return
        const flattened = documents.map((d: Record<string, unknown>) => {
          const { __id: _id, __path: _p, __parentId: _pid, ...rest } = d
          return flattenObject(rest as Record<string, unknown>)
        })
        setRows(flattened)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally { if (!cancelled) setLoading(false) }
    }
    load()
    return () => { cancelled = true }
  }, [config?.tableId, table, accessToken])

  // Compute pivot data
  const pivotData = usePivotData(rows, config)

  const commitTitle = () => {
    setEditingTitle(false)
    const trimmed = draftTitle.trim()
    if (trimmed && trimmed !== (widget.displayName || 'Pivot Table')) {
      onDisplayNameChange(trimmed)
    }
  }

  // Commit a column header rename — maps the visible header index back
  // to the value's label in the PivotConfig.
  const commitColLabel = () => {
    if (editingColIdx === null || !config) { setEditingColIdx(null); return }
    setEditingColIdx(null)
    const trimmed = draftColLabel.trim()
    if (!trimmed) return

    // Determine which value this header index maps to.
    // Headers are generated as: for each colKey × each value → one header.
    const valIdx = editingColIdx % config.values.length
    const updatedValues = config.values.map((v, i) =>
      i === valIdx ? { ...v, label: trimmed } : v
    )
    onPivotConfigChange({ ...config, values: updatedValues })
  }

  const displayTitle = widget.displayName || 'Pivot Table'

  if (!config?.tableId) {
    return (
      <div className="h-full flex flex-col bg-white rounded-md border border-gray-200 overflow-hidden relative group/el">
        {/* Header — drag handle */}
        <div className={cn(
          'widget-drag-handle flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50/50 shrink-0 select-none',
          editMode ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
        )}>
          <div className="flex items-center gap-2 min-w-0">
            {editMode && <GripVertical size={14} className="text-gray-300 shrink-0" />}
            <Grid3X3 size={13} className="text-gray-400 shrink-0" />
            <span className="text-xs font-medium text-gray-700 truncate">{displayTitle}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0" onMouseDown={(e) => e.stopPropagation()}>
            <button onClick={onOpenConfig} className="p-1 text-gray-300 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 cursor-pointer" title="Configure"><Settings2 size={12} /></button>
            {editMode && (
              <>
                <button onClick={onDuplicate} className="p-1 text-gray-300 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 cursor-pointer" title="Duplicate"><Copy size={12} /></button>
                <button onClick={onRemove} className="p-1 text-gray-300 hover:text-red-500 transition-colors rounded-md hover:bg-gray-100 cursor-pointer" title="Remove"><Trash2 size={12} /></button>
              </>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <Grid3X3 size={24} className="text-gray-300 mb-2" />
          <p className="text-sm text-gray-400">Configure pivot table</p>
          <button
            onClick={onOpenConfig}
            className="mt-2 text-xs font-medium text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-1.5 transition-colors cursor-pointer"
          >
            <Settings2 size={12} className="inline mr-1" />
            Configure
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white rounded-md border border-gray-200 overflow-hidden relative group/el">
      {/* Header — drag handle */}
      <div className={cn(
        'widget-drag-handle flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50/50 shrink-0 select-none',
        editMode ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
      )}>
        <div className="flex items-center gap-2 min-w-0">
          {editMode && <GripVertical size={14} className="text-gray-300 shrink-0" />}
          <Grid3X3 size={13} className="text-gray-400 shrink-0" />
          {editingTitle && editMode ? (
            <input
              ref={titleInputRef}
              type="text"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onBlur={commitTitle}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitTitle()
                if (e.key === 'Escape') setEditingTitle(false)
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-full text-xs font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-gray-500 focus:outline-none py-0"
            />
          ) : (
            <h4
              className={cn('text-xs font-medium text-gray-700 truncate', editMode && 'cursor-text')}
              onDoubleClick={() => {
                if (!editMode) return
                setDraftTitle(displayTitle)
                setEditingTitle(true)
              }}
            >
              {displayTitle}
            </h4>
          )}
          {table && !editingTitle && <span className="text-[10px] text-gray-400 truncate">— {table.tableName}</span>}
        </div>
        <div className="flex items-center gap-1 shrink-0" onMouseDown={(e) => e.stopPropagation()}>
          <button onClick={onOpenConfig} className="p-1 text-gray-300 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 cursor-pointer" title="Configure"><Settings2 size={12} /></button>
          {editMode && (
            <>
              <button onClick={onDuplicate} className="p-1 text-gray-300 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 cursor-pointer" title="Duplicate"><Copy size={12} /></button>
              <button onClick={onRemove} className="p-1 text-gray-300 hover:text-red-500 transition-colors rounded-md hover:bg-gray-100 cursor-pointer" title="Remove"><Trash2 size={12} /></button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full gap-2 text-xs text-gray-400">
            <Loader2 size={14} className="animate-spin" />Loading…
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full gap-2 text-xs text-red-400">
            <AlertCircle size={14} />{error}
          </div>
        ) : pivotData.headers.length === 0 ? (
          <div className="flex items-center justify-center h-full text-xs text-gray-400">
            Add row fields, column fields, and values to build the pivot
          </div>
        ) : (
          <table className="text-xs border-collapse" style={{ tableLayout: 'fixed', minWidth: '100%' }}>
            <colgroup>
              {pivotData.rowHeaders.map((_, ri) => (
                <col key={`r${ri}`} style={{ width: colWidths[ri] ? `${colWidths[ri]}px` : undefined, minWidth: 40 }} />
              ))}
              {pivotData.headers.map((_, hi) => {
                const ci = pivotData.rowHeaders.length + hi
                return <col key={`v${hi}`} style={{ width: colWidths[ci] ? `${colWidths[ci]}px` : undefined, minWidth: 40 }} />
              })}
            </colgroup>
            <thead>
              <tr className="bg-gray-50">
                {pivotData.rowHeaders.map((rh, ri) => (
                  <th
                    key={rh}
                    ref={(el) => { if (el) thRefs.current.set(ri, el); else thRefs.current.delete(ri) }}
                    className="text-left px-2.5 py-2 text-[10px] font-semibold text-gray-500 border-b border-r border-gray-200 sticky top-0 bg-gray-50 relative select-none overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {rh}
                    {/* Column resize handle */}
                    <div
                      className="absolute right-0 top-0 bottom-0 w-[5px] cursor-col-resize hover:bg-gray-300/50 active:bg-gray-400/50 z-10"
                      onMouseDown={(e) => startColResize(ri, e)}
                      onDoubleClick={(e) => { e.stopPropagation(); setColWidths((prev) => { const next = { ...prev }; delete next[ri]; return next }) }}
                    />
                  </th>
                ))}
                {pivotData.headers.map((h, i) => {
                  const ci = pivotData.rowHeaders.length + i
                  return (
                    <th
                      key={i}
                      ref={(el) => { if (el) thRefs.current.set(ci, el); else thRefs.current.delete(ci) }}
                      className="text-right px-2.5 py-2 text-[10px] font-semibold text-gray-500 border-b border-gray-200 sticky top-0 bg-gray-50 whitespace-nowrap relative select-none overflow-hidden text-ellipsis"
                    >
                      {editingColIdx === i && editMode ? (
                        <input
                          ref={colInputRef}
                          type="text"
                          value={draftColLabel}
                          onChange={(e) => setDraftColLabel(e.target.value)}
                          onBlur={commitColLabel}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') commitColLabel()
                            if (e.key === 'Escape') setEditingColIdx(null)
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="w-full text-right text-[10px] font-semibold text-gray-900 bg-transparent border-b border-gray-400 focus:border-gray-600 focus:outline-none py-0"
                        />
                      ) : (
                        <span
                          className={cn(editMode && 'cursor-text hover:text-gray-700')}
                          onDoubleClick={() => {
                            if (!editMode) return
                            setDraftColLabel(h)
                            setEditingColIdx(i)
                          }}
                        >
                          {h}
                        </span>
                      )}
                      {/* Column resize handle */}
                      <div
                        className="absolute right-0 top-0 bottom-0 w-[5px] cursor-col-resize hover:bg-gray-300/50 active:bg-gray-400/50 z-10"
                        onMouseDown={(e) => startColResize(ci, e)}
                        onDoubleClick={(e) => { e.stopPropagation(); setColWidths((prev) => { const next = { ...prev }; delete next[ci]; return next }) }}
                      />
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {pivotData.rows.map((row, ri) => {
                // Build a synthetic row object for conditional formatting evaluation
                const syntheticRow: Record<string, unknown> = {}
                pivotData.rowHeaders.forEach((rh, i) => { syntheticRow[rh] = row.keys[i] })
                // Map value columns by the value config id/column
                if (config) {
                  const valCfgs = config.values
                  row.values.forEach((v, vi) => {
                    const vcIdx = vi % valCfgs.length
                    const vc = valCfgs[vcIdx]
                    if (vc) {
                      syntheticRow[vc.column || vc.id] = v
                      if (vc.label) syntheticRow[vc.label] = v
                    }
                  })
                }
                const condRules = widget.conditionalFormats
                return (
                <tr key={ri} className="hover:bg-gray-50 transition-colors">
                  {row.keys.map((k, ki) => {
                    const rh = pivotData.rowHeaders[ki]
                    const cellStyle = getCondStyle(condRules, syntheticRow, rh, 'cell')
                    return (
                    <td key={ki} className="px-2.5 py-1.5 text-gray-700 border-b border-r border-gray-100 font-medium whitespace-nowrap overflow-hidden text-ellipsis" style={cellStyle}>{String(k ?? '—')}</td>
                    )
                  })}
                  {row.values.map((v, vi) => {
                    const vcIdx = config ? vi % config.values.length : 0
                    const vc = config?.values[vcIdx]
                    const colKey = vc ? (vc.column || vc.id) : String(vi)
                    const cellStyle = getCondStyle(condRules, syntheticRow, colKey, 'cell')
                    return (
                    <td key={vi} className="px-2.5 py-1.5 text-right text-gray-600 border-b border-gray-100 tabular-nums whitespace-nowrap overflow-hidden text-ellipsis" style={cellStyle}>
                      {v != null ? (typeof v === 'number' ? v.toLocaleString(undefined, { maximumFractionDigits: 2 }) : String(v)) : '—'}
                    </td>
                    )
                  })}
                </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

/* ───────── Pivot computation hook ───────── */

function usePivotData(
  rows: Record<string, unknown>[],
  config: PivotConfig | undefined
): {
  rowHeaders: string[]
  headers: string[]
  rows: { keys: unknown[]; values: (number | null)[] }[]
} {
  return useMemo(() => {
    if (!config || config.rowColumns.length === 0 || config.values.length === 0) {
      return { rowHeaders: [], headers: [], rows: [] }
    }

    const { rowColumns, colColumns, values } = config

    // Build a map: rowKey -> colKey -> valueIndex -> accumulated values
    const dataMap = new Map<string, Map<string, { sums: number[]; counts: number[]; vals: number[][] }>>()
    const colKeySet = new Set<string>()

    for (const row of rows) {
      const rowKey = rowColumns.map((rc) => String(row[rc] ?? '')).join('|||')
      const colKey = colColumns.length > 0 ? colColumns.map((cc) => String(row[cc] ?? '')).join(' / ') : '__all__'
      colKeySet.add(colKey)

      if (!dataMap.has(rowKey)) dataMap.set(rowKey, new Map())
      const colMap = dataMap.get(rowKey)!
      if (!colMap.has(colKey)) {
        colMap.set(colKey, {
          sums: new Array(values.length).fill(0),
          counts: new Array(values.length).fill(0),
          vals: values.map(() => []),
        })
      }
      const bucket = colMap.get(colKey)!

      values.forEach((vc, vi) => {
        const raw = row[vc.column]
        const num = raw != null ? parseFloat(String(raw)) : NaN
        if (vc.aggregation === 'count') {
          bucket.counts[vi]++
        } else if (vc.aggregation === 'count_distinct') {
          bucket.vals[vi].push(raw as number) // we'll unique later
          bucket.counts[vi]++
        } else if (!isNaN(num)) {
          bucket.sums[vi] += num
          bucket.counts[vi]++
          bucket.vals[vi].push(num)
        }
      })
    }

    const colKeys = colColumns.length > 0 ? [...colKeySet].sort() : ['__all__']

    // Build headers
    const rowHeaders = rowColumns.map((rc) => rc)
    const headers: string[] = []
    for (const ck of colKeys) {
      for (const vc of values) {
        const label = vc.label || `${AGGREGATION_LABELS[vc.aggregation]}${vc.column ? ` of ${vc.column}` : ''}`
        headers.push(colKeys.length > 1 && ck !== '__all__' ? `${ck} — ${label}` : label)
      }
    }

    // Build rows
    const resultRows: { keys: unknown[]; values: (number | null)[] }[] = []
    const sortedRowKeys = [...dataMap.keys()].sort()

    for (const rowKey of sortedRowKeys) {
      const keys = rowKey.split('|||')
      const colMap = dataMap.get(rowKey)!
      const rowValues: (number | null)[] = []

      for (const ck of colKeys) {
        const bucket = colMap.get(ck)
        for (let vi = 0; vi < values.length; vi++) {
          if (!bucket || bucket.counts[vi] === 0) {
            rowValues.push(null)
            continue
          }
          const vc = values[vi]
          switch (vc.aggregation) {
            case 'count':
              rowValues.push(bucket.counts[vi])
              break
            case 'sum':
              rowValues.push(bucket.sums[vi])
              break
            case 'average':
              rowValues.push(bucket.sums[vi] / bucket.counts[vi])
              break
            case 'min':
              rowValues.push(Math.min(...bucket.vals[vi]))
              break
            case 'max':
              rowValues.push(Math.max(...bucket.vals[vi]))
              break
            case 'count_distinct':
              rowValues.push(new Set(bucket.vals[vi].map(String)).size)
              break
            default:
              rowValues.push(null)
          }
        }
      }

      resultRows.push({ keys, values: rowValues })
    }

    return { rowHeaders, headers, rows: resultRows }
  }, [rows, config])
}

function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) return '—'
  if (typeof value === 'object') return JSON.stringify(value)
  // Pretty-format date strings
  if (typeof value === 'string' && looksLikeDate(value)) {
    const d = parseDate(value)
    if (d) return formatDatePretty(d, 'none')
  }
  return String(value)
}
