import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PROJECTS, SHORT_NAME } from '../data/content'
import {
  ARCHITECTURE_EYEBROW,
  ARCHITECTURE_HEADING,
  ARCHITECTURE_META_DESCRIPTION,
  ARCHITECTURE_PAGE_TITLE,
  ARCHITECTURE_PROJECTS,
  ARCHITECTURE_SECTION_EYEBROW,
  ARCHITECTURE_SECTION_SUBTITLE,
  ARCHITECTURE_SECTION_TITLE,
  ARCHITECTURE_SUBTITLE,
} from '../data/architecture'
import type { ArchitectureProject } from '../types/architecture'
import { Footer } from '../components/layout/Footer'
import { ScrollProgressBar } from '../components/layout/ScrollProgressBar'
import { PageFadeIn } from '../components/common/PageFadeIn'
import { SectionContainer } from '../components/common/SectionContainer'
import { SectionHeading } from '../components/common/SectionHeading'
import { StatCounter } from '../components/about/StatCounter'
import { ALL_CATEGORIES, ArchitectureFilters } from '../components/architecture/ArchitectureFilters'
import { ArchitectureCard } from '../components/architecture/ArchitectureCard'
import { ArchitectureModal } from '../components/architecture/ArchitectureModal'
import aboutStyles from '../components/about/About.module.css'
import styles from './ArchitecturePage.module.css'

/** Architecture Lab: a documentation-style page walking through the
 * system design behind each project (overview -> diagram -> components ->
 * tech stack), not just a screenshot gallery. Filters and the detail
 * modal are pure client-side state -- no reload, no route change. */
export function ArchitecturePage() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORIES)
  const [openProject, setOpenProject] = useState<ArchitectureProject | null>(null)

  useEffect(() => {
    const previousTitle = document.title
    document.title = ARCHITECTURE_PAGE_TITLE

    const meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.getAttribute('content') ?? null
    meta?.setAttribute('content', ARCHITECTURE_META_DESCRIPTION)

    return () => {
      document.title = previousTitle
      if (previousDescription !== null) meta?.setAttribute('content', previousDescription)
    }
  }, [])

  const categories = useMemo(() => Array.from(new Set(ARCHITECTURE_PROJECTS.map((p) => p.category))), [])

  const visibleProjects = useMemo(
    () =>
      activeCategory === ALL_CATEGORIES
        ? ARCHITECTURE_PROJECTS
        : ARCHITECTURE_PROJECTS.filter((p) => p.category === activeCategory),
    [activeCategory],
  )

  return (
    <>
      <ScrollProgressBar />
      <PageFadeIn>
        <header className={styles.appBar}>
          <Link to="/" className={styles.backButton} aria-label="Back to home">
            <ArrowLeft size={20} />
          </Link>
          <span className={styles.logo}>{SHORT_NAME}</span>
          <span className={styles.appBarLabel}>Architecture Lab</span>
        </header>

        <main>
          <SectionContainer id="architecture-hero">
            <SectionHeading as="h1" eyebrow={ARCHITECTURE_EYEBROW} title={ARCHITECTURE_HEADING} subtitle={ARCHITECTURE_SUBTITLE} />
            <div className={styles.statsRow}>
              <StatCounter value={PROJECTS.length} label="Projects" />
              <StatCounter value={ARCHITECTURE_PROJECTS.length} label="Architecture Systems" />
              <StatCounter value={categories.length} label="Domains" />
              <div className={aboutStyles.stat}>
                <span className={aboutStyles.statValue}>∞</span>
                <span className={aboutStyles.statLabel}>Ideas to Build</span>
              </div>
            </div>
          </SectionContainer>

          <SectionContainer id="architecture-projects">
            <SectionHeading
              eyebrow={ARCHITECTURE_SECTION_EYEBROW}
              title={ARCHITECTURE_SECTION_TITLE}
              subtitle={ARCHITECTURE_SECTION_SUBTITLE}
            />
            <ArchitectureFilters categories={categories} active={activeCategory} onSelect={setActiveCategory} />
            <div className={styles.grid}>
              {visibleProjects.map((project, index) => (
                <ArchitectureCard key={project.id} project={project} delayMs={index * 90} onView={setOpenProject} />
              ))}
            </div>
          </SectionContainer>
        </main>
        <Footer />
      </PageFadeIn>

      {openProject && <ArchitectureModal project={openProject} onClose={() => setOpenProject(null)} />}
    </>
  )
}
