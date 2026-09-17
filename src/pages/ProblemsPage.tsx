import { AlertTriangle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SHORT_NAME } from '../data/content'
import { useSolvedProblems } from '../hooks/useSolvedProblems'
import { Footer } from '../components/layout/Footer'
import { ScrollProgressBar } from '../components/layout/ScrollProgressBar'
import { PageFadeIn } from '../components/common/PageFadeIn'
import { SectionContainer } from '../components/common/SectionContainer'
import { SectionHeading } from '../components/common/SectionHeading'
import { ProblemCard } from '../components/problems/ProblemCard'
import { ProblemCardSkeleton } from '../components/problems/ProblemCardSkeleton'
import styles from './ProblemsPage.module.css'

/** Port of problems_screen.dart: fetches from Supabase via
 * useSolvedProblems, rendering loading/error/empty/success states. */
export function ProblemsPage() {
  const state = useSolvedProblems()

  return (
    <>
      <ScrollProgressBar />
      <PageFadeIn>
        <header className={styles.appBar}>
          <Link to="/" className={styles.backButton} aria-label="Back to home">
            <ArrowLeft size={20} />
          </Link>
          <span className={styles.logo}>{SHORT_NAME}</span>
          <span className={styles.appBarLabel}>Problems Solved</span>
        </header>

        <main>
          <SectionContainer id="problems">
            <SectionHeading
              eyebrow="Write-ups"
              title="Problems Solved"
              subtitle="A running log of problems I've worked through, with the approach and solution."
            />

            {state.status === 'loading' && (
              <div style={{ marginTop: 40 }} role="status" aria-label="Loading problems">
                <ProblemCardSkeleton />
                <ProblemCardSkeleton />
                <ProblemCardSkeleton />
              </div>
            )}

            {state.status === 'error' && (
              <div className={styles.centerState}>
                <AlertTriangle size={32} />
                <p>{state.message}</p>
                <button type="button" className={styles.retryButton} onClick={state.retry}>
                  Try again
                </button>
              </div>
            )}

            {state.status === 'success' && state.problems.length === 0 && (
              <div className={styles.centerState}>
                <p>No write-ups posted yet.</p>
              </div>
            )}

            {state.status === 'success' && state.problems.length > 0 && (
              <div style={{ marginTop: 40 }}>
                {state.problems.map((problem, index) => (
                  <ProblemCard key={problem.id} problem={problem} delayMs={index * 80} />
                ))}
              </div>
            )}
          </SectionContainer>
        </main>
        <Footer />
      </PageFadeIn>
    </>
  )
}
