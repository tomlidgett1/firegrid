import { motion, useInView, type Variants } from 'framer-motion'
import { useRef } from 'react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

const rowStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const rowItem: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

/* ── Browser Chrome (shared) ──────────────────────────────── */

function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
      </div>
      <div className="flex-1 flex justify-center">
        <div className="bg-white rounded-md px-4 py-1 text-[11px] text-gray-400 font-mono border border-gray-200">
          {url}
        </div>
      </div>
    </div>
  )
}

/* ── SQL Workbench Mock ─────────────────────────────────── */

function SQLMock() {
  return (
    <div className="rounded-md border border-gray-200 overflow-hidden shadow-xl shadow-gray-200/60">
      <BrowserChrome url="firegrid.app/query" />

      <div className="bg-gray-50 flex">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-48 bg-white border-r border-gray-200 py-3">
          <div className="px-4 pb-2.5 border-b border-gray-100">
            <span className="text-[11px] font-semibold text-gray-700">SQL Workbench</span>
          </div>
          <div className="px-3 pt-3">
            <div className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
              Saved Tables
            </div>
            {[
              { name: 'users', rows: '1,248' },
              { name: 'orders', rows: '5,621' },
              { name: 'products', rows: '342' },
            ].map((t, i) => (
              <div
                key={t.name}
                className={`flex items-center justify-between px-2 py-1.5 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                  i === 0
                    ? 'bg-gray-50 text-gray-700 font-medium'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span>{t.name}</span>
                <span className="text-[9px] text-gray-300">{t.rows}</span>
              </div>
            ))}

            {/* Schema */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
                users — Schema
              </div>
              {[
                { field: 'email', type: 'string' },
                { field: 'plan', type: 'string' },
                { field: 'status', type: 'string' },
                { field: 'createdAt', type: 'timestamp' },
              ].map((s) => (
                <div key={s.field} className="flex items-center justify-between px-2 py-1 text-[10px]">
                  <span className="text-gray-500 font-mono">{s.field}</span>
                  <span className="text-gray-300 text-[9px]">{s.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Editor + Results */}
        <div className="flex-1 min-h-[320px] md:min-h-[360px] flex flex-col">
          {/* Editor */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="font-mono text-[12px] leading-[1.8] text-gray-700">
              <span className="text-purple-600 font-medium">SELECT</span>{' '}
              u.email, u.plan,
              <br />
              {'  '}
              <span className="text-purple-600 font-medium">COUNT</span>
              <span className="text-gray-400">(</span>o.id
              <span className="text-gray-400">)</span>{' '}
              <span className="text-purple-600 font-medium">AS</span>{' '}
              order_count
              <br />
              <span className="text-purple-600 font-medium">FROM</span>{' '}
              users u
              <br />
              <span className="text-purple-600 font-medium">JOIN</span>{' '}
              orders o{' '}
              <span className="text-purple-600 font-medium">ON</span>{' '}
              u.id = o.userId
              <br />
              <span className="text-purple-600 font-medium">GROUP BY</span>{' '}
              u.email, u.plan
              <br />
              <span className="text-purple-600 font-medium">ORDER BY</span>{' '}
              order_count{' '}
              <span className="text-purple-600 font-medium">DESC</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="bg-gray-900 text-white text-[10px] font-medium px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors cursor-pointer">
                Run Query
              </div>
              <span className="text-[10px] text-gray-300">⌘ + Enter</span>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 p-3">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] text-gray-500 font-medium">4 rows</span>
              <span className="text-[10px] text-gray-300">·</span>
              <span className="text-[10px] text-gray-400">8ms</span>
            </div>

            <div className="rounded-md border border-gray-200 overflow-hidden bg-white">
              <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
                {['email', 'plan', 'order_count'].map((col) => (
                  <div
                    key={col}
                    className="px-3 py-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider"
                  >
                    {col}
                  </div>
                ))}
              </div>
              <motion.div
                variants={rowStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                {[
                  ['sarah@company.io', 'team', '24'],
                  ['james.h@startup.co', 'pro', '18'],
                  ['priya.m@dev.app', 'team', '15'],
                  ['alex@agency.com', 'free', '7'],
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    variants={rowItem}
                    className={`grid grid-cols-3 border-b border-gray-100 last:border-0 transition-colors hover:bg-fire-50/40 cursor-default ${
                      i % 2 === 1 ? 'bg-gray-50/50' : ''
                    }`}
                  >
                    {row.map((cell, j) => (
                      <div
                        key={j}
                        className={`px-3 py-2 text-[11px] font-mono ${
                          j === 2 ? 'text-gray-900 font-semibold' : 'text-gray-600'
                        }`}
                      >
                        {cell}
                      </div>
                    ))}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Dashboard Mock ──────────────────────────────────────── */

function AnimatedBar({ value, max, label, delay }: { value: number; max: number; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="flex-1 flex flex-col items-center gap-1">
      <div className="w-full h-20 flex items-end">
        <motion.div
          className="w-full bg-fire-500/80 rounded-sm"
          initial={{ height: 0 }}
          animate={inView ? { height: `${(value / max) * 100}%` } : { height: 0 }}
          transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        />
      </div>
      <span className="text-[8px] text-gray-300">{label}</span>
    </div>
  )
}

function DashboardMock() {
  const bars = [38, 52, 45, 68, 72, 58, 84]
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const maxBar = Math.max(...bars)

  return (
    <div className="rounded-md border border-gray-200 overflow-hidden shadow-xl shadow-gray-200/60">
      <BrowserChrome url="firegrid.app/dashboard-builder/weekly-overview" />

      <div className="bg-gray-50 p-4 min-h-[340px] md:min-h-[380px]">
        {/* Dashboard header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-[13px] font-semibold text-gray-800">Weekly Overview</h3>
            <span className="text-[9px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md">
              6 widgets
            </span>
          </div>
          <div className="flex items-center bg-gray-100 p-0.5 rounded-md">
            <div className="px-2 py-1 text-[10px] font-medium text-gray-400">
              View
            </div>
            <div className="px-2 py-1 text-[10px] font-medium text-gray-800 bg-white rounded shadow-sm">
              Edit
            </div>
          </div>
        </div>

        {/* Metric cards */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-3 gap-3 mb-3"
        >
          {[
            { label: 'Active Users', value: '1,248', change: '+12%' },
            { label: 'Revenue', value: '$18.2k', change: '+8%' },
            { label: 'Churn Rate', value: '2.1%', change: '-0.3%' },
          ].map((m) => (
            <motion.div
              key={m.label}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
              }}
              className="bg-white border border-gray-200 rounded-md p-3 hover:border-gray-300 transition-colors cursor-default"
            >
              <div className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">
                {m.label}
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-lg font-bold text-gray-900">{m.value}</span>
                <span className={`text-[10px] font-medium ${
                  m.change.startsWith('-') ? 'text-green-500' : 'text-green-500'
                }`}>
                  {m.change}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Chart + Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Bar chart */}
          <div className="bg-white border border-gray-200 rounded-md p-3 hover:border-gray-300 transition-colors">
            <div className="text-[10px] font-semibold text-gray-600 mb-3">
              Signups This Week
            </div>
            <div className="flex items-end gap-2">
              {bars.map((val, i) => (
                <AnimatedBar
                  key={i}
                  value={val}
                  max={maxBar}
                  label={days[i]}
                  delay={i * 0.06}
                />
              ))}
            </div>
          </div>

          {/* Embedded table */}
          <div className="bg-white border border-gray-200 rounded-md overflow-hidden hover:border-gray-300 transition-colors">
            <div className="px-3 py-2 border-b border-gray-100">
              <span className="text-[10px] font-semibold text-gray-600">
                Recent Signups
              </span>
            </div>
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">
              {['email', 'plan', 'joined'].map((h) => (
                <div
                  key={h}
                  className="px-3 py-1.5 text-[9px] font-semibold text-gray-400 uppercase tracking-wider"
                >
                  {h}
                </div>
              ))}
            </div>
            <motion.div
              variants={rowStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              {[
                ['sarah@company.io', 'team', 'Jan 15'],
                ['james.h@startup.co', 'pro', 'Feb 03'],
                ['priya.m@dev.app', 'pro', 'Feb 18'],
                ['alex@agency.com', 'free', 'Mar 01'],
              ].map((r, i) => (
                <motion.div
                  key={i}
                  variants={rowItem}
                  className={`grid grid-cols-3 border-b border-gray-50 last:border-0 transition-colors hover:bg-fire-50/40 cursor-default ${
                    i % 2 === 1 ? 'bg-gray-50/40' : ''
                  }`}
                >
                  {r.map((c, j) => (
                    <div key={j} className="px-3 py-1.5 text-[10px] font-mono text-gray-600">
                      {c}
                    </div>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Features Section ────────────────────────────────────── */

const features = [
  {
    tag: 'SQL Queries',
    title: 'Query across collections with SQL',
    description:
      'Write familiar SQL to join, filter, and aggregate data across multiple Firestore collections. Runs entirely client-side with AlaSQL.',
    mock: <SQLMock />,
  },
  {
    tag: 'Dashboards',
    title: 'Build dashboards from your data',
    description:
      'Combine tables, metrics, and charts into drag-and-drop dashboards. Save and share views with your team.',
    mock: <DashboardMock />,
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-5xl mx-auto space-y-24">
        {features.map((f) => (
          <motion.div
            key={f.tag}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="text-center max-w-lg mx-auto mb-8">
              <span className="text-[11px] font-semibold text-fire-500 uppercase tracking-wider">
                {f.tag}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                {f.description}
              </p>
            </div>
            {f.mock}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
