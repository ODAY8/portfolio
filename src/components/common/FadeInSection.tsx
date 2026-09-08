import type { ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

interface FadeInSectionProps {
  children: ReactNode
  delayMs?: number
  className?: string
}

/** Port of AnimatedInView: fades + slides the child up once it's ~15%
 * visible, staggered via `delayMs`. The animation itself lives in the
 * `.fade-in-section`/`.is-visible` global CSS classes. */
export function FadeInSection({ children, delayMs = 0, className }: FadeInSectionProps) {
  const { ref, isVisible } = useInView<HTMLDivElement>()

  const classes = ['fade-in-section', isVisible && 'is-visible', className].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={classes} style={{ transitionDelay: `${delayMs}ms` }}>
      {children}
    </div>
  )
}
