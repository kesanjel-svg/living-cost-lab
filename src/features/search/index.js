export { default as HeaderSearch } from './components/HeaderSearch.jsx'
export { default as SearchInput } from './components/SearchInput.jsx'
export { default as SearchAutocompletePanel } from './components/SearchAutocompletePanel.jsx'
export { default as SearchResultItem } from './components/SearchResultItem.jsx'
export { default as SearchResultGroup } from './components/SearchResultGroup.jsx'
export { default as SearchEmptyState } from './components/SearchEmptyState.jsx'
export { default as PopularSearchChips } from './components/PopularSearchChips.jsx'
export { default as RecentSearchList } from './components/RecentSearchList.jsx'

export {
  search,
  autocomplete,
  setSearchProvider,
  getSearchProvider,
  localSearchProvider,
} from './services/searchService.js'

export { POPULAR_SEARCHES } from './data/popularSearches.js'
export {
  getRecentSearches,
  addRecentSearch,
  clearRecentSearches,
} from './storage/searchStorage.js'
