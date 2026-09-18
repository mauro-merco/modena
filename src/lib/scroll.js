import { reducedMotionNow } from '../hooks/useReducedMotion'

/** Desplazamiento suave a una sección, respetando prefers-reduced-motion. */
export function scrollToTarget(el, dismiss = () => {}) {
  if (!el) return
  const reduced = reducedMotionNow()
  if (reduced) {
    const header = document.querySelector('.header')
    const top = el.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 0) - 12
    window.scrollTo({ top: Math.max(0, top), behavior: 'auto' })
    dismiss()
    return
  }
  try {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    dismiss()
  } catch {
    el.scrollIntoView()
    dismiss()
  }
}

/** Scroll suave a una sección por id (conveniente para CTAs que solo conocen la ancla). */
export function scrollToTargetSection(id, opts = {}) {
  if (typeof document === 'undefined') return false
  const el = typeof id === 'string' ? document.getElementById(id) : id
  if (!el) return false
  const header = document.querySelector('.header')
  const headerH = header?.offsetHeight || 0
  const reduced = reducedMotionNow()
  if (reduced || opts.instant) {
    const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - headerH - 12)
    window.scrollTo({ top, behavior: 'auto' })
  } else {
    try {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } catch {
      el.scrollIntoView({ block: 'start' })
    }
  }
  opts.onComplete?.()
  return true
}
