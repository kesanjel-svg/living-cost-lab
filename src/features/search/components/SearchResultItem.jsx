import { Link } from 'react-router-dom'
import { SEARCH_TYPE_LABELS } from '../types'
import './SearchResultItem.css'

export default function SearchResultItem({ item, onSelect }) {
  const typeLabel = SEARCH_TYPE_LABELS[item.type] ?? item.type

  return (
    <Link
      to={item.href}
      className="search-result-item"
      onClick={() => onSelect?.(item)}
    >
      <span className={`search-result-item__type search-result-item__type--${item.type}`}>
        {typeLabel}
      </span>
      <span className="search-result-item__title">{item.title}</span>
      {item.description && (
        <span className="search-result-item__desc">{item.description}</span>
      )}
    </Link>
  )
}
