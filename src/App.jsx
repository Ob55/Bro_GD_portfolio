import { useState } from 'react'
import Loader from './components/Loader.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import ScrollWords from './components/ScrollWords.jsx'
import FeaturedCampaign from './components/FeaturedCampaign.jsx'
import Works from './components/Works.jsx'
import Capabilities from './components/Capabilities.jsx'
import Marquee from './components/Marquee.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div className={`app ${!loading ? 'visible' : ''}`}>
        <Nav />
        <Hero />
        <About />
        <ScrollWords />
        <FeaturedCampaign />
        <Works />
        <Capabilities />
        <Marquee />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
