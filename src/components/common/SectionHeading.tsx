import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle?: string
  /** Heading level for `title` -- defaults to h2 (a subsection heading
   * within a page that has its own h1 elsewhere, as on the home page).
   * Pass "h1" when this is a standalone route's main heading. */
  as?: 'h1' | 'h2'
}

export function SectionHeading({ eyebrow, title, subtitle, as: Tag = 'h2' }: SectionHeadingProps) {
  return (
    <div>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <Tag className={styles.title}>{title}</Tag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
}
