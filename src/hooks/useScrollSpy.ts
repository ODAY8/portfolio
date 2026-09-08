import { useCallback, useEffect, useRef, useState } from 'react'
import { scrollToElement } from './useSmoothScroll'

const ACTIVE_THRESHOLD_PX = 160

/**
 * Port of HomeScreen._computeActiveIndex(): the active section is the last
 * one (in document order) whose top has scrolled above a 160px line from
 * the viewport top. Returns the active index and a ref-registration
 * callback to attach to each section element, keyed by its id.
 */
export function useScrollSpy(ids: string[]) {
  const [activeIndex, setActiveIndex] = useState(0)
  const nodesRef = useRef(new Map<string, HTMLElement>())

  const registerSection = useCallback(
    (id: string) => (node: HTMLElement | null) => {
      if (node) nodesRef.current.set(id, node)
      else nodesRef.current.delete(id)
    },
    [],
  )

  useEffect(() => {
    let ticking = false

    function computeActiveIndex() {
      let active = 0
      ids.forEach((id, index) => {
        const node = nodesRef.current.get(id)
        if (!node) return
        const top = node.getBoundingClientRect().top
        if (top <= ACTIVE_THRESHOLD_PX) active = index
      })
      setActiveIndex(active)
    }

    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        computeActiveIndex()
        ticking = false
      })
    }

    computeActiveIndex()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  const scrollToSection = useCallback((id: string) => {
    const node = nodesRef.current.get(id)
    if (node) scrollToElement(node)
  }, [])

  return { activeIndex, registerSection, scrollToSection }
}
