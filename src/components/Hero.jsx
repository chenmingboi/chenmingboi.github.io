import { motion, useReducedMotion } from 'framer-motion'

function Hero({ identity, links }) {
  const reduceMotion = useReducedMotion()

  const headingInitial = reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
  const headingAnimate = reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }

  return (
    <motion.section
      id="home"
      className="profile-summary"
      initial={headingInitial}
      animate={headingAnimate}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="profile-avatar" aria-hidden="true">
        <span>{identity.initials}</span>
      </div>

      <div className="profile-copy">
        <h1>{identity.name}</h1>
        <p className="profile-subtitle">{identity.subtitle}</p>

        <nav className="profile-links" aria-label="Contact links">
          <a href={links.email}>Email</a>
        </nav>
      </div>
    </motion.section>
  )
}

export default Hero
