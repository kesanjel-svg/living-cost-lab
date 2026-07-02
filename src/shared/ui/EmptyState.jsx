import CtaButton from './CtaButton'
import './EmptyState.css'

export default function EmptyState({
  icon = '○',
  title,
  description,
  actionLabel,
  actionTo,
  actionVariant = 'soft',
  children,
  variant = 'default',
  className = '',
}) {
  return (
    <div
      className={`empty-state empty-state--${variant} ${className}`.trim()}
      role="status"
    >
      {icon && (
        <div className="empty-state__icon" aria-hidden="true">
          {icon}
        </div>
      )}
      {title && <h2 className="empty-state__title">{title}</h2>}
      {description && <p className="empty-state__desc">{description}</p>}
      {children}
      {actionLabel && actionTo && (
        <div className="empty-state__action">
          <CtaButton to={actionTo} variant={actionVariant} size="sm">
            {actionLabel}
          </CtaButton>
        </div>
      )}
    </div>
  )
}
