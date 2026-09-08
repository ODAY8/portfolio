import type { LucideIcon } from 'lucide-react'

/** All icons in this app are lucide-react components. */
export type IconType = LucideIcon

export interface Project {
  title: string
  description: string
  techStack: string[]
  repoUrl: string
  icon: IconType
}

export interface SkillCategory {
  name: string
  icon: IconType
  skills: string[]
}

export interface Certificate {
  title: string
  category: string
  icon: IconType
  /** Issuing organization/event name, only when known separately from the title. */
  organization?: string
  /** Year or date, only when actually known -- never guessed. */
  date?: string
  /** Path under /certificates/, relative to the site root. */
  imagePath: string
  imageAlt: string
}

export interface LearningItem {
  title: string
  description: string
  icon: IconType
}

export interface NavItem {
  id: string
  label: string
}

export interface SocialLink {
  label: string
  url: string
  icon: IconType
}
