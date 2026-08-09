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
        <p className="profile-role">{identity.role}</p>
        <p className="profile-subtitle">{identity.subtitle}</p>
        <p className="profile-tagline">{identity.tagline}</p>
        <p className="profile-location">{identity.location}</p>

        <nav className="profile-links" aria-label="Profile links">
          <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={links.email}>Email</a>
          <a href={links.blog}>Blog</a>
        </nav>
      </div>
    </motion.section>
  )
}

export default Hero
