import { motion } from 'framer-motion'
import { FolderOpen, Table, Terminal, LayoutGrid } from 'lucide-react'
import type { ReactNode } from 'react'

interface Feature {
  icon: typeof FolderOpen
  title: string
  description: string
  visual: ReactNode
}

/* ── Visual Mocks ─────────────────────────────────────────── */

function CollectionTreeMock() {
  const items = [
    { name: 'users', depth: 0, active: true, children: 1248 },
    { name: 'profiles', depth: 1, active: false, children: 1248 },
    { name: 'preferences', depth: 2, active: false, children: 890 },
    { name: 'orders', depth: 0, active: false, children: 5621 },
    { name: 'items', depth: 1, active: false, children: 14300 },
    { name: 'products', depth: 0, active: false, children: 342 },
    { name: 'analytics', depth: 0, active: false, children: 89200 },
  ]
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 font-mono text-[11px]">
      <div className="text-[9px] text-white/20 uppercase tracking-wider mb-3 font-sans font-medium">
        my-saas-app
      </div>
      {items.map((it, i) => (
        <div
          key={i}
          className={`flex items-center gap-2 py-1.5 px-2 rounded ${
            it.active ? 'bg-fire-500/10 text-fire-400' : 'text-white/30'
          }`}
          style={{ paddingLeft: `${it.depth * 16 + 8}px` }}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              it.active ? 'bg-fire-400' : 'bg-white/15'
            }`}
          />
          <span className="flex-1">{it.name}</span>
          <span className="text-[9px] text-white/15">
            {it.children.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}

function TableMock() {
  const cols = ['email', 'plan', 'mrr', 'status']
  const rows = [
    ['sarah@co.io', 'team', '$49', 'active'],
    ['james@dev.co', 'pro', '$29', 'active'],
    ['alex@startup.io', 'free', '$0', 'trial'],
    ['priya@corp.dev', 'team', '$49', 'active'],
  ]
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <span className="text-[10px] font-semibold text-white/50">users</span>
        <div className="flex gap-1">
          {['Sort', 'Filter', 'Columns'].map((a) => (
            <span
              key={a}
              className="text-[9px] text-white/20 bg-white/[0.04] px-2 py-0.5 rounded"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 border-b border-white/[0.06] bg-white/[0.02]">
        {cols.map((c) => (
          <div
            key={c}
            className="px-4 py-2 text-[9px] font-semibold text-white/25 uppercase tracking-wider"
          >
            {c}
          </div>
        ))}
      </div>
      {rows.map((row, i) => (
        <div
          key={i}
          className="grid grid-cols-4 border-b border-white/[0.03] last:border-0"
        >
          {row.map((cell, j) => (
            <div
              key={j}
              className={`px-4 py-2 text-[11px] font-mono ${
                j === 2
                  ? 'text-green-400/50'
                  : j === 3
                    ? cell === 'active'
                      ? 'text-primary-400/50'
                      : 'text-amber-400/50'
                    : 'text-white/30'
              }`}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function SQLMock() {
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]">
        <div className="w-2 h-2 rounded-full bg-green-400/40" />
        <span className="text-[10px] text-white/30">SQL Workbench</span>
      </div>
      <div className="p-4 font-mono text-[11px] leading-relaxed">
        <span className="text-primary-400/70">SELECT</span>{' '}
        <span className="text-white/40">u.email, u.plan,</span>
        <br />
        {'  '}
        <span className="text-fire-400/60">COUNT</span>
        <span className="text-white/30">(o.id)</span>{' '}
        <span className="text-primary-400/70">AS</span>{' '}
        <span className="text-white/40">order_count</span>
        <br />
        <span className="text-primary-400/70">FROM</span>{' '}
        <span className="text-white/40">users u</span>
        <br />
        <span className="text-primary-400/70">JOIN</span>{' '}
        <span className="text-white/40">orders o</span>{' '}
        <span className="text-primary-400/70">ON</span>{' '}
        <span className="text-white/40">u.id = o.userId</span>
        <br />
        <span className="text-primary-400/70">GROUP BY</span>{' '}
        <span className="text-white/40">u.email, u.plan</span>
        <br />
        <span className="text-primary-400/70">ORDER BY</span>{' '}
        <span className="text-white/40">order_count</span>{' '}
        <span className="text-primary-400/70">DESC</span>
      </div>
      <div className="border-t border-white/[0.06] px-4 py-2 flex items-center justify-between">
        <span className="text-[9px] text-green-400/50">
          3 rows in 12ms
        </span>
        <span className="text-[9px] text-white/15">AlaSQL</span>
      </div>
    </div>
  )
}

function DashboardMock() {
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-semibold text-white/50">
          Weekly Overview
        </span>
        <span className="text-[9px] text-white/15">Edit</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {/* Stat cards */}
        {[
          { label: 'Active Users', value: '1,248', color: 'text-fire-400/70' },
          { label: 'Revenue', value: '$18.2k', color: 'text-green-400/70' },
          {
            label: 'Churn Rate',
            value: '2.1%',
            color: 'text-primary-400/70',
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white/[0.03] border border-white/[0.04] rounded-lg p-3"
          >
            <div className={`text-sm font-semibold ${s.color}`}>{s.value}</div>
            <div className="text-[9px] text-white/20 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
      {/* Mini table */}
      <div className="mt-3 bg-white/[0.02] border border-white/[0.04] rounded-lg overflow-hidden">
        <div className="grid grid-cols-3 px-3 py-1.5 border-b border-white/[0.04]">
          {['user', 'plan', 'joined'].map((h) => (
            <span
              key={h}
              className="text-[8px] text-white/20 uppercase tracking-wider"
            >
              {h}
            </span>
          ))}
        </div>
        {[
          ['sarah@co.io', 'team', 'Jan 15'],
          ['james@dev.co', 'pro', 'Feb 03'],
        ].map((r, i) => (
          <div
            key={i}
            className="grid grid-cols-3 px-3 py-1.5 border-b border-white/[0.02] last:border-0"
          >
            {r.map((c, j) => (
              <span key={j} className="text-[10px] font-mono text-white/25">
                {c}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Features ─────────────────────────────────────────────── */

const features: Feature[] = [
  {
    icon: FolderOpen,
    title: 'Browse collections with auto-schema discovery',
    description:
      'Navigate your entire Firestore hierarchy — collections, sub-collections, and collection groups. Firegrid samples documents to automatically detect fields, data types, and coverage.',
    visual: <CollectionTreeMock />,
  },
  {
    icon: Table,
    title: 'Build interactive tables from any collection',
    description:
      'Turn any Firestore collection into a sortable, filterable data table. Configure columns, set aliases, toggle visibility, and export to CSV or JSON.',
    visual: <TableMock />,
  },
  {
    icon: Terminal,
    title: 'Write SQL queries across your saved tables',
    description:
      'Use familiar SQL syntax to join, filter, and aggregate data across multiple Firestore collections — all running client-side in your browser with AlaSQL.',
    visual: <SQLMock />,
  },
  {
    icon: LayoutGrid,
    title: 'Create drag-and-drop dashboards',
    description:
      'Combine tables, stats, headings, and text into custom dashboards with a responsive grid layout. Save and share views of your data.',
    visual: <DashboardMock />,
  },
]

export default function FeatureShowcase() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Everything you need to tame your Firestore
          </h2>
          <p className="text-sm text-white/30 mt-3 max-w-lg mx-auto">
            A complete toolkit for exploring, querying, and visualizing your
            Firestore data.
          </p>
        </motion.div>

        <div className="space-y-24">
          {features.map((f, i) => {
            const isEven = i % 2 === 0
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.7,
                  ease: 'easeOut',
                }}
                className={`flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-12`}
              >
                {/* Text */}
                <div className="flex-1 max-w-md">
                  <div className="w-10 h-10 rounded-lg bg-fire-500/10 flex items-center justify-center mb-4">
                    <f.icon size={18} className="text-fire-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {f.title}
                  </h3>
                  <p className="text-sm text-white/35 mt-3 leading-relaxed">
                    {f.description}
                  </p>
                </div>

                {/* Visual */}
                <div className="flex-1 w-full max-w-lg">{f.visual}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
