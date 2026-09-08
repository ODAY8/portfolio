import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const TYPE_SPEED_MS = 55
const DELETE_SPEED_MS = 30
const HOLD_MS = 1600

/** Port of HeroSection's Ticker-driven type/delete/hold state machine,
 * cycling forever through `words`. `words` should be a stable (module-level
 * constant) array reference. Under prefers-reduced-motion, skips the
 * animation entirely and returns the first word statically. */
export function useTypewriter(words: string[]) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [visibleText, setVisibleText] = useState('')

  useEffect(() => {
    if (words.length === 0 || prefersReducedMotion) return

    let wordIndex = 0
    let deleting = false
    let current = ''
    let timeoutId: ReturnType<typeof setTimeout>

    function tick() {
      const target = words[wordIndex]

      if (current === target && !deleting) {
        timeoutId = setTimeout(() => {
          deleting = true
          tick()
        }, HOLD_MS)
        return
      }

      if (deleting) {
        current = current.slice(0, -1)
        setVisibleText(current)
        if (current.length === 0) {
          deleting = false
          wordIndex = (wordIndex + 1) % words.length
        }
        timeoutId = setTimeout(tick, DELETE_SPEED_MS)
      } else {
        current = target.slice(0, current.length + 1)
        setVisibleText(current)
        timeoutId = setTimeout(tick, TYPE_SPEED_MS)
      }
    }

    timeoutId = setTimeout(tick, TYPE_SPEED_MS)
    return () => clearTimeout(timeoutId)
  }, [words, prefersReducedMotion])

  if (prefersReducedMotion) return words[0] ?? ''
  return visibleText
}
