import { Link } from 'react-router-dom'
import './SectionHeader.css'

export default function SectionHeader({ title, action }) {
  return (
    <div className="section-header">
      <h2 className="section-header__title">{title}</h2>
      {action &&
        (action.to || action.href?.startsWith('/') ? (
          <Link
            to={action.to || action.href}
            className="section-header__action"
          >
            {action.label}
            <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <a href={action.href} className="section-header__action">
            {action.label}
            <span aria-hidden="true">→</span>
          </a>
        ))}
    </div>
  )
}
