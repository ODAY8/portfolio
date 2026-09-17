import { useEffect, useRef, useState } from 'react'
import { SHORT_NAME } from '../../data/content'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import styles from './IntroOverlay.module.css'

const STORAGE_KEY = 'portfolio-intro-shown'
const FILL_MS = 1300
const HOLD_MS = 250
const EXIT_MS = 650

type Phase = 'filling' | 'exiting' | 'done'

function alreadyShown() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function markShown() {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* private browsing / storage disabled -- intro just replays next time */
  }
}

/** One-time animated intro curtain shown before the hero settles in on a
 * fresh page load -- skipped under prefers-reduced-motion and on repeat
 * visits within the same browser tab session (sessionStorage). A
 * choreographed reveal, not tied to real asset loading -- the site has
 * nothing heavy to wait on. Reveals the hero by toggling an `intro-ready`
 * class on <body>, which Hero.module.css uses to stagger its own entrance,
 * keeping this component decoupled from Hero's markup. Click, Escape, or
 * the fixed duration all dismiss it -- it never blocks the page. */
export function IntroOverlay() {
  const prefersReducedMotion = usePrefersReducedMotion()
  // Captured once on mount so a live OS-setting change mid-animation can't
  // strand the overlay in a state nothing advances out of.
  const [skip] = useState(() => prefersReducedMotion || alreadyShown())

  const [phase, setPhase] = useState<Phase>(skip ? 'done' : 'filling')
  const [progress, setProgress] = useState(skip ? 100 : 0)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (skip) {
      document.body.classList.add('intro-ready')
      return
    }

    document.body.style.overflow = 'hidden'
    let rafId: number

    function tick(now: number) {
      if (startRef.current === null) startRef.current = now
      const elapsed = now - startRef.current
      const pct = Math.min(100, Math.round((elapsed / FILL_MS) * 100))
      setProgress(pct)
      if (pct < 100) {
        rafId = requestAnimationFrame(tick)
      } else {
        window.setTimeout(() => setPhase('exiting'), HOLD_MS)
      }
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [skip])

  useEffect(() => {
    if (phase !== 'exiting') return
    const id = window.setTimeout(() => {
      markShown()
      document.body.style.overflow = ''
      document.body.classList.add('intro-ready')
      setPhase('done')
    }, EXIT_MS)
    return () => clearTimeout(id)
  }, [phase])

  useEffect(() => {
    if (skip) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setPhase((p) => (p === 'filling' ? 'exiting' : p))
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [skip])

  if (phase === 'done') return null

  return (
    <div
      className={`${styles.overlay} ${phase === 'exiting' ? styles.exiting : ''}`}
      onClick={() => setPhase((p) => (p === 'filling' ? 'exiting' : p))}
      aria-hidden="true"
    >
      <div className={styles.center}>
        <div className={styles.word}>
          {SHORT_NAME.split('').map((char, i) => (
            <span key={`${char}-${i}`} className={styles.letter} style={{ animationDelay: `${i * 45}ms` }}>
              {char}
            </span>
          ))}
        </div>
        <div className={styles.barTrack}>
          <div className={styles.barFill} style={{ width: `${progress}%` }} />
        </div>
        <span className={styles.percent}>{progress}%</span>
      </div>
    </div>
  )
}
