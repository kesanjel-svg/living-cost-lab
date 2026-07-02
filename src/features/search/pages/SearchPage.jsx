import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ANALYTICS_EVENTS, trackEvent } from '../../../shared/analytics'
import {
  BRAND_NAME,
  BRAND_SEARCH_PLACEHOLDER_DETAILED,
} from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import { POPULAR_SEARCHES } from '../data/popularSearches'
import PopularSearchChips from '../components/PopularSearchChips'
import SearchEmptyState from '../components/SearchEmptyState'
import { SearchResultsSkeleton } from '../../../shared/ui'
import SearchInput from '../components/SearchInput'
import SearchResultGroup from '../components/SearchResultGroup'
import { SEARCH_TYPE_LABELS } from '../types'
import { search } from '../services/searchService'
import { addRecentSearch } from '../storage/searchStorage'
import './SearchPage.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '통합 검색', path: '/search' },
]

export default function SearchPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const queryParam = searchParams.get('q') ?? ''
  const [input, setInput] = useState(queryParam)
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setInput(queryParam)
  }, [queryParam])

  useEffect(() => {
    let cancelled = false

    async function runSearch() {
      const keyword = queryParam.trim()
      if (!keyword) {
        setResponse(null)
        setLoading(false)
        return
      }

      setLoading(true)
      const result = await search(keyword)
      if (!cancelled) {
        addRecentSearch(keyword)
        setResponse(result)
        setLoading(false)
        trackEvent(ANALYTICS_EVENTS.SEARCH, {
          search_term: keyword,
          result_count: result.total,
        })
        if (result.total === 0) {
          trackEvent(ANALYTICS_EVENTS.SEARCH_NO_RESULTS, {
            search_term: keyword,
          })
        }
      }
    }

    runSearch()
    return () => {
      cancelled = true
    }
  }, [queryParam])

  const handleSubmit = (keyword) => {
    const value = keyword.trim()
    if (!value) {
      return
    }
    const params = new URLSearchParams({ q: value })
    navigate(`/search?${params.toString()}`)
  }

  const seoTitle = queryParam ? `"${queryParam}" 검색 결과` : '통합 검색'

  const seoDescription = queryParam
    ? `${BRAND_NAME}에서 "${queryParam}"에 대한 지원금, 블로그, 계산기 검색 결과를 확인하세요.`
    : `정부지원금, 블로그, 계산기를 한 번에 검색하는 ${BRAND_NAME} 통합 검색입니다.`

  return (
    <div className="search-page page">
      <Seo
        title={seoTitle}
        description={seoDescription}
        keywords="통합 검색, 지원금 검색, 생활비, 계산기, 블로그"
        canonical={queryParam ? `/search?q=${encodeURIComponent(queryParam)}` : '/search'}
        breadcrumbs={BREADCRUMBS}
        noindex={Boolean(queryParam)}
      />

      <div className="search-page__header">
        <h1 className="search-page__title">통합 검색</h1>
        <p className="search-page__desc">
          정부지원금, 블로그, 계산기를 동시에 검색합니다.
        </p>
      </div>

      <div className="search-page__content">
        <SearchInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          size="lg"
          autoFocus
          placeholder={BRAND_SEARCH_PLACEHOLDER_DETAILED}
        />

        {!queryParam.trim() && (
          <div className="search-page__hints">
            <PopularSearchChips
              items={POPULAR_SEARCHES}
              onSelect={handleSubmit}
              title="인기 검색어"
            />
          </div>
        )}

        {loading && <SearchResultsSkeleton />}

        {!loading && queryParam.trim() && response?.total === 0 && (
          <SearchEmptyState
            title={`"${queryParam}" 검색 결과가 없습니다`}
            description="키워드를 바꿔보거나 인기 검색어를 선택해보세요."
          >
            <PopularSearchChips
              items={POPULAR_SEARCHES}
              onSelect={handleSubmit}
            />
          </SearchEmptyState>
        )}

        {!loading && response?.total > 0 && (
          <div className="search-page__results">
            <p className="search-page__count">
              <strong>{response.total}</strong>건의 결과
            </p>
            {Object.entries(response.grouped).map(([type, items]) => (
              <SearchResultGroup
                key={type}
                title={SEARCH_TYPE_LABELS[type] ?? type}
                items={items}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
