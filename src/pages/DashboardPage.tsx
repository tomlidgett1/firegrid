import { useEffect, useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import type { SavedTable } from '@/lib/types'
import { collection, query, getDocs, doc, orderBy, updateDoc, addDoc, Timestamp, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trash2,
  LogOut,
  Loader2,
  Table,
  ChevronRight,
  ArrowRight,
  Database,
  X,
  Terminal,
  FolderOpen,
  LayoutGrid,
  List,
  Plus,
  Star,
  Archive,
  RotateCcw,
  User,
  MessageSquare,
  Send,
  Check,
  Search,
  FileSpreadsheet,
  ShoppingCart,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackProjectConnected, trackFeedbackSent, trackPageView } from '@/lib/metrics'
import ProjectSwitcher from '@/components/ProjectSwitcher'
import DarkModeToggle from '@/components/DarkModeToggle'
import { buildLightspeedAuthUrl, getLightspeedConnection, disconnectLightspeed } from '@/lib/lightspeed'
import type { LightspeedConnection } from '@/lib/types'

const RECENT_PROJECTS_KEY = 'firegrid_recent_projects'

function getRecentProjects(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_PROJECTS_KEY) || '[]')
  } catch {
    return []
  }
}

function addRecentProject(projectId: string) {
  const recent = getRecentProjects().filter((p) => p !== projectId)
  recent.unshift(projectId)
  localStorage.setItem(RECENT_PROJECTS_KEY, JSON.stringify(recent.slice(0, 10)))
}

// ---- Favourites helpers (localStorage) ----
interface Favourites {
  dashboards: string[]
  tables: string[]
}

function getFavouritesKey(uid: string) {
  return `firegrid_favourites_${uid}`
}

function loadFavourites(uid: string): Favourites {
  try {
    const raw = localStorage.getItem(getFavouritesKey(uid))
    if (!raw) return { dashboards: [], tables: [] }
    return JSON.parse(raw)
  } catch {
    return { dashboards: [], tables: [] }
  }
}

function saveFavourites(uid: string, favs: Favourites) {
  localStorage.setItem(getFavouritesKey(uid), JSON.stringify(favs))
}

