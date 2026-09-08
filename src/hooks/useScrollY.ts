import { useEffect, useState } from 'react'

/** rAF-throttled window scroll Y, used to drive the navbar's scroll-based
 * background opacity and the back-to-top button's visibility. */
export function useScrollY() {
  const [scrollY, setScrollY] = useState(() => window.scrollY)

  useEffect(() => {
    let ticking = false

    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scrollY
}
