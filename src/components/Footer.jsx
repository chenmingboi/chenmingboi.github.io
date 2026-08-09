function Footer({ name }) {
  return (
    <footer className="site-footer">
      <p>{new Date().getFullYear()} {name}. Built with care.</p>
      <p>React · Tailwind CSS · GitHub Pages</p>
    </footer>
  )
}

export default Footer
