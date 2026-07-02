import { Link } from 'react-router-dom'
import { EmptyState } from '../../../shared/ui'
import './DashboardSection.css'

export default function DashboardSection({
  title,
  items = [],
  emptyMessage,
  emptyLinkLabel,
  emptyLinkTo,
  moreLink,
  moreLabel = '더 보기',
}) {
  return (
    <section className="dashboard-section">
      <div className="dashboard-section__header">
        <h2 className="dashboard-section__title">{title}</h2>
        {moreLink && (
          <Link to={moreLink} className="dashboard-section__more">
            {moreLabel}
          </Link>
        )}
      </div>

      {items.length > 0 ? (
        <ul className="dashboard-section__list">
          {items.map((item) => (
            <li key={item.id ?? item.link ?? item.slug} className="dashboard-section__item">
              {item.status ? (
                <span className="dashboard-section__pending">
                  {item.title}
                  <span className="dashboard-section__badge">{item.status}</span>
                </span>
              ) : (
                <Link to={item.link} className="dashboard-section__link">
                  {item.title}
                  <span aria-hidden="true">→</span>
                </Link>
              )}
              {item.category && (
                <span className="dashboard-section__meta">{item.category}</span>
              )}
              {item.summary && (
                <p className="dashboard-section__summary">{item.summary}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          variant="inline"
          icon=""
          title={emptyMessage}
          actionLabel={emptyLinkLabel}
          actionTo={emptyLinkTo}
          actionVariant="soft"
        />
      )}
    </section>
  )
}
