import { ArrowUp } from 'lucide-react'
import { useScrollY } from '../../hooks/useScrollY'
import { scrollToTop } from '../../hooks/useSmoothScroll'
import styles from './ScrollToTopButton.module.css'

/** Fades in after 600px of scroll, matching HomeScreen's FAB. */
export function ScrollToTopButton() {
  const scrollY = useScrollY()
  const visible = scrollY > 600

  return (
    <button
      type="button"
      className={`${styles.button} ${visible ? styles.visible : ''}`}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp />
    </button>
  )
}
