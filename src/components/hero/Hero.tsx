import { useState } from 'react'
import { ArrowUpRight, Download, MessageSquare } from 'lucide-react'
import { BIO, EDUCATION, NAME, RESUME_URL, TAGLINES } from '../../data/content'
import { assetUrl } from '../../lib/assetUrl'
import { useTypewriter } from '../../hooks/useTypewriter'
import { Button } from '../common/Button'
import { MagneticButton } from '../common/MagneticButton'
import { SocialLinks } from '../common/SocialLinks'
import { ProfilePortrait } from './ProfilePortrait'
import styles from './Hero.module.css'

interface HeroProps {
  onViewProjects: () => void
  onContactMe: () => void
}

/** First sentence of BIO, used as a short hero intro line -- derived from
 * existing content rather than duplicating/inventing new copy. */
const INTRO_LINE = BIO.split('. ')[0] + '.'

export function Hero({ onViewProjects, onContactMe }: HeroProps) {
  const tagline = useTypewriter(TAGLINES)
  const [resumeToast, setResumeToast] = useState(false)

  return (
    <section className={styles.hero} id="home">
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.blobOne} />
        <span className={styles.blobTwo} />
      </div>
      <div className={styles.content}>
        <div className={styles.textColumn}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            Open to new opportunities
          </span>

          <h1 className={styles.name}>
            Hi, I&apos;m <span className={styles.nameHighlight}>{NAME}</span>
          </h1>

          <div className={styles.taglineRow} aria-live="polite">
            <span>{tagline}</span>
            <span className={styles.cursor} aria-hidden="true" />
          </div>

          <p className={styles.intro}>{INTRO_LINE}</p>

          <div className={styles.ctaRow}>
            <MagneticButton>
              <Button variant="primary" icon={<ArrowUpRight size={18} />} onClick={onViewProjects}>
                View Projects
              </Button>
            </MagneticButton>
            <Button variant="secondary" icon={<MessageSquare size={18} />} onClick={onContactMe}>
              Contact Me
            </Button>
            {RESUME_URL ? (
              <Button variant="secondary" icon={<Download size={18} />} href={assetUrl(RESUME_URL)} download>
                Resume
              </Button>
            ) : (
              <Button variant="secondary" icon={<Download size={18} />} onClick={() => setResumeToast(true)}>
                Resume
              </Button>
            )}
          </div>
          {resumeToast && (
            <p role="status" className={styles.resumeToast}>
              Resume link coming soon!
            </p>
          )}
        </div>

        <div className={styles.visualColumn}>
          <ProfilePortrait />
          <div className={styles.infoCard}>
            <span className={styles.infoCardLabel}>Education</span>
            <span className={styles.infoCardValue}>{EDUCATION}</span>
          </div>
          <div className={styles.socialCard}>
            <SocialLinks variant="icons" />
          </div>
        </div>
      </div>
    </section>
  )
}
