import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import GlassPanel from './GlassPanel.jsx'

function Navbar({ brand, items }) {
  const [isOpen, setIsOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  const panelAnimation = reduceMotion
    ? { initial: { opacity: 1, height: 'auto' }, animate: { opacity: 1, height: 'auto' } }
    : { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' } }

  return (
    <header className="sticky top-4 z-50 px-5 sm:px-7 lg:px-10">
      <GlassPanel className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3">
        <a href="#home" className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink-50">
          {brand}
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-ink-50 transition hover:bg-white/10 md:hidden"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="flex flex-col gap-1.5">
            <span className="h-0.5 w-4 rounded bg-current" />
            <span className="h-0.5 w-4 rounded bg-current" />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.nav
              className="w-full overflow-hidden md:hidden"
              initial={panelAnimation.initial}
              animate={panelAnimation.animate}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <ul className="mt-2 flex flex-col gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-2">
                {items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block rounded-lg px-3 py-2 text-sm text-ink-300 transition hover:bg-white/10 hover:text-ink-50"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </GlassPanel>
    </header>
  )
}

export default Navbar
