import './RecentSearchList.css'

export default function RecentSearchList({
  items,
  onSelect,
  onClear,
  title = '최근 검색',
}) {
  if (!items?.length) {
    return null
  }

  return (
    <div className="recent-search">
      <div className="recent-search__header">
        <p className="recent-search__title">{title}</p>
        {onClear && (
          <button type="button" className="recent-search__clear" onClick={onClear}>
            전체 삭제
          </button>
        )}
      </div>
      <ul className="recent-search__list">
        {items.map((item) => (
          <li key={item.query}>
            <button
              type="button"
              className="recent-search__item"
              onClick={() => onSelect(item.query)}
            >
              {item.query}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
