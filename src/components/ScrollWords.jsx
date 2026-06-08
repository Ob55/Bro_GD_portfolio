import { useEffect, useRef, useState } from 'react'

const TEXT =
  "I operate at the seam of concept and form — building visual systems that feel permanent, deliberate, and quiet. I care about the geometry of a grid, the weight of a letterform, and the wealth of gold against obsidian."
const ACCENT_WORDS = new Set(['concept', 'permanent,', 'wealth'])

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
