import { motion } from 'framer-motion'
// OPPO Reno launch creative — the flagship featured campaign.
import campaignStill from '../assets/GDIMAGE/15.webp'

// Campaign spec sheet (sourced from CV — no device names repeated from the subtitle).
const SPECS = [
  ['Role', 'On-Camera Brand Talent'],
  ['Reach', 'Millions · Social'],
  ['Format', 'Launch Campaign'],
  ['Period', '2024 — 2025'],
]

const TAGS = ['On-Camera Talent', '5G Launch', 'Social Reach', 'OPPO Kenya']

export default function FeaturedCampaign() {
  const reveal = (delay = 0) => ({
    initial: { y: 28, opacity: 0, filter: 'blur(8px)' },
    whileInView: { y: 0, opacity: 1, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-90px' },
    transition: { duration: 0.85, delay, ease: [0.2, 0.7, 0.3, 1] },
  })

  return (
    <section className="fc" id="campaign">
      {/* Cinematic background — slow Ken-Burns drift + light sweep (pure CSS motion) */}
      <div className="fc-bg" aria-hidden>
        <img className="fc-bg-img" src={campaignStill} alt="" />
        <div className="fc-vignette" />
        <div className="fc-sweep" />
      </div>

      <div className="fc-inner">
        <motion.div className="fc-top" {...reveal(0)}>
          <span className="fc-eyebrow">
            <span className="fc-eyebrow-line" />
            Featured Campaign
          </span>
          <span className="fc-counter">01&nbsp;/&nbsp;01</span>
        </motion.div>

        <motion.h2 className="fc-title" {...reveal(0.08)}>
          OPPO <em>Kenya</em>
        </motion.h2>

        <motion.p className="fc-subtitle" {...reveal(0.14)}>
          Reno14 &amp; A5 Pro 5G — Launch Campaigns
        </motion.p>

        <motion.p className="fc-desc" {...reveal(0.2)}>
          Selected as on-camera brand talent for OPPO Kenya's flagship smartphone launches —
          the Reno14 (July 2025) and A5 Pro 5G (April 2025) — appearing in campaign creative
          that reached millions across social platforms.
        </motion.p>

        <motion.div className="fc-specs" {...reveal(0.26)}>
          {SPECS.map(([label, value]) => (
            <div className="fc-spec" key={label}>
              <span className="fc-spec-l">{label}</span>
              <span className="fc-spec-v">{value}</span>
            </div>
          ))}
        </motion.div>

        <motion.div className="fc-tags" {...reveal(0.32)}>
          {TAGS.map((t) => (
            <span className="fc-tag" key={t}>{t}</span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
