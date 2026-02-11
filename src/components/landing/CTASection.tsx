import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center max-w-sm mx-auto"
      >
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Ready to explore your data?
        </h2>
        <Link
          to="/login"
          className="inline-block mt-6 bg-gray-900 hover:bg-gray-800 text-white rounded-md px-6 py-2.5 text-sm font-medium transition-colors"
        >
          Get Started Free
        </Link>
        <p className="text-[11px] text-gray-300 mt-3">
          Free to use · No credit card required
        </p>
      </motion.div>
    </section>
  )
}
