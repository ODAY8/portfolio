import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import type { Certificate } from '../../types/content'
import { CertificateThumbnail } from './CertificateThumbnail'
import styles from './CertificateLightbox.module.css'

const CLOSE_ANIMATION_MS = 220

interface CertificateLightboxProps {
  certificate: Certificate
  onClose: () => void
}

/** Port of showCertificateLightbox: a fade+scale-in modal (94% -> 100% over
 * 220ms easeOutCubic, reversed on close) showing the full certificate
 * image, pinch/scroll/drag-zoomable from 1x-4x via react-zoom-pan-pinch. */
export function CertificateLightbox({ certificate, onClose }: CertificateLightboxProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(true))
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ''
    }
  }, [])

  const requestClose = useCallback(() => {
    setOpen(false)
    setTimeout(onClose, CLOSE_ANIMATION_MS)
  }, [onClose])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') requestClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [requestClose])

  return createPortal(
    <div
      className={`${styles.backdrop} ${open ? styles.open : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={certificate.title}
    >
      <div className={styles.dialog}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h3 className={styles.headerTitle}>{certificate.title}</h3>
            {certificate.organization && <p className={styles.headerOrg}>{certificate.organization}</p>}
          </div>
          <button type="button" className={styles.closeButton} onClick={requestClose} aria-label="Close">
            <X size={22} />
          </button>
        </div>
        <div className={styles.imageArea}>
          <TransformWrapper initialScale={1} minScale={1} maxScale={4} centerOnInit>
            <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
              <CertificateFullImage certificate={certificate} />
            </TransformComponent>
          </TransformWrapper>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function CertificateFullImage({ certificate }: { certificate: Certificate }) {
  return (
    <CertificateThumbnail certificate={certificate} size={40} fallbackMessage="Certificate image coming soon." />
  )
}
