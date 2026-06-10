const PHRASES = [
  'Designed in Nairobi',
  'Social Media Creative',
  'Brand Visuals',
  'Campaign Assets',
  'AI-Native Workflow',
  'Scroll-Stopping Design',
  'Built to Convert',
]

export default function Marquee() {
  // Repeat the set enough times to fill the loop seamlessly
  const items = []
  for (let i = 0; i < 4; i++) {
    PHRASES.forEach((p, idx) =>
      items.push(
        <span key={`${i}-${idx}`} className="marquee-item">
          {p}
          <span className="star">✦</span>
        </span>
      )
    )
  }
  return (
    <div className="marquee">
      <span className="marquee-overlay">— available for select projects</span>
      <div className="marquee-track">
        {items}
        {items}
      </div>
    </div>
  )
}
