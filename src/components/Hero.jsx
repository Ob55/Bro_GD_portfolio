import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import heroVideo from '../assets/Investor_Deck_0.mp4'

const ROLES = ['Graphic Designer', 'Art Director', 'Visual Storyteller', 'Brand Builder']

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
  const [roleIdx, setRoleIdx] = useState(0)
  const ctaRef = useRef(null)

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2200)
    return () => clearInterval(t)
  }, [])

  // Magnetic CTA effect
  useEffect(() => {
    const el = ctaRef.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist < 140) {
        el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px) scale(1.04)`
      } else {
        el.style.transform = ''
      }
    }
    const onLeave = () => { el.style.transform = '' }
    window.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const fade = (delay) => ({
    initial: { y: 24, opacity: 0, filter: 'blur(10px)' },
    animate: { y: 0, opacity: 1, filter: 'blur(0px)' },
    transition: { duration: 0.9, delay, ease: [0.2, 0.7, 0.3, 1] },
  })

  return (
    <section className="hero" id="hero">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="hero-video absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        src={heroVideo}
      />
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
          <span className="hero-eyebrow">Graphic Design · Art Direction · Nairobi</span>
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
            — art & form
          </motion.span>
        </div>

        <motion.div className="hero-meta" {...fade(0.7)}>
          <p className="hero-role-line">
            A&nbsp;
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIdx}
                className="hero-role"
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {ROLES[roleIdx]}
              </motion.span>
            </AnimatePresence>
            &nbsp;crafting premium visual systems, editorial stories, and brand identities
            that feel refined, modern, and unmistakably crafted.
          </p>
        </motion.div>

        <motion.div className="hero-ctas" {...fade(0.95)}>
          <a ref={ctaRef} href="#work" className="btn btn-primary">
            Explore work
            <span className="btn-arrow">↗</span>
          </a>
          <a href="#about" className="btn btn-outline">Discover more</a>
        </motion.div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span>Scroll to explore</span>
      </div>

      <div className="stats-strip" aria-hidden>
        <div className="stat-cell"><span className="stat-num"><CountUp to={6} suffix="+" /></span><span className="stat-lbl">Years</span></div>
        <div className="stat-cell"><span className="stat-num"><CountUp to={50} suffix="+" /></span><span className="stat-lbl">Brands Shaped</span></div>
        <div className="stat-cell"><span className="stat-num"><CountUp to={25} /></span><span className="stat-lbl">Global Clients</span></div>
        <div className="stat-cell"><span className="stat-num">Creative</span><span className="stat-lbl">Art Direction</span></div>
      </div>
    </section>
  )
}
