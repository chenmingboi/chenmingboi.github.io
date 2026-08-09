import Reveal from './Reveal.jsx'

function Contact({ links }) {
  return (
    <section id="contact" className="content-section">
      <Reveal>
        <h2 className="section-heading"><span aria-hidden="true">📮</span> Contact</h2>
      </Reveal>

      <Reveal delay={0.04}>
        <p className="contact-intro">Open to project exchange, collaboration, and thoughtful technical discussion.</p>
        <div className="contact-list">
          <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={links.email}>Email</a>
          <a href={links.blog}>Blog</a>
          {links.social.map((item) => (
            <a key={item.label} href={item.href}>{item.label}</a>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

export default Contact
