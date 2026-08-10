import Reveal from './Reveal.jsx'

function Publications({ items }) {
  const publicationsByYear = items.reduce((groups, publication) => {
    const year = publication.year || 'Other'
    const group = groups.find((entry) => entry.year === year)

    if (group) {
      group.items.push(publication)
    } else {
      groups.push({ year, items: [publication] })
    }

    return groups
  }, [])

  return (
    <section id="publications" className="content-section publications-section">
      <Reveal>
        <h2 className="section-heading"><span aria-hidden="true">02</span> Publications</h2>
      </Reveal>

      {publicationsByYear.length > 0 ? (
        <div className="publication-groups">
          {publicationsByYear.map((group, groupIndex) => (
            <Reveal key={group.year} delay={0.04 + groupIndex * 0.03}>
              <div className="publication-year-group">
                <p className="publication-year">{group.year}</p>
                <div className="publication-list">
                  {group.items.map((publication) => (
                    <article className="publication-entry" key={publication.title}>
                      <div className="publication-title-line">
                        <h3>{publication.title}</h3>
                        {publication.highlight && (
                          <span className="publication-highlight">{publication.highlight}</span>
                        )}
                      </div>

                      <p className="publication-authors">
                        {publication.authors.map((author, index) => (
                          <span key={`${publication.title}-${author.name}`}>
                            <span className={author.self ? 'publication-self' : undefined}>
                              {author.name}
                            </span>
                            {index < publication.authors.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </p>

                      <p className="publication-venue">
                        <span>{publication.venue}</span>
                        {publication.status && <span className="publication-status">{publication.status}</span>}
                      </p>

                      {publication.links?.length > 0 && (
                        <nav className="publication-links" aria-label={`Resources for ${publication.title}`}>
                          {publication.links.map((link) => (
                            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                              {link.label}
                            </a>
                          ))}
                        </nav>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal delay={0.04}>
          <div className="content-empty publication-empty">
            <p>Publication details will be added after confirmation.</p>
            <span>Title · Authors · Venue · Paper / Code / Project / BibTeX</span>
          </div>
        </Reveal>
      )}
    </section>
  )
}

export default Publications
