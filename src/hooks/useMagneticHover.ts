import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/** Subtle "magnetic" cursor pull: while the pointer is over the element it
 * nudges toward the cursor by a damped fraction of the offset, springing
 * back on leave (via a CSS transition on the consumer's own class, not
 * here). Skipped under prefers-reduced-motion and on coarse/touch
 * pointers, where hover-tracking doesn't apply. */
export function useMagneticHover<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    function onMove(event: MouseEvent) {
      const rect = el!.getBoundingClientRect()
      const relX = event.clientX - (rect.left + rect.width / 2)
      const relY = event.clientY - (rect.top + rect.height / 2)
      el!.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`
    }

    function onLeave() {
      el!.style.transform = ''
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      el.style.transform = ''
    }
  }, [prefersReducedMotion, strength])

  return ref
}
