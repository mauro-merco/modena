import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Photo from './Photo'
import { SectionHeading } from './primitives'
import { GALLERY } from '../data/media'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const captionFor = (caption, index) => ({
  caption,
  num: String(index + 1).padStart(2, '0'),
})

function GalleryPhoto({ item, index }) {
  const { caption, num } = captionFor(item.caption, index)
  return (
    <figure className="gallery-item" data-reveal>
      <div className="gallery-item__media">
        <Photo
          photoKey={item.key}
          alt={item.alt}
          sizes="(min-width: 720px) 46vw, 92vw"
          loading="lazy"
          mask="soft"
          className="gallery-item__photo"
          imgClassName="gallery-item__photo-img"
        />
      </div>
      <figcaption className="gallery-item__caption">
        <span className="gallery-item__num" aria-hidden="true">
          {num}
        </span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  )
}

/**
 * Experiencia: galería simétrica 2x2 con revelado suave al hacer scroll.
 * Cada tarjeta tiene la misma proporción y formato para un ritmo ordenado.
 */
export default function Experiencia() {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    (context) => {
      if (reduced) return
      context.selector('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
          },
        )
      })
    },
    { scope: rootRef },
  )

  return (
    <section id="experiencia" ref={rootRef} className="experiencia">
      <div className="container-site">
        <SectionHeading
          num="04"
          label="Experiencia"
          title="Así se aprende en MODENA"
          intro="Cuatro momentos reales de las clases en el taller: práctica, medición, motos y acompañamiento docente."
        />
      </div>
      <div className="container-site gallery">
        <div className="gallery-grid">
          {GALLERY.map((item, index) => (
            <GalleryPhoto key={item.key} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}