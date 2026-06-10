import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function CountUp({ to, suffix = '', duration = 1400 }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let started = false
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true
          const start = performance.now()
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            setN(Math.floor(eased * to))
            if (t < 1) requestAnimationFrame(tick)
            else setN(to)
          }
          requestAnimationFrame(tick)
          io.disconnect()
        }
      })
    }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])
  return <span ref={ref}>{n}{suffix}</span>
}

export default function Hero() {
  const ctaRef = useRef(null)
  // Defer the decorative background video so it never blocks the LCP.
  // The hero headline paints first; the video fades in once the page is idle.
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    let idleId
    const start = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => setShowVideo(true), { timeout: 2500 })
      } else {
        idleId = setTimeout(() => setShowVideo(true), 1200)
      }
    }
    // Wait for full load so critical content paints first.
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => {
      window.removeEventListener('load', start)
      if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId)
      else clearTimeout(idleId)
    }
  }, [])

  // Magnetic CTA effect — rAF-batched so pointer moves never block interactions.
  useEffect(() => {
    const el = ctaRef.current
    if (!el) return
    let frame = 0
    let lastEvent = null
    const apply = () => {
      frame = 0
      const e = lastEvent
      if (!e) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      el.style.transform = dist < 140
        ? `translate(${dx * 0.18}px, ${dy * 0.18}px) scale(1.04)`
        : ''
    }
    const onMove = (e) => {
      lastEvent = e
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onLeave = () => { el.style.transform = '' }
    window.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const fade = (delay) => ({
    initial: { y: 24, opacity: 0, filter: 'blur(10px)' },
    animate: { y: 0, opacity: 1, filter: 'blur(0px)' },
    transition: { duration: 0.9, delay, ease: [0.2, 0.7, 0.3, 1] },
  })

  return (
    <section className="hero" id="hero">
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-20 scale-105 hero-video-fade"
          style={{ filter: 'grayscale(100%) contrast(1.15) brightness(0.65)' }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260207_050933_33e2620d-09cd-43a2-80ef-4cdbb42f4194.mp4"
        />
      )}
      <motion.div
        className="hero-bg-text"
        initial={{ opacity: 0.18, x: -30 }}
        animate={{ opacity: 0.24, x: 30 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      >
        KYALO
      </motion.div>
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="hero-content">
        <motion.div className="hero-top" {...fade(0.45)}>
          <span className="hero-eyebrow">Graphic Design · Social Media Creative · Brand Identity · Nairobi</span>
        </motion.div>

        <div className="hero-name-wrap">
          <motion.h1
            className="hero-name"
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.2, 0.7, 0.3, 1] }}
          >
            Alvin <span className="brown">Kyalo</span>
          </motion.h1>
          <motion.span
            className="cursive-accent"
            initial={{ opacity: 0, rotate: -8 }}
            animate={{ opacity: 1, rotate: -12 }}
            transition={{ duration: 0.9, delay: 1.1 }}
          >
            — available for work
          </motion.span>
        </div>

        <motion.div className="hero-meta" {...fade(0.7)}>
          <p className="hero-role-line">
            A <span className="hero-role-accent">Graphic Designer &amp; Creative Strategist</span> building
            scroll-stopping brand visuals, social content, and campaign assets — for brands that want to be remembered.
          </p>
        </motion.div>

        <motion.div className="hero-ctas" {...fade(0.95)}>
          <a ref={ctaRef} href="#work" className="btn btn-primary">
            Explore Work
            <span className="btn-arrow">↗</span>
          </a>
          <a href="/alvinCV.docx" download="Alvin-Kyalo-Resume.docx" className="btn btn-outline">Download Resume</a>
        </motion.div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span>Scroll to explore</span>
      </div>

      <div className="stats-strip" aria-hidden>
        <div className="stat-cell"><span className="stat-num"><CountUp to={3} suffix="+" /></span><span className="stat-lbl">Years</span></div>
        <div className="stat-cell"><span className="stat-num stat-num-text">Brands</span><span className="stat-lbl">Shaped</span></div>
        <div className="stat-cell"><span className="stat-num stat-num-text">Clients</span><span className="stat-lbl">Served</span></div>
        <div className="stat-cell"><span className="stat-num stat-num-text">Creative</span><span className="stat-lbl">Art Direction</span></div>
      </div>
    </section>
  )
}
