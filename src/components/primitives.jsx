import { Fragment } from 'react'

/** Tres líneas finas verde / blanco / rojo (motivo tricolor contenido). */
export function Tricolor({ className = '' }) {
  return (
    <span className={`tricolor ${className}`} aria-hidden="true">
      <span style={{ background: 'var(--brand-green)' }} />
      <span style={({ background: 'var(--color-ink)' })} />
      <span style={{ background: 'var(--brand-red)' }} />
    </span>
  )
}

/** Coordenada técnica: numeración de sección + título. */
export function SectionKicker({ num, label, className = '' }) {
  return (
    <p className={`kicker ${className}`}>
      <span aria-hidden="true">{num}</span> / <span>{label}</span>
    </p>
  )
}

/** Encabezado de sección tipográfico y editorial. */
export function SectionHeading({ num, label, title, intro, align = 'start', className = '' }) {
  return (
    <header className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
      <SectionKicker
        num={num}
        label={label}
        className={align === 'center' ? 'justify-center' : ''}
      />
      <h2 className="headline mt-4">{title}</h2>
      {intro ? <p className="lead mt-5 max-w-2xl">{intro}</p> : null}
    </header>
  )
}

/** Icono de flecha usado en CTAs y links. */
export function Arrow({ className = '' }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  )
}

/** Etiqueta / chip técnico. */
export function Chip({ children, tone = 'default', className = '' }) {
  return <span className={`tag-chip ${tone === 'green' ? 'tag-chip--green' : ''} ${className}`}>{children}</span>
}

export { Fragment }