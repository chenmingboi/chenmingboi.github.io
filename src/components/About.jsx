import Reveal from './Reveal.jsx'

function About({ paragraphs }) {
  return (
    <section id="about" className="scroll-mt-28 space-y-6">
      <Reveal>
        <p className="eyebrow">About</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="section-title">A concise view of how I build.</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="grid gap-5 text-sm leading-7 text-ink-300 sm:text-base md:grid-cols-2 md:gap-8">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

export default About
