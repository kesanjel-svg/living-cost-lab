import { useEffect, useState } from 'react'
import { autocomplete } from '../services/searchService'

export function useSearchAutocomplete(query, { limit = 6, debounceMs = 200 } = {}) {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const keyword = query.trim()
    if (!keyword) {
      setSuggestions([])
      setLoading(false)
      return undefined
    }

    setLoading(true)
    const timer = window.setTimeout(async () => {
      const results = await autocomplete(keyword, limit)
      setSuggestions(results)
      setLoading(false)
    }, debounceMs)

    return () => window.clearTimeout(timer)
  }, [query, limit, debounceMs])

  return { suggestions, loading }
}
