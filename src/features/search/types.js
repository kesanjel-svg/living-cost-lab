export const SEARCH_TYPES = {
  SUPPORT: 'support',
  BLOG: 'blog',
  CALCULATOR: 'calculator',
}

export const SEARCH_TYPE_LABELS = {
  support: '정부지원금',
  blog: '블로그',
  calculator: '계산기',
}

/**
 * @typedef {Object} SearchResultItem
 * @property {string} id
 * @property {'support'|'blog'|'calculator'} type
 * @property {string} title
 * @property {string} description
 * @property {string} href
 * @property {string[]} [tags]
 * @property {boolean} [available]
 * @property {number} [score]
 */

/**
 * @typedef {Object} SearchResponse
 * @property {string} query
 * @property {SearchResultItem[]} results
 * @property {Record<string, SearchResultItem[]>} grouped
 * @property {number} total
 */

/**
 * @typedef {Object} SearchOptions
 * @property {number} [limit]
 * @property {string[]} [types]
 */

/**
 * @typedef {Object} SearchService
 * @property {(query: string, options?: SearchOptions) => Promise<SearchResponse>} search
 * @property {(query: string, limit?: number) => Promise<SearchResultItem[]>} autocomplete
 */
