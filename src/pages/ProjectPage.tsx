import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import {
  listCollections,
  sampleDocuments,
  discoverSubCollections,
  discoverSubCollectionsFromGroup,
} from '@/lib/firestore-rest'
import { discoverSchema } from '@/lib/utils'
import type { CollectionInfo, FieldInfo, DocumentData, ColumnConfig } from '@/lib/types'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Database,
  FileText,
  Loader2,
  AlertCircle,
  ArrowRight,
  LogOut,
  FolderTree,
  Layers,
  Wand2,
  FileSpreadsheet,
} from 'lucide-react'
import { db } from '@/lib/firebase'
import { doc, setDoc, collection as firestoreCollection, serverTimestamp } from 'firebase/firestore'
import ProjectSwitcher from '@/components/ProjectSwitcher'
import DarkModeToggle from '@/components/DarkModeToggle'
import AutoTableBuilder from '@/components/AutoTableBuilder'
import CsvUploadModal from '@/components/CsvUploadModal'

// ---- Recursive Sub-collection Tree ----

interface SubCollNodeProps {
  collectionId: string
  parentLabel: string
  depth: number
  accessToken: string
  projectId: string
  onBuildTable: (collectionId: string) => void
}

function SubCollNode({
  collectionId,
  parentLabel,
  depth,
  accessToken,
  projectId,
  onBuildTable,
}: SubCollNodeProps) {
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [children, setChildren] = useState<string[]>([])
  const [explored, setExplored] = useState(false)

  // Auto-probe on mount to check if there are deeper sub-collections
  const [probing, setProbing] = useState(true)
  const [hasChildren, setHasChildren] = useState<boolean | null>(null)

  useEffect(() => {
    let cancelled = false
    discoverSubCollectionsFromGroup(accessToken, projectId, collectionId)
      .then((subs) => {
        if (cancelled) return
        setHasChildren(subs.length > 0)
        // Cache the results so we don't re-fetch on explore
        if (subs.length > 0) {
          setChildren(subs)
          setExplored(true)
        }
      })
      .catch(() => {
        if (!cancelled) setHasChildren(false)
      })
      .finally(() => {
        if (!cancelled) setProbing(false)
      })
    return () => { cancelled = true }
  }, [accessToken, projectId, collectionId])

  const explore = useCallback(async () => {
    if (explored) {
      setExpanded(!expanded)
      return
    }
    setExpanded(true)
    setLoading(true)
    try {
      const subs = await discoverSubCollectionsFromGroup(accessToken, projectId, collectionId)
      setChildren(subs)
      setHasChildren(subs.length > 0)
      setExplored(true)
    } catch (err) {
      console.error('Failed to explore sub-collections:', err)
    } finally {
      setLoading(false)
    }
  }, [explored, expanded, accessToken, projectId, collectionId])

  const pathLabel = `${parentLabel}/{'*'}/${collectionId}`

  return (
    <div className="relative">
      {/* Tree connector line */}
      {depth > 0 && (
        <div
          className="absolute top-0 bottom-0 border-l border-gray-200 dark:border-gray-600"
          style={{ left: depth * 16 + 6 }}
        />
      )}

      <div
        className={cn(
          'flex items-center justify-between rounded-md px-3 py-2.5 group transition-colors relative',
          depth === 0 ? 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700' : 'bg-gray-50/60 dark:bg-gray-800/60 hover:bg-gray-100/80 dark:hover:bg-gray-700/80'
        )}
        style={{ marginLeft: depth > 0 ? depth * 16 : 0 }}
      >
        {/* Tree branch connector */}
        {depth > 0 && (
          <div className="absolute -left-[10px] top-1/2 w-[10px] border-t border-gray-200 dark:border-gray-600" />
        )}

        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <Layers size={14} className="text-gray-400 shrink-0" />
          <div className="min-w-0 flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{collectionId}</span>

            {/* Nesting indicator */}
            {probing ? (
              <Loader2 size={10} className="animate-spin text-gray-300" />
            ) : hasChildren ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-1.5 py-0.5 rounded-md">
                <FolderTree size={9} />
                has sub-collections
              </span>
            ) : (
              <span className="text-[10px] text-gray-300 dark:text-gray-600">leaf</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {hasChildren && (
            <button
              onClick={explore}
              className={cn(
                'flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md transition-colors',
                expanded
                  ? 'text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              )}
              title="Explore deeper sub-collections"
            >
              {loading ? (
                <Loader2 size={10} className="animate-spin" />
              ) : (
                <ChevronRight
                  className={cn(
                    'h-3 w-3 transition-transform duration-200',
                    expanded && 'rotate-90'
                  )}
                />
              )}
              {expanded ? 'Collapse' : `Explore (${children.length})`}
            </button>
          )}
          <button
            onClick={() => onBuildTable(collectionId)}
            className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 px-2.5 py-1 rounded-md transition-colors shadow-sm"
          >
            Build Table
            <ArrowRight size={11} />
          </button>
        </div>
      </div>

      {/* Children */}
      <AnimatePresence>
        {expanded && children.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="mt-1 space-y-1">
              {children.map((childId) => (
                <SubCollNode
                  key={childId}
                  collectionId={childId}
                  parentLabel={pathLabel}
                  depth={depth + 1}
                  accessToken={accessToken}
                  projectId={projectId}
                  onBuildTable={onBuildTable}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---- Main Page ----

interface ExpandedState {
  schema: FieldInfo[]
  sampleDocs: DocumentData[]
  subCollections: string[]
  loading: boolean
}

export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [collections, setCollections] = useState<CollectionInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showAutoBuilder, setShowAutoBuilder] = useState(false)
  const [showCsvUpload, setShowCsvUpload] = useState(false)
  const [expandedCollection, setExpandedCollection] = useState<string | null>(null)
  const [expandedState, setExpandedState] = useState<ExpandedState>({
    schema: [],
    sampleDocs: [],
    subCollections: [],
    loading: false,
  })

  useEffect(() => {
    if (!user?.accessToken || !projectId) return
    setLoading(true)
    setError(null)
    listCollections(user.accessToken, projectId)
      .then(setCollections)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [user?.accessToken, projectId])

  const handleExpandCollection = async (collPath: string) => {
    if (expandedCollection === collPath) {
      setExpandedCollection(null)
      return
    }

    setExpandedCollection(collPath)
    setExpandedState({ schema: [], sampleDocs: [], subCollections: [], loading: true })

    try {
      const docs = await sampleDocuments(user!.accessToken!, projectId!, collPath, 50)
      const discovered = discoverSchema(docs)

      const subColls = await discoverSubCollections(user!.accessToken!, projectId!, collPath)

      setExpandedState({
        schema: discovered,
        sampleDocs: docs,
        subCollections: subColls,
        loading: false,
      })
    } catch (err) {
      console.error('Schema discovery failed:', err)
      setExpandedState((prev) => ({ ...prev, loading: false }))
    }
  }

  const navigateToTable = (collPath: string, isGroup = false) => {
    const encoded = encodeURIComponent(collPath)
    const url = `/project/${projectId}/collection/${encoded}${isGroup ? '?group=true' : ''}`
    navigate(url)
  }

  const handleBuildGroupTable = (collectionId: string) => {
    navigateToTable(collectionId, true)
  }

  // ---- CSV import handler ----
  const CSV_CHUNK_SIZE = 400

  const handleCsvSave = useCallback(
    async (csvTableName: string, headers: string[], rows: Record<string, unknown>[]) => {
      if (!user?.uid || !db) throw new Error('Not authenticated')

      const id = crypto.randomUUID()
      const columns: ColumnConfig[] = headers.map((header, idx) => ({
        id: header,
        sourcePath: header,
        alias: header,
        dataType: 'string',
        visible: true,
        order: idx,
      }))

      // Write row data in chunks to a subcollection
      const chunksRef = firestoreCollection(db, 'users', user.uid, 'tables', id, 'csvChunks')
      const totalChunks = Math.ceil(rows.length / CSV_CHUNK_SIZE)
      const chunkPromises: Promise<void>[] = []

      for (let i = 0; i < totalChunks; i++) {
        const slice = rows.slice(i * CSV_CHUNK_SIZE, (i + 1) * CSV_CHUNK_SIZE)
        chunkPromises.push(
          setDoc(doc(chunksRef, String(i)), { rows: slice })
        )
      }
      await Promise.all(chunkPromises)

      // Save metadata in the table document
      await setDoc(doc(db, 'users', user.uid, 'tables', id), {
        tableName: csvTableName,
        projectId: '__csv__',
        collectionPath: csvTableName,
        isCollectionGroup: false,
        columns,
        csvChunkCount: totalChunks,
        csvRowCount: rows.length,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      navigate(`/csv-table/${id}`)
    },
    [user?.uid, navigate]
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
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
            <ProjectSwitcher currentProjectId={projectId} />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</span>
            <DarkModeToggle />
            <button
              onClick={signOut}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 flex items-center gap-2">
              <Database size={18} className="text-gray-400" />
              Collections
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Browse collections and sub-collections. Use "Explore" to drill into deeper nesting levels.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowCsvUpload(true)}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md px-3.5 py-2 transition-colors"
            >
              <FileSpreadsheet size={14} className="text-gray-500 dark:text-gray-400" />
              Import CSV
            </button>
            <button
              onClick={() => setShowAutoBuilder(true)}
              disabled={loading || collections.length === 0}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md px-3.5 py-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Wand2 size={14} className="text-gray-500 dark:text-gray-400" />
              Auto-Build
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-md">Beta</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-red-200 dark:border-red-800 p-4 mb-4 flex items-start gap-3">
            <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-700 dark:text-red-400">Error loading collections</p>
              <p className="text-xs text-red-500 dark:text-red-400 mt-1">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Loader2 size={14} className="animate-spin" />
            Loading collections…
          </div>
        ) : collections.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">No collections found in this project.</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Ensure Cloud Firestore is enabled and your security rules allow read access.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {collections.map((coll) => {
              const isExpanded = expandedCollection === coll.path
              return (
                <div
                  key={coll.path}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  {/* Collection Header */}
                  <button
                    onClick={() => handleExpandCollection(coll.path)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{coll.id}</span>
                      {coll.documentCount !== null && (
                        <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md">
                          {coll.documentCount === 0
                            ? coll.hasSubcollections
                              ? 'Subcollections only'
                              : 'Empty'
                            : `${coll.documentCount}+ docs`}
                        </span>
                      )}
                      {coll.documentCount === null && coll.hasSubcollections && (
                        <span className="inline-flex items-center gap-1 text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md">
                          <FolderTree size={10} />
                          Has subcollections
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-gray-400 transition-transform duration-200',
                        isExpanded && 'rotate-180'
                      )}
                    />
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-gray-100 dark:border-gray-700 px-4 py-4">
                          {expandedState.loading ? (
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 py-2">
                              <Loader2 size={14} className="animate-spin" />
                              Sampling documents, discovering schema and sub-collections…
                            </div>
                          ) : expandedState.schema.length === 0 && expandedState.subCollections.length === 0 ? (
                            <p className="text-sm text-gray-400 dark:text-gray-500 py-2">
                              No fields or subcollections discovered. The collection may be empty.
                            </p>
                          ) : (
                            <div className="space-y-5">
                              {/* Schema Section */}
                              {expandedState.schema.length > 0 && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {expandedState.schema.length} fields from{' '}
                                      {expandedState.sampleDocs.length} sampled docs
                                    </p>
                                    <button
                                      onClick={() => navigateToTable(coll.path)}
                                      className="flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1.5 rounded-md transition-colors"
                                    >
                                      Build Table
                                      <ArrowRight size={12} />
                                    </button>
                                  </div>

                                  <div className="border border-gray-100 dark:border-gray-700 rounded-md overflow-hidden">
                                    <table className="w-full text-xs">
                                      <thead>
                                        <tr className="bg-gray-50 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400">
                                          <th className="text-left px-3 py-2 font-medium">Field</th>
                                          <th className="text-left px-3 py-2 font-medium">Type</th>
                                          <th className="text-left px-3 py-2 font-medium">Coverage</th>
                                          <th className="text-left px-3 py-2 font-medium">Sample</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                        {expandedState.schema.slice(0, 15).map((field) => (
                                          <tr key={field.path} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                            <td className="px-3 py-1.5 font-mono text-gray-800 dark:text-gray-200">
                                              {field.path}
                                            </td>
                                            <td className="px-3 py-1.5">
                                              <span className="text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-md">
                                                {field.dataType}
                                              </span>
                                            </td>
                                            <td className="px-3 py-1.5">
                                              <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                  <div
                                                    className="h-full bg-gray-400 rounded-full"
                                                    style={{ width: `${Math.round(field.coverage * 100)}%` }}
                                                  />
                                                </div>
                                                <span className="text-gray-500 dark:text-gray-400">
                                                  {Math.round(field.coverage * 100)}%
                                                </span>
                                              </div>
                                            </td>
                                            <td className="px-3 py-1.5 text-gray-400 dark:text-gray-500 max-w-[200px] truncate">
                                              {field.sampleValues[0] !== undefined
                                                ? String(field.sampleValues[0]).slice(0, 60)
                                                : '—'}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                    {expandedState.schema.length > 15 && (
                                      <div className="px-3 py-2 text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/60">
                                        …and {expandedState.schema.length - 15} more fields
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Sub-collections Section */}
                              {expandedState.subCollections.length > 0 && (
                                <div>
                                  <div className="flex items-center gap-2 mb-3">
                                    <FolderTree size={14} className="text-gray-400" />
                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                      Sub-collections
                                    </p>
                                    <span className="text-[10px] text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-md">
                                      discovered from sample documents
                                    </span>
                                  </div>

                                  <div className="space-y-1.5">
                                    {expandedState.subCollections.map((subColl) => (
                                      <SubCollNode
                                        key={subColl}
                                        collectionId={subColl}
                                        parentLabel={coll.id}
                                        depth={0}
                                        accessToken={user!.accessToken!}
                                        projectId={projectId!}
                                        onBuildTable={handleBuildGroupTable}
                                      />
                                    ))}
                                  </div>

                                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2.5">
                                    "Build Table" queries the sub-collection across all parent documents. "Explore" drills deeper to find nested sub-collections.
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* AI Auto-Build Modal */}
      {projectId && (
        <AutoTableBuilder
          projectId={projectId}
          open={showAutoBuilder}
          onClose={() => setShowAutoBuilder(false)}
          onComplete={() => {
            // Reload collections to refresh any state
            if (user?.accessToken && projectId) {
              listCollections(user.accessToken, projectId)
                .then(setCollections)
                .catch(() => {})
            }
          }}
        />
      )}

      {/* CSV Upload Modal */}
      <CsvUploadModal
        open={showCsvUpload}
        onClose={() => setShowCsvUpload(false)}
        onSave={handleCsvSave}
      />
    </div>
  )
}
