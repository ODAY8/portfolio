import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../types/content'
import { Chip } from '../common/Chip'
import { FadeInSection } from '../common/FadeInSection'
import styles from './Projects.module.css'

interface ProjectCardProps {
  project: Project
  delayMs: number
  accentIndex: number
  featured?: boolean
}

const ACCENT_CLASSES = ['accentTeal', 'accentLavender', 'accentGreen', 'accentBlue'] as const

/** The whole card is a real link (not a div with a click handler) so it's
 * keyboard-focusable and behaves like a link should. No project screenshots
 * exist in the current data, so the cover panel uses a large tinted icon
 * treatment instead of an invented image. */
export function ProjectCard({ project, delayMs, accentIndex, featured }: ProjectCardProps) {
  const accentClass = styles[ACCENT_CLASSES[accentIndex % ACCENT_CLASSES.length]]

  return (
    <FadeInSection delayMs={delayMs} className={featured ? styles.featured : undefined}>
      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={styles.card}>
        <div className={`${styles.cover} ${accentClass}`}>
          <project.icon className={styles.coverIcon} size={featured ? 56 : 40} strokeWidth={1.5} />
          <ArrowUpRight className={styles.arrow} size={20} aria-hidden="true" />
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.techStack}>
            {project.techStack.map((tech) => (
              <Chip key={tech} label={tech} variant="tag" />
            ))}
          </div>
        </div>
      </a>
    </FadeInSection>
  )
}
