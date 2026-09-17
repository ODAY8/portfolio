import styles from './ArchitectureFilters.module.css'

interface ArchitectureFiltersProps {
  categories: string[]
  active: string
  onSelect: (category: string) => void
}

export const ALL_CATEGORIES = 'All'

/** Pill filter row -- purely client-side state, so switching categories
 * never reloads or re-fetches anything. */
export function ArchitectureFilters({ categories, active, onSelect }: ArchitectureFiltersProps) {
  return (
    <div className={styles.row} role="group" aria-label="Filter by category">
      {[ALL_CATEGORIES, ...categories].map((category) => (
        <button
          key={category}
          type="button"
          className={`${styles.pill} ${category === active ? styles.pillActive : ''}`}
          aria-pressed={category === active}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
