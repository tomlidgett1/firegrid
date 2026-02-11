import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  ChevronDown,
  Database,
  Plus,
  X,
  Clock,
} from 'lucide-react'

const RECENT_PROJECTS_KEY = 'firegrid_recent_projects'

function getCachedProjects(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_PROJECTS_KEY) || '[]')
  } catch {
    return []
  }
}

interface ProjectSwitcherProps {
  currentProjectId?: string
  /** Full list of recent project IDs (managed by parent via Firestore). */
  recentProjects?: string[]
  /** When provided, called instead of navigating to /dashboard */
  onAddProject?: () => void
  /** Called when the user removes a project — parent handles Firestore + cache sync. */
  onRemoveProject?: (projectId: string) => void
}

export default function ProjectSwitcher({ currentProjectId, recentProjects: recentProjectsProp, onAddProject, onRemoveProject }: ProjectSwitcherProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Use prop if provided (Firestore-synced), otherwise fall back to localStorage cache
  const recentProjects = recentProjectsProp ?? getCachedProjects()

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  // Close on escape
  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  const otherProjects = recentProjects.filter((p) => p !== currentProjectId)

  const handleSelectProject = (projectId: string) => {
    setOpen(false)
    navigate(`/project/${projectId}`)
  }

  const handleRemoveProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onRemoveProject?.(projectId)
  }

  const handleAddProject = () => {
    setOpen(false)
    if (onAddProject) {
      onAddProject()
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-colors text-sm',
          open
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
            : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
        )}
      >
        <Database size={14} className="text-gray-400 shrink-0" />
        <span className="font-medium truncate max-w-[180px]">
          {currentProjectId || 'No project'}
        </span>
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 text-gray-400 transition-transform duration-200 shrink-0',
            open && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-1.5 z-50 min-w-[260px]"
          >
            <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
              {/* Current project */}
              {currentProjectId && (
                <div className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-1">
                    Current project
                  </p>
                  <div className="flex items-center gap-2">
                    <Database size={13} className="text-gray-400 shrink-0" />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {currentProjectId}
                    </span>
                  </div>
                </div>
              )}

              {/* Other recent projects */}
              {otherProjects.length > 0 && (
                <div className="py-1.5">
                  <p className="px-3 py-1 text-[10px] font-medium text-gray-400 uppercase tracking-wide flex items-center gap-1">
                    <Clock size={9} />
                    Recent projects
                  </p>
                  {otherProjects.map((id) => (
                    <button
                      key={id}
                      onClick={() => handleSelectProject(id)}
                      className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Database size={13} className="text-gray-300 shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{id}</span>
                      </div>
                      <span
                        onClick={(e) => handleRemoveProject(id, e)}
                        className="text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      >
                        <X size={12} />
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* No other projects message */}
              {otherProjects.length === 0 && !currentProjectId && recentProjects.length === 0 && (
                <div className="px-3 py-4 text-center">
                  <p className="text-xs text-gray-400">No recent projects</p>
                </div>
              )}

              {/* Add project button */}
              <div className="border-t border-gray-100 dark:border-gray-700 p-1.5">
                <button
                  onClick={handleAddProject}
                  className="w-full flex items-center gap-2 px-2.5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <Plus size={14} className="text-gray-400" />
                  Add another project
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
