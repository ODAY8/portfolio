import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../types/content'
import { Chip } from '../common/Chip'
import { FadeInSection } from '../common/FadeInSection'
import styles from './Projects.module.css'

interface ProjectCardProps {
  project: Project
  delayMs: number
}

/** The whole card is a real link (not a div with a click handler) so it's
 * keyboard-focusable and behaves like a link should. */
export function ProjectCard({ project, delayMs }: ProjectCardProps) {
  return (
    <FadeInSection delayMs={delayMs}>
      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.iconChip}>
            <project.icon size={24} />
          </div>
          <ArrowUpRight className={styles.arrow} size={20} aria-hidden="true" />
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.techStack}>
          {project.techStack.map((tech) => (
            <Chip key={tech} label={tech} variant="tag" />
          ))}
        </div>
      </a>
    </FadeInSection>
  )
}
