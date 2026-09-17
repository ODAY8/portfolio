import type { IconType } from './content'

/** Kinds of technical diagrams a project can have. Only kinds a project
 * actually has should appear in its `diagrams` array -- there is no
 * placeholder/fake entry for a kind that hasn't been provided yet. */
export type DiagramKind = 'architecture' | 'dataFlow' | 'sequence' | 'database'

export interface ArchitectureDiagram {
  kind: DiagramKind
  /** Shown as the tab label when a project has more than one diagram. */
  label: string
  /** Path under public/architecture/, relative to the site root. */
  imagePath: string
  imageAlt: string
}

export interface ArchitectureProject {
  id: string
  title: string
  /** Free-form label (e.g. "Cybersecurity", "Artificial Intelligence") --
   * also used to build the filter pills, so new categories just work. */
  category: string
  description: string
  /** Short paragraph explaining what the architecture represents. Omitted
   * (not fabricated) until real copy is provided for a project. */
  systemOverview?: string
  /** Only the components actually relevant to this project -- omit rather
   * than inventing a generic list. */
  components?: string[]
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  /** Empty until a real diagram image exists for this project -- the UI
   * renders a "coming soon" state rather than a placeholder graphic. */
  diagrams: ArchitectureDiagram[]
  icon: IconType
}
