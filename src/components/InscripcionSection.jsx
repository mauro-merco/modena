import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { SectionHeading, Chip } from './primitives'
import { useSelectedCourse } from '../lib/courseStore'
import { observeFormView, track } from '../lib/analytics'

const FORM_IFRAME_SRC = 'https://api.leadconnectorhq.com/widget/form/eHQ7OT4wu03SkCZoT7Pk'
const FORM_SCRIPT_SRC = 'https://link.msgsndr.com/js/form_embed.js'

const MESSAGES = [
  'Información de cursos y horarios',
  'Disponibilidad por sede',
  'Acompañamiento para elegir tu especialidad',
]

/**
 * Conversión: único formulario (iframe dummies del brief). El script se carga
 * una sola vez (flag en window) y el contenedor reserva altura para evitar CLS.
 * Al enviarse (evento 'modena:course-submitted') se limpia el curso guardado.
 */
export default function InscripcionSection() {
  const [loaded, setLoaded] = useState(false)
  const [scriptFailed, setScriptFailed] = useState(false)
  const shellRef = useRef(null)
  const { course, clearCourse } = useSelectedCourse()

  const injectScript = () => {
    if (typeof window === 'undefined') return
    if (window.__modenaFormEmbedInjected) return
    const s = document.createElement('script')
    s.src = FORM_SCRIPT_SRC
    s.async = true
    s.onload = () => {
      window.__modenaFormEmbedInjected = true
      setScriptFailed(false)
    }
    s.onerror = () => setScriptFailed(true)
    document.body.appendChild(s)
  }

  useEffect(() => {
    injectScript()
  }, [])

  // Reset del curso guardado cuando el usuario envía la consulta.
  useEffect(() => {
    const onSubmitted = () => clearCourse()
    window.addEventListener('modena:course-submitted', onSubmitted)
    return () => window.removeEventListener('modena:course-submitted', onSubmitted)
  }, [clearCourse])

  // form_view al 50% de visibilidad del formulario (una sola vez).
  useEffect(() => {
    const node = shellRef.current
    if (!node) return
    const io = observeFormView(node, () => track('form_view', { location: 'inscripcion' }))
    return () => io?.disconnect?.()
  }, [])

  const retry = () => {
    setScriptFailed(false)
    injectScript()
  }

  return (
    <section id="inscripcion" className="inscripcion">
      <div className="container-site">
        <SectionHeading
          num="07"
          label="Inscripción"
          title="Empezá tu formación en MODENA"
          intro="Dejanos tus datos y te contamos cuál es el curso, la sede y la modalidad que mejor se adapta a vos."
        />

        <div className="inscripcion__grid">
          <aside className="inscripcion__aside">
            <h3 className="inscripcion__aside-title">Qué podés consultar</h3>
            <ul className="inscripcion__points">
              {MESSAGES.map((msg) => (
                <li key={msg}>
                  <Check size={16} aria-hidden="true" />
                  <span>{msg}</span>
                </li>
              ))}
            </ul>
            <p className="inscripcion__note">
              Consultá disponibilidad y próximas fechas. El equipo se contacta para orientarte sin compromiso.
            </p>
            {course ? (
              <p className="inscripcion__selected">
                Consultás sobre <Chip tone="green">{course}</Chip>
              </p>
            ) : null}
          </aside>

          <div className="inscripcion__form">
            <div className="form-shell" ref={shellRef}>
              {scriptFailed ? (
                <div className="form-shell__state" role="alert">
                  <p>No pudimos cargar el formulario. Probá de nuevo en unos instantes.</p>
                  <button type="button" className="btn btn--ghost btn--small" onClick={retry}>
                    Reintentar
                  </button>
                </div>
              ) : (
                <>
                  {!loaded ? (
                    <div className="form-shell__state">
                      <span className="spinner" aria-hidden="true" />
                      <p>Cargando formulario…</p>
                    </div>
                  ) : null}
                  <iframe
                    src={FORM_IFRAME_SRC}
                    style={{ width: '100%', height: '100%', border: 'none', borderRadius: 8 }}
                    id="inline-eHQ7OT4wu03SkCZoT7Pk"
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Formulario Landing Page"
                    data-height="undefined"
                    data-layout-iframe-id="inline-eHQ7OT4wu03SkCZoT7Pk"
                    data-form-id="eHQ7OT4wu03SkCZoT7Pk"
                    data-cookie-consent="true"
                    data-cookie-consent-provider="auto"
                    title="Formulario Landing Page"
                    onLoad={() => setLoaded(true)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}