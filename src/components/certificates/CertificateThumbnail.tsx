import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import type { Certificate } from '../../types/content'
import { assetUrl } from '../../lib/assetUrl'
import styles from './Certificates.module.css'

interface CertificateThumbnailProps {
  certificate: Certificate
  size?: number
  fallbackMessage?: string
}

/** Falls back to a neutral placeholder if the image hasn't been added to
 * public/certificates/ yet, instead of showing a broken-image icon --
 * shared by the card thumbnail and the lightbox's full view. */
export function CertificateThumbnail({ certificate, size = 32, fallbackMessage }: CertificateThumbnailProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    if (fallbackMessage) {
      return (
        <div className={styles.fallback}>
          <ImageOff size={size} aria-hidden="true" />
          <p>{fallbackMessage}</p>
        </div>
      )
    }
    return <ImageOff className={styles.thumbnailFallback} size={size} aria-hidden="true" />
  }

  return (
    <img
      src={assetUrl(certificate.imagePath)}
      alt={certificate.imageAlt}
      className={styles.thumbnail}
      onError={() => setFailed(true)}
    />
  )
}
