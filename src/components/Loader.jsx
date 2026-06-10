import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import loaderVideo from '../assets/Investor_Deck_0.mp4'

const WORDS = ['Identity', 'Concept', 'Editorial', 'Elevate']
const DURATION = 1600

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [wordIdx, setWordIdx] = useState(0)
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const start = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min((now - start) / DURATION, 1)
      setCount(Math.floor(t * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else {
        setTimeout(() => {
          setHide(true)
          setTimeout(onComplete, 600)
        }, 400)
      }
    }
    raf = requestAnimationFrame(tick)
    const wordTimer = setInterval(() => setWordIdx((i) => (i + 1) % WORDS.length), 900)
    return () => { cancelAnimationFrame(raf); clearInterval(wordTimer) }
  }, [onComplete])

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: hide ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      style={{ pointerEvents: hide ? 'none' : 'auto' }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="loader-video"
        src={loaderVideo}
      />
      <motion.div
        className="loader-label"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Alvin Kyalo
      </motion.div>

      <div className="loader-words">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIdx}
            className="loader-word"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {WORDS[wordIdx]}
          </motion.span>
        </AnimatePresence>
      </div>

      <motion.div
        className="loader-counter"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {String(count).padStart(3, '0')}
      </motion.div>

      <div className="loader-progress">
        <div
          className="loader-progress-fill"
          style={{ transform: `scaleX(${count / 100})` }}
        />
      </div>
    </motion.div>
  )
}
