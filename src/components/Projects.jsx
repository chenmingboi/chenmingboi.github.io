import { motion, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import GlassPanel from './GlassPanel.jsx'

function Projects({ items }) {
  const reduceMotion = useReducedMotion()

  return (
    <section id="projects" className="scroll-mt-28 space-y-6">
      <Reveal>
        <p className="eyebrow">Projects</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="section-title">Selected work with engineering intent.</h2>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2">
        {items.map((project, index) => (
          <Reveal key={project.name} delay={0.08 + index * 0.05}>
            <motion.div whileHover={reduceMotion ? undefined : { y: -4 }}>
              <GlassPanel className="project-card rounded-2xl p-5 sm:p-6">
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-semibold text-ink-50">{project.name}</h3>
                  <p className="text-sm leading-7 text-ink-300">{project.summary}</p>
                  <ul className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <a href={project.href} className="inline-flex text-sm text-accent-700 transition hover:text-accent-400">
                    Explore Project
                  </a>
                </div>
              </GlassPanel>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Projects
