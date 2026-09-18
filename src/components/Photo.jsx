import { PHOTO_WIDTHS, PHOTO_W, PHOTO_H } from '../data/media'

/**
 * Imagen responsiva de MODENA: AVIF/WebP con fallback JPG.
 * Todas las piezas originales son 1122x1402 (declaramos dimensiones para evitar CLS).
 */
export default function Photo({ photoKey, alt = '', sizes, className = '', imgClassName = '', loading = 'lazy', fetchPriority, mask, eager }) {
  const srcSet = (ext) => PHOTO_WIDTHS.map((w) => `/media/photo/${photoKey}@${w}.${ext} ${w}w`).join(', ')
  const imgLoading = eager === true ? 'eager' : loading

  return (
    <picture className={className} data-mask={mask || undefined}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`/media/photo/${photoKey}@1080.jpg`}
        srcSet={`${srcSet('jpg')}`}
        sizes={sizes}
        width={PHOTO_W}
        height={PHOTO_H}
        alt={alt}
        loading={imgLoading}
        decoding={fetchPriority === 'high' ? 'sync' : 'async'}
        fetchPriority={fetchPriority}
        className={imgClassName}
      />
    </picture>
  )
}