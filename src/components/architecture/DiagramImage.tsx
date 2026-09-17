import { useState } from 'react'
import { Construction, ImageOff } from 'lucide-react'
import { assetUrl } from '../../lib/assetUrl'
import styles from './DiagramImage.module.css'

interface DiagramImageProps {
  imagePath?: string
  imageAlt: string
  emptyMessage?: string
}

/** Renders a diagram image (contain-fit, never cropped -- these carry
 * readable labels) with a fade-in once decoded. Falls back to a clear
 * "not provided yet" state when there's no image path at all (distinct
 * from a broken/failed image), so an unfinished project never shows a
 * fabricated or broken graphic. Shared between the architecture card
 * preview and the full modal view. */
export function DiagramImage({ imagePath, imageAlt, emptyMessage = 'Architecture diagram coming soon.' }: DiagramImageProps) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (!imagePath || failed) {
    return (
      <div className={styles.empty}>
        {failed ? <ImageOff size={28} aria-hidden="true" /> : <Construction size={28} aria-hidden="true" />}
        <p>{failed ? 'Diagram image failed to load.' : emptyMessage}</p>
      </div>
    )
  }

  return (
    <img
      src={assetUrl(imagePath)}
      alt={imageAlt}
      className={`${styles.image} ${loaded ? styles.imageLoaded : ''}`}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
    />
  )
}
