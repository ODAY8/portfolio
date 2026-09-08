import type { LearningItem } from '../../types/content'
import { FadeInSection } from '../common/FadeInSection'
import styles from './Learning.module.css'

interface LearningBadgeProps {
  item: LearningItem
  delayMs: number
}

export function LearningBadge({ item, delayMs }: LearningBadgeProps) {
  return (
    <FadeInSection delayMs={delayMs}>
      <div className={styles.badge}>
        <item.icon size={26} />
        <h3 className={styles.badgeTitle}>{item.title}</h3>
        <p className={styles.badgeDescription}>{item.description}</p>
      </div>
    </FadeInSection>
  )
}
