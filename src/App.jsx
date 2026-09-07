import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Publications from './components/Publications.jsx'
import Projects from './components/Projects.jsx'
import Awards from './components/Awards.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { getNavigation, profile } from './data/profile.js'

function App({ data = profile }) {
  return (
    <div id="home" className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar brand={data.identity.name} items={getNavigation(data)} />
      <main id="main-content" className="page-layout" tabIndex={-1}>
        <div className="profile-sidebar">
          <Hero identity={data.identity} links={data.links} />
        </div>
        <div className="content-column">
          <About paragraphs={data.about} interests={data.researchInterests} />
          <Publications items={data.publications} />
          <Projects items={data.projects} />
          <Awards items={data.awards} />
          <Contact links={data.links} />
        </div>
      </main>
      <Footer name={data.identity.name} updated={data.site.updated} />
    </div>
  )
}

export default App
