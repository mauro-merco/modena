/**
 * Helpers de SEO compartidos entre el runtime (<Seo/>) y build (scripts/postbuild.mjs).
 * No inventan datos: todo sale de src/data y los valores null se omiten.
 */
import { SITE, HERO } from '../data/site.js'
import { COURSES } from '../data/courses.js'
import { FAQS } from '../data/faq.js'

export const isProduction = () => SITE.environment === 'production'

/** Resuelve una ruta absoluta si SITE.siteUrl está definido; si no, devuelve la ruta relativa. */
export function resolveUrl(path) {
  if (!SITE.siteUrl) return path || null
  const base = SITE.siteUrl.replace(/\/+$/, '')
  if (!path) return base
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

/** EducationalOrganization — solo datos validados. */
export function buildOrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE.fullName,
    description: HERO.text,
    inLanguage: 'es-AR',
  }
  if (SITE.siteUrl) schema.url = SITE.siteUrl
  return schema
}

/** Course por curso: nombre, descripción, modalidad presencial y proveedor. Sin fechas/rating/teléfono. */
export function buildCourseSchemas() {
  return COURSES.map((course) => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: course.name,
      description: course.seoDescription || course.shortDescription,
      inLanguage: 'es-AR',
      courseMode: 'OnSite',
      provider: { '@type': 'EducationalOrganization', name: SITE.fullName },
      offers: {
        '@type': 'Offer',
        category: 'Consultar disponibilidad',
        availability: 'https://schema.org/InStock',
      },
    }
    return schema
  })
}

/** FAQPage solo con respuestas marcadas `answerValidated: true` en src/data/faq.js. null si no hay. */
export function buildFaqSchema() {
  const validated = FAQS.filter((f) => f.answerValidated)
  if (!validated.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: validated.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}