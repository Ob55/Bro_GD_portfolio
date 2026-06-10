import { useEffect, useRef, useState } from 'react'

const TEXT =
  "I believe great design doesn't just look good — it performs. I build brand visuals and campaign assets that stop the scroll, communicate instantly, and make audiences act. Every pixel is intentional. Every asset is built to convert."
const ACCENT_WORDS = new Set(['performs.', 'stop', 'the', 'scroll,', 'convert.'])

export default function ScrollWords() {
  const words = TEXT.split(' ')
  const [lit, setLit] = useState(new Array(words.length).fill(false))
  const ref = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // start lighting at 80% of viewport, finish at 20%
      const start = vh * 0.85
      const end = vh * 0.15
      const total = start - end
      const progress = Math.min(Math.max((start - rect.top) / total, 0), 1)
      const litCount = Math.floor(progress * words.length)
      setLit((prev) => {
        if (prev.filter(Boolean).length === litCount) return prev
        return words.map((_, i) => i < litCount)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [words.length])

  return (
    <section className="scroll-words" ref={ref}>
      <div className="scroll-words-eyebrow">Manifesto</div>
      <p className="scroll-words-text">
        {words.map((w, i) => (
          <span
            key={i}
            className={`w ${lit[i] ? 'lit' : ''} ${ACCENT_WORDS.has(w) ? 'accent' : ''}`}
          >
            {w}
          </span>
        ))}
      </p>
    </section>
  )
}
