import Reveal from './Reveal.jsx'

function About({ paragraphs }) {
  return (
    <section id="about" className="content-section">
      <Reveal>
        <h2 className="section-heading"><span aria-hidden="true">👋</span> About me</h2>
      </Reveal>
      <Reveal delay={0.04}>
        <div className="prose-copy">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

export default About
