import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Pause, Play, X } from 'lucide-react'
import Photo from './Photo'
import { SectionHeading } from './primitives'
import { GALLERY, VIDEO } from '../data/media'
import { track } from '../lib/analytics'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const colSpan = (span) => {
  const m = span ? span.match(/lg:col-span-(\d+)/) : null
  return m ? `gallery-item--c${m[1]}` : ''
}

function GalleryVideo({ item }) {
  const videoRef = useRef(null)
  const modalRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [open, setOpen] = useState(false)
  const restoreRef = useRef(null)
  const reduced = useReducedMotion()

  // Autoplay muted solo en viewport; pausa fuera de pantalla.
  useEffect(() => {
    const v = videoRef.current
    if (!v || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced && !open) {
          v.play()
            .then(() => setPlaying(!v.paused))
            .catch(() => setPlaying(false))
        } else {
          v.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.35 },
    )
    io.observe(v)
    return () => {
      io.disconnect()
      v.pause()
    }
  }, [reduced, open])

  const closeModal = () => {
    setOpen(false)
    restoreRef.current?.focus?.()
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    modalRef.current?.querySelector('[data-modal-close]')?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const openModal = () => {
    restoreRef.current = document.activeElement
    setOpen(true)
    track('video_play', { video_id: item.key, video_location: 'experiencia' })
  }

  return (
    <figure className={`gallery-item gallery-item--video ${colSpan(item.span)}`} data-reveal data-figure>
      <div className="gallery-item__media">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={VIDEO.poster}
          aria-label={item.alt}
          tabIndex={-1}
        >
          <source src={VIDEO.loopWebm} type="video/webm" />
          <source src={VIDEO.loopMp4} type="video/mp4" />
        </video>
        <button
          type="button"
          className="gallery-video__mute"
          aria-pressed={playing}
          onClick={() => {
            const v = videoRef.current
            if (!v) return
            if (v.paused) v.play().then(() => setPlaying(!v.paused)).catch(() => {})
            else {
              v.pause()
              setPlaying(false)
            }
          }}
          aria-label={playing ? 'Pausar video' : 'Reproducir video'}
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button
          type="button"
          className="gallery-video__open"
          onClick={openModal}
          aria-label={`Reproducir "${item.title}" con audio en pantalla completa`}
        >
          <Play size={22} />
          <span>Ver con audio</span>
        </button>
      </div>
      {item.caption ? <figcaption className="gallery-item__caption">{item.caption}</figcaption> : null}

      {open ? (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={item.title || 'Video de clase en MODENA'}
          ref={modalRef}
          onMouseDown={(e) => {
            if (e.target === modalRef.current) closeModal()
          }}
        >
          <div className="modal-overlay__box">
            <button type="button" className="modal-overlay__close" data-modal-close onClick={closeModal}>
              <X size={22} aria-hidden="true" />
              <span className="visually-hidden">Cerrar video</span>
            </button>
            <video src={VIDEO.audioMp4} controls autoPlay playsInline preload="auto" className="modal-overlay__video" />
          </div>
        </div>
      ) : null}
    </figure>
  )
}

function GalleryPhoto({ item }) {
  return (
    <figure
      className={`gallery-item ${colSpan(item.span)}`}
      data-reveal
      data-parallax={item.parallax ? 'true' : undefined}
    >
      <div className="gallery-item__media">
        <Photo
          photoKey={item.key}
          alt={item.alt}
          sizes="(min-width: 1024px) 30vw, 92vw"
          loading="lazy"
          mask="soft"
          className="gallery-item__photo"
          imgClassName="gallery-item__photo-img"
        />
      </div>
      {item.caption ? <figcaption className="gallery-item__caption">{item.caption}</figcaption> : null}
    </figure>
  )
}

/**
 * Experiencia editorial: galería real con parallax mínimo (desktop, fine pointer)
 * y video en modal con foco y cierre con Escape.
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
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (pointer: fine)', () => {
        const tweens = context.selector('[data-parallax]').map((el) => {
          const media = el.querySelector('.gallery-item__media')
          if (!media) return null
          const t = gsap.fromTo(
            media,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
          return t
        })
        return () =>
          tweens.forEach((t) => {
            if (!t) return
            t.scrollTrigger?.kill()
            t.kill()
          })
      })
      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section id="experiencia" ref={rootRef} className="experiencia">
      <div className="container-site">
        <SectionHeading num="04" label="Experiencia" title="Así se aprende en MODENA" />
      </div>
      <div className="container-site gallery">
        <div className="gallery-grid">
          {GALLERY.map((item) =>
            item.kind === 'video' ? (
              <GalleryVideo key={item.key} item={item} />
            ) : (
              <GalleryPhoto key={item.key} item={item} />
            ),
          )}
        </div>
      </div>
    </section>
  )
}