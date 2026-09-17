import styles from './ProblemCardSkeleton.module.css'

/** Shimmering placeholder shaped like a real ProblemCard, shown while
 * useSolvedProblems is loading -- reads as "content is coming" instead of
 * a generic spinner, and avoids a layout jump when the real cards land. */
export function ProblemCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={styles.headRow}>
        <span className={`${styles.bar} ${styles.title}`} />
        <span className={`${styles.bar} ${styles.pill}`} />
        <span className={`${styles.bar} ${styles.date}`} />
      </div>
      <span className={`${styles.bar} ${styles.label}`} />
      <span className={`${styles.bar} ${styles.line}`} />
      <span className={`${styles.bar} ${styles.line} ${styles.lineShort}`} />
      <span className={`${styles.bar} ${styles.label}`} />
      <span className={`${styles.bar} ${styles.line}`} />
      <div className={styles.tags}>
        <span className={`${styles.bar} ${styles.tag}`} />
        <span className={`${styles.bar} ${styles.tag}`} />
        <span className={`${styles.bar} ${styles.tag}`} />
      </div>
    </div>
  )
}
