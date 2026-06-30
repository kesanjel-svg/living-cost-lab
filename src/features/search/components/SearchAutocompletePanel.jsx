import SearchResultItem from './SearchResultItem'
import PopularSearchChips from './PopularSearchChips'
import RecentSearchList from './RecentSearchList'
import './SearchAutocompletePanel.css'

export default function SearchAutocompletePanel({
  id,
  open,
  query,
  loading,
  suggestions,
  recentItems,
  popularItems,
  onSelectQuery,
  onSelectResult,
  onClearRecent,
}) {
  if (!open) {
    return null
  }

  const hasQuery = Boolean(query.trim())
  const showSuggestions = hasQuery && suggestions.length > 0
  const showEmptySuggestions = hasQuery && !loading && suggestions.length === 0

  return (
    <div id={id} className="search-autocomplete" role="listbox">
      {showSuggestions && (
        <div className="search-autocomplete__section">
          <p className="search-autocomplete__label">추천 결과</p>
          <ul className="search-autocomplete__list">
            {suggestions.map((item) => (
              <li key={item.id} role="option">
                <SearchResultItem item={item} onSelect={onSelectResult} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading && hasQuery && (
        <p className="search-autocomplete__loading">검색 중...</p>
      )}

      {showEmptySuggestions && (
        <p className="search-autocomplete__empty">일치하는 결과가 없습니다.</p>
      )}

      {!hasQuery && (
        <>
          <RecentSearchList
            items={recentItems}
            onSelect={onSelectQuery}
            onClear={onClearRecent}
          />
          <PopularSearchChips items={popularItems} onSelect={onSelectQuery} />
        </>
      )}
    </div>
  )
}
