import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center max-w-md mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Ready to explore your data?
        </h2>
        <p className="text-sm text-gray-400 mt-3">
          Free to use. No credit card required.
        </p>
        <Link
          to="/login"
          className="inline-block mt-6 bg-gray-900 hover:bg-gray-800 text-white rounded-md px-7 py-3 text-sm font-medium transition-colors shadow-sm"
        >
          Get Started Free
        </Link>
      </motion.div>
    </section>
  )
}
