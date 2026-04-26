import { motion, useReducedMotion } from 'framer-motion'
import GlassPanel from './GlassPanel.jsx'

function Hero({ identity, links }) {
  const reduceMotion = useReducedMotion()

  const headingInitial = reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
  const headingAnimate = reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }

  return (
    <section id="home" className="scroll-mt-28">
      <div className="grid items-stretch gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <motion.div
          initial={headingInitial}
          animate={headingAnimate}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 pt-4 sm:pt-6"
        >
          <p className="eyebrow">Personal Landing</p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-ink-50 sm:text-5xl lg:text-6xl">
            {identity.name}
          </h1>
          <div className="space-y-2">
            <p className="text-lg text-ink-300 sm:text-xl">{identity.role}</p>
            <p className="text-sm text-ink-400">{identity.subtitle}</p>
          </div>
          <p className="max-w-2xl text-base leading-7 text-ink-300 sm:text-lg">{identity.tagline}</p>
          <p className="max-w-2xl text-sm leading-7 text-ink-400 sm:text-base">{identity.intro}</p>

          <div className="flex flex-wrap gap-3 pt-1">
            <a href={links.blog} className="btn btn-primary">
              View Blog
            </a>
            <a href={links.github} className="btn btn-ghost" target="_blank" rel="noreferrer">
              View GitHub
            </a>
          </div>
        </motion.div>

        <GlassPanel className="relative overflow-hidden rounded-2xl p-6 sm:p-7">
          <div className="space-y-5">
            <p className="eyebrow">Profile Card</p>
            <h2 className="font-display text-2xl font-semibold text-ink-50 sm:text-3xl">
              Interface-first Engineer
            </h2>
            <p className="text-sm leading-7 text-ink-300 sm:text-base">
              Focused on building maintainable frontend systems with thoughtful motion, clear hierarchy, and durable
              interaction details.
            </p>
            <ul className="space-y-3 text-sm text-ink-300">
              <li className="profile-item">Primary Track: Frontend Engineering</li>
              <li className="profile-item">Current Goal: Product-grade Portfolio & Blog</li>
              <li className="profile-item">Working Style: Minimal, Reliable, Iterative</li>
            </ul>
          </div>
        </GlassPanel>
      </div>
    </section>
  )
}

export default Hero
