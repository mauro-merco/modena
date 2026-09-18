/**
 * Post-procesa dist/ tras `vite build`:
 * - Inyecta canonical, robots e imágenes OG absolutas cuando SITE.siteUrl existe.
 * - Inyecta JSON-LD estático (marked data-modena-seo="static" para no duplicar
 *   lo que <Seo/> maneja en runtime).
 * - Escribe robots.txt y sitemap.xml según entorno.
 * No inventa datos: se apoya en src/data/* y src/lib/seo.js.
 */
/* eslint-disable no-console */
import { readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')

const { SITE } = await import('../src/data/site.js')
const { buildOrganizationSchema, buildCourseSchemas, buildFaqSchema, resolveUrl, isProduction } = await import('../src/lib/seo.js')

const log = (m) => console.log('[postbuild] ' + m)

const htmlPath = join(DIST, 'index.html')
if (!existsSync(htmlPath)) {
  log('dist/index.html no existe; sin postbuild.')
  process.exit(0)
}
let html = readFileSync(htmlPath, 'utf8')

const prod = isProduction()

/* ---------- robots ---------- */
const robotsContent = prod ? 'index, follow' : 'noindex, nofollow'
html = html.replace(
  /<meta name="robots"[^>]*>/,
  `<meta name="robots" content="${robotsContent}" data-modena-seo="static">`,
)

/* ---------- canonical + image absolutas ---------- */
if (SITE.siteUrl) {
  const abs = resolveUrl('/')
  html = html.replace('</head>', `    <link rel="canonical" href="${abs}" data-modena-seo="static">\n  </head>`)

  const img = resolveUrl('/og/og-image.jpg')
  html = html.replace('<meta property="og:image" content="/og/og-image.jpg"', `<meta property="og:image" content="${img}"`)
  html = html.replace('<meta name="twitter:image" content="/og/og-image.jpg"', `<meta name="twitter:image" content="${img}"`)
}

/* ---------- JSON-LD ---------- */
const schemas = [
  ['modena-ld-org', buildOrganizationSchema()],
  ['modena-ld-courses', buildCourseSchemas()],
  ['modena-ld-faq', buildFaqSchema()],
]
const ld = schemas
  .filter(([, data]) => data != null)
  .map(
    ([id, data]) =>
      `    <script type="application/ld+json" id="${id}" data-modena-seo="static">${JSON.stringify(data)}\n    </script>`,
  )
  .join('\n')
if (ld) html = html.replace('</head>', ld + '\n  </head>')

writeFileSync(htmlPath, html)
log('index.html actualizado (robots + canonical + JSON-LD).')

/* ---------- robots.txt ---------- */
if (prod && SITE.siteUrl) {
  writeFileSync(
    join(DIST, 'robots.txt'),
    `User-agent: *\nAllow: /\nSitemap: ${SITE.siteUrl.replace(/\/+$/, '')}/sitemap.xml\n`,
  )
} else {
  writeFileSync(join(DIST, 'robots.txt'), 'User-agent: *\nDisallow: /\n')
}

/* ---------- sitemap.xml ---------- */
const sitemapPath = join(DIST, 'sitemap.xml')
if (SITE.siteUrl) {
  const base = SITE.siteUrl.replace(/\/+$/, '')
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    `  <url><loc>${base}/</loc></url>\n` +
    '</urlset>\n'
  writeFileSync(sitemapPath, xml)
  log('sitemap.xml y robots.txt generados.')
} else if (existsSync(sitemapPath)) {
  rmSync(sitemapPath)
}

log('listo.')