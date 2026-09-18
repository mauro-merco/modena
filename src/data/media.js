/**
 * Catálogo de medios reales de MODENA.
 * Solo referencias a archivos producidos por scripts/prepare-assets.mjs
 * a partir de las piezas originales de la raíz del proyecto.
 */

export const PHOTO_WIDTHS = [400, 640, 1080]
export const PHOTO_W = 1122
export const PHOTO_H = 1402

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
    key: 'clase-01',
    span: 'lg:col-span-5 lg:row-span-2',
    ratio: 'aspect-[4/5]',
    alt: 'Práctica de mecánica automotriz en el taller de MODENA con herramientas y componentes reales',
    caption: 'Clases prácticas en el taller',
    altPendingReview: true,
  },
  {
    kind: 'video',
    key: VIDEO.key,
    span: 'lg:col-span-4 lg:row-span-2',
    ratio: 'aspect-[9/16]',
    title: 'Electricidad y Electrónica del Automóvil',
    alt: 'Pieza audiovisual del curso de Electricidad y Electrónica del Automóvil de MODENA',
    caption: 'Electricidad y Electrónica del Automóvil',
  },
  {
    kind: 'photo',
    key: 'clase-02',
    span: 'lg:col-span-3',
    ratio: 'aspect-[4/5]',
    alt: 'Alumno de MODENA trabajando sobre motores y componentes en clase práctica',
    caption: 'Motores y componentes',
    altPendingReview: true,
  },
  {
    kind: 'photo',
    key: 'clase-03',
    span: 'lg:col-span-3 lg:row-span-2',
    ratio: 'aspect-[4/5]',
    alt: 'Medición y diagnóstico sobre el sistema eléctrico del automóvil en MODENA',
    caption: 'Medición y diagnóstico',
    parallax: true,
    altPendingReview: true,
  },
  {
    kind: 'photo',
    key: 'clase-04',
    span: 'lg:col-span-4',
    ratio: 'aspect-[4/5]',
    alt: 'Práctica de mecánica de motos durante una clase de MODENA',
    caption: 'Prácticas de motos',
    altPendingReview: true,
  },
  {
    kind: 'photo',
    key: 'clase-05',
    span: 'lg:col-span-4',
    ratio: 'aspect-[4/5]',
    alt: 'Interior del taller de MODENA con alumnos en formación práctica',
    caption: 'Aulas-taller y equipamiento',
    altPendingReview: true,
  },
  {
    kind: 'photo',
    key: 'clase-06',
    span: 'lg:col-span-4',
    ratio: 'aspect-[4/5]',
    alt: 'Actividad práctica de electrónica del automóvil en el taller de MODENA',
    caption: 'Electrónica del automóvil',
    parallax: true,
    altPendingReview: true,
  },
]

/** Franja horizontal de evidencia inmediatamente tras el hero. */
export const STRIP = [
  { key: 'clase-02', caption: 'Motor en banco de trabajo' },
  { kind: 'video', key: VIDEO.key, caption: 'Electricidad y Electrónica' },
  { key: 'clase-04', caption: 'Práctica sobre motos' },
  { key: 'clase-06', caption: 'Diagnóstico de señales' },
  { key: 'clase-03', caption: 'Medición con escáner' },
  { key: 'clase-05', caption: 'Aula-taller' },
  { key: 'clase-07', caption: 'Herramientas y bancos' },
]

export const HERO_PHOTO = { key: 'clase-01', alt: 'Práctica de mecánica automotriz en el taller de MODENA con herramientas y componentes reales' }

export const HERO_VIDEO_CARD = {
  poster: VIDEO.poster,
  srcMp4: VIDEO.loopMp4,
  srcWebm: VIDEO.loopWebm,
  alt: 'Fragmento del material real de clases en MODENA',
}