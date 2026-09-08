import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary'

interface CommonProps {
  variant?: Variant
  icon?: ReactNode
  children: ReactNode
}

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type AsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

type ButtonProps = AsButton | AsLink

/**
 * Renders a real <button> or a real <a>, whichever the action calls for --
 * external/download links get an anchor, in-page actions (scroll, submit)
 * get a button. Visual styling (gradient-fill "primary" vs outlined
 * "secondary") matches CtaButton from the Flutter source 1:1; the hover
 * scale+glow is pure CSS (`:hover`) rather than a JS wrapper widget.
 */
export function Button({ variant = 'primary', icon, children, className, ...props }: ButtonProps) {
  const classes = [styles.button, variant === 'primary' ? styles.primary : styles.secondary, className]
    .filter(Boolean)
    .join(' ')

  if ('href' in props && props.href !== undefined) {
    return (
      <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        <span>{children}</span>
        {icon && <span className={styles.icon}>{icon}</span>}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      <span>{children}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  )
}
