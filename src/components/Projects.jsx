import Reveal from './Reveal.jsx'

function Projects({ items }) {
  return (
    <section id="projects" className="content-section">
      <Reveal>
        <h2 className="section-heading"><span aria-hidden="true">🧩</span> Selected Projects</h2>
      </Reveal>

      <div className="entry-list">
        {items.map((project, index) => (
          <Reveal key={project.name} delay={0.04 + index * 0.03}>
            <article className="project-entry">
              <div className="entry-title-line">
                <span className="entry-badge">{project.stack[0]}</span>
                <h3>{project.name}</h3>
              </div>
              <p className="entry-summary"><em>{project.summary}</em></p>
              <p className="entry-meta">
                <span>{project.stack.join(' · ')}</span>
                <a href={project.href}>Project ↗</a>
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Projects
