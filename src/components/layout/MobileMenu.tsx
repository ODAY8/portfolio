import { Link } from 'react-router-dom'
import { NAV_ITEMS } from '../../data/content'
import styles from './MobileMenu.module.css'

interface MobileMenuProps {
  open: boolean
  activeIndex: number
  onClose: () => void
  onNavTap: (id: string) => void
}

/** Port of NavBar's mobile hamburger -> bottom-sheet menu. */
export function MobileMenu({ open, activeIndex, onClose, onNavTap }: MobileMenuProps) {
  return (
    <>
      <div
        className={`${styles.backdrop} ${open ? styles.open : ''}`}
        onClick={onClose}
        aria-hidden={!open}
        style={{ pointerEvents: open ? 'auto' : 'none' }}
      />
      <div
        className={`${styles.sheet} ${open ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        style={{ pointerEvents: open ? 'auto' : 'none' }}
      >
        <div className={styles.handle} />
        {NAV_ITEMS.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.item} ${index === activeIndex ? styles.itemActive : ''}`}
            onClick={() => {
              onClose()
              onNavTap(item.id)
            }}
          >
            {item.label}
          </button>
        ))}
        <Link to="/problems" className={styles.item} onClick={onClose}>
          Problems Solved
        </Link>
      </div>
    </>
  )
}
