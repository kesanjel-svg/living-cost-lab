import { Link } from 'react-router-dom'
import { getTopicPath } from '../services/topicHubService'
import './RelatedTopicNav.css'

export default function RelatedTopicNav({ topics, currentSlug }) {
  const items = topics?.filter((topic) => topic.slug !== currentSlug) ?? []

  if (!items.length) {
    return null
  }

  return (
    <nav className="related-topic-nav" aria-label="관련 토픽">
      <h2 className="related-topic-nav__title">관련 토픽</h2>
      <ul className="related-topic-nav__list">
        {items.map((topic) => (
          <li key={topic.slug}>
            <Link to={getTopicPath(topic.slug)} className="related-topic-nav__chip">
              <span className="related-topic-nav__icon" aria-hidden="true">
                {topic.icon}
              </span>
              <span>{topic.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
