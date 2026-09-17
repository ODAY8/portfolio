import type { ReactNode } from 'react'
import { useMagneticHover } from '../../hooks/useMagneticHover'
import styles from './MagneticButton.module.css'

interface MagneticButtonProps {
  children: ReactNode
  strength?: number
}

/** Wraps a single interactive child (a Button, a link) so it nudges toward
 * the cursor on hover -- used sparingly, only on the one or two CTAs that
 * should feel most alive, not blanket-applied to every button. */
export function MagneticButton({ children, strength }: MagneticButtonProps) {
  const ref = useMagneticHover<HTMLDivElement>(strength)
  return (
    <div ref={ref} className={styles.wrap}>
      {children}
    </div>
  )
}
