import { assetUrl } from '../../lib/assetUrl'
import styles from './ProfilePortrait.module.css'

/** Port of profile_portrait.dart: a gradient ring + proportional glow shadow
 * around a circular photo, biased to crop toward the top (face) of the
 * source image. Static/no animation, as in the original. Size is fully
 * CSS-driven (128px mobile / 180px tablet / 260px desktop) via the
 * `--size` custom property, so no JS breakpoint logic is needed here. */
export function ProfilePortrait() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.ring}>
        <div className={styles.inner}>
          <img src={assetUrl('/images/profile.jpg')} alt="Mohamed Abdirahman Warsame" className={styles.image} />
        </div>
      </div>
    </div>
  )
}
