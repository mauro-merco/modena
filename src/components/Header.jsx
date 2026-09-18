import { useCallback, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { ANCHORS } from '../data/site'
import { track } from '../lib/analytics'
import { scrollToTarget } from '../lib/scroll'

gsap.registerPlugin(ScrollTrigger)

function SkipLink() {
  return <a href="#contenido" className="skip-link">Saltar al contenido</a>
}

function Logo() {
  return (
    <a href="#inicio" className="header__logo" aria-label="MODENA — volver al inicio">
      <img className="logo-theme logo-theme--light" src="/media/brand/logo-para-fondo-light.webp" width="1416" height="729" alt="" loading="eager" />
      <img className="logo-theme logo-theme--dark" src="/media/brand/logo-para-fondo-dark.webp" width="1416" height="729" alt="" loading="eager" />
    </a>
  )
}

/**
 * Header flotante con:
 * - Panel "Explorar" con línea de progreso de scroll (desktop).
 * - Toggle de tema.
 * - CTA "Inscribirme" siempre visible.
 * - Menú mobile full-screen accesible (sin scroll de fondo).
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const panelRef = useRef(null)
  const panelBtnRef = useRef(null)
  const progressRef = useRef(null)
  const menuBtnRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Línea de progreso global dentro del panel Explorar.
  useEffect(() => {
    if (!exploreOpen) return
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      progressRef.current?.style.setProperty('--explore-progress', p.toFixed(4))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [exploreOpen])

  // Cerrar con Escape y click fuera del panel.
  useEffect(() => {
    if (!exploreOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setExploreOpen(false)
    }
    const onDown = (e) => {
      if (!panelRef.current?.contains(e.target) && !panelBtnRef.current?.contains(e.target)) {
        setExploreOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [exploreOpen])

  // Bloqueo de scroll del body cuando el menú mobile está abierto.
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') { setMenuOpen(false); menuBtnRef.current?.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  // Foco inicial en el menú mobile (accesible).
  useEffect(() => {
    if (!menuOpen) return
    const el = document.querySelector('#menu-mobile a[data-first]')
    el?.focus()
  }, [menuOpen])

  // Animación subtil al abrir el panel Explorer.
  useGSAP(() => {
    if (!exploreOpen) return
    gsap.fromTo(
      panelRef.current?.querySelectorAll('[data-explore-item]'),
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.32, stagger: 0.04, ease: 'power2.out', overwrite: 'auto' },
    )
  }, { dependencies: [exploreOpen], scope: headerRef })

  const goToSection = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) scrollToTarget(el)
    setExploreOpen(false)
    setMenuOpen(false)
  }, [])

  const trackCta = useCallback((text, location) => {
    track('cta_click', { cta_text: text, cta_location: location })
    goToSection('inscripcion')
  }, [goToSection])

  return (
    <>
      <SkipLink />
      <header ref={headerRef} className={`header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-open' : ''}`}>
        <div className="container header__inner">
          <div className="header__left">
            <Logo />
            <div className="header__explore-wrap" style={{ position: 'relative' }}>
              <div className="header__desktop-nav">
                <button
                  type="button"
                  ref={panelBtnRef}
                  className="btn btn--ghost btn--small"
                  aria-haspopup="true"
                  aria-expanded={exploreOpen}
                  aria-controls="explore-menu"
                  onClick={() => setExploreOpen((v) => !v)}
                >
                  Explorar
                  <ArrowDown size={15} aria-hidden="true" className={`explore-arrow ${exploreOpen ? 'is-open' : ''}`} />
                </button>

                <div
                  id="explore-menu"
                  className={`explore-panel ${exploreOpen ? 'is-open' : ''}`}
                  ref={panelRef}
                  role="menu"
                  aria-label="Explorar secciones"
                >
                  <nav aria-label="Secciones de la página">
                    {ANCHORS.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        role="menuitem"
                        data-explore-item
                        className="explore-panel__item"
                        onClick={() => goToSection(s.id)}
                      >
                        <span className="explore-panel__num">{s.num}</span>
                        <span className="explore-panel__label">{s.label}</span>
                        <span className="explore-panel__bar" aria-hidden="true" />
                      </button>
                    ))}
                  </nav>
                  <div className="explore-panel__progress" aria-hidden="true">
                    <span ref={progressRef} className="explore-panel__progress-track" />
                    <span className="explore-panel__progress-label">scroll</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="header__right">
            <ThemeToggle />
            <a href="#inscripcion" className="btn btn--primary btn--small header__cta" onClick={(e) => { e.preventDefault(); trackCta('Inscribirme', 'header') }}>
              Inscribirme
            </a>
            <button
              ref={menuBtnRef}
              type="button"
              className="hamburger header__mobile-trigger"
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-mobile"
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        aria-label="Menú principal"
        hidden={!menuOpen}
      >
        <div className="container mobile-menu__inner">
          <nav aria-label="Menú principal">
            {ANCHORS.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                data-first={i === 0 ? 'true' : undefined}
                className="mobile-menu__item"
                onClick={(e) => { e.preventDefault(); goToSection(s.id) }}
              >
                <span className="num">{s.num}</span>
                <span className="label">{s.label}</span>
              </a>
            ))}
          </nav>
          <div>
            <button type="button" className="btn btn--primary btn--block" onClick={() => trackCta('Quiero información', 'menu-mobile')}>
              Quiero información
            </button>
            <p className="mobile-menu__note">MODENA — Instituto de Mecánica Automotriz</p>
          </div>
        </div>
      </div>
    </>
  )
}
