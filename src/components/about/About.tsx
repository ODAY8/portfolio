import type { Ref } from 'react'
import { BIO, CURRENT_FOCUS, EDUCATION, ICONS } from '../../data/content'
import { FadeInSection } from '../common/FadeInSection'
import { SectionHeading } from '../common/SectionHeading'
import { SectionContainer } from '../common/SectionContainer'
import styles from './About.module.css'

interface AboutProps {
  sectionRef?: Ref<HTMLElement>
}

export function About({ sectionRef }: AboutProps) {
  return (
    <SectionContainer id="about" sectionRef={sectionRef}>
      <FadeInSection>
        <SectionHeading eyebrow="01 — About" title="About Me" />
        <div className={styles.layout}>
          <div className={styles.bio}>
            <p className={styles.bioText}>{BIO}</p>
            <p className={styles.focusText}>{CURRENT_FOCUS}</p>
          </div>
          <div className={styles.card}>
            <div className={styles.infoRow}>
              <div className={styles.iconChip}>
                <ICONS.GraduationCap size={20} />
              </div>
              <div>
                <div className={styles.infoLabel}>Education</div>
                <div className={styles.infoValue}>{EDUCATION}</div>
              </div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.iconChip}>
                <ICONS.Compass size={20} />
              </div>
              <div>
                <div className={styles.infoLabel}>Currently Focused On</div>
                <div className={styles.infoValue}>{CURRENT_FOCUS}</div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </SectionContainer>
  )
}
