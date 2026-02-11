import { Flame } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/60 py-6 px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-fire-500 rounded flex items-center justify-center">
            <Flame size={10} className="text-white" />
          </div>
          <span className="text-xs text-gray-300">
            Firegrid &copy; {new Date().getFullYear()}
          </span>
        </div>
        <a
          href="#"
          className="text-xs text-gray-300 hover:text-gray-500 transition-colors"
        >
          Privacy
        </a>
      </div>
    </footer>
  )
}
