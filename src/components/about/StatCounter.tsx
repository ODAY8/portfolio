import { useCountUp } from '../../hooks/useCountUp'
import { useInView } from '../../hooks/useInView'
import styles from './About.module.css'

interface StatCounterProps {
  value: number
  label: string
  /** Appended after the animated number (e.g. "+") for a stylized
   * approximate stat rather than an exact live count. */
  suffix?: string
}

/** Counts up from 0 to `value` the first time it scrolls into view --
 * jumps straight to the final number under prefers-reduced-motion (see
 * useCountUp). */
export function StatCounter({ value, label, suffix = '' }: StatCounterProps) {
  const { ref, isVisible } = useInView<HTMLDivElement>()
  const count = useCountUp(value, isVisible)

  return (
    <div ref={ref} className={styles.stat}>
      <span className={styles.statValue}>
        {count}
        {suffix}
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}
