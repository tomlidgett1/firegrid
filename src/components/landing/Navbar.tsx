import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf9]/80 backdrop-blur-md border-b border-gray-200/60">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Firegrid" className="w-7 h-7 rounded-md" />
          <span className="text-sm font-semibold text-gray-800">Firegrid</span>
        </Link>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/login"
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-md px-4 py-2 text-xs font-medium transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-400 hover:text-gray-600 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.04, 0.62, 0.23, 0.98],
            }}
            className="md:hidden overflow-hidden bg-[#fafaf9]/95 backdrop-blur-md border-b border-gray-200/60"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-gray-500"
              >
                Sign in
              </Link>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="bg-gray-900 text-white rounded-md px-4 py-2.5 text-sm font-medium text-center"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
