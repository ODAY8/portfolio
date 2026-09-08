import { NAME } from '../../data/content'
import { SocialLinks } from '../common/SocialLinks'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>
          © {year} {NAME}. Built with React.
        </p>
        <SocialLinks variant="icons" />
      </div>
    </footer>
  )
}
