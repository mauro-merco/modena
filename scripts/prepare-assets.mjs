/**
 * Prepara los activos reales del proyecto en /public/media y /public/og.
 * - Convierte fotos a AVIF/WebP + fallback JPG en tamaños responsivos.
 * - Deduplica y comprime el video, y genera un poster.
 * - Genera la imagen social OG (1200x630) a partir de una foto real.
 *
 * Es idempotente: solo re-procesa cuando cambia el hash del origen.
 */
/* eslint-disable no-console */
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC = ROOT
const OUT = join(ROOT, 'public', 'media')
const OUT_OG = join(ROOT, 'public', 'og')

const TOKEN_FILE = join(ROOT, 'node_modules', '.modena-assets.json')

/** Fuente -> destinos (relativos a /media) para la galería editorial. */
const PHOTOS = [
  { src: 'CARRUSEL 1.png', key: 'clase-01' },
  { src: 'CARRUSEL 2.png', key: 'clase-02' },
  { src: 'CARRUSEL 3.png', key: 'clase-03' },
  { src: 'CARRUSEL 2 (2).png', key: 'clase-04' },
  { src: 'CARRUSEL 3 (1).png', key: 'clase-05' },
  { src: 'CARRUSEL 1 (1)2.png', key: 'clase-06' },
  { src: 'CARRUSEL 3 (2).png', key: 'clase-07' },
]

const VIDEO_SRC = 'Pauta Electricidad y Electronica.mp4'
const VIDEO_KEY = 'pauta-electricidad'

const WIDTHS = [400, 640, 1080, 1280]

const hash = (p) => createHash('md5').update(readFileSync(join(SRC, p))).digest('hex').slice(0, 12)

function loadTokens() {
  try {
    return JSON.parse(readFileSync(TOKEN_FILE, 'utf8'))
  } catch {
    return {}
  }
}

function saveTokens(t) {
  mkdirSync(dirname(TOKEN_FILE), { recursive: true })
  writeFileSync(TOKEN_FILE, JSON.stringify(t, null, 2))
}

async function processPhoto(entry, tokens, log) {
  const srcPath = join(SRC, entry.src)
  if (!existsSync(srcPath)) return log('SKIP imagen faltante: ' + entry.src)
  const h = hash(entry.src)
  const meta = await sharp(srcPath).metadata()
  const target = tokens[`photo:${entry.key}`]
  if (target && target.hash === h) return log('OK (cache) ' + entry.key)
  const w = meta.width
  const hgt = meta.height
  const sizes = WIDTHS.filter((s) => s <= w).map((s) => s)

  for (const size of sizes) {
    const base = join(OUT, 'photo', `${entry.key}@${size}`)
    const pipeline = sharp(srcPath).resize({ width: size, withoutEnlargement: true })
    await pipeline.clone().rotate().avif({ quality: 48, effort: 5 }).toFile(base + '.avif')
    await pipeline.clone().rotate().webp({ quality: 76, effort: 5 }).toFile(base + '.webp')
    await pipeline.rotate().jpeg({ quality: 78, mozjpeg: true }).toFile(base + '.jpg')
    log('generado ' + entry.key + '@' + size)
  }
  tokens[`photo:${entry.key}`] = { hash: h, width: w, height: hgt, sizes }
}

