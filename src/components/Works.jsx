import { motion } from 'framer-motion'

const UN = (id) => `https://images.unsplash.com/photo-${id}?w=900&q=80&auto=format&fit=crop`

const WORKS = [
  { mark: '01', kind: 'Brand Identity', title: 'Aura Luxury Branding',
    grad: 'linear-gradient(135deg, #221d12, #8a703b)',
    img:  UN('1618005182384-a83a8bd57fbe') },
  { mark: '02', kind: 'Editorial Design', title: 'Zenith Magazine',
    grad: 'linear-gradient(135deg, #0b0d08, #a88a4e)',
    img:  UN('1544947950-fa07a98d237f') },
  { mark: '03', kind: 'Visual Direction', title: 'Elysium Exhibition',
    grad: 'linear-gradient(135deg, #0a371f, #11140d)',
    img:  UN('1634017839464-5c339ebe3cb4') },
  { mark: '04', kind: 'Typography',      title: 'Vanguard Identity',
    grad: 'linear-gradient(135deg, #c5a666, #221d12)',
    img:  UN('1600132806370-bf17e65e942f') },
  { mark: '05', kind: 'Packaging Design', title: 'Monarch Packaging',
    grad: 'linear-gradient(135deg, #0b0d08, #8a703b)',
    img:  UN('1527061011665-3652c757a4d4') },
]

export default function Works() {
  return (
    <section className="works" id="work">
      <div className="works-head">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.3, 1] }}
        >
          <div className="section-eyebrow">Selected Work</div>
          <h2 className="section-heading">Selected <em>Work</em></h2>
        </motion.div>
        <motion.a
          href="#cases" className="view-all"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Read the stories <span>→</span>
        </motion.a>
      </div>

      <div className="works-grid five">
        {WORKS.map((w, i) => (
          <motion.div
            key={w.mark}
            className="work-card"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.7, 0.3, 1] }}
          >
            <div
              className="work-thumb"
              data-mark={w.mark}
              style={{
                backgroundImage: `${w.grad}, url(${w.img})`,
                backgroundBlendMode: 'multiply',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="work-meta">
              <span>{w.mark}</span><span>·</span><span>{w.kind}</span>
            </div>
            <h3 className="work-title">{w.title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
