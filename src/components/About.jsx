import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import portrait from '../assets/profile.jpeg'

const SKILLS = [
  'Brand Identity', 'Typography', 'Editorial Design', 'Art Direction',
  'Packaging Design', 'Motion Graphics', 'Figma', 'Adobe CC',
  'Webflow', 'Visual Strategy',
]

export default function About() {
  const sectionRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [highlightIdx, setHighlightIdx] = useState(0)

  // Parallax bg + portrait drift
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const centered = (vh - rect.top) / (vh + rect.height)
      setScrollY(Math.min(Math.max(centered, 0), 1))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-cycling skill highlight
  useEffect(() => {
    const t = setInterval(() => setHighlightIdx((i) => (i + 1) % SKILLS.length), 1400)
    return () => clearInterval(t)
  }, [])

  const reveal = (delay = 0) => ({
    initial: { y: 28, opacity: 0, filter: 'blur(8px)' },
    whileInView: { y: 0, opacity: 1, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.85, delay, ease: [0.2, 0.7, 0.3, 1] },
  })

  const bgShift = (scrollY - 0.5) * 80
  const portraitShift = (scrollY - 0.5) * -40

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div
        className="about-bg-text"
        style={{ transform: `translate(${bgShift}px, 0)` }}
      >
        ALVIN
      </div>
      <div className="about-blob about-blob-a" />
      <div className="about-blob about-blob-b" />

      <motion.div className="about-eyebrow-row" {...reveal(0)}>
        <span className="about-eyebrow">✱ &nbsp;About</span>
        <span className="about-eyebrow-right">Designer · Art Director · Nairobi</span>
      </motion.div>

      <div className="about-grid">
        <motion.div
          className="about-portrait-wrap"
          {...reveal(0.1)}
          style={{ transform: `translateY(${portraitShift}px)` }}
        >
          <img className="about-portrait" src={portrait} alt="Brian Mwangi" />
          <span className="about-sig">— Alvin Kyalo</span>
        </motion.div>

        <div className="about-right">
          <motion.h2 className="about-heading" {...reveal(0.15)}>
            Hello — I'm <em>Alvin</em>.
          </motion.h2>

          <motion.div className="about-bio" {...reveal(0.25)}>
            <p>
              A <strong>multi-disciplinary graphic designer</strong> and art director
              based in Nairobi. I shape premium brand identities, editorial systems,
              and packaging with detail-led craft, clarity, and strategic polish.
            </p>
            <p>
              I work at the intersection of narrative, typography, and modern luxury.
              Every project is driven by restraint, precision, and a timeless sense of
              visual craft that makes brands feel both memorable and enduring.
            </p>
          </motion.div>

          <motion.div className="about-skills" {...reveal(0.35)}>
            <span className="about-skills-label">// Toolkit</span>
            <div className="about-skills-list">
              {SKILLS.map((s, i) => (
                <motion.span
                  key={s}
                  className={`skill-pill ${i === highlightIdx ? 'on' : ''}`}
                  initial={{ y: 16, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + i * 0.05,
                    ease: [0.2, 0.7, 0.3, 1],
                  }}
                >
                  <span className="skill-pill-dot" />
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div className="about-tagline" {...reveal(0.5)}>
            <span className="about-tag-line">// Design that</span>
            <span className="about-tag-accent">speaks your brand</span>
          </motion.div>
        </div>
      </div>

      <motion.div className="about-strip" {...reveal(0.55)}>
        <div className="about-strip-item">
          <span className="about-strip-l">Based</span>
          <span className="about-strip-v">Nairobi, KE</span>
        </div>
        <div className="about-strip-item">
          <span className="about-strip-l">Focus</span>
          <span className="about-strip-v">Luxury Branding</span>
        </div>
        <div className="about-strip-item">
          <span className="about-strip-l">Domain</span>
          <span className="about-strip-v">Print & Digital</span>
        </div>
        <div className="about-strip-item">
          <span className="about-strip-l">Philosophy</span>
          <span className="about-strip-v">Less, but Better</span>
        </div>
      </motion.div>
    </section>
  )
}
