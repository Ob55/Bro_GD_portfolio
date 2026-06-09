import { useState } from 'react'
import Loader from './components/Loader.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import PressStrip from './components/PressStrip.jsx'
import ScrollWords from './components/ScrollWords.jsx'
import Works from './components/Works.jsx'

import Capabilities from './components/Capabilities.jsx'
import Marquee from './components/Marquee.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div className={`app ${!loading ? 'visible' : ''}`}>
        <Nav />
        <Hero />
        <About />
        <PressStrip />
        <ScrollWords />
        <Works />

        <Capabilities />
        <Marquee />
      </div>
    </>
  )
}
