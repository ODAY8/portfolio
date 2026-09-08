import type { Ref } from 'react'
import { PROJECTS } from '../../data/content'
import { SectionContainer } from '../common/SectionContainer'
import { SectionHeading } from '../common/SectionHeading'
import { ProjectCard } from './ProjectCard'
import styles from './Projects.module.css'

interface ProjectsProps {
  sectionRef?: Ref<HTMLElement>
}

export function Projects({ sectionRef }: ProjectsProps) {
  return (
    <SectionContainer id="projects" sectionRef={sectionRef}>
      <SectionHeading
        eyebrow="03 — Projects"
        title="Things I've Built"
        subtitle="A selection of projects spanning mobile development and AI automation. Repo links point to my GitHub."
      />
      <div className={styles.grid}>
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.title} project={project} delayMs={index * 90} />
        ))}
      </div>
    </SectionContainer>
  )
}
