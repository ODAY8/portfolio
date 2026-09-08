import type { SkillCategory } from '../../types/content'
import { Chip } from '../common/Chip'
import { FadeInSection } from '../common/FadeInSection'
import styles from './Skills.module.css'

interface SkillCardProps {
  category: SkillCategory
  delayMs: number
}

export function SkillCard({ category, delayMs }: SkillCardProps) {
  return (
    <FadeInSection delayMs={delayMs}>
      <div className={styles.card}>
        <div className={styles.header}>
          <category.icon size={22} />
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
