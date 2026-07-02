import { useMemo, useState } from 'react'
import supportPrograms, {
  categoryFilterOptions,
} from '../../../data/supportPrograms'
import { EmptyState } from '../../../shared/ui'
import { searchSupportPrograms } from '../services/supportService'
import SupportFinderResultCard from './SupportFinderResultCard'
import './SupportSearch.css'

export default function SupportSearch() {
  const [query, setQuery] = useState('')
  const [categoryKey, setCategoryKey] = useState('')

  const results = useMemo(
    () => searchSupportPrograms(query, supportPrograms, categoryKey),
    [query, categoryKey],
  )

  return (
    <section className="support-search">
      <div className="support-search__header">
        <h2 className="support-search__title">지원금 검색</h2>
        <p className="support-search__intro">
          제목, 태그, 카테고리로 지원금을 검색할 수 있습니다.
        </p>
      </div>

      <div className="support-search__controls">
        <input
          type="search"
          className="support-search__input"
          placeholder="지원금 이름, 태그 검색"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <div className="support-search__filters">
          {categoryFilterOptions.map((option) => (
            <button
              key={option.value || 'all'}
              type="button"
              className={`support-search__filter ${
                categoryKey === option.value
                  ? 'support-search__filter--active'
                  : ''
              }`}
              onClick={() => setCategoryKey(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="support-search__results">
        <p className="support-search__count">검색 결과 {results.length}건</p>
        {results.length > 0 ? (
          <div className="support-search__grid">
            {results.map((program, index) => (
              <SupportFinderResultCard
                key={program.id}
                program={program}
                index={index}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            variant="compact"
            icon="⌕"
            title="검색 결과가 없습니다"
            description="다른 키워드나 카테고리로 다시 검색해보세요."
          />
        )}
      </div>
    </section>
  )
}
