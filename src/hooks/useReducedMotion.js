import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function matches() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(QUERY).matches
}

/**
 * Accesible + reducido: informa si el usuario prefiere menos movimiento.
 * Se usa para (a) desactivar animaciones y (b) elegir scroll instantáneo.
 * Es reactivo: se actualiza si la preferencia del sistema cambia en caliente.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => matches())

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const mql = window.matchMedia(QUERY)
    const onChange = () => setReduced(mql.matches)
    mql.addEventListener?.('change', onChange)
    setReduced(mql.matches)
    return () => mql.removeEventListener?.('change', onChange)
  }, [])

  return reduced
}

/** Versión no reactiva para leer dentro de handlers (scroll, sin re-render). */
export function reducedMotionNow() {
  return matches()
}

/** Alias estable de reducedMotionNow (se evita que los consumidores dependan del nombre interno). */
export const useReducedMotionNow = reducedMotionNow

/** Alias para compatibilidad con consumidores existentes. */
export const prefersReducedMotionNow = reducedMotionNow