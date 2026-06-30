import './PopularSearchChips.css'

export default function PopularSearchChips({ items, onSelect, title = '인기 검색어' }) {
  if (!items?.length) {
    return null
  }

  return (
    <div className="popular-search">
      <p className="popular-search__title">{title}</p>
      <div className="popular-search__chips">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            className="popular-search__chip"
            onClick={() => onSelect(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
