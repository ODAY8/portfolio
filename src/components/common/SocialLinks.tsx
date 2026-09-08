import { SOCIAL_LINKS } from '../../data/content'
import styles from './SocialLinks.module.css'

interface SocialLinksProps {
  variant?: 'buttons' | 'icons'
}

/** Renders Content.SOCIAL_LINKS as either labeled buttons (Contact section)
 * or icon-only links (Footer) -- a single shared component instead of
 * duplicating the link list in both places. */
export function SocialLinks({ variant = 'buttons' }: SocialLinksProps) {
  if (variant === 'icons') {
    return (
      <div className={styles.iconsRow}>
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconButton}
            aria-label={link.label}
            title={link.label}
          >
            <link.icon size={18} />
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className={styles.row}>
      {SOCIAL_LINKS.map((link) => (
        <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.button}>
          <link.icon size={18} />
          {link.label}
        </a>
      ))}
    </div>
  )
}
