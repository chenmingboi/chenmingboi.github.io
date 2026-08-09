import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

function Navbar({ brand, items }) {
  const [isOpen, setIsOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  const panelAnimation = reduceMotion
    ? { initial: { opacity: 1, height: 'auto' }, animate: { opacity: 1, height: 'auto' } }
    : { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' } }

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a href="#home" className="brand-link">
          {brand}
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {items.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="topbar-link">
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.nav
              className="mobile-nav"
              initial={panelAnimation.initial}
              animate={panelAnimation.animate}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
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
      </div>
    </header>
  )
}

export default Navbar
