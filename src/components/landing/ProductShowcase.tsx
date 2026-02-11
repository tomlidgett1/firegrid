import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Table,
  Terminal,
  LayoutGrid,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Eye,
  Settings2,
  Columns3,
  Search,
  Save,
  Download,
  FileJson,
  Copy,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  CheckSquare,
  GripVertical,
  Pencil,
  Plus,
  Lock,
  Database,
} from 'lucide-react'

type Slide = 'collections' | 'table' | 'sql' | 'dashboard'

const slideLabels: Record<Slide, string> = {
  collections: 'Explorer',
  table: 'Build Tables',
  sql: 'SQL Queries',
  dashboard: 'Dashboards',
}

const slideCaptions: Record<Slide, string> = {
  collections: 'Browse any collection, double-click cells to edit inline, and discover sub-collections.',
  table: 'Pick columns, set aliases, sort and filter — then export to CSV or JSON.',
  sql: 'Write SQL across your collections. Joins, aggregates, filters — all client-side.',
  dashboard: 'Drag-and-drop metrics, charts, and tables into shareable dashboards.',
}

const slideIcons: Record<Slide, typeof Table> = {
  collections: FolderOpen,
  table: Table,
  sql: Terminal,
  dashboard: LayoutGrid,
}

/* ──────────────────────────────────────────────────────────
   Shared: App Header (matches the real app exactly)
   ────────────────────────────────────────────────────────── */

function AppHeader({ breadcrumbs }: { breadcrumbs: string[] }) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 h-10 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-1.5">
        <ChevronLeft size={14} className="text-gray-400" />
        <img src="/logo.png" alt="Firegrid" className="w-5 h-5 rounded-md" />
        <span className="font-semibold text-[11px] text-gray-900">Firegrid</span>
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <ChevronRight size={12} className="text-gray-300" />
            <span className="text-[11px] text-gray-600 font-medium">{crumb}</span>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[8px] text-gray-500 font-bold">
          SC
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   Slide 0: Browse Collections (exact replica of ProjectPage)
   ────────────────────────────────────────────────────────── */

const explorerHeaders = ['Document ID', 'signInMethod', 'hasSeenHowTapWorks', 'customerid', 'email', 'fullName', 'appVersion', 'occupation', 'location']

const explorerRows = [
  ['6AP1Dv4cjNhiP0f49zXPM…', 'email', 'false', '6AP1Dv4cjNhiPOf49zXPMdiOe7M2', 't@dss.com', 'J J', '1.2', 'Employed', '{"updatedAt":"2026-02-03T02:3…'],
  ['BzhTcEiJNlb6BCSU4zj86…', 'apple', 'false', 'BzhTcEiJNlb6BCSU4zj86waiq983', 'tqygdksbp@privaterelay.com', '', '1.2', 'null', 'null'],
  ['DZzDy4fuJWO78FjWgnNWC…', 'apple', 'true', 'DZzDy4fuJWO78FjWgnNWCiu6QhB3', 'fyngpskf2p@privaterelay.com', 'Gus MacDonald', '1.2', 'null', 'null'],
  ['DpADsUGKvRVd98P9fYKEe…', 'google', 'true', 'DpADsUGKvRVd98P9fYKEe4g8ErJ3', 'tom@lidgett.net', 'Tom Lidgett', '1.2', 'Self Employed', '{"address":"55 Collins St Melbo…'],
  ['EGzHeh5m8aYWIVCJmBaTV…', 'email', 'true', 'EGzHeh5m8aYWlVCJmBaTVvoM0gn1', 'didi@djd.com', 'F C', '1.2', 'Other', '{"longitude":144.9720411,"addre…'],
  ['RPGYqEZI94a1m63177Jv3…', 'apple', 'null', 'RPGYqEZI94a1m63177Jv3fX1qjw2', 'tqygdksbp@privaterelay.com', 'Tom Lidgett', '1.2', 'null', '{"latitude":-37.8168958501177…'],
  ['ZkPs76uZxpeKNpmsZNl58…', 'apple', 'true', 'ZkPs76uZxpeKNpmsZNl50kLMRAc2', 'tlidgett@me.com', 'Tom Lidgett', '1.2', 'Self Employed', '{"longitude":144.9720411,"upda…'],
  ['kRVPQ5aE9dPpegdejaOcp…', 'email', 'true', 'kRVPQ5aE9dPpegdejaOcpJ9bKY03', 'sdf@sdffd.com', 'Sdf Sdf', '1.2', 'Other', '{"radius":10,"address":"223 Find…'],
]

