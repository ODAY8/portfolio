import { useState, type Ref } from 'react'
import { CERTIFICATES } from '../../data/content'
import type { Certificate } from '../../types/content'
import { SectionContainer } from '../common/SectionContainer'
import { SectionHeading } from '../common/SectionHeading'
import { CertificateCard } from './CertificateCard'
import { CertificateLightbox } from './CertificateLightbox'
import styles from './Certificates.module.css'

interface CertificatesProps {
  sectionRef?: Ref<HTMLElement>
}

export function Certificates({ sectionRef }: CertificatesProps) {
  const [openCertificate, setOpenCertificate] = useState<Certificate | null>(null)

  return (
    <SectionContainer id="certificates" sectionRef={sectionRef}>
      <SectionHeading
        eyebrow="04 — Experience"
        title="Experience, Certifications & Achievements"
        subtitle="Internships, conferences, and competitions I've taken part in along the way."
      />
      <div className={styles.grid}>
        {CERTIFICATES.map((certificate, index) => (
          <CertificateCard
            key={certificate.title}
            certificate={certificate}
            delayMs={index * 90}
            onView={setOpenCertificate}
          />
        ))}
      </div>
      {openCertificate && (
        <CertificateLightbox certificate={openCertificate} onClose={() => setOpenCertificate(null)} />
      )}
    </SectionContainer>
  )
}
