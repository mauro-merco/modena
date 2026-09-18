import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin } from 'lucide-react'
import Photo from './Photo'
import { SectionHeading, Arrow } from './primitives'
import { LOCATIONS, LOCATIONS_TITLE, LOCATIONS_INTRO } from '../data/locations'
import { GALLERY } from '../data/media'
import { scrollToTargetSection } from '../lib/scroll'
import { track } from '../lib/analytics'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const photoAltFor = (key) =>
  GALLERY.find((g) => g.kind === 'photo' && g.key === key)?.alt || 'Sede de MODENA — actividad práctica en el taller'

/**
 * Sedes: tres bloques con foto real y datos pendientes como marcadores neutros.
 * Desktop: una ruta SVG animada conecta los bloques; no se inventan direcciones.
 */
export default function Sedes() {
  const rootRef = useRef(null)
  const pathRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    (context) => {
      if (reduced) return
      context.selector('[data-sede]').forEach((sede) => {
        gsap.fromTo(
          sede,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: sede, start: 'top 88%' },
          },
        )
      })
      if (pathRef.current) {
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%', end: 'center 50%', scrub: true },
        })
      }
    },
    { scope: rootRef },
  )

  const consultar = (loc) => (e) => {
    e.preventDefault()
    track('cta_click', { cta_text: loc.wait, cta_location: 'sedes', sede: loc.name })
    scrollToTargetSection('inscripcion')
  }

  return (
    <section id="sedes" ref={rootRef} className="sedes">
      <div className="container-site">
        <SectionHeading num="05" label="Sedes" title={LOCATIONS_TITLE} intro={LOCATIONS_INTRO} />

        <div className="sedes__path" aria-hidden="true">
          <svg className="sedes__path-svg" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path ref={pathRef} pathLength={1} d="M4 6 C 26 2, 36 36, 52 32 S 78 8, 96 34" />
          </svg>
        </div>

        <div className="sedes__grid">
          {LOCATIONS.map((loc) => (
            <article key={loc.id} className="sede-card" data-sede>
              <div className="sede-card__media">
                <Photo
                  photoKey={loc.photo}
                  alt={photoAltFor(loc.photo)}
                  sizes="(min-width: 1024px) 30vw, 92vw"
                  loading="lazy"
                  mask="soft-flat"
                  className="sede-card__photo"
                  imgClassName="sede-card__photo-img"
                />
                <span className="sede-card__num" aria-hidden="true">
                  {loc.num}
                </span>
              </div>
              <div className="sede-card__body">
                <h3 className="sede-card__name">{loc.name}</h3>
                {loc.address ? (
                  <p className="sede-card__address">
                    <MapPin size={15} aria-hidden="true" />
                    {loc.address}
                    {loc.addressNote ? ` · ${loc.addressNote}` : ''}
                  </p>
                ) : (
                  <p className="sede-card__address is-pending">
                    <MapPin size={15} aria-hidden="true" />
                    Dirección a confirmar
                  </p>
                )}
                <p className="sede-card__note">{loc.note}</p>
                <a href="#inscripcion" className="btn btn--ghost btn--small sede-card__cta" onClick={consultar(loc)}>
                  {loc.wait}
                  <Arrow className="btn__arrow" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}