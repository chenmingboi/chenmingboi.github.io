function Footer({ name }) {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} {name}</p>
    </footer>
  )
}

export default Footer
