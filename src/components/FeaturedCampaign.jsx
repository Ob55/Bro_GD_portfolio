import { motion } from 'framer-motion'
// OPPO Reno launch creative from the gallery set.
// Swap for a dedicated hero campaign asset (e.g. on-camera still) when available.
import campaign from '../assets/GDIMAGE/15.png'

export default function FeaturedCampaign() {
  const reveal = (delay = 0) => ({
    initial: { y: 30, opacity: 0, filter: 'blur(8px)' },
    whileInView: { y: 0, opacity: 1, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.85, delay, ease: [0.2, 0.7, 0.3, 1] },
  })

  return (
    <section className="fc" id="campaign">
      <motion.div className="fc-eyebrow" {...reveal(0)}>
        <span className="fc-eyebrow-line" />
        Featured Campaign
      </motion.div>

      <motion.div className="fc-media" {...reveal(0.1)}>
        <img className="fc-img" src={campaign} alt="OPPO Kenya — Reno14 & A5 Pro 5G launch campaign" />
        <span className="fc-media-tag">Live Campaign · 2024–2025</span>
      </motion.div>

      <div className="fc-body">
        <motion.div className="fc-brand-row" {...reveal(0.15)}>
          <span className="fc-brand">OPPO Kenya</span>
          <span className="fc-dot">·</span>
          <span className="fc-brand-sub">Live Campaign</span>
          <span className="fc-dot">·</span>
          <span className="fc-brand-sub">2024–2025</span>
        </motion.div>

        <motion.h3 className="fc-title" {...reveal(0.2)}>
          Reno14 &amp; A5 Pro 5G Launch Campaigns
        </motion.h3>

        <motion.p className="fc-desc" {...reveal(0.25)}>
          Featured as on-camera brand talent and creative contributor for OPPO Kenya's
          smartphone launch campaigns — reaching millions across social media platforms.
        </motion.p>

        <motion.a className="fc-cta" href="#work" {...reveal(0.3)}>
          View Campaign
          <span className="fc-cta-arrow">→</span>
        </motion.a>
      </div>
    </section>
  )
}
