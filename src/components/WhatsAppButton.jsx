import { useEffect, useState } from 'react'
import { CONTACT } from '../data/site'
import { track } from '../lib/analytics'

/** Mensaje precargado al abrir la conversación. */
const WA_MESSAGE = '¡Hola MODENA! Me gustaría recibir información sobre los cursos.'

/** La burbuja se auto-muestra una vez por sesión y también con hover/foco. */
const AUTO_OPEN_DELAY = 900
const AUTO_HOLD = 6000

/**
 * Botón flotante de WhatsApp con anillos de pulso, entrada animada y una
 * burbuja de bienvenida. Abre wa.me con el mensaje precargado.
 */
export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)
  const [autoShown, setAutoShown] = useState(false)

  useEffect(() => {
    if (autoShown || typeof window === 'undefined') return
    setAutoShown(true)
    const show = window.setTimeout(() => setOpen(true), AUTO_OPEN_DELAY)
    const hide = window.setTimeout(() => setOpen(false), AUTO_OPEN_DELAY + AUTO_HOLD)
    return () => {
      window.clearTimeout(show)
      window.clearTimeout(hide)
    }
  }, [autoShown])

  if (!CONTACT.whatsappNumber) return null

  const href = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(WA_MESSAGE)}`

  const onClick = () =>
    track('cta_click', { cta_text: 'WhatsApp flotante', cta_location: 'floating-whatsapp' })

  return (
    <div className="wa-float" data-open={open}>
      <div className="wa-bubble" aria-hidden={!open}>
        <p className="wa-bubble__title">¡Hola! ¿Te ayudamos?</p>
        <p className="wa-bubble__text">
          Escribinos por WhatsApp y te respondemos rápido con toda la info de los cursos.
        </p>
        <span className="wa-bubble__phone">{CONTACT.whatsapp}</span>
        <span className="wa-bubble__status">Respondemos rápido</span>
      </div>

      <span className="wa-float__wrap">
        <span className="wa-float__ring" aria-hidden="true" />
        <a
          className="wa-float__btn"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Abrir WhatsApp al ${CONTACT.whatsapp}`}
          onClick={onClick}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </span>
    </div>
  )
}