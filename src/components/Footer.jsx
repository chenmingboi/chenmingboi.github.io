function Footer({ name }) {
  return (
    <footer className="mx-auto mt-4 w-full max-w-6xl px-5 pb-10 pt-8 text-xs text-ink-400 sm:px-7 lg:px-10">
      <div className="flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p>{new Date().getFullYear()} {name}. All rights reserved.</p>
        <p>Built with React, Tailwind CSS, and Framer Motion.</p>
      </div>
    </footer>
  )
}

export default Footer
