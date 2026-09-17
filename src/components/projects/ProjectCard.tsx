import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
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

/** The cover panel is its own real link to the repo (keyboard-focusable,
 * behaves like a link should); explicit Code/Live Demo links sit in the
 * footer for projects that have a live deployment, since a project can now
 * have two distinct destinations and nesting an <a> inside an <a> isn't
 * valid HTML. No project screenshots exist for most entries, so the cover
 * panel uses a large tinted icon treatment instead of an invented image. */
export function ProjectCard({ project, delayMs, accentIndex, featured }: ProjectCardProps) {
  const accentClass = styles[ACCENT_CLASSES[accentIndex % ACCENT_CLASSES.length]]

  return (
    <FadeInSection delayMs={delayMs} className={featured ? styles.featured : undefined}>
      <article className={styles.card}>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.cover} ${accentClass}`}
          aria-label={`${project.title} repository on GitHub`}
        >
          <project.icon className={styles.coverIcon} size={featured ? 56 : 40} strokeWidth={1.5} />
          <ArrowUpRight className={styles.arrow} size={20} aria-hidden="true" />
        </a>
        <div className={styles.body}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.techStack}>
            {project.techStack.map((tech) => (
              <Chip key={tech} label={tech} variant="tag" />
            ))}
          </div>
          <div className={styles.links}>
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
              <Github size={15} />
              Code
            </a>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
                <ExternalLink size={15} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </article>
    </FadeInSection>
  )
}
