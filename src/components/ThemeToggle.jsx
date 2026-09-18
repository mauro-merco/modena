import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

/**
 * Selector de tema oscuro/claro.
 *
 * Ambos iconos se renderizan siempre y el CSS decide cuál se ve según
 * `html[data-theme]` — así el estado visual no depende del render de React
 * (evita saltos de tema en la primera pintura y al hidratar).
 */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      aria-pressed={theme === 'light'}
      title={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <span className="theme-toggle__ico theme-toggle__ico--sun" aria-hidden="true">
        <Sun size={16} />
      </span>
      <span className="theme-toggle__ico theme-toggle__ico--moon" aria-hidden="true">
        <Moon size={16} />
      </span>
    </button>
  )
}