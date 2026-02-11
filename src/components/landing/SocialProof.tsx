import { motion, type Variants } from 'framer-motion'
import { Shield, Zap, DollarSign } from 'lucide-react'

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const stats = [
  {
    icon: Shield,
    value: '100% client-side',
    description: 'Your data never touches our servers. Everything runs in your browser.',
  },
  {
    icon: Zap,
    value: 'Zero config',
    description: 'Sign in with Google OAuth and start exploring in seconds.',
  },
  {
    icon: DollarSign,
    value: 'Free to use',
    description: 'No credit card, no trial period. Start building tables today.',
  },
]

export default function SocialProof() {
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
            Built for Firebase developers
          </h2>
          <p className="text-sm text-white/30 mt-3 max-w-md mx-auto">
            Designed to fit seamlessly into your existing workflow.
          </p>
        </motion.div>

        {/* Compatibility badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-8 mb-16"
        >
          {/* Firebase */}
          <div className="flex items-center gap-2 text-white/25">
            <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
              <path
                d="M7.562 27.242L5.24 4.32a.5.5 0 01.888-.37l2.428 2.57 1.668-3.16a.5.5 0 01.902.02L7.562 27.242z"
                fill="#FFA000"
              />
              <path
                d="M16.037 20.247L12.562 16.7l-5 10.542 8.475-6.995z"
                fill="#F57C00"
              />
              <path
                d="M22.36 10.948a.5.5 0 00-.848-.124l-5.475 5.775L7.562 27.242l8.688 4.512a1.5 1.5 0 001.396 0l9.114-4.512-4.4-16.294z"
                fill="#FFCA28"
              />
              <path
                d="M7.562 27.242l5-10.543-1.434-2.76L7.562 27.242z"
                fill="#FFA000"
              />
            </svg>
            <span className="text-sm font-medium">Firebase</span>
          </div>
          <div className="w-px h-5 bg-white/[0.08]" />
          {/* Google Cloud */}
          <div className="flex items-center gap-2 text-white/25">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path
                d="M12.65 4.26l4.44 2.56.01 5.13-4.45 2.57-4.44-2.57V6.82l4.44-2.56z"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M12.65 4.26v5.13l4.44 2.56"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M12.65 9.39l-4.44 2.56"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
            <span className="text-sm font-medium">Google Cloud</span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {stats.map((s) => (
            <motion.div
              key={s.value}
              variants={item}
              className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 text-center hover:border-white/[0.1] transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-fire-500/10 flex items-center justify-center mx-auto mb-4">
                <s.icon size={18} className="text-fire-400" />
              </div>
              <div className="text-lg font-bold text-white">{s.value}</div>
              <p className="text-xs text-white/35 mt-2 leading-relaxed">
                {s.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
