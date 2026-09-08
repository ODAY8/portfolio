import { useState } from 'react'
import { ArrowDown, ChevronDown, Download } from 'lucide-react'
import { NAME, RESUME_URL, TAGLINES } from '../../data/content'
import { assetUrl } from '../../lib/assetUrl'
import { useTypewriter } from '../../hooks/useTypewriter'
import { Button } from '../common/Button'
import { HeroParticles } from './HeroParticles'
import { ProfilePortrait } from './ProfilePortrait'
import styles from './Hero.module.css'

interface HeroProps {
  onViewProjects: () => void
  onContactMe: () => void
}

export function Hero({ onViewProjects, onContactMe }: HeroProps) {
  const tagline = useTypewriter(TAGLINES)
  const [resumeToast, setResumeToast] = useState(false)

  return (
    <section className={styles.hero} id="home">
      <HeroParticles />
      <div className={styles.content}>
        <div className={styles.textColumn}>
          <span className={styles.eyebrow}>Hi, I&apos;m</span>
          <h1 className={styles.name}>{NAME}</h1>
          <div className={styles.taglineRow} aria-live="polite">
            <span>{tagline}</span>
            <span className={styles.cursor} aria-hidden="true" />
          </div>
          <div className={styles.ctaRow}>
            <Button variant="primary" icon={<ArrowDown size={18} />} onClick={onViewProjects}>
              View Projects
            </Button>
            <Button variant="secondary" onClick={onContactMe}>
              Contact Me
            </Button>
            {RESUME_URL ? (
              <Button variant="secondary" icon={<Download size={18} />} href={assetUrl(RESUME_URL)} download>
                Download Resume
              </Button>
            ) : (
              <Button
                variant="secondary"
                icon={<Download size={18} />}
                onClick={() => setResumeToast(true)}
              >
                Download Resume
              </Button>
            )}
          </div>
          {resumeToast && (
            <p role="status" style={{ color: 'var(--color-text-muted)', marginTop: 12, fontSize: 13 }}>
              Resume link coming soon!
            </p>
          )}
        </div>
        <ProfilePortrait />
      </div>
      <ChevronDown className={styles.chevron} size={28} aria-hidden="true" />
    </section>
  )
}
