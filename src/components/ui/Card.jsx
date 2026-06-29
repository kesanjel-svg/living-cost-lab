import { Link } from 'react-router-dom'
import './Card.css'

function CardWrapper({ href, disabled, className, style, children }) {
  if (href && !disabled && href.startsWith('/')) {
    return (
      <Link to={href} className={className} style={style}>
        {children}
      </Link>
    )
  }

  if (href && !disabled) {
    return (
      <a href={href} className={className} style={style}>
        {children}
      </a>
    )
  }

  return (
    <article className={className} style={style}>
      {children}
    </article>
  )
}

export default function Card({
  title,
  description,
  icon,
  badge,
  badgeVariant = 'default',
  href,
  linkText,
  variant = 'default',
  disabled = false,
  animationDelay = 0,
  className = '',
}) {
  const classNames = [
    'card',
    `card--${variant}`,
    disabled ? 'card--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <CardWrapper
      href={href}
      disabled={disabled}
      className={classNames}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {icon && (
        <div className="card__icon" aria-hidden="true">
          {icon}
        </div>
      )}

      <div className="card__body">
        <div className="card__header">
          <h3 className="card__title">{title}</h3>
          {badge && (
            <span className={`card__badge card__badge--${badgeVariant}`}>
              {badgeVariant === 'active' && (
                <span className="card__badge-dot" aria-hidden="true" />
              )}
              {badge}
            </span>
          )}
        </div>

        {description && <p className="card__description">{description}</p>}

        {linkText && !disabled && (
          <span className="card__link">
            {linkText}
            <span aria-hidden="true">→</span>
          </span>
        )}

        {linkText && disabled && (
          <span className="card__link card__link--muted">{linkText}</span>
        )}
      </div>
    </CardWrapper>
  )
}
