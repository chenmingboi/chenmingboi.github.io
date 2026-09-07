function Awards({ items }) {
  if (!items.length) return null

  return (
    <section id="awards" className="content-section" aria-labelledby="awards-heading">
      <h2 id="awards-heading" className="section-heading">Awards</h2>
      <ul className="entry-list">
        {[...items].sort((a, b) => Number(b.year) - Number(a.year)).map((award) => (
          <li key={award.id} className="award-entry">
            <time dateTime={award.year}>{award.year}</time>
            <div>
              <h3>{award.title}</h3>
              {award.issuer && <p>{award.issuer}</p>}
              {award.description && <p>{award.description}</p>}
              {award.href && <a href={award.href}>Details<span className="sr-only"> for {award.title}</span></a>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Awards
