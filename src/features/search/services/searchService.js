import { localSearchProvider } from '../providers/localSearchProvider'

/** @type {import('../types.js').SearchService} */
let activeProvider = localSearchProvider

export function setSearchProvider(provider) {
  activeProvider = provider
}

export function getSearchProvider() {
  return activeProvider
}

export function search(query, options) {
  return activeProvider.search(query, options)
}

export function autocomplete(query, limit) {
  return activeProvider.autocomplete(query, limit)
}

export { localSearchProvider }
