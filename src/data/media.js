/**
 * Catálogo de medios reales de MODENA.
 * Solo referencias a archivos producidos por scripts/prepare-assets.mjs
 * a partir de las piezas originales de la raíz del proyecto.
 */

export const PHOTO_WIDTHS = [400, 640, 1080]
export const PHOTO_W = 1122
export const PHOTO_H = 1402

export const CUTOUTS = {
  'mecanica-practica': {
    src: '/media/cutout/mecanica-practica.webp',
    alt: 'Dos estudiantes realizando una práctica de mecánica sobre un motor de automóvil',
  },
  'diagnostico-electronico': {
    src: '/media/cutout/diagnostico-electronico.webp',
    alt: 'Estudiantes realizando diagnóstico electrónico sobre un automóvil',
  },
  'mecanica-motos': {
    src: '/media/cutout/mecanica-motos.webp',
    alt: 'Estudiantes trabajando sobre un motor de motocicleta en banco',
  },
  'formacion-practica': {
    src: '/media/cutout/formacion-practica.webp',
    alt: 'Instructor guiando a estudiantes durante una práctica sobre un motor',
  },
}

export const VIDEO = {
  key: 'pauta-electricidad',
  title: 'Pauta — Electricidad y Electrónica del Automóvil',
  description: 'Pieza audiovisual real de MODENA del curso de Electricidad y Electrónica del Automóvil.',
  // Sin audio (decorativo, loop en franja/hero)
  loopMp4: '/media/video/pauta-electricidad.mp4',
  loopWebm: '/media/video/pauta-electricidad.webm',
  // Con audio (reproducción a demanda en modal)
  audioMp4: '/media/video/pauta-electricidad-audio.mp4',
  poster: '/media/video/pauta-electricidad-poster.jpg',
}

/**
 * Galería editorial "Así se aprende en MODENA".
 * `span` define la posición en la grilla de 12 columnas (desktop).
 * `alt` y `caption` están pendientes de revisión visual humana de cada pieza.
 */
export const GALLERY = [
  {
    kind: 'photo',
    key: 'mecanica-practica',
    span: 'lg:col-span-5 lg:row-span-2',
    ratio: 'aspect-[4/5]',
    alt: CUTOUTS['mecanica-practica'].alt,
    caption: 'Mecánica automotriz en práctica',
  },
  {
    kind: 'photo',
    key: 'diagnostico-electronico',
    span: 'lg:col-span-3',
    ratio: 'aspect-[4/5]',
    alt: CUTOUTS['diagnostico-electronico'].alt,
    caption: 'Medición y diagnóstico',
  },
  {
    kind: 'photo',
    key: 'mecanica-motos',
    span: 'lg:col-span-3 lg:row-span-2',
    ratio: 'aspect-[4/5]',
    alt: CUTOUTS['mecanica-motos'].alt,
    caption: 'Mecánica y electricidad de motos',
    parallax: true,
  },
  {
    kind: 'photo',
    key: 'formacion-practica',
    span: 'lg:col-span-4',
    ratio: 'aspect-[4/5]',
    alt: CUTOUTS['formacion-practica'].alt,
    caption: 'Acompañamiento docente',
    parallax: true,
  },
]

/** Franja horizontal de evidencia inmediatamente tras el hero. */
export const STRIP = [
  { key: 'mecanica-practica', caption: 'Mecánica automotriz' },
  { key: 'diagnostico-electronico', caption: 'Diagnóstico electrónico' },
  { key: 'mecanica-motos', caption: 'Mecánica de motos' },
  { key: 'formacion-practica', caption: 'Formación práctica' },
]

export const HERO_PHOTO = { key: 'mecanica-practica', alt: CUTOUTS['mecanica-practica'].alt }

export const HERO_VIDEO_CARD = {
  poster: VIDEO.poster,
  srcMp4: VIDEO.loopMp4,
  srcWebm: VIDEO.loopWebm,
  alt: 'Fragmento del material real de clases en MODENA',
}
