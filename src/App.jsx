import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Publications from './components/Publications.jsx'
import Awards from './components/Awards.jsx'
import Footer from './components/Footer.jsx'
import { navigation, profile } from './data/profile.js'

function App() {
  return (
    <div className="site-shell">
      <Navbar brand={profile.identity.name} items={navigation} />

      <div className="page-layout">
        <aside className="profile-sidebar">
          <Hero identity={profile.identity} links={profile.links} />
        </aside>

        <div className="content-column">
          <main className="profile-content">
            <About paragraphs={profile.about} />
            <Publications items={profile.publications} />
            <Awards items={profile.awards} />
          </main>
          <Footer name={profile.identity.name} />
        </div>
      </div>
    </div>
  )
}

export default App
