import { motion } from 'framer-motion'

const EMAIL = 'businesswithalvin55@gmail.com'

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/' },
  { label: 'LinkedIn', href: 'https://linkedin.com/' },
  { label: 'WhatsApp', href: 'https://wa.me/' },
]

export default function Contact() {
  const reveal = (delay = 0) => ({
    initial: { y: 28, opacity: 0, filter: 'blur(8px)' },
    whileInView: { y: 0, opacity: 1, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.85, delay, ease: [0.2, 0.7, 0.3, 1] },
  })

  return (
    <section className="contact" id="contact">
      <div className="contact-blob contact-blob-a" />

      <motion.div className="contact-eyebrow" {...reveal(0)}>
        <span className="contact-eyebrow-line" />
        Contact
      </motion.div>

      <motion.h2 className="contact-heading" {...reveal(0.1)}>
        Let's Work <em>Together</em>
      </motion.h2>

      <motion.p className="contact-sub" {...reveal(0.18)}>
        Available for freelance and full-time roles.<br />
        Usually responds within 24 hours.
      </motion.p>

      <motion.a className="contact-email" href={`mailto:${EMAIL}`} {...reveal(0.24)}>
        {EMAIL}
      </motion.a>

      <motion.div className="contact-ctas" {...reveal(0.3)}>
        <a className="btn btn-primary" href={`mailto:${EMAIL}`}>
          Send a Message
          <span className="btn-arrow">↗</span>
        </a>
        <a className="btn btn-outline" href="/alvinCV.docx" download="Alvin-Kyalo-CV.docx">Download CV</a>
      </motion.div>

      <motion.div className="contact-socials" {...reveal(0.36)}>
        {SOCIALS.map((s, i) => (
          <span key={s.label} className="contact-social-wrap">
            {i > 0 && <span className="contact-social-sep">·</span>}
            <a className="contact-social" href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          </span>
        ))}
      </motion.div>
    </section>
  )
}
