import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

/**
 * Selector de tema oscuro/claro.
 *
 * Switch horizontal accesible. Ambos iconos permanecen visibles como
 * referencia y el pulgar señala el tema activo.
 */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      type="button"
      className="theme-toggle"
      role="switch"
      aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      aria-checked={theme === 'dark'}
      title={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <span className="theme-toggle__ico theme-toggle__ico--sun" aria-hidden="true">
        <Sun size={16} />
      </span>
      <span className="theme-toggle__ico theme-toggle__ico--moon" aria-hidden="true">
        <Moon size={16} />
      </span>
      <span className="theme-toggle__thumb" aria-hidden="true" />
    </button>
  )
}
