function Contact({ links }) {
  return (
    <section id="contact" className="content-section" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="section-heading">Contact</h2>
      <dl className="contact-list">
        {links.map((link) => (
          <div key={link.label}>
            <dt>{link.label}</dt>
            <dd><a href={link.href}>{link.href.replace(/^mailto:/, '')}</a></dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default Contact
