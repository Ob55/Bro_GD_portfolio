import { motion } from 'framer-motion'

// Career timeline from CV.
const ROLES = [
  {
    role: 'Brand Model / Talent',
    org: 'OPPO Kenya',
    place: 'Nairobi, Kenya',
    period: '2024 — 25',
    note: 'On-camera brand talent in the Reno14 (July 2025) and A5 Pro 5G (April 2025) smartphone launch campaigns — appearing in creative that reached millions across social media.',
    tags: ['On-Camera Talent', 'Reno14 & A5 Pro 5G', 'Millions Reach'],
  },
  {
    role: 'Social Media Manager & Designer',
    org: 'Freelance',
    place: 'Remote',
    period: '2023 — 24',
    note: 'On-brand graphics, carousels and ad creative in Canva Pro; Reels & Shorts in CapCut. Owned visual identity end-to-end — strong creative driving 3–5× ROAS.',
    tags: ['Canva Pro', 'CapCut', '3–5× ROAS'],
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
    role: 'Business Analyst',
    org: 'Turing',
    place: 'Remote',
    period: '2026',
    note: 'AI model evaluation & quality assessment — side-by-side output grading, fact-checking, and clear, structured justifications.',
    tags: ['AI Evaluation', 'Quality Assessment'],
  },
  {
    role: 'Software Tester',
    org: 'uTest',
    place: 'Remote',
    period: '2024 — 25',
    note: 'Uncovered 120+ defects across 15+ web & mobile projects; verified 99.8% device/OS compatibility and 100% payment-gateway success.',
    tags: ['QA', '120+ Defects'],
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
    <section className="xp" id="experience">
      <div className="xp-head">
        <motion.div className="xp-eyebrow" {...reveal(0)}>
          <span className="xp-eyebrow-line" />
          Experience
        </motion.div>
        <motion.h2 className="xp-heading" {...reveal(0.08)}>
          Selected roles &amp; <em>impact</em>.
        </motion.h2>
      </div>

      <div className="xp-timeline">
        {/* Animated spine that draws on scroll */}
        <motion.span
          className="xp-spine"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.3, 1] }}
        />

        {ROLES.map((r, i) => (
          <motion.article className="xp-item" key={r.org + r.role} {...reveal(0.12 + i * 0.07)}>
            <div className="xp-node">
              <span className="xp-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="xp-dot" />
            </div>

            <div className="xp-card">
              <div className="xp-card-top">
                <h3 className="xp-role">
                  {r.role} <span className="xp-org">— {r.org}</span>
                </h3>
                <span className="xp-period">{r.period}</span>
              </div>
              <span className="xp-place">{r.place}</span>
              <p className="xp-note">{r.note}</p>
              <div className="xp-tags">
                {r.tags.map((t) => (
                  <span className="xp-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Education — distinct card */}
      <motion.div className="xp-edu" {...reveal(0.3)}>
        <span className="xp-edu-l">Education</span>
        <div className="xp-edu-body">
          <span className="xp-edu-v">Zetech University — Software Engineering / AI</span>
          <span className="xp-edu-meta">Nairobi · 2023 – 2025</span>
          <p className="xp-edu-note">
            Coursework across full-stack web development (HTML, CSS, JavaScript, Python, PHP, SQL),
            database systems, algorithms, software testing, and AI / machine learning.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
