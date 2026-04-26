import Reveal from './Reveal.jsx'
import GlassPanel from './GlassPanel.jsx'

function Contact({ links }) {
  return (
    <section id="contact" className="scroll-mt-28 space-y-6">
      <Reveal>
        <p className="eyebrow">Contact</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="section-title">Open to collaboration, project exchange, and technical discussion.</h2>
      </Reveal>

      <Reveal delay={0.1}>
        <GlassPanel className="rounded-2xl p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <a href={links.github} target="_blank" rel="noreferrer" className="contact-button">
              <span className="contact-button__label">GitHub</span>
              <span className="contact-button__value">@chenmingboi</span>
            </a>
            <a href={links.email} className="contact-button">
              <span className="contact-button__label">Email</span>
              <span className="contact-button__value">your.email@example.com</span>
            </a>
            <a href={links.blog} className="contact-button">
              <span className="contact-button__label">Blog</span>
              <span className="contact-button__value">Writing in progress</span>
            </a>
          </div>
        </GlassPanel>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.social.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <p className="text-sm font-medium text-ink-50">{item.label}</p>
              <p className="pt-1 text-xs text-ink-400">{item.value}</p>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

export default Contact
