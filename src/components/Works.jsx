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

// Editorial layout pattern — varied aspect ratios for visual rhythm
const LAYOUT_PATTERN = [
  { span: 'gd-span-7', aspect: 'gd-aspect-portrait' },
  { span: 'gd-span-5', aspect: 'gd-aspect-square' },
  { span: 'gd-span-5', aspect: 'gd-aspect-landscape' },
  { span: 'gd-span-7', aspect: 'gd-aspect-wide' },
  { span: 'gd-span-12', aspect: 'gd-aspect-cinematic' },
  { span: 'gd-span-4', aspect: 'gd-aspect-tall' },
  { span: 'gd-span-4', aspect: 'gd-aspect-square' },
  { span: 'gd-span-4', aspect: 'gd-aspect-tall' },
  { span: 'gd-span-8', aspect: 'gd-aspect-landscape' },
  { span: 'gd-span-4', aspect: 'gd-aspect-portrait' },
  { span: 'gd-span-6', aspect: 'gd-aspect-wide' },
  { span: 'gd-span-6', aspect: 'gd-aspect-portrait' },
]

export default function Works() {
  const [visibleCount, setVisibleCount] = useState(8)
  const [activeIdx, setActiveIdx] = useState(null)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const gridRef = useRef(null)

  // Handle Keyboard Navigation for Lightbox
  useEffect(() => {
    if (activeIdx === null) return
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveIdx(null)
      } else if (e.key === 'ArrowRight') {
        setActiveIdx((prev) => (prev + 1) % sortedImages.length)
      } else if (e.key === 'ArrowLeft') {
        setActiveIdx((prev) => (prev - 1 + sortedImages.length) % sortedImages.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeIdx])

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 8, sortedImages.length))
  }

  const handlePrev = useCallback((e) => {
    e.stopPropagation()
    setActiveIdx((prev) => (prev - 1 + sortedImages.length) % sortedImages.length)
  }, [])

  const handleNext = useCallback((e) => {
    e.stopPropagation()
    setActiveIdx((prev) => (prev + 1) % sortedImages.length)
  }, [])

  return (
    <section className="gd-works" id="work">
      {/* ── Cinematic Section Header ── */}
      <div className="gd-works-header">
        <motion.div
          className="gd-works-header-left"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="gd-works-eyebrow">
            <span className="gd-works-eyebrow-line" />
            Portfolio
          </div>
          <h2 className="gd-works-title">
            Project<br /><em>Done</em>
          </h2>
        </motion.div>

        <motion.div
          className="gd-works-header-right"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="gd-works-subtitle">
            A curated archive of premium visual designs, corporate branding, and art direction systems crafted with obsessive attention to detail.
          </p>
          <div className="gd-works-counter">
            <span className="gd-works-counter-num">{String(sortedImages.length).padStart(2, '0')}</span>
            <span className="gd-works-counter-label">Works</span>
          </div>
        </motion.div>
      </div>

      {/* ── Decorative Divider ── */}
      <motion.div
        className="gd-works-divider"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── Gallery Grid ── */}
      <div className="gd-gallery" ref={gridRef}>
        {sortedImages.slice(0, visibleCount).map((img, idx) => {
          const layout = LAYOUT_PATTERN[idx % LAYOUT_PATTERN.length]
          const formattedNum = String(idx + 1).padStart(2, '0')
          const isHovered = hoveredIdx === idx

          return (
            <motion.div
              key={img.name}
              className={`gd-card ${layout.span} ${layout.aspect}`}
              onClick={() => setActiveIdx(idx)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.9,
                delay: (idx % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {/* Image */}
              <motion.img
                className="gd-card-img"
                src={img.src}
                alt={`Design work ${img.name}`}
                loading="lazy"
                animate={{
                  scale: isHovered ? 1.06 : 1,
                  filter: isHovered ? 'brightness(0.7) saturate(1.1)' : 'brightness(1) saturate(1)',
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Overlay */}
              <motion.div
                className="gd-card-overlay"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Top: Number */}
                <motion.span
                  className="gd-card-number"
                  animate={{
                    y: isHovered ? 0 : -12,
                    opacity: isHovered ? 1 : 0
                  }}
                  transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  {formattedNum}
                </motion.span>

                {/* Bottom: Label + Expand */}
                <div className="gd-card-bottom">
                  <motion.span
                    className="gd-card-label"
                    animate={{
                      y: isHovered ? 0 : 14,
                      opacity: isHovered ? 1 : 0
                    }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    View Project
                  </motion.span>
                  <motion.div
                    className="gd-card-expand"
                    animate={{
                      scale: isHovered ? 1 : 0.6,
                      opacity: isHovered ? 1 : 0
                    }}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>

              {/* Corner accent line */}
              <motion.div
                className="gd-card-accent"
                animate={{
                  scaleX: isHovered ? 1 : 0,
                  opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          )
        })}
      </div>

      {/* ── Load More ── */}
      {visibleCount < sortedImages.length && (
        <motion.div
          className="gd-load-more"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            className="gd-load-btn"
            onClick={loadMore}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="gd-load-btn-text">
              Load More
            </span>
            <span className="gd-load-btn-count">
              {sortedImages.length - visibleCount} remaining
            </span>
            <span className="gd-load-btn-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </span>
          </motion.button>
        </motion.div>
      )}

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
            {/* Background blur layer */}
            <div className="gd-lightbox-backdrop" />

            <div className="gd-lightbox-ui" onClick={(e) => e.stopPropagation()}>
              {/* Close */}
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

              {/* Navigation */}
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

              {/* Main Image */}
              <div className="gd-lightbox-stage">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIdx}
                    className="gd-lightbox-img"
                    src={sortedImages[activeIdx].src}
                    alt={`Artwork ${sortedImages[activeIdx].name}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                </AnimatePresence>
              </div>

              {/* Bottom Bar */}
              <div className="gd-lightbox-bar">
                <div className="gd-lightbox-counter">
                  <span className="gd-lightbox-counter-current">
                    {String(activeIdx + 1).padStart(2, '0')}
                  </span>
                  <span className="gd-lightbox-counter-sep">/</span>
                  <span className="gd-lightbox-counter-total">
                    {String(sortedImages.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Thumbnail Strip */}
                <div className="gd-lightbox-thumbs">
                  {sortedImages.slice(
                    Math.max(0, activeIdx - 3),
                    Math.min(sortedImages.length, activeIdx + 4)
                  ).map((img, i) => {
                    const realIdx = Math.max(0, activeIdx - 3) + i
                    return (
                      <button
                        key={realIdx}
                        className={`gd-lightbox-thumb ${realIdx === activeIdx ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setActiveIdx(realIdx) }}
                      >
                        <img src={img.src} alt="" />
                      </button>
                    )
                  })}
                </div>

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
