import type { Ref } from 'react'
import { BIO, CERTIFICATES, CURRENT_FOCUS, EDUCATION, ICONS, PROJECTS, SKILL_CATEGORIES } from '../../data/content'
import { FadeInSection } from '../common/FadeInSection'
import { SectionHeading } from '../common/SectionHeading'
import { SectionContainer } from '../common/SectionContainer'
import { StatCounter } from './StatCounter'
import styles from './About.module.css'

interface AboutProps {
  sectionRef?: Ref<HTMLElement>
}

/** Small stats derived from real content data -- never fabricated. */
const STATS = [
  { value: PROJECTS.length, label: 'Projects Built' },
  { value: CERTIFICATES.length, label: 'Certifications' },
  { value: SKILL_CATEGORIES.reduce((sum, c) => sum + c.skills.length, 0), label: 'Technologies' },
]

export function About({ sectionRef }: AboutProps) {
  return (
    <SectionContainer id="about" sectionRef={sectionRef}>
      <FadeInSection>
        <SectionHeading eyebrow="01 — About" title="About Me" />
        <div className={styles.layout}>
          <div className={styles.bioCard}>
            <p className={styles.bioText}>{BIO}</p>
            <div className={styles.statsRow}>
              {STATS.map((stat) => (
                <StatCounter key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
          <div className={styles.sideColumn}>
            <div className={styles.card}>
              <div className={styles.iconChip}>
                <ICONS.GraduationCap size={20} />
              </div>
              <div className={styles.infoLabel}>Education</div>
              <div className={styles.infoValue}>{EDUCATION}</div>
            </div>
            <div className={`${styles.card} ${styles.accentCard}`}>
              <div className={styles.iconChip}>
                <ICONS.Compass size={20} />
              </div>
              <div className={styles.infoLabel}>Currently Focused On</div>
              <div className={styles.infoValue}>{CURRENT_FOCUS}</div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </SectionContainer>
  )
}
