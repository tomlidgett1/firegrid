import { motion, type Variants } from 'framer-motion'
import { Table, DatabaseZap, LayoutDashboard } from 'lucide-react'

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const problems = [
  {
    icon: Table,
    title: 'No table views',
    description:
      'The Firebase Console shows raw JSON documents. No way to see your data in a structured, sortable table.',
  },
  {
    icon: DatabaseZap,
    title: 'No SQL queries',
    description:
      'Want to join two collections or run aggregations? Write custom code or stare at individual documents.',
  },
  {
    icon: LayoutDashboard,
    title: 'No dashboards',
    description:
      'No built-in way to visualize, combine, or share views of your Firestore data with your team.',
  },
]

export default function ProblemSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Firebase Console wasn&apos;t built for this
          </h2>
          <p className="text-sm text-white/30 mt-3 max-w-lg mx-auto">
            Working with Firestore data shouldn&apos;t mean wrestling with JSON
            trees and writing one-off scripts.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {problems.map((p) => (
            <motion.div
              key={p.title}
              variants={item}
              className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 hover:border-white/[0.1] transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <p.icon size={18} className="text-red-400/80" />
              </div>
              <h3 className="text-sm font-semibold text-white mt-4">
                {p.title}
              </h3>
              <p className="text-xs text-white/35 mt-2 leading-relaxed">
                {p.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
