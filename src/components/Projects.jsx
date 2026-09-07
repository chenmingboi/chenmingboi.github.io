function Projects({ items }) {
  if (!items.length) return null

  return (
    <section id="projects" className="content-section" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="section-heading">Projects</h2>
      <ul className="entry-list">
        {items.map((project) => (
          <li key={project.id} className="project-entry">
            <article>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              {project.role && <p className="entry-meta">{project.role}</p>}
              {project.stack?.length > 0 && <p className="entry-meta">{project.stack.join(' · ')}</p>}
              {project.links?.length > 0 && (
                <ul className="resource-links" aria-label={`Resources for ${project.name}`}>
                  {project.links.map((link) => (
                    <li key={link.label}><a href={link.href}>{link.label}</a></li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Projects
