function Hero({ identity, links }) {
  return (
    <div className="profile-summary">
      <div className="profile-avatar" aria-hidden="true">{identity.initials}</div>
      <div className="profile-copy">
        <h1>{identity.name}</h1>
        <p className="profile-subtitle">{identity.subtitle}</p>
        {identity.role && <p className="profile-role">{identity.role}</p>}
        <nav className="profile-links" aria-label="Profile links">
          {links.map((link) => (
            <a key={link.label} href={link.href}>{link.label}</a>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Hero
