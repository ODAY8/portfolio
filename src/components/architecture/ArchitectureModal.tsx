import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ExternalLink, Github, X } from 'lucide-react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import type { ArchitectureProject } from '../../types/architecture'
import { Chip } from '../common/Chip'
import { DiagramImage } from './DiagramImage'
import { categoryAccentClass } from './categoryAccent'
import cardStyles from './ArchitectureCard.module.css'
import styles from './ArchitectureModal.module.css'

const CLOSE_ANIMATION_MS = 220

interface ArchitectureModalProps {
  project: ArchitectureProject
  onClose: () => void
}

/** Detail view for a single project: system overview, the (zoomable)
 * diagram(s), core components, and tech stack, in that order -- so it
 * reads as documentation, not just an image. Structurally mirrors
 * CertificateLightbox (portal, fade+scale open/close, Escape, click
 * outside, body scroll lock, react-zoom-pan-pinch), which is already a
 * project dependency. */
export function ArchitectureModal({ project, onClose }: ArchitectureModalProps) {
  const [open, setOpen] = useState(false)
  const [activeDiagram, setActiveDiagram] = useState(0)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(true))
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ''
    }
  }, [])

  const requestClose = useCallback(() => {
    setOpen(false)
    setTimeout(onClose, CLOSE_ANIMATION_MS)
  }, [onClose])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') requestClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [requestClose])

  const diagram = project.diagrams[activeDiagram]
  const accentClass = cardStyles[categoryAccentClass(project.category)]

  return createPortal(
    <div
      className={`${styles.backdrop} ${open ? styles.open : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} architecture`}
    >
      <div className={styles.dialog}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <span className={`${cardStyles.categoryPill} ${accentClass}`}>
              <project.icon size={14} />
              {project.category}
            </span>
            <h3 className={styles.headerTitle}>{project.title}</h3>
          </div>
          <button type="button" className={styles.closeButton} onClick={requestClose} aria-label="Close">
            <X size={22} />
          </button>
        </div>

        <div className={styles.scrollArea}>
          {project.systemOverview && (
            <section className={styles.section}>
              <h4 className={styles.sectionLabel}>System Overview</h4>
              <p className={styles.overviewText}>{project.systemOverview}</p>
            </section>
          )}

          <section className={styles.section}>
            <h4 className={styles.sectionLabel}>{diagram?.label ?? 'Architecture Diagram'}</h4>
            {project.diagrams.length > 1 && (
              <div className={styles.diagramTabs} role="tablist" aria-label="Diagram type">
                {project.diagrams.map((d, index) => (
                  <button
                    key={d.kind}
                    type="button"
                    role="tab"
                    aria-selected={index === activeDiagram}
                    className={`${styles.diagramTab} ${index === activeDiagram ? styles.diagramTabActive : ''}`}
                    onClick={() => setActiveDiagram(index)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            )}
            <div className={styles.imageArea}>
              {diagram ? (
                <TransformWrapper initialScale={1} minScale={1} maxScale={4} centerOnInit>
                  <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                    <DiagramImage imagePath={diagram.imagePath} imageAlt={diagram.imageAlt} />
                  </TransformComponent>
                </TransformWrapper>
              ) : (
                <DiagramImage imageAlt={`${project.title} architecture diagram`} />
              )}
            </div>
            {project.diagrams.length > 0 && (
              <p className={styles.zoomHint}>Scroll, pinch, or drag to zoom and pan the diagram.</p>
            )}
          </section>

          {project.components && project.components.length > 0 && (
            <section className={styles.section}>
              <h4 className={styles.sectionLabel}>Core Components</h4>
              <div className={styles.componentsGrid}>
                {project.components.map((component) => (
                  <span key={component} className={styles.componentChip}>
                    {component}
                  </span>
                ))}
              </div>
            </section>
          )}

          <section className={styles.section}>
            <h4 className={styles.sectionLabel}>Technology Stack</h4>
            <div className={styles.techStack}>
              {project.technologies.map((tech) => (
                <Chip key={tech} label={tech} variant="tag" />
              ))}
            </div>
          </section>

          {(project.githubUrl || project.liveUrl) && (
            <div className={styles.links}>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
                  <Github size={15} />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
