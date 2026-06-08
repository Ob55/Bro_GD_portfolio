import { motion } from 'framer-motion'

// Each row has an `img` URL — topic-matched Unsplash photos. Swap any of
// these for real product screenshots when ready (size around 1400×1000).
const UN = (id) => `https://images.unsplash.com/photo-${id}?w=1400&q=80&auto=format&fit=crop`

const ROWS = [
  {
    num: '01',
    tag: 'Case Study · Aura',
    title: 'Aura — defining visual luxury for modern wellness.',
    desc:
      'A complete brand identity system for Aura, a premium wellness institute. Built on custom serif typography, gold-foiled packaging, and obsidian glass assets, the visual system establishes a luxurious narrative that bridges physical cosmetics and high-end digital spaces.',
    img: UN('1618005182384-a83a8bd57fbe'),
    role: 'Art Direction + Branding',
    span: 'Luxury Wellness',
    status: 'Complete',
    flip: false,
  },
  {
    num: '02',
    tag: 'Case Study · Zenith',
    title: 'Zenith — an editorial magazine on architectural form.',
    desc:
      'The layout and typographic design system for Zenith Magazine. Developed around PP Neue Montreal and custom serifs to document minimalist architecture. Focuses on asymmetrical column structures, generous negative space, and full-bleed image plates that convey stillness.',
    img: UN('1544947950-fa07a98d237f'),
    role: 'Editorial Layout',
    span: 'Publishing',
    status: 'Published',
    flip: true,
  },
  {
    num: '03',
    tag: 'Case Study · Elysium',
    title: 'Elysium — visual concept for a virtual 3D exhibition.',
    desc:
      "Design direction for Elysium's digital art showcase. Designed around metallic fluid forms, ambient golden lighting, and emerald backdrops, setting a luxury aesthetic that treats digital assets with the reverence of physical masterpieces.",
    img: UN('1634017839464-5c339ebe3cb4'),
    role: 'Visual Direction',
    span: 'Fine Arts',
    status: 'Active',
    flip: false,
  },
]

export default function Chess() {
  return (
    <section className="chess" id="cases">
      <motion.div
        className="chess-intro"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.3, 1] }}
      >
        <div className="section-eyebrow">Case Studies</div>
        <h2 className="section-heading">Things I've <em>shipped</em>.</h2>
      </motion.div>
      {ROWS.map((r, i) => (
        <motion.div
          key={r.num}
          className={`chess-row ${r.flip ? 'flip' : ''}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.3, 1] }}
        >
          <div className="chess-img">
            <motion.div
              className="chess-img-inner"
              style={{ backgroundImage: `url(${r.img})` }}
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.4, ease: [0.2, 0.7, 0.3, 1] }}
            />
            <div className="chess-tag">{r.tag}</div>
          </div>
          <div className="chess-text">
            <span className="chess-num">— {r.num}</span>
            <h3 className="chess-title">{r.title}</h3>
            <p className="chess-desc">{r.desc}</p>
            <div className="chess-meta-row">
              <div className="chess-meta">
                <span className="chess-meta-label">Role</span>
                <span className="chess-meta-value">{r.role}</span>
              </div>
              <div className="chess-meta">
                <span className="chess-meta-label">Domain</span>
                <span className="chess-meta-value">{r.span}</span>
              </div>
              <div className="chess-meta">
                <span className="chess-meta-label">Status</span>
                <span className="chess-meta-value">{r.status}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  )
}
