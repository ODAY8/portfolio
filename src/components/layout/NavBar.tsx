import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { NAV_ITEMS, SHORT_NAME } from '../../data/content'
import { useScrollY } from '../../hooks/useScrollY'
import { MobileMenu } from './MobileMenu'
import styles from './NavBar.module.css'

interface NavBarProps {
  activeIndex: number
  onNavTap: (id: string) => void
}

/** Port of nav_bar.dart: transparent at the top, fading to an 85%-opaque
 * dark navy background by 80px of scroll; desktop horizontal links vs.
 * mobile hamburger + bottom sheet, plus the always-present "Problems
 * Solved" link to the separate route. */
export function NavBar({ activeIndex, onNavTap }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollY = useScrollY()
  const scrollOpacity = Math.min(scrollY / 80, 1)

  return (
    <>
      <header
        className={styles.nav}
        style={{
          backgroundColor: `rgba(15, 32, 39, ${0.85 * scrollOpacity})`,
          borderBottomColor: `rgba(255, 255, 255, ${0.1216 * scrollOpacity})`,
        }}
      >
        <button type="button" className={styles.logo} onClick={() => onNavTap('home')}>
          {SHORT_NAME}
        </button>
        <div className={styles.spacer} />
        <nav className={styles.desktopLinks}>
          {NAV_ITEMS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.navLink} ${index === activeIndex ? styles.navLinkActive : ''}`}
              onClick={() => onNavTap(item.id)}
            >
              {item.label}
            </button>
          ))}
          <Link to="/problems" className={styles.navLink}>
            Problems Solved
          </Link>
        </nav>
        <button
          type="button"
          className={styles.menuButton}
          aria-label="Open navigation menu"
          onClick={() => setMenuOpen(true)}
        >
          <Menu />
        </button>
      </header>
      <MobileMenu
        open={menuOpen}
        activeIndex={activeIndex}
        onClose={() => setMenuOpen(false)}
        onNavTap={onNavTap}
      />
    </>
  )
}
