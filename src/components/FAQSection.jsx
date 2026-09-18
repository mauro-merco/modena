import { useRef, useState, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus } from 'lucide-react'
import { SectionHeading } from './primitives'
import { FAQS, FAQ_TITLE, FAQ_INTRO } from '../data/faq'
import { track } from '../lib/analytics'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * FAQ accesible: acordeón con aria-expanded/aria-controls y regions.
 * Un panel abierto a la vez en mobile; varios en desktop no daña la lectura.
 * La altura se anima sin display:none (CSS grid 0fr).
 */
export default function FAQSection() {
  const [openIds, setOpenIds] = useState(() => new Set())
  const rootRef = useRef(null)
  const reduced = useReducedMotion()

  const toggle = useCallback((id, question) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        return next
      }
      const singlePanel = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
      if (singlePanel) next.clear()
      next.add(id)
      track('faq_open', { question })
      return next
    })
  }, [])

  useGSAP(
    (context) => {
      if (reduced) return
      context.selector('[data-faq]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 92%' },
          },
        )
      })
    },
    { scope: rootRef },
  )

  return (
    <section id="preguntas" ref={rootRef} className="faq">
      <div className="container-site">
        <SectionHeading num="06" label="Preguntas" title={FAQ_TITLE} intro={FAQ_INTRO} />

        <div className="faq-list">
          {FAQS.map((faq) => {
            const open = openIds.has(faq.id)
            return (
              <div key={faq.id} className="faq-item" data-faq>
                <h3 className="faq-question">
                  <button
                    type="button"
                    className="faq-toggle"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${faq.id}`}
                    id={`faq-button-${faq.id}`}
                    onClick={() => toggle(faq.id, faq.question)}
                  >
                    <span>{faq.question}</span>
                    <Plus className="faq-icon" size={20} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-button-${faq.id}`}
                  className={`accordion__panel ${open ? 'is-open' : ''}`}
                  aria-hidden={!open}
                >
                  <div>
                    <p className="faq-answer">{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}