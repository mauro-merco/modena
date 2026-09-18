import { useCallback } from 'react'
import { track } from '../lib/analytics'
import { prefersReducedMotionNow } from './useReducedMotion'

/**
 * Scroll suave a una sección por ancla. Respeta prefers-reduced-motion.
 * `opts.event` registra en dataLayer el evento cta_click.
 */
export function useScrollToSection() {
  return useCallback((id, opts = {}) => {
    if (typeof document === 'undefined') return
    const el = document.getElementById(id) || document.querySelector(`#${id}`)
    if (el) {
      el.scrollIntoView({
        behavior: prefersReducedMotionNow() ? 'auto' : 'smooth',
        block: 'start',
      })
    }
    if (opts.event) {
      track('cta_click', { cta_location: opts.location || 'header', cta_text: opts.event, cta_target: `#${id}` })
    }
  }, [])
}