import { CUTOUTS, PHOTO_WIDTHS, PHOTO_W, PHOTO_H } from '../data/media'

/**
 * Imagen responsiva de MODENA: AVIF/WebP con fallback JPG.
 * Todas las piezas originales son 1122x1402 (declaramos dimensiones para evitar CLS).
 */
export default function Photo({ photoKey, alt = '', sizes, className = '', imgClassName = '', loading = 'lazy', fetchPriority, mask, eager }) {
  const cutout = CUTOUTS[photoKey]
  const srcSet = (ext) => PHOTO_WIDTHS.map((w) => `/media/photo/${photoKey}@${w}.${ext} ${w}w`).join(', ')
  const imgLoading = eager === true ? 'eager' : loading

  if (cutout) {
    return (
      <picture className={`${className} photo--cutout`}>
        <img
          src={cutout.src}
          width="1080"
          height="1350"
          alt={alt || cutout.alt}
          loading={imgLoading}
          decoding={fetchPriority === 'high' ? 'sync' : 'async'}
          fetchPriority={fetchPriority}
          className={`${imgClassName} photo--cutout__img`}
        />
      </picture>
    )
  }

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
