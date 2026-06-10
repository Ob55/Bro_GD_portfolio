import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Glob-import all images inside assets/GDIMAGE
const modules = import.meta.glob('../assets/GDIMAGE/*.png', { eager: true })

// Parse and sort the images numerically so they appear in natural order (1, 2, 3...)
const sortedImages = Object.entries(modules)
  .map(([path, mod]) => {
    const filename = path.split('/').pop() || ''
    const match = filename.match(/^(\d+)/)
    const num = match ? parseInt(match[1], 10) : 999
    return {
      src: mod.default,
      name: filename.replace('.png', ''),
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

export default function Works() {
  const [activeIdx, setActiveIdx] = useState(null)
  const trackRef = useRef(null)

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

  // Drag-to-scroll for the horizontal track
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let isDown = false
    let startX = 0
    let startScroll = 0
    let moved = false

    const onDown = (e) => {
      isDown = true
      moved = false
      startX = e.pageX - el.offsetLeft
      startScroll = el.scrollLeft
      el.classList.add('dragging')
    }
    const onMove = (e) => {
      if (!isDown) return
      const x = e.pageX - el.offsetLeft
      const walk = x - startX
      if (Math.abs(walk) > 4) moved = true
      el.scrollLeft = startScroll - walk
    }
    const onUp = () => {
      isDown = false
      el.classList.remove('dragging')
      // brief flag so the click handler can ignore drag-releases
      el.dataset.dragged = moved ? '1' : ''
    }

    el.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      el.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  const scrollByCards = useCallback((dir) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('.hw-card')
    const amount = card ? card.offsetWidth + 28 : 400
    el.scrollBy({ left: dir * amount * 1.4, behavior: 'smooth' })
  }, [])

  const openCard = (idx) => {
    const el = trackRef.current
    if (el && el.dataset.dragged === '1') return // was a drag, not a click
    setActiveIdx(idx)
  }

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
            Selected<br /><em>Works</em>
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
          <div className="hw-arrows">
            <button className="hw-arrow" onClick={() => scrollByCards(-1)} aria-label="Scroll left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className="hw-arrow" onClick={() => scrollByCards(1)} aria-label="Scroll right">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── Horizontal Swipe Track ── */}
      <div className="hw-track" ref={trackRef}>
        {projects.map((p, idx) => (
          <motion.article
            key={p.name}
            className={`hw-card ${p.featured ? 'hw-card-featured' : ''}`}
            onClick={() => openCard(idx)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: Math.min(idx, 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
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
          </motion.article>
        ))}
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
