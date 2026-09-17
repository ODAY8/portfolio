import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const DURATION_MS = 1100

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

/** Animates 0 -> target once `active` first becomes true (e.g. scrolled
 * into view via useInView), then holds at target -- a one-shot count-up,
 * mirroring FadeInSection's one-shot reveal. Jumps straight to target
 * under prefers-reduced-motion. */
export function useCountUp(target: number, active: boolean) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [value, setValue] = useState(prefersReducedMotion ? target : 0)

  useEffect(() => {
    if (!active || prefersReducedMotion) return

    let rafId: number
    let start: number | null = null

    function tick(now: number) {
      if (start === null) start = now
      const t = Math.min(1, (now - start) / DURATION_MS)
      setValue(Math.round(easeOutCubic(t) * target))
      if (t < 1) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
    // Runs once per mount when `active` first flips true; useInView never
    // reverts to false, so this doesn't need to re-run on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  return value
}
