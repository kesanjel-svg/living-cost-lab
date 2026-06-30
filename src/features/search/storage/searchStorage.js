const RECENT_SEARCHES_KEY = 'living-cost-lab:recent-searches'
const MAX_RECENT = 8

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore
  }
}

export function getRecentSearches() {
  return readJson(RECENT_SEARCHES_KEY, [])
}

export function addRecentSearch(query) {
  const keyword = query.trim()
  if (!keyword) {
    return getRecentSearches()
  }

  const normalized = keyword.toLowerCase()
  const current = getRecentSearches().filter(
    (item) => item.query.toLowerCase() !== normalized,
  )

  const next = [
    { query: keyword, searchedAt: new Date().toISOString() },
    ...current,
  ].slice(0, MAX_RECENT)

  writeJson(RECENT_SEARCHES_KEY, next)
  return next
}

export function clearRecentSearches() {
  localStorage.removeItem(RECENT_SEARCHES_KEY)
}

export function removeRecentSearch(query) {
  const normalized = query.trim().toLowerCase()
  const next = getRecentSearches().filter(
    (item) => item.query.toLowerCase() !== normalized,
  )
  writeJson(RECENT_SEARCHES_KEY, next)
  return next
}
