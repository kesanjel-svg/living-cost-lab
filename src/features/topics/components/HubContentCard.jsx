import { Link } from 'react-router-dom'
import { formatBlogDate } from '../../blog/services/blogService'
import './HubContentCard.css'

const TYPE_LABELS = {
  blog: '블로그',
  support: '지원금',
  calculator: '계산기',
}

export default function HubContentCard({ item, index = 0 }) {
  const isDisabled = item.type === 'calculator' && item.available === false

  const content = (
    <>
      <span className={`hub-content-card__badge hub-content-card__badge--${item.type}`}>
        {item.badge ?? TYPE_LABELS[item.type]}
      </span>
      <h3 className="hub-content-card__title">{item.title}</h3>
      <p className="hub-content-card__summary">{item.summary}</p>
      {item.date && (
        <time className="hub-content-card__date" dateTime={item.date}>
          {formatBlogDate(item.date)}
        </time>
      )}
    </>
  )

  if (isDisabled) {
    return (
      <div
        className="hub-content-card hub-content-card--disabled"
        style={{ animationDelay: `${0.04 + index * 0.05}s` }}
      >
        {content}
      </div>
    )
  }

  return (
    <Link
      to={item.href}
      className="hub-content-card"
      style={{ animationDelay: `${0.04 + index * 0.05}s` }}
    >
      {content}
    </Link>
  )
}
