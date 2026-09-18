import { useCallback, useEffect, useState } from 'react'
import { STORAGE } from '../data/site'

const NAME = 'modena:course-selected'

function read() {
  try {
    return window.localStorage.getItem(STORAGE.selectedCourseKey) || null
  } catch {
    return null
  }
}

/**
 * Almacén del curso seleccionado para pre-llenar la intención de la consulta.
 * Sin tocar el formulario embebido: solo guarda el dato en localStorage
 * y emite un evento para que la sección de inscripción lo refleje.
 */
export function useSelectedCourse() {
  const [course, setCourse] = useState(null)

  useEffect(() => {
    setCourse(read())
    const onChange = () => setCourse(read())
    window.addEventListener(NAME, onChange)
    window.addEventListener('modena:course', onChange)
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE.selectedCourseKey) setCourse(read())
    })
    return () => {
      window.removeEventListener(NAME, onChange)
      window.removeEventListener('modena:course', onChange)
    }
  }, [])

  const selectCourse = useCallback((name) => {
    try {
      window.localStorage.setItem(STORAGE.selectedCourseKey, name)
    } catch {
      /* sin almacenamiento */
    }
    window.dispatchEvent(new CustomEvent(NAME))
    setCourse(name)
  }, [])

  const clearCourse = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE.selectedCourseKey)
    } catch {
      /* noop */
    }
    window.dispatchEvent(new CustomEvent(NAME))
    setCourse(null)
  }, [])

  return { course, selectCourse, clearCourse }
}