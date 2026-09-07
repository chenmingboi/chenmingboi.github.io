function Navbar({ brand, items }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a href="#home" className="brand-link">{brand}</a>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            {items.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="topbar-link">{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
