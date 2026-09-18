import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Photo from './Photo'
import { STRIP, VIDEO, GALLERY } from '../data/media'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const altFor = (key) =>
  GALLERY.find((g) => g.kind === 'photo' && g.key === key)?.alt || 'Actividad práctica en el taller de MODENA'

/**
 * Franja horizontal de evidencia real.
 * Desktop: reel horizontal manejado por scroll (ScrollTrigger scrub).
 * Mobile: scroll-snap manual, una columna de tarjetas deslizables.
 * Altura fija ~300px en desktop.
 */
export default function MediaStrip() {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const wrap = rootRef.current
        const track = trackRef.current
        if (!wrap || !track) return
        wrap.dataset.driven = 'true'
        const distance = () => Math.max(0, track.scrollWidth - wrap.clientWidth)
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: { trigger: wrap, start: 'top 92%', end: 'bottom top', scrub: true },
        })
        return () => {
          delete wrap.dataset.driven
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })
      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section className="strip-wrap" aria-label="Evidencia real de las clases en MODENA">
      <div className="strip container-site" ref={rootRef}>
        <div className="strip__track" ref={trackRef}>
          {STRIP.map((item, i) =>
            item.kind === 'video' ? (
              <figure key={`strip-${item.key}`} className="strip__item">
                <div className="strip__video">
                  <video
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={VIDEO.poster}
                    aria-hidden="true"
                    tabIndex={-1}
                  >
                    <source src={VIDEO.loopWebm} type="video/webm" />
                    <source src={VIDEO.loopMp4} type="video/mp4" />
                  </video>
                </div>
                {item.caption ? <figcaption className="strip__caption">{item.caption}</figcaption> : null}
              </figure>
            ) : (
              <figure key={`strip-${item.key}-${i}`} className="strip__item">
                <Photo photoKey={item.key} alt={altFor(item.key)} sizes="(min-width: 1024px) 22vw, 70vw" loading="lazy" className="strip__media" imgClassName="strip__media-img" />
                {item.caption ? <figcaption className="strip__caption">{item.caption}</figcaption> : null}
              </figure>
            ),
          )}
        </div>
      </div>
    </section>
  )
}