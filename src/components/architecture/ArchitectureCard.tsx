import { Layers } from 'lucide-react'
import type { ArchitectureProject } from '../../types/architecture'
import { Button } from '../common/Button'
import { Chip } from '../common/Chip'
import { FadeInSection } from '../common/FadeInSection'
import { DiagramImage } from './DiagramImage'
import { categoryAccentClass } from './categoryAccent'
import styles from './ArchitectureCard.module.css'

interface ArchitectureCardProps {
  project: ArchitectureProject
  delayMs: number
  onView: (project: ArchitectureProject) => void
}

export function ArchitectureCard({ project, delayMs, onView }: ArchitectureCardProps) {
  const primaryDiagram = project.diagrams[0]
  const accentClass = styles[categoryAccentClass(project.category)]

  return (
    <FadeInSection delayMs={delayMs}>
      <article className={styles.card}>
        <button
          type="button"
          className={styles.preview}
          onClick={() => onView(project)}
          aria-label={`View ${project.title} architecture diagram`}
        >
          <DiagramImage imagePath={primaryDiagram?.imagePath} imageAlt={primaryDiagram?.imageAlt ?? `${project.title} architecture diagram`} />
        </button>
        <div className={styles.body}>
          <span className={`${styles.categoryPill} ${accentClass}`}>
            <project.icon size={14} />
            {project.category}
          </span>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.techStack}>
            {project.technologies.map((tech) => (
              <Chip key={tech} label={tech} variant="tag" />
            ))}
          </div>
          <Button
            variant="secondary"
            icon={<Layers size={16} />}
            onClick={() => onView(project)}
            className={styles.viewButton}
          >
            View Architecture
          </Button>
        </div>
      </article>
    </FadeInSection>
  )
}
