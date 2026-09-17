import type { SkillCategory } from '../../types/content'
import { Chip } from '../common/Chip'
import { FadeInSection } from '../common/FadeInSection'
import styles from './Skills.module.css'

interface SkillCardProps {
  category: SkillCategory
  delayMs: number
  accentIndex: number
}

const ACCENT_CLASSES = ['accentTeal', 'accentLavender', 'accentGreen', 'accentBlue'] as const

export function SkillCard({ category, delayMs, accentIndex }: SkillCardProps) {
  const accentClass = styles[ACCENT_CLASSES[accentIndex % ACCENT_CLASSES.length]]

  return (
    <FadeInSection delayMs={delayMs}>
      <div className={`${styles.card} ${accentClass}`}>
        <div className={styles.header}>
          <div className={styles.iconChip}>
            <category.icon size={20} />
          </div>
          <h3 className={styles.name}>{category.name}</h3>
        </div>
        <div className={styles.chips}>
          {category.skills.map((skill) => (
            <Chip key={skill} label={skill} />
          ))}
        </div>
      </div>
    </FadeInSection>
  )
}