interface DashboardItem {
  id: string
  name: string
  widgetCount: number
  updatedAt: Date
  archived?: boolean
  archivedAt?: Date
}

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [savedTables, setSavedTables] = useState<(SavedTable & { archived?: boolean; archivedAt?: Date })[]>([])
  const [loadingTables, setLoadingTables] = useState(true)
  const [projectId, setProjectId] = useState('')
  const [recentProjects, setRecentProjects] = useState<string[]>(getRecentProjects())
  const [showConnectForm, setShowConnectForm] = useState(false)
  const [tableView, setTableView] = useState<'cards' | 'list'>('cards')
  const [savedDashboards, setSavedDashboards] = useState<DashboardItem[]>([])
  const [loadingDashboards, setLoadingDashboards] = useState(true)
  const [favourites, setFavourites] = useState<Favourites>({ dashboards: [], tables: [] })
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showArchive, setShowArchive] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackSending, setFeedbackSending] = useState(false)
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [lsConnection, setLsConnection] = useState<LightspeedConnection | null>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const feedbackRef = useRef<HTMLDivElement>(null)

  const activeProject = recentProjects[0] ?? null
  const hasConnectedProject = recentProjects.length > 0

  // Load favourites
  useEffect(() => {
    if (user?.uid) {
      setFavourites(loadFavourites(user.uid))
    }
  }, [user?.uid])

  // Load Lightspeed connection status
  useEffect(() => {
    if (!user?.uid) return
    getLightspeedConnection(user.uid).then(setLsConnection).catch(() => setLsConnection(null))
  }, [user?.uid])

  // Track page view
  useEffect(() => {
    if (user?.uid) {
      trackPageView(user.uid, 'dashboard')
    }
  }, [user?.uid])

  // Close user menu / feedback on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false)
      }
      if (feedbackRef.current && !feedbackRef.current.contains(e.target as Node)) {
        setShowFeedback(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Submit feedback to Firestore
  const handleSubmitFeedback = async () => {
    if (!feedbackText.trim() || !db || feedbackSending) return
    setFeedbackSending(true)
    try {
      await addDoc(collection(db, 'feedback'), {
        message: feedbackText.trim(),
        userId: user?.uid ?? null,
        email: user?.email ?? null,
        displayName: user?.displayName ?? null,
        createdAt: serverTimestamp(),
      })
      if (user?.uid) {
        trackFeedbackSent(user.uid)
      }
      setFeedbackSent(true)
      setFeedbackText('')
      setTimeout(() => {
        setFeedbackSent(false)
        setShowFeedback(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to submit feedback:', err)
    } finally {
      setFeedbackSending(false)
    }
  }

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
        const tables = snap.docs.map((d) => {
          const data = d.data()
          return {
            id: d.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() ?? new Date(),
            updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
            archived: data.archived ?? false,
            archivedAt: data.archivedAt?.toDate?.() ?? undefined,
          }
        }) as (SavedTable & { archived?: boolean; archivedAt?: Date })[]
        setSavedTables(tables)
      })
      .catch(() => setSavedTables([]))
      .finally(() => setLoadingTables(false))
  }, [user?.uid])

  // Fetch saved dashboards
  useEffect(() => {
    if (!user?.uid || !db) {
      setLoadingDashboards(false)
      return
    }
    setLoadingDashboards(true)
    const dashRef = collection(db, 'users', user.uid, 'dashboards')
    const q = query(dashRef, orderBy('updatedAt', 'desc'))
    getDocs(q)
      .then((snap) => {
        const dashboards = snap.docs.map((d) => {
          const data = d.data()
          return {
            id: d.id,
            name: data.name ?? 'Untitled Dashboard',
            widgetCount: (data.widgets ?? []).length,
            updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
            archived: data.archived ?? false,
            archivedAt: data.archivedAt?.toDate?.() ?? undefined,
          }
        })
        setSavedDashboards(dashboards)
      })
      .catch(() => setSavedDashboards([]))
      .finally(() => setLoadingDashboards(false))
  }, [user?.uid])

  // ---- Favourite toggles ----
  const toggleFavouriteDashboard = (id: string) => {
    if (!user?.uid) return
    setFavourites((prev) => {
      const next = { ...prev }
      if (next.dashboards.includes(id)) {
        next.dashboards = next.dashboards.filter((d) => d !== id)
      } else {
        next.dashboards = [...next.dashboards, id]
      }
      saveFavourites(user.uid, next)
      return next
    })
  }

  const toggleFavouriteTable = (id: string) => {
    if (!user?.uid) return
    setFavourites((prev) => {
      const next = { ...prev }
      if (next.tables.includes(id)) {
        next.tables = next.tables.filter((t) => t !== id)
      } else {
        next.tables = [...next.tables, id]
      }
      saveFavourites(user.uid, next)
      return next
    })
  }

  // ---- Archive (instead of delete) ----
  const handleArchiveDashboard = async (dashId: string) => {
    if (!user?.uid || !db) return
    if (!confirm('Are you sure you want to archive this dashboard?')) return
    await updateDoc(doc(db, 'users', user.uid, 'dashboards', dashId), {
      archived: true,
      archivedAt: Timestamp.now(),
    })
    setSavedDashboards((prev) =>
      prev.map((d) => (d.id === dashId ? { ...d, archived: true, archivedAt: new Date() } : d))
    )
  }

  const handleArchiveTable = async (tableId: string) => {
    if (!user?.uid || !db) return
    if (!confirm('Are you sure you want to archive this saved table?')) return
    await updateDoc(doc(db, 'users', user.uid, 'tables', tableId), {
      archived: true,
      archivedAt: Timestamp.now(),
    })
    setSavedTables((prev) =>
      prev.map((t) => (t.id === tableId ? { ...t, archived: true, archivedAt: new Date() } : t))
    )
  }

  // ---- Restore from archive ----
  const handleRestoreDashboard = async (dashId: string) => {
    if (!user?.uid || !db) return
    await updateDoc(doc(db, 'users', user.uid, 'dashboards', dashId), {
      archived: false,
      archivedAt: null,
    })
    setSavedDashboards((prev) =>
      prev.map((d) => (d.id === dashId ? { ...d, archived: false, archivedAt: undefined } : d))
    )
  }

  const handleRestoreTable = async (tableId: string) => {
    if (!user?.uid || !db) return
    await updateDoc(doc(db, 'users', user.uid, 'tables', tableId), {
      archived: false,
      archivedAt: null,
    })
    setSavedTables((prev) =>
      prev.map((t) => (t.id === tableId ? { ...t, archived: false, archivedAt: undefined } : t))
    )
  }

  const handleConnect = useCallback(
    (id?: string) => {
      const target = (id || projectId).trim()
      if (!target) return
      addRecentProject(target)
      setRecentProjects(getRecentProjects())
      setShowConnectForm(false)
      if (user?.uid) {
        trackProjectConnected(user.uid, target)
      }
      navigate(`/project/${target}`)
    },
    [projectId, navigate, user?.uid]
  )

  const firstName = user?.displayName?.split(' ')[0] ?? ''

  // ---- Filter active vs archived ----
  const activeDashboards = savedDashboards.filter((d) => !d.archived)
  const activeTables = savedTables.filter((t) => !t.archived)
  const archivedDashboards = savedDashboards.filter((d) => d.archived)
  const archivedTables = savedTables.filter((t) => t.archived)

  // ---- Sort: favourites first ----
  const sortedDashboards = [...activeDashboards].sort((a, b) => {
    const aFav = favourites.dashboards.includes(a.id) ? 0 : 1
    const bFav = favourites.dashboards.includes(b.id) ? 0 : 1
    if (aFav !== bFav) return aFav - bFav
    return b.updatedAt.getTime() - a.updatedAt.getTime()
  })

  const sortedTables = [...activeTables].sort((a, b) => {
    const aFav = favourites.tables.includes(a.id) ? 0 : 1
    const bFav = favourites.tables.includes(b.id) ? 0 : 1
    if (aFav !== bFav) return aFav - bFav
    return b.updatedAt.getTime() - a.updatedAt.getTime()
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 cursor-pointer">
              <img src="/logo.png" alt="Firegrid" className="w-7 h-7 rounded-md" />
              <span className="font-semibold text-gray-900 dark:text-gray-100">Firegrid</span>
            </button>
            {hasConnectedProject && (
              <>
                <span className="text-gray-300 dark:text-gray-600">/</span>
                <ProjectSwitcher
                  currentProjectId={activeProject ?? undefined}
                  onAddProject={() => setShowConnectForm(true)}
                />
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</span>
            <DarkModeToggle />

            {/* User avatar with dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu((prev) => !prev)}
                className="flex items-center gap-1 rounded-full hover:ring-2 hover:ring-gray-200 dark:hover:ring-gray-600 transition-all"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    className="w-7 h-7 rounded-full"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                    <User size={14} className="text-gray-500 dark:text-gray-400" />
                  </div>
                )}
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg z-50 overflow-hidden"
                  >
                    <div className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {user?.displayName ?? 'User'}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <div className="py-1">
                      {/* Lightspeed connection */}
                      {lsConnection ? (
                        <>
                          <button
                            onClick={() => {
                              setShowUserMenu(false)
                              navigate('/sales')
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                          >
                            <ShoppingCart size={14} className="text-gray-400" />
                            View Sales
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />
                          </button>
                          <button
                            onClick={async () => {
                              if (!confirm('Disconnect Lightspeed? Your sales data will remain in Firestore.')) return
                              setShowUserMenu(false)
                              if (user?.uid) {
                                await disconnectLightspeed(user.uid)
                                setLsConnection(null)
                              }
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                          >
                            <X size={14} className="text-gray-400" />
                            Disconnect Lightspeed
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setShowUserMenu(false)
                            window.location.href = buildLightspeedAuthUrl()
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <ShoppingCart size={14} className="text-gray-400" />
                          Connect Lightspeed
                        </button>
                      )}

                      <div className="my-1 border-t border-gray-100 dark:border-gray-700" />

                      <button
                        onClick={() => {
                          setShowUserMenu(false)
                          setShowArchive(true)
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <Archive size={14} className="text-gray-400" />
                        Archive
                        {(archivedDashboards.length + archivedTables.length) > 0 && (
                          <span className="ml-auto text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-md">
                            {archivedDashboards.length + archivedTables.length}
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setShowUserMenu(false)
                          signOut()
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <LogOut size={14} className="text-gray-400" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {firstName ? `Welcome back, ${firstName}` : 'Welcome back'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {hasConnectedProject
              ? `Connected to ${activeProject}`
              : 'Connect a Firestore project to get started'}
          </p>
        </div>

        {/* Connect form — inline when no project, or on-demand */}
        {(!hasConnectedProject || showConnectForm) && (
          <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-5 mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Database size={15} className="text-gray-400" />
                <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">Connect a project</h2>
              </div>
              {showConnectForm && hasConnectedProject && (
                <button
                  onClick={() => setShowConnectForm(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 max-w-md">
              <input
                type="text"
                placeholder="GCP project ID, e.g. my-app-12345"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleConnect()
                }}
                autoFocus={showConnectForm}
                className="flex-1 text-sm border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:border-gray-300 dark:focus:border-gray-500"
              />
              <button
                onClick={() => handleConnect()}
                disabled={!projectId.trim()}
                className="flex items-center gap-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium rounded-md px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Connect
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {hasConnectedProject && !showConnectForm && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
              {/* Browse Firestore */}
              <button
                onClick={() => navigate(`/project/${activeProject}`)}
                className="group bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-4 text-left hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <FolderOpen size={16} className="text-gray-500 dark:text-gray-400" />
                  </div>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Build a Table</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Browse collections & build tables</p>
              </button>

              {/* Explore & Edit */}
              <button
                onClick={() => navigate(`/project/${activeProject}/explore`)}
                className="group bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-4 text-left hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <Search size={16} className="text-gray-500 dark:text-gray-400" />
                  </div>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Explore & Edit</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Browse, edit & delete documents</p>
              </button>

              {/* SQL Workbench */}
              <button
                onClick={() => navigate('/query')}
                disabled={activeTables.length === 0}
                className="group bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-4 text-left hover:border-gray-300 dark:hover:border-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <Terminal size={16} className="text-gray-500 dark:text-gray-400" />
                  </div>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">SQL Workbench</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {activeTables.length === 0 ? 'Save a table first' : 'Query your saved tables'}
                </p>
              </button>

              {/* New Dashboard */}
              <button
                onClick={() => navigate('/dashboard-builder')}
                className="group bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-4 text-left hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <Plus size={16} className="text-gray-500 dark:text-gray-400" />
                  </div>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
                </div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">New Dashboard</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Drag-and-drop builder</p>
            </button>

            {/* Lightspeed Sales — only show when connected */}
            {lsConnection && (
              <button
                onClick={() => navigate('/sales')}
                className="group bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-4 text-left hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <ShoppingCart size={16} className="text-gray-500 dark:text-gray-400" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Lightspeed Sales</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {lsConnection.accountName}
                  {lsConnection.lastSalesSync
                    ? ` · Last sync ${lsConnection.lastSalesSync.toLocaleDateString()}`
                    : ' · Not synced yet'}
                </p>
              </button>
            )}

          </div>
        )}

        {/* Dashboards */}
        {(sortedDashboards.length > 0 || loadingDashboards) && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <LayoutGrid size={15} className="text-gray-400" />
                Dashboards
              </h2>
            </div>

            {loadingDashboards ? (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Loader2 size={14} className="animate-spin" />
                Loading…
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {sortedDashboards.map((dash) => {
                  const isFav = favourites.dashboards.includes(dash.id)
                  return (
                    <div
                      key={dash.id}
                      onClick={() => navigate(`/dashboard-builder/${dash.id}`)}
                      className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            {isFav && <Star size={12} className="text-amber-400 fill-amber-400 shrink-0" />}
                            <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                              {dash.name}
                            </h3>
                          </div>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {dash.widgetCount} {dash.widgetCount === 1 ? 'table' : 'tables'} · {dash.updatedAt.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavouriteDashboard(dash.id)
                            }}
                            className={cn(
                              'transition-colors mt-0.5',
                              isFav
                                ? 'text-amber-400 hover:text-amber-500'
                                : 'text-gray-300 hover:text-amber-400'
                            )}
                            title={isFav ? 'Remove from favourites' : 'Add to favourites'}
                          >
                            <Star size={13} className={isFav ? 'fill-current' : ''} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleArchiveDashboard(dash.id)
                            }}
                            className="text-gray-300 hover:text-red-500 transition-colors mt-0.5"
                            title="Archive dashboard"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        )}

        {/* Saved Tables */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Table size={15} className="text-gray-400" />
              Saved Tables
            </h2>
            {sortedTables.length > 0 && (
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-0.5 rounded-md w-fit">
                <button
                  onClick={() => setTableView('cards')}
                  className={cn(
                    'flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors',
                    tableView === 'cards'
                      ? 'text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/70 dark:hover:bg-gray-600/70'
                  )}
                >
                  <LayoutGrid className="h-3 w-3" />
                  Cards
                </button>
                <button
                  onClick={() => setTableView('list')}
                  className={cn(
                    'flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors',
                    tableView === 'list'
                      ? 'text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/70 dark:hover:bg-gray-600/70'
                  )}
                >
                  <List className="h-3 w-3" />
                  List
                </button>
              </div>
            )}
          </div>

          {loadingTables ? (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Loader2 size={14} className="animate-spin" />
              Loading…
            </div>
          ) : sortedTables.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-8 text-center">
              <div className="w-10 h-10 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-3">
                <Table size={18} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">No saved tables yet</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Browse a collection and save a table to see it here.
              </p>
            </div>
          ) : tableView === 'cards' ? (
            /* ---- Card View ---- */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {sortedTables.map((table) => {
                const isFav = favourites.tables.includes(table.id)
                return (
                  <div
                    key={table.id}
                    onClick={() =>
                      table.projectId === '__csv__'
                        ? navigate(`/csv-table/${table.id}`)
                        : table.projectId === '__query__'
                          ? navigate(`/query-table/${table.id}`)
                          : navigate(
                              `/project/${table.projectId}/collection/${encodeURIComponent(table.collectionPath)}?tableId=${table.id}&mode=view${table.isCollectionGroup ? '&group=true' : ''}`
                            )
                    }
                    className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          {isFav && <Star size={12} className="text-amber-400 fill-amber-400 shrink-0" />}
                          <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                            {table.tableName}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          {table.projectId === '__query__' ? (
                            <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                              <Terminal size={10} />
                              SQL Query
                            </p>
                          ) : table.projectId === '__csv__' ? (
                            <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                              <FileSpreadsheet size={10} />
                              CSV Import
                            </p>
                          ) : (
                            <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                              {table.projectId} / {table.collectionPath}
                            </p>
                          )}
                          {table.isCollectionGroup && (
                            <span className="text-[10px] text-gray-500 bg-gray-100 dark:bg-gray-700 px-1 py-px rounded-md shrink-0">
                              group
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {table.columns.filter((c) => c.visible).length} columns · {table.updatedAt.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavouriteTable(table.id)
                          }}
                          className={cn(
                            'transition-colors mt-0.5',
                            isFav
                              ? 'text-amber-400 hover:text-amber-500'
                              : 'text-gray-300 hover:text-amber-400'
                          )}
                          title={isFav ? 'Remove from favourites' : 'Add to favourites'}
                        >
                          <Star size={13} className={isFav ? 'fill-current' : ''} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleArchiveTable(table.id)
                          }}
                          className="text-gray-300 hover:text-red-500 transition-colors mt-0.5 shrink-0"
                          title="Archive table"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex items-center gap-1 transition-colors">
                        Open table
                        <ChevronRight size={12} />
                      </span>
                      {table.projectId === '__query__' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/query?sql=${encodeURIComponent(table.querySql ?? table.collectionPath)}&autorun=true`)
                          }}
                          className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1 transition-colors"
                        >
                          <Terminal size={10} />
                          SQL Editor
                        </button>
                      )}
                      {table.projectId === '__csv__' && (
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                          <FileSpreadsheet size={9} />
                          CSV
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            /* ---- List View ---- */
            <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-700/60">
                    <th className="w-8" />
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">Name</th>
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">Source</th>
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">Columns</th>
                    <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">Updated</th>
                    <th className="w-20" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {sortedTables.map((table) => {
                    const isFav = favourites.tables.includes(table.id)
                    return (
                      <tr
                        key={table.id}
                        className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                        onClick={() =>
                          table.projectId === '__csv__'
                            ? navigate(`/csv-table/${table.id}`)
                            : table.projectId === '__query__'
                              ? navigate(`/query-table/${table.id}`)
                              : navigate(
                                  `/project/${table.projectId}/collection/${encodeURIComponent(table.collectionPath)}?tableId=${table.id}&mode=view${table.isCollectionGroup ? '&group=true' : ''}`
                                )
                        }
                      >
                        <td className="pl-3 py-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavouriteTable(table.id)
                            }}
                            className={cn(
                              'transition-colors',
                              isFav
                                ? 'text-amber-400 hover:text-amber-500'
                                : 'text-gray-200 dark:text-gray-600 hover:text-amber-400'
                            )}
                            title={isFav ? 'Remove from favourites' : 'Add to favourites'}
                          >
                            <Star size={13} className={isFav ? 'fill-current' : ''} />
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">{table.tableName}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            {table.projectId === '__query__' ? (
                              <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                <Terminal size={10} />
                                SQL Query
                              </span>
                            ) : table.projectId === '__csv__' ? (
                              <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                <FileSpreadsheet size={10} />
                                CSV Import
                              </span>
                            ) : (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {table.projectId} / {table.collectionPath}
                              </span>
                            )}
                            {table.isCollectionGroup && (
                              <span className="text-[10px] text-gray-500 bg-gray-100 dark:bg-gray-700 px-1 py-px rounded-md">
                                group
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {table.columns.filter((c) => c.visible).length}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {table.updatedAt.toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center gap-2 justify-end">
                            {table.projectId === '__query__' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  navigate(`/query?sql=${encodeURIComponent(table.querySql ?? table.collectionPath)}&autorun=true`)
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                                title="Open in SQL Editor"
                              >
                                <Terminal size={13} />
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleArchiveTable(table.id)
                              }}
                              className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                              title="Archive table"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* ---- Archive Modal ---- */}
      <AnimatePresence>
        {showArchive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowArchive(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
              className="relative bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col mx-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Archive size={16} className="text-gray-400" />
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Archive</h2>
                </div>
                <button
                  onClick={() => setShowArchive(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
                {archivedDashboards.length === 0 && archivedTables.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="w-10 h-10 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-3">
                      <Archive size={18} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">No archived items</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Items you archive will appear here.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Archived Dashboards */}
                    {archivedDashboards.length > 0 && (
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <LayoutGrid size={12} />
                          Dashboards ({archivedDashboards.length})
                        </h3>
                        <div className="space-y-2">
                          {archivedDashboards.map((dash) => (
                            <div
                              key={dash.id}
                              className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 px-4 py-3"
                            >
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                  {dash.name}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                  {dash.widgetCount} {dash.widgetCount === 1 ? 'table' : 'tables'}
                                  {dash.archivedAt && ` · Archived ${dash.archivedAt.toLocaleDateString()}`}
                                </p>
                              </div>
                              <button
                                onClick={() => handleRestoreDashboard(dash.id)}
                                className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors shrink-0 ml-3"
                              >
                                <RotateCcw size={12} />
                                Restore
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Archived Tables */}
                    {archivedTables.length > 0 && (
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Table size={12} />
                          Tables ({archivedTables.length})
                        </h3>
                        <div className="space-y-2">
                          {archivedTables.map((table) => (
                            <div
                              key={table.id}
                              className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 px-4 py-3"
                            >
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                  {table.tableName}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                  {table.projectId === '__query__' ? 'SQL Query' : `${table.projectId} / ${table.collectionPath}`}
                                  {table.archivedAt && ` · Archived ${table.archivedAt.toLocaleDateString()}`}
                                </p>
                              </div>
                              <button
                                onClick={() => handleRestoreTable(table.id)}
                                className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors shrink-0 ml-3"
                              >
                                <RotateCcw size={12} />
                                Restore
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ---- Feedback Button ---- */}
      <div className="fixed bottom-5 right-5 z-50" ref={feedbackRef}>
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-2 w-72 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"
            >
              <div className="px-3.5 py-3 border-b border-gray-100 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Send Feedback</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  Let us know how we can improve
                </p>
              </div>
              <div className="p-3.5">
                {feedbackSent ? (
                  <div className="flex flex-col items-center py-4 gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                      <Check size={16} className="text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Thanks for your feedback!</p>
                  </div>
                ) : (
                  <>
                    <textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="What's on your mind?"
                      rows={3}
                      autoFocus
                      className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:border-gray-300 dark:focus:border-gray-500 resize-none"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={handleSubmitFeedback}
                        disabled={!feedbackText.trim() || feedbackSending}
                        className="flex items-center gap-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-medium rounded-md px-3 py-1.5 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {feedbackSending ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <Send size={12} />
                        )}
                        {feedbackSending ? 'Sending…' : 'Send'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => {
            setShowFeedback((prev) => !prev)
            setFeedbackSent(false)
          }}
          className={cn(
            'flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium shadow-md border transition-colors',
            showFeedback
              ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-900 dark:border-gray-100'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          )}
        >
          <MessageSquare size={13} />
          Feedback
        </button>
      </div>
    </div>
  )
}
