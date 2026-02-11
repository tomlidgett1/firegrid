import { motion, type Variants } from 'framer-motion'
import { Search, LayoutGrid, ChevronRight } from 'lucide-react'

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
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

const steps = [
  {
    number: '01',
    title: 'Connect',
    description:
      'Sign in with Google and select any of your Firebase projects.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Explore',
    description:
      'Browse collections, discover schemas, and preview your data structure.',
    icon: <Search size={24} className="text-fire-400" />,
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Create tables, run SQL queries, and assemble dashboards — all in your browser.',
    icon: <LayoutGrid size={24} className="text-fire-400" />,
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Get started in three steps
          </h2>
          <p className="text-sm text-white/30 mt-3 max-w-md mx-auto">
            No setup, no configuration, no SDK. Just sign in and go.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative flex flex-col md:flex-row items-stretch gap-4 md:gap-0"
        >
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-stretch md:flex-1">
              {/* Card */}
              <motion.div
                variants={item}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 flex-1 hover:border-white/[0.1] transition-colors"
              >
                {/* Step number */}
                <span className="text-[11px] font-mono text-fire-400/70 font-semibold">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-fire-500/10 flex items-center justify-center mt-4">
                  {step.icon}
                </div>

                {/* Text */}
                <h3 className="text-sm font-semibold text-white mt-4">
                  {step.title}
                </h3>
                <p className="text-xs text-white/35 mt-2 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>

              {/* Arrow connector (between cards, desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center w-10 shrink-0">
                  <ChevronRight
                    size={16}
                    className="text-white/[0.12]"
                  />
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
