import { assetUrl } from '../../lib/assetUrl'
import styles from './ProfilePortrait.module.css'

/** Rounded-rect portrait card (replaces the old circular gradient-ring
 * avatar) -- crops toward the top of the source image so the face stays
 * framed at any card aspect ratio. */
export function ProfilePortrait() {
  return (
    <div className={styles.card}>
      <img src={assetUrl('/images/profile.jpg')} alt="Mohamed Abdirahman Warsame" className={styles.image} />
    </div>
  )
}
