import { CERTIFICATION } from '../data/site'

/**
 * Certificación y confianza.
 * En configuración: mientras CERTIFICATION.utn.enabled === false la sección no
 * se renderiza (sin afirmaciones sobre UTN, logos ni datos sin validar).
 * Cuando el cliente valide alcance/texto institucional, se completan los datos
 * en src/data/site.js y esta sección se activa sola.
 */
export default function CertificacionSection() {
  if (!CERTIFICATION.utn.enabled) return null
  return null
}