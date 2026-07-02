import { Link } from 'react-router-dom'
import './CtaButton.css'

const VARIANT_CLASS = {
  solid: 'cta-btn--solid',
  outline: 'cta-btn--outline',
  soft: 'cta-btn--soft',
  'inverse-primary': 'cta-btn--inverse-primary',
  'inverse-secondary': 'cta-btn--inverse-secondary',
  'inverse-ghost': 'cta-btn--inverse-ghost',
}

const SIZE_CLASS = {
  sm: 'cta-btn--sm',
  md: 'cta-btn--md',
  lg: 'cta-btn--lg',
}

export default function CtaButton({
  to,
  href,
  children,
  variant = 'solid',
  size = 'md',
  className = '',
  showArrow = false,
  ...rest
}) {
  const classes = [
    'cta-btn',
    VARIANT_CLASS[variant] ?? VARIANT_CLASS.solid,
    SIZE_CLASS[size] ?? SIZE_CLASS.md,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {children}
      {showArrow && <span aria-hidden="true">→</span>}
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <Link to={to ?? '/'} className={classes} {...rest}>
      {content}
    </Link>
  )
}
