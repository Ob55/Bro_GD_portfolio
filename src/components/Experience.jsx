import { motion } from 'framer-motion'

// Career timeline from CV — the OPPO campaign is intentionally left to the
// Featured Campaign section above, so nothing repeats here.
const ROLES = [
  {
    role: 'Business Analyst',
    org: 'Turing',
    place: 'Remote',
    period: '2026',
    note: 'AI model evaluation & quality assessment — side-by-side output grading, fact-checking, and clear, structured justifications.',
    tags: ['AI Evaluation', 'Quality Assessment'],
  },
  {
    role: 'AI Automation Designer',
    org: 'n8n · Freelance',
    place: 'Remote',
    period: '2024 — 25',
    note: 'Built 25+ automated creative workflows — turning raw photos into studio-quality images and AI UGC-style video, plus reusable templates for on-brand assets at scale.',
    tags: ['n8n', 'AI UGC', '25+ Workflows'],
  },
  {
    role: 'Software Tester',
    org: 'uTest',
    place: 'Remote',
    period: '2024 — 25',
    note: 'Uncovered 120+ defects across 15+ web & mobile projects; verified 99.8% device/OS compatibility and 100% payment-gateway success.',
    tags: ['QA', '120+ Defects'],
  },
  {
    role: 'Social Media Manager & Designer',
    org: 'Freelance',
    place: 'Remote',
    period: '2023 — 24',
    note: 'On-brand graphics, carousels and ad creative in Canva Pro; Reels & Shorts in CapCut. Owned visual identity end-to-end — strong creative driving 3–5× ROAS.',
    tags: ['Canva Pro', 'CapCut', '3–5× ROAS'],
  },
]

export default function Experience() {
  const reveal = (delay = 0) => ({
    initial: { y: 28, opacity: 0, filter: 'blur(8px)' },
    whileInView: { y: 0, opacity: 1, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.8, delay, ease: [0.2, 0.7, 0.3, 1] },
  })

  return (
    <section className="exp" id="experience">
      <div className="exp-head">
        <motion.div className="exp-eyebrow" {...reveal(0)}>
          <span className="exp-eyebrow-line" />
          Experience
        </motion.div>
        <motion.h2 className="exp-heading" {...reveal(0.08)}>
          Selected roles &amp; <em>impact</em>.
        </motion.h2>
      </div>

      <div className="exp-list">
        {ROLES.map((r, i) => (
          <motion.article className="exp-row" key={r.org + r.role} {...reveal(0.1 + i * 0.06)}>
            <div className="exp-row-period">{r.period}</div>
            <div className="exp-row-main">
              <h3 className="exp-row-role">
                {r.role} <span className="exp-row-org">— {r.org}</span>
              </h3>
              <span className="exp-row-place">{r.place}</span>
              <p className="exp-row-note">{r.note}</p>
              <div className="exp-row-tags">
                {r.tags.map((t) => (
                  <span className="exp-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div className="exp-edu" {...reveal(0.4)}>
        <span className="exp-edu-l">Education</span>
        <span className="exp-edu-v">
          Zetech University — Software Engineering / AI <span className="exp-edu-dim">· Nairobi · 2023–2025</span>
        </span>
      </motion.div>
    </section>
  )
}
