import SearchResultItem from './SearchResultItem'
import PopularSearchChips from './PopularSearchChips'
import RecentSearchList from './RecentSearchList'
import { EmptyState, Skeleton } from '../../../shared/ui'
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
        <div className="search-autocomplete__loading" aria-busy="true" aria-label="검색 중">
          <Skeleton height="2.25rem" radius="var(--radius-md)" />
          <Skeleton height="2.25rem" radius="var(--radius-md)" />
        </div>
      )}

      {showEmptySuggestions && (
        <EmptyState
          variant="compact"
          icon="⌕"
          title="일치하는 결과가 없습니다"
          description="다른 키워드로 검색해보세요."
        />
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