async function processVideo(tokens, log) {
  const srcPath = join(SRC, VIDEO_SRC)
  if (!existsSync(srcPath)) return log('SKIP video faltante')
  const h = hash(VIDEO_SRC)
  const st = tokens[`video:${VIDEO_KEY}`]
  if (st && st.hash === h && existsSync(join(OUT, 'video', VIDEO_KEY + '.mp4'))) {
    return log('OK (cache) video')
  }

  let ffmpeg = null
  try {
    ffmpeg = (await import('ffmpeg-static')).default
  } catch {
    ffmpeg = null
  }
  if (!ffmpeg) {
    log('WARN: ffmpeg no disponible; se conserva el video original sin optimizar')
    return
  }

  mkdirSync(join(OUT, 'video'), { recursive: true })
  const posterOut = join(OUT, 'video', VIDEO_KEY + '-poster.jpg')
  const mp4Out = join(OUT, 'video', VIDEO_KEY + '.mp4')
  const webmOut = join(OUT, 'video', VIDEO_KEY + '.webm')

  // Poster en 01s.
  const r1 = spawnSync(ffmpeg, ['-y', '-ss', '1', '-i', srcPath, '-frames:v', '1', '-q:v', '3', posterOut], { stdio: 'ignore' })
  if (r1.status !== 0) log('WARN poster falló')

  // H.264 optimizado, sin audio (pieza decorativa), escalado a 960px.
  const r2 = spawnSync(
    ffmpeg,
    ['-y', '-i', srcPath, '-an', '-vf', "scale='min(960,iw)':-2:flags=lanczos,fps=24", '-c:v', 'libx264', '-preset', 'medium', '-crf', '30', '-movflags', '+faststart', mp4Out],
    { stdio: 'ignore', timeout: 900000 },
  )
  if (r2.status !== 0) return log('ERROR compresión mp4 falló (código ' + r2.status + ')')

  const r3 = spawnSync(ffmpeg, ['-y', '-i', srcPath, '-an', '-vf', "scale='min(720,iw)':-2:flags=lanczos,fps=24", '-c:v', 'libvpx-vp9', '-b:v', '500k', '-cpu-used', '5', '-deadline', 'good', webmOut], { stdio: 'ignore', timeout: 900000 })
  if (r3.status !== 0) log('WARN versión webm no generada (se mantiene mp4)')

  tokens[`video:${VIDEO_KEY}`] = { hash: h, mp4: mp4Out, webm: webmOut, poster: posterOut }
  log('generado video optimizado')

  // Versión con audio para reproducción en modal (solo cuando no existe).
  const audioOut = join(OUT, 'video', VIDEO_KEY + '-audio.mp4')
  const audioKey = `video:${VIDEO_KEY}-audio`
  const audioTok = tokens[audioKey]
  if (!audioTok || audioTok.hash !== h || !existsSync(audioOut)) {
    const r4 = spawnSync(
      ffmpeg,
      ['-y', '-i', srcPath, '-vf', "scale='min(720,iw)':-2:flags=lanczos,fps=24", '-c:v', 'libx264', '-preset', 'medium', '-crf', '28', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', audioOut],
      { stdio: 'ignore', timeout: 900000 },
    )
    if (r4.status === 0) {
      tokens[audioKey] = { hash: h }
      log('generado video con audio (modal)')
    }
  }
}

async function processOG(tokens, log) {
  const src = join(SRC, PHOTOS[0].src)
  const target = join(OUT_OG, 'og-image.jpg')
  const h = hash(PHOTOS[0].src)
  const t = tokens['og']
  if (t && t.hash === h && existsSync(target)) return log('OK (cache) og')
  mkdirSync(OUT_OG, { recursive: true })
  await sharp(src)
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(target)
  tokens['og'] = { hash: h }
  log('generado og-image.jpg')
}

async function main() {
  const tokens = loadTokens()
  const log = (m) => console.log('[assets] ' + m)

  // Limpieza de archivos de fuentes obsoletas (queries huérfanas).
  for (const key of Object.keys(tokens)) {
    if (key.startsWith('photo:') && !PHOTOS.some((p) => `photo:${p.key}` === key)) delete tokens[key]
  }

  mkdirSync(join(OUT, 'photo'), { recursive: true })
  for (const p of PHOTOS) await processPhoto(p, tokens, log)
  await processVideo(tokens, log)
  await processOG(tokens, log)
  saveTokens(tokens)
  log('listo.')
}

main().catch((e) => {
  console.error('[assets] ERROR:', e)
  process.exit(1)
})