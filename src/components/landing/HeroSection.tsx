import { motion, type Variants } from 'framer-motion'
import { Link } from 'react-router-dom'

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center pt-28 md:pt-36 pb-2 px-6 overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto"
      >
        {/* Headline */}
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl md:text-[56px] font-bold text-gray-900 tracking-tight leading-[1.08]"
        >
          Firestore data,{' '}
          <span className="bg-gradient-to-r from-fire-500 to-fire-600 bg-clip-text text-transparent">
            in tables.
          </span>
        </motion.h1>

        {/* One-liner */}
        <motion.p
          variants={item}
          className="text-base text-gray-400 max-w-md mx-auto mt-4"
        >
          Explore, query, and dashboard your Firestore — entirely in the browser.
        </motion.p>

        {/* CTA row */}
        <motion.div variants={item} className="mt-6 flex items-center gap-3">
          <Link
            to="/login"
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-md px-6 py-2.5 text-sm font-medium transition-colors"
          >
            Get Started Free
          </Link>
          <a
            href="https://producthunt.com/posts/firegrid"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors border border-gray-200 rounded-md px-6 py-2.5"
          >
            <svg viewBox="0 0 40 40" className="w-3.5 h-3.5 shrink-0" fill="none">
              <path
                d="M20 40C31.046 40 40 31.046 40 20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20z"
                fill="#DA552F"
              />
              <path
                d="M22.667 20H17.333v-6.667h5.334a3.333 3.333 0 010 6.667zm0-10H14v20h3.333v-6.667h5.334A6.667 6.667 0 0022.667 10z"
                fill="#fff"
              />
            </svg>
            Product Hunt
          </a>
        </motion.div>

        {/* Trust micro-text */}
        <motion.p variants={item} className="text-[11px] text-gray-300 mt-3">
          100% client-side · Your data never leaves your browser
        </motion.p>
      </motion.div>
    </section>
  )
}
