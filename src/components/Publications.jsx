function Publications({ items }) {
  const years = [...new Set(items.map((item) => item.year))].sort((a, b) => Number(b) - Number(a))

  return (
    <section id="publications" className="content-section" aria-labelledby="publications-heading">
      <h2 id="publications-heading" className="section-heading">Publications</h2>
      {years.length ? (
        <div className="publication-groups">
          {years.map((year) => (
            <div key={year} className="publication-year-group">
              <p className="publication-year"><time dateTime={year}>{year}</time></p>
              <ul className="entry-list">
                {items.filter((item) => item.year === year).map((publication) => (
                  <li key={publication.id} className="publication-entry">
                    <article>
                      <h3>{publication.title}</h3>
                      <p className="publication-authors">
                        {publication.authors.map((author, index) => (
                          <span key={`${author.name}-${index}`}>
                            {index > 0 && ', '}
                            {author.self ? <strong>{author.name}</strong> : author.name}
                          </span>
                        ))}
                      </p>
                      <p className="publication-venue">
                        <cite>{publication.venue}</cite>
                        {publication.status && <span> · {publication.status}</span>}
                      </p>
                      {publication.highlight && <p className="publication-highlight">{publication.highlight}</p>}
                      {publication.summary && <p>{publication.summary}</p>}
                      {publication.links?.length > 0 && (
                        <ul className="resource-links" aria-label={`Resources for ${publication.title}`}>
                          {publication.links.map((link) => (
                            <li key={link.label}><a href={link.href}>{link.label}</a></li>
                          ))}
                        </ul>
                      )}
                      {publication.bibtex && (
                        <details className="citation">
                          <summary>BibTeX<span className="sr-only"> for {publication.title}</span></summary>
                          <pre><code>{publication.bibtex}</code></pre>
                        </details>
                      )}
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : <p className="content-empty">No publications listed yet.</p>}
    </section>
  )
}

export default Publications
