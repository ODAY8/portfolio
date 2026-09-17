import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { NAV_ITEMS, SHORT_NAME } from '../../data/content'
import { useScrollY } from '../../hooks/useScrollY'
import { MagneticButton } from '../common/MagneticButton'
import { MobileMenu } from './MobileMenu'
import styles from './NavBar.module.css'

interface NavBarProps {
  activeIndex: number
  onNavTap: (id: string) => void
}

interface IndicatorRect {
  left: number
  width: number
}

/** Floating rounded "pill" nav bar. The active link is tracked by a single
 * dark pill that slides/resizes to sit behind whichever link is active
 * (measured via each link's offsetLeft/offsetWidth against the track),
 * instead of every link independently flashing a background -- reads as
 * one continuous, designed motion rather than a flat row of buttons.
 * Links, the "Problems Solved" route, and the Contact CTA are grouped into
 * visually distinct clusters (divider + outline pill + solid pill) rather
 * than one undifferentiated line. */
export function NavBar({ activeIndex, onNavTap }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollY = useScrollY()
  const scrolled = scrollY > 24

  const linkRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [indicator, setIndicator] = useState<IndicatorRect | null>(null)

  useLayoutEffect(() => {
    function measure() {
      const el = linkRefs.current[activeIndex]
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [activeIndex])

  return (
    <>
      <div className={styles.navWrap}>
        <header className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
          <button type="button" className={styles.logo} onClick={() => onNavTap('home')}>
            {SHORT_NAME}
          </button>

          <nav className={styles.linksTrack}>
            <span
              className={styles.indicator}
              style={{
                opacity: indicator ? 1 : 0,
                transform: `translateX(${indicator?.left ?? 0}px)`,
                width: indicator?.width ?? 0,
              }}
              aria-hidden="true"
            />
            {NAV_ITEMS.map((item, index) => {
              // "Contact" gets its own solid CTA pill in the actions
              // cluster instead of living in the link track -- skipped
              // here (index is kept as-is so it still lines up with
              // useScrollSpy's activeIndex for every other link).
              if (item.id === 'contact') return null
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    linkRefs.current[index] = el
                  }}
                  type="button"
                  className={`${styles.navLink} ${index === activeIndex ? styles.navLinkActive : ''}`}
                  onClick={() => onNavTap(item.id)}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className={styles.spacer} />

          <div className={styles.actions}>
            <span className={styles.divider} aria-hidden="true" />
            <Link to="/architecture" className={styles.problemsLink}>
              Architecture
            </Link>
            <Link to="/problems" className={styles.problemsLink}>
              Problems Solved
            </Link>
            <MagneticButton strength={0.25}>
              <button type="button" className={styles.contactCta} onClick={() => onNavTap('contact')}>
                Contact
              </button>
            </MagneticButton>
          </div>

          <button
            type="button"
            className={styles.menuButton}
            aria-label="Open navigation menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
        </header>
      </div>
      <MobileMenu
        open={menuOpen}
        activeIndex={activeIndex}
        onClose={() => setMenuOpen(false)}
        onNavTap={onNavTap}
      />
    </>
  )
}
