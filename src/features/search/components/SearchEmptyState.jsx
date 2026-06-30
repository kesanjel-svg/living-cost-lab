import './SearchEmptyState.css'

export default function SearchEmptyState({
  title = '검색 결과가 없습니다',
  description = '다른 키워드로 검색하거나 인기 검색어를 눌러보세요.',
  children,
}) {
  return (
    <div className="search-empty">
      <div className="search-empty__icon" aria-hidden="true">
        ⌕
      </div>
      <h2 className="search-empty__title">{title}</h2>
      <p className="search-empty__desc">{description}</p>
      {children}
    </div>
  )
}
