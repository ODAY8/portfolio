import { ZoomIn } from 'lucide-react'
import type { Certificate } from '../../types/content'
import { Button } from '../common/Button'
import { FadeInSection } from '../common/FadeInSection'
import { CertificateThumbnail } from './CertificateThumbnail'
import styles from './Certificates.module.css'

interface CertificateCardProps {
  certificate: Certificate
  delayMs: number
  onView: (certificate: Certificate) => void
}

export function CertificateCard({ certificate, delayMs, onView }: CertificateCardProps) {
  return (
    <FadeInSection delayMs={delayMs}>
      <div className={styles.card}>
        <div className={styles.thumbnailWrap}>
          <CertificateThumbnail certificate={certificate} />
        </div>
        <div className={styles.body}>
          <div className={styles.metaRow}>
            <certificate.icon size={18} color="var(--color-accent)" />
            <span className={styles.categoryPill}>{certificate.category}</span>
            {certificate.date && <span className={styles.date}>{certificate.date}</span>}
          </div>
          <h3 className={styles.title}>{certificate.title}</h3>
          {certificate.organization && <p className={styles.organization}>{certificate.organization}</p>}
          <div className={styles.spacer} />
          <Button
            variant="secondary"
            icon={<ZoomIn size={18} />}
            onClick={() => onView(certificate)}
            className={styles.viewButton}
          >
            View Certificate
          </Button>
        </div>
      </div>
    </FadeInSection>
  )
}
