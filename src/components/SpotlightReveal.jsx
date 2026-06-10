import { useEffect, useRef } from 'react'

// Mouse-tracked spotlight that reveals a motion video beneath a still image.
// Adapted from the OB motionsites "Nike Premium" SpotlightReveal concept,
// reworked for plain React (no react-player / gsap).
export default function SpotlightReveal({ imageSrc, videoSrc, baseRadius = 360 }) {
  const NUM_TRAILS = 6
  const wrapRef = useRef(null)
  const videoRef = useRef(null)
  const pointsRef = useRef(
    Array.from({ length: NUM_TRAILS }, () => ({ x: -1000, y: -1000 }))
  )

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    // Track the pointer relative to the section so the mask lines up on scroll.
    let targetX = -1000
    let targetY = -1000
    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect()
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {})
      }
    }
    const onLeave = () => {
      // Park the spotlight far off-screen so the still image shows fully.
      targetX = -1000
      targetY = -1000
    }
    wrap.addEventListener('mousemove', onMove, { passive: true })
    wrap.addEventListener('mouseleave', onLeave)

    // Cache the trail circles once instead of querying the DOM every frame.
    const circles = Array.from({ length: NUM_TRAILS }, (_, i) =>
      wrap.querySelector(`#sr-trail-${i}`)
    )

    let raf = 0
    let running = false
    const animate = () => {
      if (!running) return
      const pts = pointsRef.current
      pts[0].x += (targetX - pts[0].x) * 0.2
      pts[0].y += (targetY - pts[0].y) * 0.2
      for (let i = 1; i < pts.length; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.35
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.35
      }
      for (let i = 0; i < pts.length; i++) {
        if (circles[i]) {
          circles[i].setAttribute('cx', pts[i].x)
          circles[i].setAttribute('cy', pts[i].y)
        }
      }
      raf = requestAnimationFrame(animate)
    }

    // Only run the loop (and play the video) while the section is on-screen.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!running) { running = true; raf = requestAnimationFrame(animate) }
        if (videoRef.current) videoRef.current.play().catch(() => {})
      } else {
        running = false
        if (raf) cancelAnimationFrame(raf)
        raf = 0
        if (videoRef.current) videoRef.current.pause()
      }
    }, { threshold: 0.05 })
    io.observe(wrap)

    return () => {
      io.disconnect()
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="sr-wrap" ref={wrapRef}>
      <video
        ref={videoRef}
        className="sr-video"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
      />
      <svg className="sr-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="sr-hole">
            <stop offset="0%" stopColor="black" stopOpacity="1" />
            <stop offset="60%" stopColor="black" stopOpacity="0.8" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>
          <mask id="sr-mask" maskContentUnits="userSpaceOnUse">
            <rect width="100%" height="100%" fill="white" />
            {Array.from({ length: NUM_TRAILS }).map((_, idx) => {
              const i = NUM_TRAILS - 1 - idx
              return (
                <circle
                  key={i}
                  id={`sr-trail-${i}`}
                  cx="-1000"
                  cy="-1000"
                  r={baseRadius - i * 30}
                  fill="url(#sr-hole)"
                  opacity={1 - i * 0.15}
                />
              )
            })}
          </mask>
        </defs>
        <image
          href={imageSrc}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#sr-mask)"
        />
      </svg>
      <span className="sr-hint">Hover to reveal the campaign in motion</span>
    </div>
  )
}
