import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Glob-import all images inside assets/GDIMAGE
const modules = import.meta.glob('../assets/GDIMAGE/*.webp', { eager: true })

// Parse and sort the images numerically so they appear in natural order (1, 2, 3...)
const sortedImages = Object.entries(modules)
  .map(([path, mod]) => {
    const filename = path.split('/').pop() || ''
    const match = filename.match(/^(\d+)/)
    const num = match ? parseInt(match[1], 10) : 999
    return {
      src: mod.default,
      name: filename.replace('.webp', ''),
      num
    }
  })
  .sort((a, b) => {
    if (a.num !== b.num) return a.num - b.num
    return a.name.localeCompare(b.name)
  })

// The OPPO Reno launch ad is image "15"; pull it to the front as the live campaign.
// Optional friendly titles for a few recognisable pieces (everything else stays generic).
const TITLES = {
  '15': 'OPPO Reno13F 5G',
  '3': 'Fashion Promo',
  '5': 'Juice Burst',
  '6': 'Protein Powder',
  '1': 'Daxin',
}
const oppo = sortedImages.find((img) => img.name === '15')
const rest = sortedImages.filter((img) => img.name !== '15')
const ordered = oppo ? [oppo, ...rest] : sortedImages

const projects = ordered.map((img, i) => ({
  ...img,
  title: TITLES[img.name] || (i === 0 ? 'OPPO Kenya Campaign' : `Selected Work ${String(i + 1).padStart(2, '0')}`),
  label: i === 0 ? 'Live Campaign · OPPO Kenya' : 'Personal Project',
  featured: i === 0,
}))

// Duplicate the set so the marquee can loop seamlessly.
const loop = [...projects, ...projects]

export default function Works() {
  const [activeIdx, setActiveIdx] = useState(null)

  // Handle Keyboard Navigation for Lightbox
  useEffect(() => {
    if (activeIdx === null) return
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveIdx(null)
      } else if (e.key === 'ArrowRight') {
        setActiveIdx((prev) => (prev + 1) % projects.length)
      } else if (e.key === 'ArrowLeft') {
        setActiveIdx((prev) => (prev - 1 + projects.length) % projects.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeIdx])

  const handlePrev = useCallback((e) => {
    e.stopPropagation()
    setActiveIdx((prev) => (prev - 1 + projects.length) % projects.length)
  }, [])

  const handleNext = useCallback((e) => {
    e.stopPropagation()
    setActiveIdx((prev) => (prev + 1) % projects.length)
  }, [])

  return (
    <section className="hw" id="work">
      {/* ── Section Header ── */}
      <div className="hw-header">
        <motion.div
          className="hw-header-left"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hw-eyebrow">
            <span className="hw-eyebrow-line" />
            Portfolio
          </div>
          <h2 className="hw-title">
            The<br /><em>Reel</em>
          </h2>
        </motion.div>

        <motion.div
          className="hw-header-right"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="hw-subtitle">
            Brand content, social media campaigns, and ad creatives — built for real audiences and real results.
          </p>
          <span className="hw-scroll-note">
            <span className="hw-scroll-arrows">←←←</span>
            Auto-scrolling · hover to pause · click to expand
          </span>
        </motion.div>
      </div>

      {/* ── Infinite Auto-Scrolling Reel ── */}
      <div className="reel-viewport">
        <div className="reel-track">
          {loop.map((p, idx) => {
            const realIdx = idx % projects.length
            return (
              <article
                key={`${p.name}-${idx}`}
                className={`hw-card ${p.featured ? 'hw-card-featured' : ''}`}
                onClick={() => setActiveIdx(realIdx)}
              >
                <div className="hw-card-media">
                  <img className="hw-card-img" src={p.src} alt={p.title} draggable="false" loading="lazy" />
                  {p.featured && <span className="hw-card-badge">Live Campaign</span>}
                  <span className="hw-card-expand" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </div>
                <div className="hw-card-meta">
                  <span className="hw-card-name">{p.title}</span>
                  <span className="hw-card-label">{p.label}</span>
                </div>
              </article>
            )
          })}
        </div>
        <div className="reel-fade reel-fade-left" />
        <div className="reel-fade reel-fade-right" />
      </div>

      {/* ── Fullscreen Lightbox ── */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            className="gd-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveIdx(null)}
          >
            <div className="gd-lightbox-backdrop" />

            <div className="gd-lightbox-ui" onClick={(e) => e.stopPropagation()}>
              <button
                className="gd-lightbox-close"
                onClick={() => setActiveIdx(null)}
                aria-label="Close lightbox"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <button
                className="gd-lightbox-nav gd-lightbox-prev"
                onClick={handlePrev}
                aria-label="Previous"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                className="gd-lightbox-nav gd-lightbox-next"
                onClick={handleNext}
                aria-label="Next"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              <div className="gd-lightbox-stage">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIdx}
                    className="gd-lightbox-img"
                    src={projects[activeIdx].src}
                    alt={projects[activeIdx].title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                </AnimatePresence>
              </div>

              <div className="gd-lightbox-bar">
                <div className="gd-lightbox-counter">
                  <span className="gd-lightbox-counter-current">
                    {String(activeIdx + 1).padStart(2, '0')}
                  </span>
                  <span className="gd-lightbox-counter-sep">/</span>
                  <span className="gd-lightbox-counter-total">
                    {String(projects.length).padStart(2, '0')}
                  </span>
                </div>

                <span className="gd-lightbox-label">{projects[activeIdx].label}</span>

                <span className="gd-lightbox-hint">
                  ESC to close · ← → to navigate
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
