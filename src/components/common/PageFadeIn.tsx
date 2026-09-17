import type { ReactNode } from 'react'
import styles from './PageFadeIn.module.css'

/** Mount-triggered fade + slide-up wrapper, applied at the top of a routed
 * page so navigating to it (e.g. the NavBar's "Problems Solved" link)
 * feels like a transition instead of an instant swap. Reduced-motion users
 * get the global `animation-duration` override from global.css, so no
 * separate guard is needed here. Not used on HomePage -- IntroOverlay
 * already owns that page's entrance, and layering this on top of it would
 * fade the intro curtain itself in from transparent on first load. */
export function PageFadeIn({ children }: { children: ReactNode }) {
  return <div className={styles.enter}>{children}</div>
}
