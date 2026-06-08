import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'cases', label: 'Studies' },
  { id: 'cap', label: 'More' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, id) => {
    e.preventDefault()
    setActive(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="nav">
      <div className={`nav-pill ${scrolled ? 'scrolled' : ''}`}>
        <a className="nav-logo" href="#hero" onClick={(e) => go(e, 'hero')}>
          <div className="nav-logo-inner">AK</div>
        </a>
        <div className="nav-divider" />
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={`nav-link ${active === l.id ? 'active' : ''}`}
            onClick={(e) => go(e, l.id)}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
