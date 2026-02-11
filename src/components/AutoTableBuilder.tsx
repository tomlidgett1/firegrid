import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Check,
  XCircle,
  Wand2,
  ArrowRight,
  Database,
  Eye,
  EyeOff,
  RotateCcw,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { listCollections, sampleDocuments } from '@/lib/firestore-rest'
import { discoverSchema } from '@/lib/utils'
import {
  analyseCollectionsWithAI,
  hasOpenAIKey,
  type CollectionSchema,
  type TableRecommendation,
} from '@/lib/openai'
import { db } from '@/lib/firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

type Step = 'idle' | 'scanning' | 'analysing' | 'review' | 'building' | 'done' | 'error'

interface Props {
  projectId: string
  open: boolean
  onClose: () => void
  onComplete: () => void
}

const STEPS = [
  { key: 'scan', label: 'Scan' },
  { key: 'analyse', label: 'Analyse' },
  { key: 'review', label: 'Review' },
  { key: 'build', label: 'Build' },
] as const

function getActiveStepIndex(step: Step): number {
  if (step === 'scanning') return 0
  if (step === 'analysing') return 1
  if (step === 'review') return 2
  if (step === 'building' || step === 'done') return 3
  return -1
}

export default function AutoTableBuilder({ projectId, open, onClose, onComplete }: Props) {
  const { user } = useAuth()
  const [step, setStep] = useState<Step>('idle')
  const [progress, setProgress] = useState('')
  const [scanLog, setScanLog] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<TableRecommendation[]>([])
  const [error, setError] = useState<string | null>(null)
  const [buildResults, setBuildResults] = useState<{ name: string; ok: boolean }[]>([])
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)
  const [apiKeyInput, setApiKeyInput] = useState('')
  const [needsKey, setNeedsKey] = useState(false)
  const [collectionCount, setCollectionCount] = useState(0)
  const [scannedCount, setScannedCount] = useState(0)
  const logEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll scan log
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [scanLog])

  // Reset on open
  useEffect(() => {
    if (open) {
      setStep('idle')
      setProgress('')
      setScanLog([])
      setRecommendations([])
      setError(null)
      setBuildResults([])
      setExpandedIdx(null)
      setNeedsKey(!hasOpenAIKey())
      setCollectionCount(0)
      setScannedCount(0)
    }
  }, [open])

  const addLog = useCallback((msg: string) => {
    setScanLog((prev) => [...prev, msg])
  }, [])

  // ---- Step 1: Scan collections ----
  const startScan = useCallback(async () => {
    if (!user?.accessToken) return

    const effectiveKey = hasOpenAIKey() ? undefined : apiKeyInput.trim()
    if (!hasOpenAIKey() && !effectiveKey) {
      setNeedsKey(true)
      return
    }

    setStep('scanning')
    setError(null)
    setScanLog([])
    setRecommendations([])
    setBuildResults([])

    try {
      addLog('Discovering collections…')
      setProgress('Listing collections')

      const collections = await listCollections(user.accessToken, projectId)
      setCollectionCount(collections.length)
      addLog(`Found ${collections.length} collection${collections.length === 1 ? '' : 's'}`)

      if (collections.length === 0) {
        setError('No collections found in this project.')
        setStep('error')
        return
      }

      const schemas: CollectionSchema[] = []
      for (let i = 0; i < collections.length; i++) {
        const coll = collections[i]
        setScannedCount(i + 1)
        setProgress(`Sampling ${coll.id} (${i + 1}/${collections.length})`)
        addLog(`Sampling ${coll.path}…`)

        try {
          const docs = await sampleDocuments(user.accessToken, projectId, coll.path, 20)
          if (docs.length === 0) {
            addLog(`  ↳ Empty, skipping`)
            continue
          }

          const schema = discoverSchema(docs)
          addLog(`  ↳ ${docs.length} docs, ${schema.length} fields`)

          schemas.push({
            collectionPath: coll.path,
            documentCount: docs.length,
            fields: schema.map((f) => ({
              path: f.path,
              dataType: f.dataType,
              coverage: f.coverage,
              sampleValues: f.sampleValues,
            })),
          })
        } catch (err) {
          addLog(`  ↳ Error: ${err instanceof Error ? err.message : 'Unknown'}`)
        }
      }

      if (schemas.length === 0) {
        setError('All collections are empty or inaccessible.')
        setStep('error')
        return
      }

      addLog(`Scanned ${schemas.length} collections successfully`)

      // ---- Step 2: AI Analysis ----
      setStep('analysing')
      setProgress('AI is analysing your data…')
      addLog('Sending schemas to AI for analysis…')

      let recs: TableRecommendation[]
      if (effectiveKey) {
        const origKey = import.meta.env.VITE_OPENAI_API_KEY
        ;(import.meta.env as Record<string, string>).VITE_OPENAI_API_KEY = effectiveKey
        try {
          recs = await analyseCollectionsWithAI(schemas)
        } finally {
          ;(import.meta.env as Record<string, string>).VITE_OPENAI_API_KEY = origKey ?? ''
        }
      } else {
        recs = await analyseCollectionsWithAI(schemas)
      }

      addLog(`AI recommended ${recs.length} table${recs.length === 1 ? '' : 's'}`)
      setRecommendations(recs)
      setStep('review')
      setProgress('')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(msg)
      setStep('error')
      addLog(`Error: ${msg}`)
    }
  }, [user?.accessToken, projectId, addLog, apiKeyInput])

  const toggleSelection = (idx: number) => {
    setRecommendations((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, selected: !r.selected } : r))
    )
  }

  const selectedCount = recommendations.filter((r) => r.selected).length

  // ---- Step 3: Build selected tables ----
  const buildTables = useCallback(async () => {
    if (!user?.uid || !db) return
    const selected = recommendations.filter((r) => r.selected)
    if (selected.length === 0) return

    setStep('building')
    setProgress(`Building ${selected.length} table${selected.length === 1 ? '' : 's'}…`)
    const results: { name: string; ok: boolean }[] = []

    for (const rec of selected) {
      try {
        const id = crypto.randomUUID()
        await setDoc(doc(db, 'users', user.uid, 'tables', id), {
          tableName: rec.tableName,
          projectId,
          collectionPath: rec.collectionPath,
          isCollectionGroup: false,
          columns: rec.columns,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
        results.push({ name: rec.tableName, ok: true })
      } catch {
        results.push({ name: rec.tableName, ok: false })
      }
    }

    setBuildResults(results)
    setStep('done')
    setProgress('')
  }, [user?.uid, projectId, recommendations])

  if (!open) return null

  const successCount = buildResults.filter((r) => r.ok).length
  const activeStepIdx = getActiveStepIndex(step)
  const progressPct = collectionCount > 0 ? Math.round((scannedCount / collectionCount) * 100) : 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/40 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
        className="relative bg-white dark:bg-gray-800 rounded-md shadow-xl w-full max-w-xl max-h-[85vh] overflow-hidden flex flex-col mx-4 animate-in slide-in-from-bottom-4 zoom-in-95 duration-300 ease-out"
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-gray-900 dark:bg-gray-100 flex items-center justify-center shrink-0">
                <Wand2 size={16} className="text-white dark:text-gray-900" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    Auto-Build
                  </h2>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-md">
                    Beta
                  </span>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  AI-powered table generation from <span className="font-mono">{projectId}</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 -mr-1 -mt-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Stepper — visible once we start */}
          {step !== 'idle' && step !== 'error' && (
            <div className="flex items-center gap-1 mt-4">
              {STEPS.map((s, i) => {
                const isComplete = step === 'done' ? true : i < activeStepIdx
                const isActive = i === activeStepIdx && step !== 'done'
                return (
                  <div key={s.key} className="flex items-center flex-1 gap-1">
                    <div className="flex items-center gap-1.5 flex-1">
                      <div className={cn(
                        'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors',
                        isComplete
                          ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                          : isActive
                          ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                      )}>
                        {isComplete ? <Check size={10} /> : i + 1}
                      </div>
                      <span className={cn(
                        'text-[11px] font-medium transition-colors',
                        isComplete || isActive
                          ? 'text-gray-900 dark:text-gray-100'
                          : 'text-gray-400 dark:text-gray-500'
                      )}>
                        {s.label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={cn(
                        'h-px flex-1 mr-1 transition-colors',
                        isComplete ? 'bg-gray-900 dark:bg-gray-300' : 'bg-gray-200 dark:bg-gray-700'
                      )} />
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-gray-700" />

        {/* Content */}
        <div className="flex-1 overflow-y-auto">

          {/* ---- Idle: Start screen ---- */}
          {step === 'idle' && (
            <div className="px-5 py-5">
              {/* Three steps - clean inline layout */}
              <div className="space-y-3 mb-5">
                {[
                  { num: '1', title: 'Scan', desc: 'Discover collections and sample documents to build schemas' },
                  { num: '2', title: 'Analyse', desc: 'AI examines field types, coverage, and sample values' },
                  { num: '3', title: 'Build', desc: 'Review recommendations and save selected tables' },
                ].map((item) => (
                  <div key={item.num} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0 mt-px">
                      <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 tabular-nums">{item.num}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.title}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* API Key input if not set */}
              {needsKey && (
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    OpenAI API Key
                  </label>
                  <input
                    type="password"
                    placeholder="sk-..."
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && apiKeyInput.trim()) startScan()
                    }}
                    className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:border-gray-300 dark:focus:border-gray-500"
                  />
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1.5">
                    No key found in environment. Your key is only used for this session.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ---- Scanning ---- */}
          {step === 'scanning' && (
            <div className="px-5 py-5">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Scanning collections
                  </p>
                  <span className="text-xs text-gray-400 tabular-nums">
                    {scannedCount}/{collectionCount}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gray-900 dark:bg-gray-200 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">{progress}</p>
              </div>

              {/* Compact log */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-3 max-h-48 overflow-y-auto font-mono text-[11px] leading-relaxed text-gray-500 dark:text-gray-400 space-y-px">
                {scanLog.map((line, i) => (
                  <div key={i} className={cn(
                    line.startsWith('  ↳') && 'pl-3 text-gray-400 dark:text-gray-500'
                  )}>
                    {line}
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>
            </div>
          )}

          {/* ---- Analysing ---- */}
          {step === 'analysing' && (
            <div className="px-5 py-10 flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <Wand2 size={20} className="text-gray-500 dark:text-gray-400" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                  <Loader2 size={12} className="animate-spin text-gray-400" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                AI is analysing your schemas
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Recommending optimal table configurations…
              </p>
            </div>
          )}

          {/* ---- Review recommendations ---- */}
          {step === 'review' && (
            <div className="px-5 py-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {recommendations.length} table{recommendations.length === 1 ? '' : 's'} recommended
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRecommendations((prev) => prev.map((r) => ({ ...r, selected: true })))}
                    className="text-[11px] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    Select all
                  </button>
                  <span className="text-gray-300 dark:text-gray-600">·</span>
                  <button
                    onClick={() => setRecommendations((prev) => prev.map((r) => ({ ...r, selected: false })))}
                    className="text-[11px] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    Deselect all
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {recommendations.map((rec, idx) => {
                  const visibleCols = rec.columns.filter((c) => c.visible).length
                  const hiddenCols = rec.columns.length - visibleCols

                  return (
                    <div
                      key={idx}
                      className={cn(
                        'rounded-md border transition-all',
                        rec.selected
                          ? 'border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-800'
                          : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-70'
                      )}
                    >
                      <div
                        className="flex items-center gap-3 px-3.5 py-2.5 cursor-pointer"
                        onClick={() => toggleSelection(idx)}
                      >
                        {/* Checkbox */}
                        <div className={cn(
                          'w-4 h-4 rounded border-[1.5px] flex items-center justify-center transition-all shrink-0',
                          rec.selected
                            ? 'bg-gray-900 dark:bg-gray-100 border-gray-900 dark:border-gray-100'
                            : 'border-gray-300 dark:border-gray-600 bg-transparent'
                        )}>
                          {rec.selected && <Check size={10} className="text-white dark:text-gray-900" strokeWidth={3} />}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                              {rec.tableName}
                            </h4>
                            <span className={cn(
                              'text-[10px] font-medium px-1.5 py-0.5 rounded-md shrink-0',
                              rec.priority === 'high'
                                ? 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                                : rec.priority === 'medium'
                                ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                : 'bg-gray-50 dark:bg-gray-750 text-gray-400 dark:text-gray-500'
                            )}>
                              {rec.priority}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 truncate">
                            {rec.collectionPath} · {visibleCols} column{visibleCols === 1 ? '' : 's'}
                          </p>
                        </div>

                        {/* Expand */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setExpandedIdx(expandedIdx === idx ? null : idx)
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0"
                        >
                          <ChevronDown
                            size={14}
                            className={cn(
                              'transition-transform duration-200',
                              expandedIdx === idx && 'rotate-180'
                            )}
                          />
                        </button>
                      </div>

                      {/* Expanded column details */}
                      <AnimatePresence>
                        {expandedIdx === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="overflow-hidden"
                          >
                            <div className="px-3.5 pb-3 pt-1">
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                {rec.description}
                              </p>
                              <div className="space-y-px">
                                {rec.columns.sort((a, b) => a.order - b.order).map((col) => (
                                  <div
                                    key={col.id}
                                    className="flex items-center gap-2 py-1 text-[11px]"
                                  >
                                    {col.visible ? (
                                      <Eye size={10} className="text-gray-400 shrink-0" />
                                    ) : (
                                      <EyeOff size={10} className="text-gray-300 dark:text-gray-600 shrink-0" />
                                    )}
                                    <span className={cn(
                                      'truncate',
                                      col.visible
                                        ? 'text-gray-700 dark:text-gray-300'
                                        : 'text-gray-400 dark:text-gray-600'
                                    )}>
                                      {col.alias}
                                    </span>
                                    <span className="text-gray-300 dark:text-gray-600 ml-auto shrink-0">
                                      {col.dataType}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              {hiddenCols > 0 && (
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5">
                                  {hiddenCols} hidden column{hiddenCols === 1 ? '' : 's'}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ---- Building ---- */}
          {step === 'building' && (
            <div className="px-5 py-10 flex flex-col items-center">
              <Loader2 size={22} className="animate-spin text-gray-400 mb-3" />
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Saving tables…
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{progress}</p>
            </div>
          )}

          {/* ---- Done ---- */}
          {step === 'done' && (
            <div className="px-5 py-5">
              <div className="flex flex-col items-center mb-5">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-2.5">
                  <CheckCircle2 size={20} className="text-gray-500 dark:text-gray-400" />
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {successCount} table{successCount === 1 ? '' : 's'} created
                </p>
              </div>

              <div className="space-y-1">
                {buildResults.map((result, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-900"
                  >
                    {result.ok ? (
                      <Check size={12} className="text-gray-500 shrink-0" />
                    ) : (
                      <XCircle size={12} className="text-red-400 shrink-0" />
                    )}
                    <span className={cn(
                      'text-sm flex-1 truncate',
                      result.ok
                        ? 'text-gray-700 dark:text-gray-300'
                        : 'text-red-500 dark:text-red-400'
                    )}>
                      {result.name}
                    </span>
                    <span className="text-[11px] text-gray-400 shrink-0">
                      {result.ok ? 'Saved' : 'Failed'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---- Error ---- */}
          {step === 'error' && (
            <div className="px-5 py-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0 mt-px">
                  <AlertCircle size={14} className="text-red-500 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Something went wrong
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{error}</p>
                </div>
              </div>

              {scanLog.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-3 max-h-36 overflow-y-auto font-mono text-[11px] text-gray-500 dark:text-gray-400 space-y-px">
                  {scanLog.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="h-px bg-gray-100 dark:bg-gray-700" />
        <div className="px-5 py-3 flex items-center justify-between">
          <div className="text-[11px] text-gray-400 dark:text-gray-500 tabular-nums">
            {step === 'review' && `${selectedCount} of ${recommendations.length} selected`}
            {step === 'done' && `${successCount} of ${buildResults.length} succeeded`}
            {step === 'scanning' && `${scannedCount} of ${collectionCount} scanned`}
          </div>
          <div className="flex items-center gap-2">
            {/* Cancel — visible on idle, review, error */}
            {(step === 'idle' || step === 'error' || step === 'review') && (
              <button
                onClick={onClose}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            )}

            {/* Start — idle */}
            {step === 'idle' && (
              <button
                onClick={startScan}
                disabled={needsKey && !apiKeyInput.trim()}
                className="flex items-center gap-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium rounded-md px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Wand2 size={14} />
                Start
                <ArrowRight size={13} />
              </button>
            )}

            {/* Retry — error */}
            {step === 'error' && (
              <button
                onClick={() => {
                  setStep('idle')
                  setError(null)
                }}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <RotateCcw size={13} />
                Retry
              </button>
            )}

            {/* Build — review */}
            {step === 'review' && (
              <button
                onClick={buildTables}
                disabled={selectedCount === 0}
                className="flex items-center gap-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium rounded-md px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Database size={13} />
                Build {selectedCount} table{selectedCount === 1 ? '' : 's'}
              </button>
            )}

            {/* Done */}
            {step === 'done' && (
              <button
                onClick={() => {
                  onComplete()
                  onClose()
                }}
                className="flex items-center gap-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium rounded-md px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
