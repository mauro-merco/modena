/**
 * Preguntas frecuentes.
 * `validated: true` => la respuesta es la que figura en el brief y puede
 * incluirse en el JSON-LD FAQPage. Las pendientes se muestran con un
 * mensaje neutral y NO se envían al schema.
 */

export const FAQS = [
  {
    id: 'conocimientos-previos',
    question: '¿Necesito conocimientos previos?',
    answerValidated: false,
    answer:
      'Cada especialidad parte de los conceptos esenciales para que puedas avanzar con práctica desde el inicio. Si tenés dudas sobre requisitos para tu caso, consultanos por el formulario y te orientamos.',
  },
  {
    id: 'duracion',
    question: '¿Cuánto duran los cursos?',
    answerValidated: true,
    answer: 'Los cursos principales presentados tienen una duración de seis meses.',
  },
  {
    id: 'frecuencia',
    question: '¿Cuántas veces por semana se cursa?',
    answerValidated: true,
    answer: 'Depende del curso: entre una y tres veces por semana. Podés ver el detalle en cada especialidad.',
  },
  {
    id: 'practica',
    question: '¿Las clases son prácticas?',
    answerValidated: true,
    answer:
      'La formación combina los conceptos esenciales con práctica presencial sobre sistemas, componentes y situaciones reales de diagnóstico.',
  },
  {
    id: 'sedes',
    question: '¿En qué sedes se puede cursar?',
    answerValidated: true,
    answer:
      'MODENA cuenta con sedes en Ezeiza, La Plata y CABA — Constitución. La disponibilidad de cada curso se confirma al consultar.',
  },
  {
    id: 'certificacion',
    question: '¿Entregan certificación?',
    answerValidated: false,
    answer:
      'Estamos confirmando el alcance y las condiciones de la certificación para cada especialidad. Consultanos por el formulario y te informamos la vigencia al momento de tu consulta.',
  },
  {
    id: 'proximas-fechas',
    question: '¿Cuándo comienzan las próximas cursadas?',
    answerValidated: true,
    answer:
      'Las fechas varían según curso y sede. Completá el formulario para recibir la próxima disponibilidad.',
  },
  {
    id: 'inscripcion',
    question: '¿Cómo me inscribo?',
    answerValidated: true,
    answer:
      'Completá el formulario de la sección de inscripción. El equipo se pondrá en contacto para informar disponibilidad y próximos pasos.',
  },
]

export const FAQ_TITLE = 'Antes de empezar'
export const FAQ_INTRO = 'Las respuestas cortas a lo que más se suele preguntar. Cualquier otra duda, nos la dejás en el formulario.'