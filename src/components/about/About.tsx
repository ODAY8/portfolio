import type { Ref } from 'react'
import { BIO, CURRENT_FOCUS, EDUCATION, ICONS, PROJECTS, SKILL_CATEGORIES } from '../../data/content'
import { FadeInSection } from '../common/FadeInSection'
import { SectionHeading } from '../common/SectionHeading'
import { SectionContainer } from '../common/SectionContainer'
import { StatCounter } from './StatCounter'
import styles from './About.module.css'

interface AboutProps {
  sectionRef?: Ref<HTMLElement>
}

/** Stats shown in the About section. "Technologies Used"/"Skills" are
 * derived live from real content data -- distinct metrics (every unique
 * technology across all projects' tech stacks vs. the Skills section's
 * own category breakdown), deliberately labeled apart so two different
 * numbers don't sit side by side under the same word. "Projects Built"
 * is a deliberate exception -- the user asked for a stylized "10+" label
 * rather than the exact PROJECTS.length, so it's a manually-set
 * approximate figure, not a live count (update it if the real count
 * grows past it). */
const STATS = [
  { value: 10, suffix: '+', label: 'Projects Built' },
  { value: new Set(PROJECTS.flatMap((p) => p.techStack)).size, label: 'Technologies Used' },
  { value: SKILL_CATEGORIES.reduce((sum, c) => sum + c.skills.length, 0), label: 'Skills' },
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
                <StatCounter key={stat.label} value={stat.value} label={stat.label} suffix={stat.suffix} />
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
