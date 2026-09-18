import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Photo from './Photo'
import { Chip } from './primitives'
import { HERO } from '../data/site'
import { HERO_PHOTO } from '../data/media'
import { scrollToTargetSection } from '../lib/scroll'
import { track } from '../lib/analytics'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * Hero asimétrico: titular a la izquierda, collage real (foto principal + marbete)
 * a la derecha. Sin carrusel. Entrada escalonada vía GSAP (a menos que haya
 * prefers-reduced-motion).
 */
export default function Hero() {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    (context) => {
      if (reduced) return
      const items = context.selector('[data-hero-item]')
      gsap.fromTo(
        items,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', clearProps: 'transform,opacity' },
      )
      gsap.fromTo(
        '[data-hero-media]',
        { clipPath: 'inset(0 0 100% 0)', yPercent: 8 },
        { clipPath: 'inset(0 0 0% 0)', yPercent: 0, duration: 1, ease: 'power3.out' },
      )
    },
    { scope: rootRef },
  )

  const go = (id, label) => (e) => {
    e.preventDefault()
    track('cta_click', { cta_text: label, cta_location: 'hero', cta_target: `#${id}` })
    scrollToTargetSection(id)
  }

  return (
    <section id="inicio" ref={rootRef} className="hero container-site">
      <div className="hero__grid">
        <div className="hero__copy">
          <p data-hero-item className="kicker hero__eyebrow">
            {HERO.eyebrow}
          </p>

          <h1 data-hero-item className="headline hero__title">
            {HERO.headA} {HERO.headB} <span className="accent-word--red">{HERO.headAccent}</span>
          </h1>

          <p data-hero-item className="lead hero__text">
            {HERO.text}
          </p>

          <div data-hero-item className="hero__actions">
            <a href="#inscripcion" className="btn btn--primary" onClick={go('inscripcion', HERO.ctaPrimary)}>
              {HERO.ctaPrimary}
            </a>
            <a href="#cursos" className="btn btn--ghost" onClick={go('cursos', HERO.ctaSecondary)}>
              {HERO.ctaSecondary}
            </a>
          </div>

          <dl data-hero-item className="hero__facts">
            {HERO.facts.map((f) => (
              <div key={f.label} className="fact">
                <dt>{f.top}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>

          <p data-hero-item className="hero__badge">
            <Chip>{HERO.badge}</Chip>
          </p>
        </div>

        <div className="hero__media" data-hero-media>
          <div className="hero__main">
            <Photo
              photoKey={HERO_PHOTO.key}
              alt={HERO_PHOTO.alt}
              sizes="(min-width: 1024px) 46vw, (min-width: 640px) 60vw, 94vw"
              className="hero__photo"
              imgClassName="hero__photo-img"
              loading="eager"
              fetchPriority="high"
              mask
            />
          </div>
          <div className="hero__media-mark" aria-hidden="true">
            <span>Práctica real</span>
            <span>Formación intensiva</span>
          </div>
        </div>
      </div>
    </section>
  )
}
