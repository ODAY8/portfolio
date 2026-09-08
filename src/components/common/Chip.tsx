import styles from './Chip.module.css'

interface ChipProps {
  label: string
  variant?: 'default' | 'tag'
}

/** Skill chip (hoverable, `HoverScale`-equivalent via plain CSS `:hover`) or
 * a smaller monospace "tag" chip (project tech stack / problem tags). */
export function Chip({ label, variant = 'default' }: ChipProps) {
  const classes = [styles.chip, variant === 'tag' && styles.tag].filter(Boolean).join(' ')
  return <span className={classes}>{label}</span>
}
