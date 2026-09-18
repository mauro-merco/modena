import { useCallback, useEffect, useState } from 'react'
import { STORAGE } from '../data/site'

function readStoredTheme() {
  if (typeof window === 'undefined') return null
  try {
    const v = window.localStorage.getItem(STORAGE.themeKey)
    if (v === 'dark' || v === 'light') return v
  } catch {
    /* sin acceso a storage: esto no debe romper la app */
  }
  return null
}

function systemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function apply(theme) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.classList.toggle('light', theme === 'light')
  root.dataset.theme = theme
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    const c = getComputedStyle(root).getPropertyValue('--color-base').trim()
    if (c.startsWith('#')) meta.setAttribute('content', c)
  }
}

/**
 * Tema dark/light persistido. El estado live se sincroniza con el `dataset.theme`
 * del <html> (que es lo que también lee el inline-theme scripts y ThemeToggle).
 */
export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof document === 'undefined') return 'dark'
    return document.documentElement.dataset.theme || readStoredTheme() || systemTheme()
  })

  const setTheme = useCallback((next) => {
    apply(next)
    setThemeState(next)
    try {
      window.localStorage.setItem(STORAGE.themeKey, next)
    } catch {
      /* sin storage */
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
  }, [theme, setTheme])

  // Persistir cambios provenientes del ThemeToggle (que llama a `apply` directo
  // evitando un estado compartido): escuchamos el evento custom para sincronizar.
  useEffect(() => {
    const sync = () => {
      const t = document.documentElement.dataset.theme
      if (t && t !== theme) setThemeState(t)
    }
    window.addEventListener('modena:theme', sync)
    return () => window.removeEventListener('modena:theme', sync)
  }, [theme])

  return { theme, setTheme, toggleTheme }
}

export function useSystemReducedMotion() {
  // Se implementa donde se necesite; ver useReducedMotion.
}