function CollectionsSlide() {
  return (
    <div className="flex flex-col h-full">
      {/* Header — matches CollectionExplorerPage */}
      <div className="bg-white border-b border-gray-200 px-4 h-10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <ChevronLeft size={14} className="text-gray-400" />
          <img src="/logo.png" alt="Firegrid" className="w-5 h-5 rounded-md shrink-0" />
          <span className="font-semibold text-[11px] text-gray-900">Firegrid</span>
          <ChevronRight size={11} className="text-gray-300 shrink-0" />
          <div className="flex items-center gap-1">
            <Database size={11} className="text-gray-400" />
            <span className="text-[11px] text-gray-700 font-medium">tap-loyalty-fb6d0</span>
            <ChevronDown size={9} className="text-gray-400" />
          </div>
          <ChevronRight size={11} className="text-gray-300 shrink-0" />
          <span className="text-[10px] font-medium text-gray-500">Explorer</span>
          <ChevronRight size={11} className="text-gray-300 shrink-0" />
          <span className="text-[11px] font-medium text-gray-900">customers</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[8px] text-gray-500 font-bold">TL</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 h-9 flex items-center gap-3 shrink-0">
        {/* Search */}
        <div className="relative flex-1 max-w-[200px]">
          <Search size={11} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          <div className="w-full pl-7 pr-3 py-1 text-[10px] border border-gray-200 rounded-md bg-gray-50 text-gray-400">
            Search across all fields…
          </div>
        </div>

        {/* Subcollections */}
        <div className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-medium rounded-md border border-gray-200 text-gray-600 cursor-pointer hover:border-gray-300 transition-colors">
          <FolderOpen size={11} className="text-gray-400" />
          Subcollections
          <span className="text-[9px] bg-gray-200 text-gray-500 px-1 py-0.5 rounded-md">29</span>
          <ChevronDown size={9} className="text-gray-400" />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto shrink-0">
          <span className="text-[10px] text-gray-400 tabular-nums">8 docs</span>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-1.5 bg-gray-900 text-white text-[10px] font-medium rounded-md px-2.5 py-1 cursor-pointer hover:bg-gray-800 transition-colors">
            <Plus size={10} />
            Add Document
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-[10px] border-separate border-spacing-0">
          <thead className="sticky top-0 z-10">
            <tr>
              {explorerHeaders.map((h, i) => (
                <th
                  key={h}
                  className={cn(
                    'text-left px-3 py-2 font-medium text-[9px] uppercase tracking-wider text-gray-500 bg-gray-50 border-b border-gray-200 whitespace-nowrap',
                    i === 0 && 'sticky left-0 z-20'
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {explorerRows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={cn(
                  'group',
                  rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                )}
              >
                {row.map((cell, colIdx) => {
                  // Make the 5th row, "email" column (colIdx=4) appear as being edited
                  const isEditing = rowIdx === 4 && colIdx === 4
                  const isIdCol = colIdx === 0

                  return (
                    <td
                      key={colIdx}
                      className={cn(
                        'px-3 py-1.5 whitespace-nowrap border-b border-gray-100 max-w-[200px]',
                        isIdCol
                          ? 'text-gray-800 font-mono sticky left-0 z-[5] ' + (rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50')
                          : 'text-gray-600',
                        isEditing && 'p-0'
                      )}
                    >
                      {isEditing ? (
                        <div className="px-1 py-0.5">
                          <input
                            type="text"
                            defaultValue="didi@djd.com"
                            readOnly
                            className="w-full min-w-[140px] text-[10px] bg-white border-2 border-blue-400 rounded-md px-2 py-1 text-gray-900 focus:outline-none shadow-sm"
                          />
                        </div>
                      ) : (
                        <span className="truncate block max-w-[200px]">
                          {cell === 'null' ? (
                            <span className="text-gray-300">null</span>
                          ) : cell === '' ? (
                            <span className="text-gray-300"></span>
                          ) : (
                            cell
                          )}
                        </span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer — pagination */}
      <div className="px-4 py-1.5 bg-white border-t border-gray-200 flex items-center justify-between shrink-0">
        <span className="text-[10px] text-gray-500 tabular-nums">8 of 8 rows</span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-gray-500 tabular-nums">1 / 1</span>
        </div>
        <div className="text-[10px] text-gray-500 border border-gray-200 rounded-md px-2 py-0.5">50 rows</div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   Slide 1: Table Builder (exact replica)
   ────────────────────────────────────────────────────────── */

const tableColumns = ['email', 'displayName', 'plan', 'status', 'createdAt']
const tableRows = [
  ['sarah@company.io', 'Sarah Chen', 'team', 'active', '2025-01-15'],
  ['james.h@startup.co', 'James Howard', 'pro', 'active', '2025-02-03'],
  ['priya.m@dev.app', 'Priya Mehta', 'pro', 'trial', '2025-02-18'],
  ['alex@agency.com', 'Alex Rivera', 'free', 'active', '2025-03-01'],
  ['nina.k@corp.dev', 'Nina Kowalski', 'team', 'churned', '2025-03-12'],
  ['tom.w@saas.io', 'Tom Watkins', 'pro', 'active', '2025-03-18'],
]

const columnFields = [
  { name: 'email', type: 'string', visible: true },
  { name: 'displayName', type: 'string', visible: true },
  { name: 'plan', type: 'string', visible: true },
  { name: 'status', type: 'string', visible: true },
  { name: 'createdAt', type: 'timestamp', visible: true },
  { name: 'lastLogin', type: 'timestamp', visible: false },
  { name: 'photoURL', type: 'string', visible: false },
  { name: 'preferences', type: 'map', visible: false },
]

function TableBuilderSlide() {
  return (
    <div className="flex flex-col h-full">
      <AppHeader breadcrumbs={['my-saas-app', 'users']} />

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-3 h-9 flex items-center gap-2 shrink-0">
        {/* Mode tabs */}
        <div className="flex items-center bg-gray-100 p-0.5 rounded-md">
          <div className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-gray-800 bg-white rounded shadow-sm">
            <Eye size={11} />
            View
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-gray-400">
            <Settings2 size={11} />
            Edit
          </div>
        </div>

        <div className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-gray-800 bg-gray-100 rounded-md">
          <Columns3 size={11} />
          Columns
          <span className="text-[9px] bg-gray-200 text-gray-500 px-1 py-0.5 rounded-md">5</span>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-[200px]">
          <Search size={11} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          <div className="w-full pl-6 pr-2 py-1 text-[10px] border border-gray-200 rounded-md bg-gray-50 text-gray-400">
            Search across all columns…
          </div>
        </div>

        {/* Right: save + export */}
        <div className="flex items-center gap-1 ml-auto">
          <div className="text-[10px] border border-gray-200 rounded-md px-2 py-1 text-gray-400 bg-white">
            Users Table
          </div>
          <div className="flex items-center gap-1 bg-gray-900 text-white text-[10px] font-medium rounded-md px-2 py-1">
            <Save size={10} />
            Save
          </div>
          <div className="w-px h-4 bg-gray-200 mx-0.5" />
          <Download size={12} className="text-gray-400" />
          <FileJson size={12} className="text-gray-400" />
          <Copy size={12} className="text-gray-400" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Column panel */}
        <div className="hidden md:flex flex-col w-48 border-r border-gray-200 bg-white shrink-0">
          <div className="px-2.5 pt-2.5 pb-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-semibold text-gray-900 uppercase tracking-wider">Columns</span>
              <span className="text-[9px] text-gray-400">5 of 8</span>
            </div>
            <div className="relative">
              <Search size={10} className="absolute left-1.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <div className="w-full pl-5 py-1 text-[9px] border border-gray-200 rounded-md bg-gray-50 text-gray-400">
                Search fields…
              </div>
            </div>
          </div>
          <div className="text-[10px] text-gray-500 px-2.5 pb-1.5">Select all</div>
          <div className="flex-1 overflow-y-auto border-t border-gray-100">
            {columnFields.map((f) => (
              <div key={f.name} className="flex items-center gap-1 px-2 py-1 mx-1 rounded-md hover:bg-gray-50 group">
                <GripVertical size={10} className="text-gray-300 shrink-0" />
                <CheckSquare size={12} className={f.visible ? 'text-gray-600 shrink-0' : 'text-gray-300 shrink-0'} />
                <span className={cn('flex-1 text-[10px] truncate', f.visible ? 'text-gray-800 font-medium' : 'text-gray-400')}>
                  {f.name}
                </span>
                <span className="text-[8px] text-gray-400 shrink-0">{f.type}</span>
                <Pencil size={9} className="text-gray-400 opacity-0 group-hover:opacity-100 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Table area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
          <div className="flex-1 overflow-auto">
            <table className="w-full text-[10px] border-separate border-spacing-0">
              <thead className="sticky top-0 z-10">
                <tr>
                  {tableColumns.map((col) => (
                    <th key={col} className="text-left px-3 py-2 font-medium text-[9px] uppercase tracking-wider text-gray-500 bg-gray-50 border-b border-gray-200 whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-3 py-1.5 text-gray-700 whitespace-nowrap border-b border-gray-100 font-mono">
                        {ci === 3 ? (
                          <span className={cn('text-[8px] font-sans font-medium px-1.5 py-0.5 rounded-md', cell === 'active' ? 'bg-green-50 text-green-600' : cell === 'trial' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-400')}>
                            {cell}
                          </span>
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-3 py-1.5 bg-white border-t border-gray-200 flex items-center justify-between shrink-0">
            <span className="text-[9px] text-gray-500">6 of 1,248 rows</span>
            <div className="flex items-center gap-0.5">
              <ChevronsLeft size={12} className="text-gray-300" />
              <ChevronLeft size={12} className="text-gray-300" />
              <span className="text-[9px] text-gray-500 mx-1">1 / 25</span>
              <ChevronRight size={12} className="text-gray-400" />
              <ChevronsRight size={12} className="text-gray-400" />
            </div>
            <div className="text-[9px] text-gray-400 border border-gray-200 rounded-md px-1.5 py-0.5">50 rows</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   Slide 2: SQL Workbench (exact replica)
   ────────────────────────────────────────────────────────── */

function SQLWorkbenchSlide() {
  return (
    <div className="flex flex-col h-full">
      <AppHeader breadcrumbs={['SQL Workbench']} />

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar: tables + schema */}
        <div className="hidden md:flex flex-col w-48 border-r border-gray-200 bg-white shrink-0">
          <div className="px-3 py-2.5 border-b border-gray-100">
            <span className="text-[10px] font-semibold text-gray-900 uppercase tracking-wider">Saved Tables</span>
          </div>
          <div className="px-2 py-1.5">
            {[
              { name: 'users', rows: '1,248', active: true },
              { name: 'orders', rows: '5,621', active: false },
              { name: 'products', rows: '342', active: false },
            ].map((t) => (
              <div
                key={t.name}
                className={cn(
                  'flex items-center justify-between px-2 py-1.5 rounded-md text-[10px] font-mono',
                  t.active ? 'bg-gray-50 text-gray-800 font-medium' : 'text-gray-500'
                )}
              >
                <span>{t.name}</span>
                <span className="text-[8px] text-gray-300">{t.rows}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 px-3 py-2">
            <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">users — Schema</span>
          </div>
          <div className="px-2 flex-1 overflow-y-auto">
            {[
              { field: 'email', type: 'string' },
              { field: 'displayName', type: 'string' },
              { field: 'plan', type: 'string' },
              { field: 'status', type: 'string' },
              { field: 'createdAt', type: 'timestamp' },
            ].map((s) => (
              <div key={s.field} className="flex items-center justify-between px-2 py-1 text-[9px]">
                <span className="text-gray-600 font-mono">{s.field}</span>
                <span className="text-gray-300">{s.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Editor + Results */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* SQL Editor */}
          <div className="bg-white border-b border-gray-200 p-3 shrink-0">
            <div className="font-mono text-[11px] leading-[1.7] text-gray-700">
              <span className="text-purple-600 font-medium">SELECT</span>{' '}u.email, u.plan,<br />
              {'  '}<span className="text-purple-600 font-medium">COUNT</span><span className="text-gray-400">(</span>o.id<span className="text-gray-400">)</span>{' '}<span className="text-purple-600 font-medium">AS</span>{' '}order_count<br />
              <span className="text-purple-600 font-medium">FROM</span>{' '}users u<br />
              <span className="text-purple-600 font-medium">JOIN</span>{' '}orders o{' '}<span className="text-purple-600 font-medium">ON</span>{' '}u.id = o.userId<br />
              <span className="text-purple-600 font-medium">GROUP BY</span>{' '}u.email, u.plan<br />
              <span className="text-purple-600 font-medium">ORDER BY</span>{' '}order_count{' '}<span className="text-purple-600 font-medium">DESC</span>
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <div className="bg-gray-900 text-white text-[10px] font-medium px-2.5 py-1 rounded-md cursor-pointer hover:bg-gray-800 transition-colors">
                Run Query
              </div>
              <span className="text-[9px] text-gray-300">⌘ + Enter</span>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 bg-gray-50 p-3 overflow-auto">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] text-gray-600 font-medium">4 rows</span>
              <span className="text-[10px] text-gray-300">·</span>
              <span className="text-[10px] text-gray-400">8ms</span>
              <div className="ml-auto text-[9px] text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                Save as Table
              </div>
            </div>

            <div className="rounded-md border border-gray-200 overflow-hidden bg-white">
              <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
                {['email', 'plan', 'order_count'].map((col) => (
                  <div key={col} className="px-3 py-1.5 text-[9px] font-semibold text-gray-400 uppercase tracking-wider">
                    {col}
                  </div>
                ))}
              </div>
              {[
                ['sarah@company.io', 'team', '24'],
                ['james.h@startup.co', 'pro', '18'],
                ['priya.m@dev.app', 'team', '15'],
                ['alex@agency.com', 'free', '7'],
              ].map((row, i) => (
                <div key={i} className={cn('grid grid-cols-3 border-b border-gray-100 last:border-0', i % 2 === 1 ? 'bg-gray-50/50' : '')}>
                  {row.map((cell, j) => (
                    <div key={j} className={cn('px-3 py-1.5 text-[10px] font-mono', j === 2 ? 'text-gray-900 font-semibold' : 'text-gray-600')}>
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   Slide 3: Dashboard Creator (exact replica)
   ────────────────────────────────────────────────────────── */

const bars = [38, 52, 45, 68, 72, 58, 84]
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const maxBar = Math.max(...bars)

function DashboardSlide() {
  return (
    <div className="flex flex-col h-full">
      <AppHeader breadcrumbs={['Dashboard Builder']} />

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-3 h-9 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-semibold text-gray-800">Weekly Overview</span>
          <span className="text-[9px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md">6 widgets</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 p-0.5 rounded-md">
            <div className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-gray-400">
              <Lock size={10} />
              View
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-gray-800 bg-white rounded shadow-sm">
              <Pencil size={10} />
              Edit
            </div>
          </div>
          <div className="flex items-center gap-1 bg-gray-900 text-white text-[10px] font-medium rounded-md px-2 py-1 cursor-pointer hover:bg-gray-800 transition-colors">
            <Plus size={10} />
            Add
          </div>
        </div>
      </div>

      {/* Dashboard canvas */}
      <div className="flex-1 bg-gray-50 p-3 overflow-auto">
        {/* Metric cards */}
        <div className="grid grid-cols-3 gap-2.5 mb-2.5">
          {[
            { label: 'Active Users', value: '1,248', change: '+12%' },
            { label: 'Revenue', value: '$18.2k', change: '+8%' },
            { label: 'Churn Rate', value: '2.1%', change: '-0.3%' },
          ].map((m) => (
            <div key={m.label} className="bg-white border border-gray-200 rounded-md p-2.5 hover:border-gray-300 transition-colors">
              <div className="text-[8px] text-gray-400 font-medium uppercase tracking-wider">{m.label}</div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-base font-bold text-gray-900">{m.value}</span>
                <span className="text-[9px] font-medium text-green-500">{m.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart + Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {/* Bar chart widget */}
          <div className="bg-white border border-gray-200 rounded-md p-2.5 hover:border-gray-300 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-gray-600">Signups This Week</span>
              <GripVertical size={10} className="text-gray-300" />
            </div>
            <div className="flex items-end gap-1.5 h-20">
              {bars.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-full bg-fire-500/80 rounded-sm" style={{ height: `${(val / maxBar) * 100}%` }} />
                  <span className="text-[7px] text-gray-300">{days[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Embedded table widget */}
          <div className="bg-white border border-gray-200 rounded-md overflow-hidden hover:border-gray-300 transition-colors">
            <div className="px-2.5 py-1.5 border-b border-gray-100 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-gray-600">Recent Signups</span>
              <GripVertical size={10} className="text-gray-300" />
            </div>
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">
              {['email', 'plan', 'joined'].map((h) => (
                <div key={h} className="px-2.5 py-1 text-[8px] font-semibold text-gray-400 uppercase tracking-wider">{h}</div>
              ))}
            </div>
            {[
              ['sarah@company.io', 'team', 'Jan 15'],
              ['james.h@startup.co', 'pro', 'Feb 03'],
              ['priya.m@dev.app', 'pro', 'Feb 18'],
              ['alex@agency.com', 'free', 'Mar 01'],
            ].map((r, i) => (
              <div key={i} className={cn('grid grid-cols-3 border-b border-gray-50 last:border-0', i % 2 === 1 ? 'bg-gray-50/40' : '')}>
                {r.map((c, j) => (
                  <div key={j} className="px-2.5 py-1 text-[9px] font-mono text-gray-600">{c}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Second row of widgets */}
        <div className="grid grid-cols-2 gap-2.5 mt-2.5">
          {/* Heading widget */}
          <div className="bg-white border border-gray-200 rounded-md p-2.5 hover:border-gray-300 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold text-gray-800">Top Plans</div>
                <div className="text-[9px] text-gray-400 mt-0.5">Distribution by plan type</div>
              </div>
              <GripVertical size={10} className="text-gray-300" />
            </div>
            <div className="mt-2 space-y-1.5">
              {[
                { plan: 'Team', pct: 42 },
                { plan: 'Pro', pct: 35 },
                { plan: 'Free', pct: 23 },
              ].map((p) => (
                <div key={p.plan} className="flex items-center gap-2">
                  <span className="text-[9px] text-gray-500 w-8">{p.plan}</span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-fire-500/70 rounded-full" style={{ width: `${p.pct}%` }} />
                  </div>
                  <span className="text-[9px] text-gray-400 w-6 text-right">{p.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metric widget */}
          <div className="bg-white border border-gray-200 rounded-md p-2.5 hover:border-gray-300 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-gray-600">Avg. Session Duration</span>
              <GripVertical size={10} className="text-gray-300" />
            </div>
            <div className="text-2xl font-bold text-gray-900">8m 34s</div>
            <div className="text-[9px] text-green-500 font-medium mt-0.5">+1m 12s vs last week</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   Main Showcase Component
   ────────────────────────────────────────────────────────── */

const slides: Slide[] = ['collections', 'table', 'sql', 'dashboard']

export default function ProductShowcase() {
  const [active, setActive] = useState<Slide>('collections')

  return (
    <section className="pt-0 pb-20 md:pb-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Tabs + caption */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center bg-gray-100 p-0.5 rounded-md">
            {slides.map((slide) => {
              const Icon = slideIcons[slide]
              const isActive = active === slide
              return (
                <button
                  key={slide}
                  onClick={() => setActive(slide)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'text-gray-800 bg-white shadow-sm'
                      : 'text-gray-500 hover:bg-gray-200/70'
                  )}
                >
                  <Icon size={15} />
                  {slideLabels[slide]}
                </button>
              )
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={active + '-caption'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-[13px] text-gray-400 mt-2.5"
            >
              {slideCaptions[active]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Browser frame */}
        <div className="rounded-md border border-gray-200 overflow-hidden shadow-xl shadow-gray-200/60">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            </div>
            <div className="flex-1 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active + '-url'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="bg-white rounded-md px-4 py-1 text-[11px] text-gray-400 font-mono border border-gray-200"
                >
                  {active === 'collections' && 'firegrid.app/project/tap-loyalty-fb6d0/explore/customers'}
                  {active === 'table' && 'firegrid.app/project/my-saas-app/collection/users'}
                  {active === 'sql' && 'firegrid.app/query'}
                  {active === 'dashboard' && 'firegrid.app/dashboard-builder/weekly-overview'}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Slide content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-[400px] md:h-[460px] overflow-hidden"
            >
              {active === 'collections' && <CollectionsSlide />}
              {active === 'table' && <TableBuilderSlide />}
              {active === 'sql' && <SQLWorkbenchSlide />}
              {active === 'dashboard' && <DashboardSlide />}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
