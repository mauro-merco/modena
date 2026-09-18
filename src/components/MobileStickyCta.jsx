import { useEffect, useRef, useState } from 'react'
import { scrollToTargetSection } from '../lib/scroll'
import { track } from '../lib/analytics'

/**
 * CTA flotante mobile: aparece al pasar el hero y se oculta cuando la sección
 * #inscripcion entra en viewport (IntersectionObserver). Solo visible < 768px.
 */
export default function MobileStickyCta() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const hero = document.getElementById('inicio')
    const insc = document.getElementById('inscripcion')
    if (!el || !hero || !insc) return

    let inscVisible = false
    let heroPassed = false

    const update = () => {
      const heroBottom = hero.getBoundingClientRect().bottom
      heroPassed = heroBottom <= 8
      setVisible(heroPassed && !inscVisible)
    }

    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        update()
        raf = 0
      })
    }

    let io = null
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(([entry]) => {
        inscVisible = entry.isIntersecting
        update()
      })
      io.observe(insc)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
      io?.disconnect()
    }
  }, [])

  const go = (e) => {
    e.preventDefault()
    track('cta_click', { cta_text: 'Quiero información', cta_location: 'sticky-cta-mobile' })
    scrollToTargetSection('inscripcion')
  }

  return (
    <div className="mobile-cta" ref={ref} data-visible={visible} aria-hidden={!visible}>
      <span className="mobile-cta__text">Consultá por tu curso</span>
      <button type="button" className="btn btn--primary btn--small" onClick={go}>
        Quiero información
      </button>
    </div>
  )
}