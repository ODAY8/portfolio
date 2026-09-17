import { useScrollProgress } from '../../hooks/useScrollProgress'
import styles from './ScrollProgressBar.module.css'

/** Thin fixed bar at the very top edge of the viewport reflecting scroll
 * progress through the page -- sits above the floating pill nav, giving
 * visitors a persistent sense of "how much is left." */
export function ScrollProgressBar() {
  const progress = useScrollProgress()

  return (
    <div className={styles.track} aria-hidden="true">
      <div className={styles.fill} style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  )
}
