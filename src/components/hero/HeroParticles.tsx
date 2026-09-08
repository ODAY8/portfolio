import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import styles from './HeroParticles.module.css'

const PARTICLE_COUNT = 22
const CYCLE_MS = 40_000
const CONNECT_DISTANCE = 140
const ACCENT = [100, 255, 218] as const

interface Particle {
  x: number
  y: number
  speed: number
  phase: number
  radius: number
}

/** Deterministic per-index PRNG (mulberry32) -- not Dart's Random algorithm,
 * but the same idea: seeded by `i * 97` so particle layout is stable across
 * reloads, matching the visual intent of the Flutter source. */
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function createParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const rand = mulberry32(i * 97)
    return {
      x: rand(),
      y: rand(),
      speed: 0.4 + rand() * 0.6,
      phase: rand() * 2 * Math.PI,
      radius: 1.2 + rand() * 1.8,
    }
  })
}

/** Port of hero_background.dart's hand-rolled particle system: 22 particles
 * on a periodic sine/cosine wander over a 40s cycle, connected by faint
 * lines when within 140px of each other. Renders a single static frame
 * under prefers-reduced-motion instead of animating forever. */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>(createParticles())
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const container = canvas?.parentElement
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = window.devicePixelRatio || 1

    function resize() {
      if (!canvas || !container) return
      width = container.clientWidth
      height = container.clientHeight
      dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    function draw(t: number) {
      ctx!.clearRect(0, 0, width, height)
      const positions: [number, number][] = []

      for (const p of particlesRef.current) {
        const dy = Math.sin(t * 2 * Math.PI * p.speed + p.phase) * 0.04
        const dx = Math.cos(t * 2 * Math.PI * p.speed * 0.7 + p.phase) * 0.03
        const px = Math.min(Math.max(p.x + dx, 0), 1) * width
        const py = Math.min(Math.max(p.y + dy, 0), 1) * height
        positions.push([px, py])

        ctx!.beginPath()
        ctx!.arc(px, py, p.radius, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${ACCENT[0]}, ${ACCENT[1]}, ${ACCENT[2]}, 0.45)`
        ctx!.fill()
      }

      ctx!.strokeStyle = `rgba(${ACCENT[0]}, ${ACCENT[1]}, ${ACCENT[2]}, 0.08)`
      ctx!.lineWidth = 1
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const [x1, y1] = positions[i]
          const [x2, y2] = positions[j]
          const dist = Math.hypot(x1 - x2, y1 - y2)
          if (dist < CONNECT_DISTANCE) {
            ctx!.beginPath()
            ctx!.moveTo(x1, y1)
            ctx!.lineTo(x2, y2)
            ctx!.stroke()
          }
        }
      }
    }

    if (prefersReducedMotion) {
      draw(0)
      return () => resizeObserver.disconnect()
    }

    let rafId: number
    function loop(now: number) {
      const t = (now % CYCLE_MS) / CYCLE_MS
      draw(t)
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
    }
  }, [prefersReducedMotion])

  return (
    <div className={styles.background}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}
