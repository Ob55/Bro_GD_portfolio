const PHRASES = [
  'Concept to form',
  'Designed in Nairobi',
  'Typographic detail',
  'Luxury brand systems',
  'Crafted with intent',
  'Editorial precision',
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
