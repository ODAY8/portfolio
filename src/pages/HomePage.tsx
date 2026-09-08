import { NAV_ITEMS } from '../data/content'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { NavBar } from '../components/layout/NavBar'
import { Footer } from '../components/layout/Footer'
import { ScrollToTopButton } from '../components/layout/ScrollToTopButton'
import { Hero } from '../components/hero/Hero'
import { About } from '../components/about/About'
import { Skills } from '../components/skills/Skills'
import { Projects } from '../components/projects/Projects'
import { Certificates } from '../components/certificates/Certificates'
import { Learning } from '../components/learning/Learning'
import { Contact } from '../components/contact/Contact'

const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

/** Composes the whole single-page scroll site -- port of home_screen.dart.
 * All sections live here; the nav (and the hero's own CTAs) scroll to a
 * section rather than navigating to a route. */
export function HomePage() {
  const { activeIndex, registerSection, scrollToSection } = useScrollSpy(SECTION_IDS)

  return (
    <>
      <NavBar activeIndex={activeIndex} onNavTap={scrollToSection} />
      <main>
        <div ref={registerSection('home')}>
          <Hero onViewProjects={() => scrollToSection('projects')} onContactMe={() => scrollToSection('contact')} />
        </div>
        <About sectionRef={registerSection('about')} />
        <Skills sectionRef={registerSection('skills')} />
        <Projects sectionRef={registerSection('projects')} />
        <Certificates sectionRef={registerSection('certificates')} />
        <Learning sectionRef={registerSection('learning')} />
        <Contact sectionRef={registerSection('contact')} />
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}
