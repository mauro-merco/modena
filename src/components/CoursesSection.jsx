import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Plus } from 'lucide-react'
import Photo from './Photo'
import { SectionHeading, Arrow } from './primitives'
import { COURSES, COURSE_INTRO, COURSES_TITLE, COURSE_CTA_TEXT } from '../data/courses'
import { LOCATIONS } from '../data/locations'
import { GALLERY } from '../data/media'
import { useSelectedCourse } from '../lib/courseStore'
import { scrollToTargetSection } from '../lib/scroll'
import { track } from '../lib/analytics'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/** Pareja foto real-curso (decisión visual; las piezas son material real de MODENA). */
const COURSE_PHOTOS = {
  'mecanica-automotriz': 'mecanica-practica',
  'electricidad-automotriz': 'diagnostico-electronico',
  motos: 'mecanica-motos',
  'inyeccion-electronic-a-automotriz': 'formacion-practica',
}

const photoAltFor = (key, courseName) =>
  GALLERY.find((g) => g.kind === 'photo' && g.key === key)?.alt ||
  `Clase práctica de ${courseName.toLowerCase()} en el taller de MODENA`

const locationName = (id) => LOCATIONS.find((l) => l.id === id)?.name || id

function CourseCard({ course, onSelect }) {
  const [open, setOpen] = useState(false)
  const photoKey = COURSE_PHOTOS[course.id] || 'clase-01'
  const panelId = `course-contents-${course.id}`
  const btnId = `course-toggle-${course.id}`

  const handleCta = (e) => {
    e.preventDefault()
    onSelect(course)
  }

  return (
    <article className="course-card" data-course>
      <div className="course-card__media">
        <Photo
          photoKey={photoKey}
          alt={photoAltFor(photoKey, course.name)}
          sizes="(min-width: 1024px) 40vw, 92vw"
          loading="lazy"
          mask="soft-flat"
          className="course-card__photo"
          imgClassName="course-card__photo-img"
        />
        <span className="course-card__num" aria-hidden="true">
          {course.number}
        </span>
      </div>

      <div className="course-card__body">
        <p className="coord course-card__coord">Curso {course.number}</p>
        <h3 className="course-card__name">{course.name}</h3>

        <dl className="course-card__meta">
          <div>
            <dt>Frecuencia</dt>
            <dd>{course.frequency}</dd>
          </div>
          <div>
            <dt>Duración</dt>
            <dd>{course.duration}</dd>
          </div>
          <div className="course-card__meta--wide">
            <dt>Sedes</dt>
            <dd>{course.locations.map(locationName).join(' · ')}</dd>
          </div>
          <div className="course-card__meta--wide">
            <dt>Próximas fechas</dt>
            <dd>{course.start.label}</dd>
          </div>
        </dl>

        <div className="course-card__contents">
          <button
            type="button"
            className="course-card__toggle"
            id={btnId}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            <span>Contenidos</span>
            <Plus size={18} aria-hidden="true" />
          </button>
          <div id={panelId} role="region" aria-labelledby={btnId} className={`course-card__list ${open ? 'is-open' : ''}`}>
            <div className="course-card__list-inner">
              <ul className="course-card__checks">
                {course.contents.map((item) => (
                  <li key={item}>
                    <Check size={15} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <a href="#inscripcion" className="btn btn--ghost course-card__cta" onClick={handleCta}>
          {COURSE_CTA_TEXT}
          <Arrow className="btn__arrow" />
        </a>
      </div>
    </article>
  )
}

/**
 * Cursos principales: tarjetas grandes que alternan imagen/contenido en desktop
 * y se apilan con acordeón de contenidos en mobile.
 */
export default function CoursesSection() {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()
  const { selectCourse } = useSelectedCourse()

  useGSAP(
    (context) => {
      if (reduced) return
      const cards = context.selector('[data-course]')
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 86%' },
          },
        )
      })
    },
    { scope: rootRef },
  )

  const handleSelect = (course) => {
    track('course_select', { course_name: course.name, cta_text: COURSE_CTA_TEXT, cta_location: 'cursos' })
    selectCourse(course.name)
    scrollToTargetSection('inscripcion')
  }

  return (
    <section id="cursos" ref={rootRef} className="courses">
      <div className="container-site">
        <SectionHeading num="02" label="Cursos" title={COURSES_TITLE} intro={COURSE_INTRO} />
      </div>
      <div className="container-site courses__list">
        {COURSES.map((course) => (
          <CourseCard key={course.id} course={course} onSelect={handleSelect} />
        ))}
      </div>
    </section>
  )
}
