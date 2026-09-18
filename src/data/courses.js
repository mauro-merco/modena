/**
 * Cursos MODENA. Editar fechas, frecuencias, sedes y contenidos acá.
 * Las fechas de inicio no están confirmadas: se muestra un mensaje neutral.
 */

export const COURSES = [
  {
    id: 'mecanica-automotriz',
    slug: 'mecanica-automotriz',
    name: 'Mecánica Automotriz',
    number: '01',
    frequency: '3 veces por semana',
    duration: '6 meses',
    start: {
      /** ISO o null. Confirmar con MODENA antes de publicar una fecha. */
      date: null,
      /** Mensaje neutral que se muestra cuando date es null. */
      label: 'Consultá próximas fechas y disponibilidad',
      /** Las piezas promocionales mencionan octubre: quedó pendiente de confirmación de vigencia. */
      campaignHint: 'octubre',
    },
    locations: ['caba-constitucion', 'ezeiza', 'la-plata'],
    shortDescription:
      'Formación práctica sobre tren delantero, distribución, frenos, armado y desarmado de motor y diagnóstico de fallas, trabajando sobre vehículos reales.',
    seoDescription:
      'Curso de mecánica automotriz intensivo y práctico con clases presenciales en CABA, Ezeiza y La Plata.',
    contents: ['Tren delantero', 'Distribución', 'Frenos', 'Armado y desarmado de motor', 'Diagnóstico de fallas', 'Reparaciones habituales de taller'],
  },
  {
    id: 'electricidad-automotriz',
    slug: 'electricidad-y-electronica',
    name: 'Electricidad y Electrónica del Automóvil',
    number: '02',
    frequency: '2 veces por semana',
    duration: '6 meses',
    start: {
      date: null,
      label: 'Consultá próximas fechas y disponibilidad',
      campaignHint: 'octubre',
    },
    locations: ['caba-constitucion', 'ezeiza', 'la-plata'],
    shortDescription:
      'Diagnóstico eléctrico completo: sensores, actuadores, señales PWM, comunicación entre módulos y medición con escáner sobre sistemas reales.',
    seoDescription:
      'Curso de electricidad y electrónica del automóvil intensivo y práctico, con diagnóstico con escáner en CABA, Ezeiza y La Plata.',
    contents: [
      'Diagnóstico eléctrico del automóvil',
      'Medición y análisis de sensores y actuadores',
      'Señales PWM y electrónica aplicada',
      'Comunicación entre módulos',
      'Diagnóstico con escáner, luces, arranque y carga',
    ],
  },
  {
    id: 'motos',
    slug: 'mecanica-y-electricidad-de-motos',
    name: 'Mecánica y Electricidad de Motos',
    number: '03',
    frequency: '1 vez por semana',
    duration: '6 meses',
    start: {
      date: null,
      label: 'Consultá próximas fechas y disponibilidad',
      campaignHint: 'octubre',
    },
    locations: ['caba-constitucion', 'ezeiza', 'la-plata'],
    shortDescription:
      'Desarme, armado y puesta a punto de motores 2T y 4T, carburación, electricidad y diagnóstico de fallas con práctica sobre motos.',
    seoDescription:
      'Curso de mecánica y electricidad de motos intensivo y práctico, con trabajo real en taller en CABA, Ezeiza y La Plata.',
    contents: [
      'Motores 2T y 4T',
      'Desarme, armado y puesta a punto',
      'Carburación y sistema de combustible',
      'Electricidad, encendido y sistema de carga',
      'Diagnóstico y detección de fallas',
    ],
  },
  {
    id: 'inyeccion-electronic-a-automotriz',
    slug: 'inyeccion-electronica-automotriz',
    name: 'Inyección Electrónica Automotriz',
    number: '04',
    frequency: '2 veces por semana',
    duration: '6 meses',
    start: {
      date: null,
      label: 'Consultá próximas fechas y disponibilidad',
      campaignHint: 'octubre',
    },
    locations: ['caba-constitucion', 'ezeiza', 'la-plata'],
    shortDescription:
      'Funcionamiento del sistema de inyección, sensores, actuadores y sonda lambda, con escáner, osciloscopio y lectura de señales en práctica.',
    seoDescription:
      'Curso de inyección electrónica automotriz intensivo y práctico con escáner y osciloscopio en CABA, Ezeiza y La Plata.',
    contents: [
      'Funcionamiento del sistema de inyección electrónica',
      'Sensores, actuadores y sonda lambda',
      'Diagnóstico y localización de fallas',
      'Escáner, osciloscopio y lectura de señales',
      'Inyectores y encendido',
    ],
  },
]

export const COURSE_CTA_TEXT = 'Consultar por este curso'
export const COURSE_INTRO = 'Cuatro recorridos prácticos para formarte con herramientas, sistemas y situaciones reales de taller.'
export const COURSES_TITLE = 'Elegí tu especialidad'