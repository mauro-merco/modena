import { useEffect } from 'react'
import { SITE } from '../data/site'
import {
  buildOrganizationSchema,
  buildCourseSchemas,
  buildFaqSchema,
  resolveUrl,
  isProduction,
} from '../lib/seo'

/**
 * Inyecta y mantiene la metadata dinámica del <head> (SEO on-page de una SPA):
 * robots por entorno, canonical/og absolutas cuando hay dominio, y JSON-LD.
 * Es idempotente y convive con el estático emitido por scripts/postbuild.mjs:
 * los elementos marcados `data-modena-seo="static"` no se duplican en runtime.
 */
const STATIC = '[data-modena-seo="static"]'

function hasStatic(sel) {
  return !!document.querySelector(`${sel}${STATIC}`)
}

function upsertMeta(name, content) {
  if (hasStatic(`meta[name="${name}"]`)) return
  let el = document.head.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  el.setAttribute('data-modena-seo', 'dynamic')
}

function upsertProperty(property, content) {
  if (content == null) {
    const el = document.head.querySelector(`meta[property="${property}"]`)
    if (el && el.getAttribute('data-modena-seo') !== 'static') el.remove()
    return
  }
  if (hasStatic(`meta[property="${property}"]`)) return
  let el = document.head.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  el.setAttribute('data-modena-seo', 'dynamic')
}

function upsertCanonical(href) {
  if (hasStatic('link[rel="canonical"]')) return
  const existing = document.head.querySelector('link[rel="canonical"]')
  if (!href) {
    if (existing) existing.remove()
    return
  }
  const el = existing || document.createElement('link')
  if (!existing) {
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  el.setAttribute('data-modena-seo', 'dynamic')
}

function adoptStaticImageMeta() {
  const img = resolveUrl('/og/og-image.jpg')
  if (!img) return
  const og = document.head.querySelector('meta[property="og:image"]')
  const tw = document.head.querySelector('meta[name="twitter:image"]')
  const apply = (el) => {
    if (el && el.getAttribute('data-modena-seo') !== 'static') el.setAttribute('content', img)
  }
  apply(og)
  apply(tw)
}

function upsertJsonLd(id, data) {
  const existedStatic = document.querySelector(`script[data-modena-seo="static"][id="${id}"]`)
  if (data == null) {
    if (!existedStatic) document.querySelector(`script#${id}`)?.remove()
    return
  }
  if (existedStatic) return
  let el = document.querySelector(`script#${id}`)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
  el.setAttribute('data-modena-seo', 'dynamic')
}

export default function Seo() {
  useEffect(() => {
    // Robots según entorno (noindex en staging, indexable en producción).
    upsertMeta('robots', isProduction() ? 'index, follow' : 'noindex, nofollow')

    if (SITE.siteUrl) {
      const base = SITE.siteUrl.replace(/\/+$/, '')
      upsertCanonical(`${base}/`)
      upsertProperty('og:url', `${base}/`)
    } else {
      upsertCanonical(null)
      upsertProperty('og:url', null)
    }
    adoptStaticImageMeta()

    // JSON-LD
    upsertJsonLd('modena-ld-org', buildOrganizationSchema())
    upsertJsonLd('modena-ld-courses', buildCourseSchemas())
    upsertJsonLd('modena-ld-faq', buildFaqSchema())
  }, [])

  return null
}