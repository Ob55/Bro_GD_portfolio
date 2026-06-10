import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const TABS = [
  {
    num: '01',
    label: 'Social Media Design',
    title: 'Scroll-stopping content, built to perform.',
    body:
      'Designing on-brand graphics, carousels, ad creatives, and campaign assets that perform across Instagram, TikTok, and Facebook. Every visual is built for the platform, the audience, and the result.',
    rows: [
      ['Discipline', 'Social Media Design'],
      ['Formats', 'Posts · Carousels · Stories · Reels'],
      ['Tools', 'Canva Pro · CapCut · Adobe CC'],
      ['Aesthetics', 'Bold · Engaging · Platform-Native'],
    ],
  },
  {
    num: '02',
    label: 'Brand Identity',
    title: 'Cohesive identities that feel intentional.',
    body:
      'Building cohesive brand identities that feel intentional and consistent — from logo and colour palette through to full brand guidelines that any team can use.',
    rows: [
      ['Discipline', 'Brand Identity'],
      ['Formats', 'Logos · Colour Palettes · Brand Guidelines'],
      ['Tools', 'Canva Pro · Adobe CC · AI Workflows'],
      ['Aesthetics', 'Clean · Memorable · Consistent'],
    ],
  },
  {
    num: '03',
    label: 'Campaign Creative',
    title: 'Ad creative that drives action.',
    body:
      'Creating campaign assets and ad creatives that communicate quickly and drive action — built for paid and organic channels across digital platforms.',
    rows: [
      ['Discipline', 'Campaign Creative'],
      ['Formats', 'Ad Creative · Banners · Promotional Assets'],
      ['Tools', 'Canva Pro · CapCut · Adobe CC'],
      ['Aesthetics', 'Conversion-Driven · High-Impact · Sharp'],
    ],
  },
  {
    num: '04',
    label: 'AI-Powered Workflows',
    title: 'Studio-quality visuals, at scale.',
    body:
      'Using n8n and AI tools to build automated creative workflows — turning raw assets into studio-quality visuals and scalable content systems in seconds.',
    rows: [
      ['Discipline', 'AI Creative Production'],
      ['Formats', 'AI UGC · Automated Templates · Batch Assets'],
      ['Tools', 'n8n · AI Image Tools · Canva Pro'],
      ['Aesthetics', 'Fast · Scalable · On-Brand'],
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
