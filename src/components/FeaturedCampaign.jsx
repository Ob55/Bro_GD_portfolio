import { motion } from 'framer-motion'
import SpotlightReveal from './SpotlightReveal.jsx'
// OPPO Reno launch creative (still) revealed over brand motion footage.
import campaignStill from '../assets/GDIMAGE/15.png'
import campaignMotion from '../assets/Investor_Deck_0.mp4'

export default function FeaturedCampaign() {
  const reveal = (delay = 0) => ({
    initial: { y: 24, opacity: 0, filter: 'blur(8px)' },
    whileInView: { y: 0, opacity: 1, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.85, delay, ease: [0.2, 0.7, 0.3, 1] },
  })

  return (
    <section className="fc" id="campaign">
      <SpotlightReveal imageSrc={campaignStill} videoSrc={campaignMotion} />

      <div className="fc-gradient" />

      <div className="fc-overlay">
        <motion.div className="fc-eyebrow" {...reveal(0)}>
          <span className="fc-eyebrow-line" />
          Featured Campaign
        </motion.div>

        <motion.div className="fc-brand-row" {...reveal(0.1)}>
          <span className="fc-brand">OPPO Kenya</span>
          <span className="fc-dot">·</span>
          <span className="fc-brand-sub">Live Campaign</span>
          <span className="fc-dot">·</span>
          <span className="fc-brand-sub">2024–2025</span>
        </motion.div>

        <motion.h3 className="fc-title" {...reveal(0.18)}>
          Reno14 &amp; A5 Pro 5G<br />Launch Campaigns
        </motion.h3>

        <motion.p className="fc-desc" {...reveal(0.26)}>
          Featured as on-camera brand talent and creative contributor for OPPO Kenya's
          smartphone launch campaigns — reaching millions across social media platforms.
        </motion.p>

        <motion.a className="fc-cta" href="#work" {...reveal(0.32)}>
          View Campaign
          <span className="fc-cta-arrow">→</span>
        </motion.a>
      </div>
    </section>
  )
}
