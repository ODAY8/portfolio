const DURATION_MS = 650

/** Port of Curves.easeInOutCubic. */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/**
 * rAF-driven scroll animator -- native `scrollIntoView`/`scrollTo({behavior:
 * 'smooth'})` doesn't allow a custom duration/easing curve across browsers,
 * so this replicates Scrollable.ensureVisible's 650ms easeInOutCubic feel
 * exactly.
 */
function animateScrollTo(targetY: number) {
  const startY = window.scrollY
  const distance = targetY - startY
  if (Math.abs(distance) < 1) return

  const startTime = performance.now()

  function step(now: number) {
    const elapsed = now - startTime
    const t = Math.min(elapsed / DURATION_MS, 1)
    window.scrollTo(0, startY + distance * easeInOutCubic(t))
    if (t < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

/** Scrolls so the element's top aligns with the viewport top (matches
 * Scrollable.ensureVisible's default alignment: 0.0). */
export function scrollToElement(node: HTMLElement) {
  const targetY = node.getBoundingClientRect().top + window.scrollY
  animateScrollTo(targetY)
}

export function scrollToTop() {
  animateScrollTo(0)
}
