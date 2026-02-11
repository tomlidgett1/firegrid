import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CollectionData {
  columns: string[]
  rows: string[][]
  count: string
}

const collectionsData: Record<string, CollectionData> = {
  users: {
    columns: ['email', 'displayName', 'plan', 'status', 'createdAt'],
    rows: [
      ['sarah@company.io', 'Sarah Chen', 'team', 'active', '2025-01-15'],
      ['james.h@startup.co', 'James Howard', 'pro', 'active', '2025-02-03'],
      ['priya.m@dev.app', 'Priya Mehta', 'pro', 'trial', '2025-02-18'],
      ['alex@agency.com', 'Alex Rivera', 'free', 'active', '2025-03-01'],
      ['nina.k@corp.dev', 'Nina Kowalski', 'team', 'churned', '2025-03-12'],
    ],
    count: '1,248',
  },
  orders: {
    columns: ['orderId', 'customer', 'total', 'items', 'date'],
    rows: [
      ['ORD-4821', 'Sarah Chen', '$149.00', '3', '2025-03-10'],
      ['ORD-4820', 'James Howard', '$89.50', '1', '2025-03-10'],
      ['ORD-4819', 'Alex Rivera', '$234.00', '5', '2025-03-09'],
      ['ORD-4818', 'Nina Kowalski', '$67.25', '2', '2025-03-09'],
      ['ORD-4817', 'Priya Mehta', '$312.00', '4', '2025-03-08'],
    ],
    count: '5,621',
  },
  products: {
    columns: ['name', 'category', 'price', 'stock', 'rating'],
    rows: [
      ['Pro Plan', 'Subscription', '$29/mo', '∞', '4.8'],
      ['Team Plan', 'Subscription', '$49/mo', '∞', '4.9'],
      ['API Access', 'Add-on', '$19/mo', '∞', '4.6'],
      ['Priority Support', 'Add-on', '$39/mo', '∞', '4.7'],
      ['Enterprise', 'Custom', 'Contact', '∞', '5.0'],
    ],
    count: '342',
  },
  sessions: {
    columns: ['sessionId', 'userId', 'duration', 'pages', 'device'],
    rows: [
      ['ses_a9f2', 'sarah@company.io', '12m 34s', '8', 'Desktop'],
      ['ses_b7e1', 'james.h@startup.co', '5m 12s', '3', 'Mobile'],
      ['ses_c4d8', 'priya.m@dev.app', '22m 05s', '14', 'Desktop'],
      ['ses_d1a3', 'alex@agency.com', '1m 47s', '2', 'Tablet'],
      ['ses_e6f9', 'nina.k@corp.dev', '8m 22s', '6', 'Desktop'],
    ],
    count: '89.2k',
  },
  analytics: {
    columns: ['event', 'count', 'avgDuration', 'source', 'lastSeen'],
    rows: [
      ['page_view', '24,891', '2.3s', 'direct', '2025-03-12'],
      ['sign_up', '482', '45.2s', 'google', '2025-03-12'],
      ['purchase', '156', '3m 12s', 'referral', '2025-03-11'],
      ['export', '89', '1.8s', 'direct', '2025-03-11'],
      ['query_run', '1,247', '0.4s', 'direct', '2025-03-12'],
    ],
    count: '12.4k',
  },
}

const collectionNames = Object.keys(collectionsData)

const statusStyle = (cell: string) => {
  if (cell === 'active') return 'bg-green-50 text-green-600'
  if (cell === 'trial') return 'bg-amber-50 text-amber-600'
  if (cell === 'churned') return 'bg-gray-100 text-gray-400'
  return ''
}

export default function AppPreview() {
  const [active, setActive] = useState('users')
  const data = collectionsData[active]

  return (
    <div className="relative mt-14 md:mt-16 max-w-5xl mx-auto w-full px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      >
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
              <div className="bg-white rounded-md px-4 py-1 text-[11px] text-gray-400 font-mono border border-gray-200">
                firegrid.app/project/my-saas-app/collection/{active}
              </div>
            </div>
          </div>

          {/* App UI — light mode */}
          <div className="bg-gray-50 flex">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col w-52 bg-white border-r border-gray-200 py-3">
              {/* Project name */}
              <div className="px-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-fire-500 rounded flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-semibold text-gray-700 truncate">my-saas-app</span>
                </div>
              </div>

              {/* Collections */}
              <div className="px-3 pt-3">
                <div className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
                  Collections
                </div>
                {collectionNames.map((name) => (
                  <button
                    key={name}
                    onClick={() => setActive(name)}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[11px] transition-colors cursor-pointer ${
                      active === name
                        ? 'bg-fire-50 text-fire-600 font-medium'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          active === name ? 'bg-fire-500' : 'bg-gray-300'
                        }`}
                      />
                      <span className="font-mono">{name}</span>
                    </div>
                    <span className={`text-[9px] ${active === name ? 'text-fire-400' : 'text-gray-300'}`}>
                      {collectionsData[name].count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 min-h-[300px] md:min-h-[360px]">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-200">
                <div className="flex items-center gap-2.5">
                  <span className="text-[12px] font-semibold text-gray-800">{active}</span>
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md font-mono">
                    {data.count} docs
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {/* View/Edit toggle */}
                  <div className="flex items-center bg-gray-100 p-0.5 rounded-md mr-2">
                    <div className="px-2 py-1 text-[10px] font-medium text-gray-800 bg-white rounded shadow-sm">
                      View
                    </div>
                    <div className="px-2 py-1 text-[10px] font-medium text-gray-400">
                      Edit
                    </div>
                  </div>
                  {['Filter', 'Sort', 'Export'].map((a) => (
                    <span
                      key={a}
                      className="text-[10px] text-gray-500 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="p-3">
                <div className="rounded-md border border-gray-200 overflow-hidden bg-white">
                  {/* Header */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active + '-header'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="grid grid-cols-5 bg-gray-50 border-b border-gray-200"
                    >
                      {data.columns.map((col) => (
                        <div
                          key={col}
                          className="px-3 py-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider truncate"
                        >
                          {col}
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  {/* Rows */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active + '-rows'}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.04 },
                        },
                      }}
                    >
                      {data.rows.map((row, i) => (
                        <motion.div
                          key={i}
                          variants={{
                            hidden: { opacity: 0, y: 6 },
                            visible: { opacity: 1, y: 0 },
                          }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className={`grid grid-cols-5 border-b border-gray-100 last:border-0 transition-colors hover:bg-fire-50/40 cursor-default ${
                            i % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'
                          }`}
                        >
                          {row.map((cell, j) => (
                            <div
                              key={j}
                              className="px-3 py-2 text-[11px] font-mono truncate"
                            >
                              {active === 'users' && j === 3 ? (
                                <span
                                  className={`inline-block text-[9px] font-sans font-medium px-1.5 py-0.5 rounded-md ${statusStyle(cell)}`}
                                >
                                  {cell}
                                </span>
                              ) : (
                                <span className={j === 0 ? 'text-gray-700' : 'text-gray-500'}>
                                  {cell}
                                </span>
                              )}
                            </div>
                          ))}
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-2.5 px-1">
                  <span className="text-[10px] text-gray-400">
                    Showing 1–25 of {data.count}
                  </span>
                  <div className="flex gap-1">
                    {['←', '1', '2', '3', '...', '→'].map((p, i) => (
                      <div
                        key={i}
                        className={`min-w-[24px] h-6 rounded-md flex items-center justify-center text-[10px] px-1 transition-colors cursor-pointer ${
                          p === '1'
                            ? 'bg-gray-900 text-white font-medium'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
