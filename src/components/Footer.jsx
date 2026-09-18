import { SITE, CONTACT, ANCHORS } from '../data/site'
import { LOCATIONS } from '../data/locations'
import { Tricolor } from './primitives'
import { scrollToTargetSection } from '../lib/scroll'

/**
 * Footer: logo por tema, navegación abreviada, sedes y contacto solo si está
 * definido (sino, mensaje neutral). Cierre tricolor.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  const go = (id) => (e) => {
    e.preventDefault()
    scrollToTargetSection(id)
  }

  return (
    <footer className="footer">
      <div className="container-site">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#inicio" className="footer__logo" onClick={go('inicio')} aria-label="MODENA — volver al inicio">
              <img
                className="logo-theme logo-theme--light"
                src="/media/brand/logo-para-fondo-light.webp"
                width="200"
                height="103"
                alt=""
                loading="lazy"
              />
              <img
                className="logo-theme logo-theme--dark"
                src="/media/brand/logo-para-fondo-dark.webp"
                width="200"
                height="103"
                alt=""
                loading="lazy"
              />
            </a>
            <p className="footer__tagline">{SITE.tagline}</p>
          </div>

          <nav className="footer__col" aria-label="Navegación del pie de página">
            <p className="footer__title">Navegación</p>
            <ul className="footer__list">
              {ANCHORS.map((anchor) => (
                <li key={anchor.id}>
                  <a href={`#${anchor.id}`} onClick={go(anchor.id)}>
                    {anchor.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <p className="footer__title">Sedes</p>
            <ul className="footer__list">
              {LOCATIONS.map((loc) => (
                <li key={loc.id}>
                  <a href="#inscripcion" onClick={go('inscripcion')}>
                    {loc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__title">Contacto</p>
            {CONTACT.phone || CONTACT.whatsapp || CONTACT.email || CONTACT.instagram ? (
              <ul className="footer__list">
                {CONTACT.phone ? <li>{CONTACT.phone}</li> : null}
                {CONTACT.whatsapp ? <li>{CONTACT.whatsapp}</li> : null}
                {CONTACT.email ? <li>{CONTACT.email}</li> : null}
                {CONTACT.instagram ? <li>{CONTACT.instagram}</li> : null}
              </ul>
            ) : (
              <p className="footer__pending">
                Consultá disponibilidad y próximas fechas por el{' '}
                <a href="#inscripcion" onClick={go('inscripcion')}>
                  formulario
                </a>
                .
              </p>
            )}
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {SITE.fullName}. Todos los derechos reservados.
          </p>
          <a href={CONTACT.privacyPolicyPath} className="footer__legal">
            Política de privacidad
          </a>
        </div>
      </div>
      <Tricolor className="footer__tricolor" />
    </footer>
  )
}
