import Reveal from './Reveal.jsx'

function About({ paragraphs }) {
  const confirmedParagraphs = paragraphs.filter((paragraph) => paragraph.trim())

  return (
    <section id="about" className="content-section">
      <Reveal>
        <h2 className="section-heading"><span aria-hidden="true">01</span> About</h2>
      </Reveal>
      <Reveal delay={0.04}>
        {confirmedParagraphs.length > 0 ? (
          <div className="prose-copy">
            {confirmedParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <p className="content-empty">Introduction details will be added after confirmation.</p>
        )}
      </Reveal>
    </section>
  )
}

export default About
