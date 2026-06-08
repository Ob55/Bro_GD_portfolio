export default function PressStrip() {
  const items = [
    { mark: '✦', text: 'Featured — Mindsparkle Mag' },
    { mark: '◆', text: 'Awwwards — Honorable Mention' },
    { mark: '✦', text: 'CSS Design Awards — Special Kudos' },
    { mark: '◆', text: 'Fonts In Use — Editorial Feature' },
  ]
  return (
    <div className="press-strip" aria-label="Press and recognition">
      <span className="press-eyebrow">— Accolades</span>
      <div className="press-track">
        {items.map((it, i) => (
          <span key={i} className="press-item">
            <span className="press-mark">{it.mark}</span>
            {it.text}
          </span>
        ))}
      </div>
      <span className="press-year">2026</span>
    </div>
  )
}
