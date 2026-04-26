import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import BlogPreview from './components/BlogPreview.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { navigation, profile } from './data/profile.js'

function App() {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip text-ink-50">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <div className="hero-orb hero-orb--left" />
        <div className="hero-orb hero-orb--right" />
      </div>
      <div aria-hidden className="mesh-grid pointer-events-none absolute inset-0 -z-10" />

      <Navbar brand={profile.identity.name} items={navigation} />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-5 pb-16 pt-24 sm:px-7 md:gap-28 lg:px-10">
        <Hero identity={profile.identity} links={profile.links} />
        <About paragraphs={profile.about} />
        <Projects items={profile.projects} />
        <BlogPreview posts={profile.posts} blogHref={profile.links.blog} />
        <Contact links={profile.links} />
      </main>

      <Footer name={profile.identity.name} />
    </div>
  )
}

export default App
