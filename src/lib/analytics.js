/**
 * Capa de analítica preparada para GA4/GTM.
 * No se incluyen IDs inventados: cuando el cliente provea el ID de contenedor
 * (SITE.analytics.gtmId) se inyectará el snippet correspondiente.
 * Todos los eventos usan la pila estándar `dataLayer` para no bloquear conversión.
 */

function getDataLayer() {
  if (typeof window === 'undefined') return null
  window.dataLayer = window.dataLayer || []
  return window.dataLayer
}

/** Push genérico. Devuelve false si no hay entorno de navegador. */
export function track(event, params = {}) {
  const dl = getDataLayer()
  if (!dl) return false
  dl.push({
    event,
    ...params,
    modena: true,
    ts: Date.now(),
  })
  return true
}

/** Captura UTMs una vez por sesión y los deposita en sessionStorage + dataLayer. */
export function captureUtms() {
  if (typeof window === 'undefined') return
  try {
    const params = new URLSearchParams(window.location.search)
    const utm = {}
    let has = false
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      const v = params.get(key)
      if (v) {
        utm[key] = v
        has = true
      }
    }
    if (has) {
      const prev = sessionStorage.getItem('modena-utm')
      const parsed = prev ? JSON.parse(prev) : {}
      const next = { ...parsed, ...utm }
      sessionStorage.setItem('modena-utm', JSON.stringify(next))
      track('modena_utm', next)
    }
  } catch {
    /* sin sessionStorage: no bloquea */
  }
}

/** GTM: init a pedido cuando exista un ID real (evita IDs inventados en el bundle). */
export function initGTM(gtmId) {
  if (!gtmId || typeof window === 'undefined') return
  if (window.__modenaGtmInjected) return
  window.__modenaGtmInjected = true
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
  document.head.appendChild(s)
}

/** Observa visibilidad del formulario y dispara form_view al 50% una sola vez. */
export function observeFormView(node, onView) {
  if (!node || typeof window === 'undefined' || !('IntersectionObserver' in window)) return null
  let fired = false
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !fired) {
          fired = true
          onView && onView()
          io.disconnect()
        }
      })
    },
    { threshold: [0.5] },
  )
  io.observe(node)
  return io
}