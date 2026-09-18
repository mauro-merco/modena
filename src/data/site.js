/**
 * Configuración general del sitio MODENA.
 * Todo dato variable/pendiente de validación vive acá, separado de los componentes.
 * Los valores null/ocultos NO se renderizan en producción.
 */

export const SITE = {
  name: 'MODENA',
  fullName: 'MODENA — Instituto de Mecánica Automotriz',
  tagline: 'Formación en movimiento.',
  /** Url pública. Se usa para canonical, sitemap y OG absolutas.
   *  Dejar null si el dominio aún no está definido (canonical se omite). */
  siteUrl: null,
  /** 'production' indexa; cualquier otro valor emite noindex. Se inyecta en el build. */
  environment: process.env.MODENA_ENV || 'staging',
  enrollmentSectionId: 'inscripcion',
  coursesSectionId: 'cursos',
  analytics: {
    /** Colocar el ID de GTM/GA4 real cuando exista (no se publican IDs inventados). */
    gtmId: null,
  },
}

export const CONTACT = {
  phone: null,
  whatsapp: null,
  email: null,
  instagram: null,
  /** Política de privacidad: ruta a documentar. La página existe como placeholder pendiente de revisión legal. */
  privacyPolicyPath: '/privacidad.html',
}

export const CERTIFICATION = {
  /** Cuando la certificación UTN esté validada: alcance (por curso), texto institucional exacto y logo. */
  utn: {
    /* Mientras no haya validación, mantenemos la sección en configuración y no se renderiza. */
    enabled: false,
    /** Alcance por curso. false => no afirmar nada generalizado. */
    appliesToAllCourses: false,
    /** Texto institucional exacto una vez validado. */
    officialText: null,
    /** URL del logo oficial autorizado (si corresponde). */
    logoUrl: null,
  },
  /** Datos rápidos del hero: mostrar la afirmación "Certificación UTN" solo si aplica a todos los cursos. */
  heroClaim: false,
}

export const BENEFITS = {
  /** Descuento/beneficio por asistir a charlas informativas: pendiente de validación de condiciones y vigencia. */
  infoMeetings: {
    enabled: false,
    text: null,
  },
}

export const STORAGE = {
  themeKey: 'modena-theme',
  selectedCourseKey: 'modena-curso-seleccionado',
  utmKey: 'modena-utm',
  /** Mantener el último scroll para restaurarlo al cerrar el menú mobile. */
  scrollLockKey: 'modena-scroll-lock',
}

export const ANCHORS = [
  { id: 'inicio', num: '01', label: 'Inicio' },
  { id: 'cursos', num: '02', label: 'Cursos' },
  { id: 'modalidad', num: '03', label: 'Modalidad' },
  { id: 'experiencia', num: '04', label: 'Experiencia' },
  { id: 'sedes', num: '05', label: 'Sedes' },
  { id: 'preguntas', num: '06', label: 'Preguntas' },
  { id: 'inscripcion', num: '07', label: 'Inscripción' },
]

export const HERO = {
  eyebrow: 'Instituto de Mecánica Automotriz',
  // Se descompone para poder acentuar una palabra sin inclinaciones masivas.
  headA: 'Aprendé haciendo.',
  headB: 'Formate en modo',
  headAccent: 'intensivo.',
  text: 'Capacitación práctica para aprender mecánica automotriz, electrónica y motos en menos tiempo, con clases presenciales y trabajo real sobre vehículos y componentes.',
  ctaPrimary: 'Quiero recibir información',
  ctaSecondary: 'Conocer los cursos',
  // Etiqueta dinámica sutil del hero.
  badge: 'Práctica real / Formación intensiva',
  facts: [
    { top: '04', label: 'Cursos principales' },
    { top: '06', label: 'Meses de duración' },
    { top: '03', label: 'Sedes' },
  ],
}