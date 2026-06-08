import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const TABS = [
  {
    num: '01',
    label: 'Brand Strategy',
    title: 'Positioning brands for luxury value.',
    body:
      'Defining the core DNA, visual positioning, and voice of your business. I build strategic foundations that justify premium pricing, align with high-end audience expectations, and ensure your identity stands out permanently.',
    rows: [
      ['Discipline', 'Brand Strategy'],
      ['Focus', 'Identity DNA · Positioning'],
      ['Deliverable', 'Strategic Playbook'],
      ['Horizon', 'Long-term value'],
    ],
  },
  {
    num: '02',
    label: 'Identity Design',
    title: 'Bespoke, premium visual systems.',
    body:
      'Designing logos, custom typography, colour palettes, and design guidelines that define your presence. I construct comprehensive guidelines that ensure seamless implementation across physical print, packaging, and digital interfaces.',
    rows: [
      ['Discipline', 'Visual Identity'],
      ['Formats', 'Logos · Guidelines · Type'],
      ['Tools', 'Figma · Illustrator'],
      ['Aesthetics', 'Minimalist · Gold/Obsidian'],
    ],
  },
  {
    num: '03',
    label: 'Print & Packaging',
    title: 'Tangible form for exceptional products.',
    body:
      'High-end print layouts, editorial magazines, and bespoke product packaging. Focuses on premium material specifications, gold-foiling layouts, embossing guides, and production templates that treat your physical products as art.',
    rows: [
      ['Discipline', 'Packaging & Print'],
      ['Output', 'Boxes · Labels · Magazines'],
      ['Details', 'Gold Foiling · Embossing'],
      ['Target', 'Luxury Retail'],
    ],
  },
  {
    num: '04',
    label: 'Art Direction',
    title: 'Editorial layouts on digital canvases.',
    body:
      'Interactive web design and motion guidelines that bring your identity to life online. Designing editorial-grade, grid-based, edge-to-edge layouts using modern motion principles that ensure your online presence matches the luxury of your physical product.',
    rows: [
      ['Discipline', 'Digital Design'],
      ['Platforms', 'Websites · Portals · Webflow'],
      ['Motion', 'Framer Motion · Easing'],
      ['Style', 'Asymmetric Grids'],
    ],
  },
]

export default function Capabilities() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TABS.length), 5500)
    return () => clearInterval(t)
  }, [])

  const active = TABS[idx]

  return (
    <section className="cap" id="cap">
      <div className="cap-head">
        <div className="section-eyebrow">Capabilities</div>
        <h2 className="section-heading">Four things, done <em>well</em>.</h2>
      </div>
      <div className="cap-tabs">
        {TABS.map((t, i) => (
          <button
            key={t.num}
            className={`cap-tab ${i === idx ? 'active' : ''}`}
            onClick={() => setIdx(i)}
          >
            <span className="num">{t.num}</span>
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.num}
          className="cap-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
        >
          <div>
            <h3 className="cap-panel-title">{active.title}</h3>
            <p className="cap-panel-body">{active.body}</p>
          </div>
          <div className="cap-panel-list">
            {active.rows.map(([l, v]) => (
              <div className="cap-panel-list-row" key={l}>
                <span className="l">{l}</span>
                <span className="v">{v}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
