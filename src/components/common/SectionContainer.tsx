import type { CSSProperties, ReactNode, Ref } from 'react'
import styles from './SectionContainer.module.css'

interface SectionContainerProps {
  id: string
  children: ReactNode
  background?: string
  sectionRef?: Ref<HTMLElement>
  style?: CSSProperties
}

/** Port of section_container.dart's SectionContainer: consistent
 * horizontal padding + a 1200px max content width, centered, applied to
 * every section so the page reads as one coherent grid. */
export function SectionContainer({ id, children, background, sectionRef, style }: SectionContainerProps) {
  return (
    <section
      id={id}
      ref={sectionRef}
      className={styles.section}
      style={{ background, ...style }}
    >
      <div className={styles.inner}>{children}</div>
    </section>
  )
}
