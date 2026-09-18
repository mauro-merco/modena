import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from './primitives'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const MODALIDAD_INTRO =
  'La modalidad intensiva concentra el aprendizaje en un recorrido de seis meses, combinando conceptos esenciales con práctica presencial. Cada clase está orientada a comprender, probar, diagnosticar y resolver.'

const STEPS = [
  { num: '01', title: 'Entendés', text: 'Conceptos y funcionamiento de cada sistema.' },
  { num: '02', title: 'Practicás', text: 'Trabajo con motores, herramientas y componentes reales.' },
  { num: '03', title: 'Diagnosticás', text: 'Medición, análisis y detección de fallas.' },
  { num: '04', title: 'Resolvés', text: 'Aplicación práctica con acompañamiento docente.' },
]

/**
 * Modalidad intensiva: cuatro pasos con una línea vertical que se dibuja a
 * medida que se avanza (desktop). Mobile: pasos apilados sin línea.
 */
export default function Modalidad() {
  const rootRef = useRef(null)
  const lineRef = useRef(null)
  const reduced = useReducedMotion()

  useGSAP(
    (context) => {
      if (reduced) return
      context.selector('[data-step]').forEach((step) => {
        gsap.fromTo(
          step,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: { trigger: step, start: 'top 86%' },
          },
        )
      })
      if (lineRef.current) {
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: '[data-steps]', start: 'top 80%', end: 'bottom 40%', scrub: true },
        })
      }
    },
    { scope: rootRef },
  )

  return (
    <section id="modalidad" ref={rootRef} className="modalidad">
      <div className="container-site">
        <SectionHeading num="03" label="Modalidad" title="Menos vueltas. Más taller." intro={MODALIDAD_INTRO} />

        <ol className="steps" data-steps>
          <li className="steps__guide" aria-hidden="true">
            <svg className="steps__line" viewBox="0 0 10 100" preserveAspectRatio="none">
              <path ref={lineRef} pathLength={1} d="M5 0 V100" />
            </svg>
          </li>
          {STEPS.map((step) => (
            <li key={step.num} className="step" data-step>
              <span className="step__num" aria-hidden="true">
                {step.num}
              </span>
              <div className="step__body">
                <h3 className="step__title">{step.title}</h3>
                <p className="step__text">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}