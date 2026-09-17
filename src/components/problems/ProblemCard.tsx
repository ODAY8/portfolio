import { ExternalLink } from 'lucide-react'
import type { SolvedProblem } from '../../types/solvedProblem'
import { Chip } from '../common/Chip'
import { FadeInSection } from '../common/FadeInSection'
import styles from './ProblemCard.module.css'

interface ProblemCardProps {
  problem: SolvedProblem
  delayMs: number
}

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' })

/* Hex literals (not CSS var() refs) so the `${color}1a` alpha-suffix trick
   below produces valid 8-digit hex colors for the pill background. */
function difficultyColor(difficulty: string): string {
  const lower = difficulty.toLowerCase()
  if (lower === 'easy') return '#4f8a3f'
  if (lower === 'hard') return '#c04848'
  return '#0f8f7f'
}

export function ProblemCard({ problem, delayMs }: ProblemCardProps) {
  const color = difficultyColor(problem.difficulty)

  return (
    <FadeInSection delayMs={delayMs}>
      <article className={styles.card}>
        <div className={styles.headRow}>
          <h3 className={styles.title}>{problem.title}</h3>
          <span className={styles.difficultyPill} style={{ color, background: `${color}1a`, border: `1px solid ${color}` }}>
            {problem.difficulty}
          </span>
          <span className={styles.date}>{dateFormatter.format(problem.createdAt)}</span>
        </div>

        <p className={styles.sectionLabel}>PROBLEM</p>
        <p className={styles.sectionText}>{problem.problem}</p>

        <p className={styles.sectionLabel}>SOLUTION</p>
        <p className={styles.sectionText}>{problem.solution}</p>

        {problem.tags.length > 0 && (
          <div className={styles.tags}>
            {problem.tags.map((tag) => (
              <Chip key={tag} label={tag} variant="tag" />
            ))}
          </div>
        )}

        {problem.link && (
          <a href={problem.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
            View write-up <ExternalLink size={14} />
          </a>
        )}
      </article>
    </FadeInSection>
  )
}
