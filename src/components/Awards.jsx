import Reveal from './Reveal.jsx'

function Awards({ items }) {
  return (
    <section id="awards" className="content-section">
      <Reveal>
        <h2 className="section-heading"><span aria-hidden="true">03</span> Awards</h2>
      </Reveal>

      {items.length > 0 ? (
        <div className="award-list">
          {items.map((award, index) => (
            <Reveal key={`${award.year}-${award.title}`} delay={0.04 + index * 0.03}>
              <article className="award-entry">
                <time>{award.year}</time>
                <div>
                  <h3>{award.title}</h3>
                  {award.issuer && <p className="award-issuer">{award.issuer}</p>}
                  {award.description && <p>{award.description}</p>}
                  {award.href && (
                    <a href={award.href} target="_blank" rel="noreferrer">Details ↗</a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal delay={0.04}>
          <p className="content-empty">Award details will be added after confirmation.</p>
        </Reveal>
      )}
    </section>
  )
}

export default Awards
