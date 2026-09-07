function About({ paragraphs, interests }) {
  return (
    <section id="about" className="content-section" aria-labelledby="about-heading">
      <h2 id="about-heading" className="section-heading">About</h2>
      <div className="prose-copy">
        {paragraphs.filter((paragraph) => paragraph.trim()).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {interests.length > 0 && (
        <div className="research-interests">
          <h3>Research interests</h3>
          <ul>{interests.map((interest) => <li key={interest}>{interest}</li>)}</ul>
        </div>
      )}
    </section>
  )
}

export default About
