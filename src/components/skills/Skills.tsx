import type { Ref } from 'react'
import { SKILL_CATEGORIES } from '../../data/content'
import { SectionContainer } from '../common/SectionContainer'
import { SectionHeading } from '../common/SectionHeading'
import { SkillCard } from './SkillCard'
import styles from './Skills.module.css'

interface SkillsProps {
  sectionRef?: Ref<HTMLElement>
}

export function Skills({ sectionRef }: SkillsProps) {
  return (
    <SectionContainer id="skills" sectionRef={sectionRef}>
      <SectionHeading eyebrow="02 — Skills" title="What I Work With" />
      <div className={styles.grid}>
        {SKILL_CATEGORIES.map((category, index) => (
          <SkillCard key={category.name} category={category} delayMs={index * 80} />
        ))}
      </div>
    </SectionContainer>
  )
}
