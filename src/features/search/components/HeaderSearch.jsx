import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BRAND_SEARCH_PLACEHOLDER } from '../../../constants/branding'
import { POPULAR_SEARCHES } from '../data/popularSearches'
import { useSearchAutocomplete } from '../hooks/useSearchAutocomplete'
import {
  addRecentSearch,
  clearRecentSearches,
  getRecentSearches,
} from '../storage/searchStorage'
import SearchAutocompletePanel from './SearchAutocompletePanel'
import SearchInput from './SearchInput'
import './HeaderSearch.css'

function buildSearchUrl(query) {
  const params = new URLSearchParams({ q: query.trim() })
  return `/search?${params.toString()}`
}

export default function HeaderSearch() {
  const navigate = useNavigate()
  const panelId = useId()
  const rootRef = useRef(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [recentItems, setRecentItems] = useState(() => getRecentSearches())

  const { suggestions, loading } = useSearchAutocomplete(query, { limit: 6 })

  const closePanel = useCallback(() => setOpen(false), [])

  const runSearch = useCallback(
    (keyword) => {
      const value = keyword.trim()
      if (!value) {
        return
      }

      addRecentSearch(value)
      setRecentItems(getRecentSearches())
      setQuery(value)
      closePanel()
      navigate(buildSearchUrl(value))
    },
    [closePanel, navigate],
  )

  useEffect(() => {
    function handlePointerDown(event) {
      if (!rootRef.current?.contains(event.target)) {
        closePanel()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [closePanel])

  const handleSelectResult = () => {
    if (query.trim()) {
      addRecentSearch(query.trim())
      setRecentItems(getRecentSearches())
    }
    closePanel()
  }

  const handleClearRecent = () => {
    clearRecentSearches()
    setRecentItems([])
  }

  return (
    <div className="header-search" ref={rootRef}>
      <SearchInput
        value={query}
        onChange={setQuery}
        onSubmit={runSearch}
        size="sm"
        placeholder={BRAND_SEARCH_PLACEHOLDER}
        ariaControls={panelId}
        ariaExpanded={open}
        onFocus={() => setOpen(true)}
      />
      <SearchAutocompletePanel
        id={panelId}
        open={open}
        query={query}
        loading={loading}
        suggestions={suggestions}
        recentItems={recentItems}
        popularItems={POPULAR_SEARCHES}
        onSelectQuery={runSearch}
        onSelectResult={handleSelectResult}
        onClearRecent={handleClearRecent}
      />
    </div>
  )
}
