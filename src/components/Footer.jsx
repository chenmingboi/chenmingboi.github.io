function Footer({ name, updated }) {
  return (
    <footer className="site-footer">
      <p>© {updated.slice(0, 4)} {name}</p>
      <p>Updated <time dateTime={updated}>{updated}</time></p>
      <a href="#home">Back to top <span aria-hidden="true">↑</span></a>
    </footer>
  )
}

export default Footer
