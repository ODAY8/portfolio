import type { Ref } from 'react'
import { LEARNING_ITEMS } from '../../data/content'
import { SectionContainer } from '../common/SectionContainer'
import { SectionHeading } from '../common/SectionHeading'
import { LearningBadge } from './LearningBadge'
import styles from './Learning.module.css'

interface LearningProps {
  sectionRef?: Ref<HTMLElement>
}

export function Learning({ sectionRef }: LearningProps) {
  return (
    <SectionContainer id="learning" sectionRef={sectionRef} background="var(--color-background)">
      <SectionHeading eyebrow="05 — Growing" title="Currently Learning" />
      <div className={styles.wrap}>
        {LEARNING_ITEMS.map((item, index) => (
          <LearningBadge key={item.title} item={item} delayMs={index * 90} />
        ))}
      </div>
    </SectionContainer>
  )
}
