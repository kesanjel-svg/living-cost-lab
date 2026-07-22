import { blogPosts } from '../../../data/blogPosts'
import { popularCalculators } from '../../../data/calculators'
import supportPrograms from '../../../data/supportPrograms'
import { calculatorRegistry } from '../../../constants/calculators'
import { getBlogPath } from '../../blog/services/blogService'
import { SEARCH_TYPES } from '../types'

function buildDocuments() {
  const supportDocs = supportPrograms.map((program) => ({
    id: `support-${program.id}`,
    type: SEARCH_TYPES.SUPPORT,
    title: program.title,
    description: program.summary,
    href: `/support/${program.slug ?? program.id}`,
    tags: program.tags ?? [],
    haystack: [
      program.title,
      program.category,
      program.categoryKey,
      program.summary,
      ...(program.tags ?? []),
    ]
      .join(' ')
      .toLowerCase(),
  }))

  const blogDocs = blogPosts.map((post) => ({
    id: `blog-${post.slug}`,
    type: SEARCH_TYPES.BLOG,
    title: post.title,
    description: post.summary,
    href: getBlogPath(post.slug),
    tags: [post.category],
    haystack: [post.title, post.summary, post.category].join(' ').toLowerCase(),
  }))

  const registryKeyMap = {
    electric: 'electric',
    gas: 'gas',
    pension: 'pension',
    'health-insurance': 'health',
    'net-salary': 'netSalary',
  }

  // 미제공(available: false) 계산기는 검색 색인에서 제외한다 — "준비중" 배지 노출 금지.
  const calculatorDocs = popularCalculators
    .filter((calculator) => {
      const registryKey = registryKeyMap[calculator.id] ?? calculator.id
      return calculatorRegistry[registryKey]?.available
    })
    .map((calculator) => ({
      id: `calculator-${calculator.id}`,
      type: SEARCH_TYPES.CALCULATOR,
      title: calculator.title,
      description: calculator.description,
      href: calculator.href,
      tags: ['계산기'],
      haystack: [calculator.title, calculator.description, '계산기']
        .join(' ')
        .toLowerCase(),
    }))

  return [...supportDocs, ...blogDocs, ...calculatorDocs]
}

const documents = buildDocuments()

function scoreDocument(document, keyword) {
  const q = keyword.toLowerCase()
  let score = 0

  if (document.title.toLowerCase() === q) {
    score += 100
  } else if (document.title.toLowerCase().startsWith(q)) {
    score += 40
  } else if (document.title.toLowerCase().includes(q)) {
    score += 25
  }

  if (document.description.toLowerCase().includes(q)) {
    score += 10
  }

  if (document.haystack.includes(q)) {
    score += 5
  }

  for (const tag of document.tags ?? []) {
    if (tag.toLowerCase().includes(q)) {
      score += 8
    }
  }

  return score
}

function filterAndRank(query, { limit = 50, types } = {}) {
  const keyword = query.trim().toLowerCase()
  if (!keyword) {
    return []
  }

  return documents
    .filter((document) => !types?.length || types.includes(document.type))
    .map((document) => ({
      ...document,
      score: scoreDocument(document, keyword),
    }))
    .filter((document) => document.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ haystack: _, ...item }) => item)
}

function groupResults(results) {
  return results.reduce(
    (groups, item) => {
      if (!groups[item.type]) {
        groups[item.type] = []
      }
      groups[item.type].push(item)
      return groups
    },
    { support: [], blog: [], calculator: [] },
  )
}

/** @type {import('../types.js').SearchService} */
export const localSearchProvider = {
  async search(query, options = {}) {
    const results = filterAndRank(query, options)

    return {
      query: query.trim(),
      results,
      grouped: groupResults(results),
      total: results.length,
    }
  },

  async autocomplete(query, limit = 6) {
    return filterAndRank(query, { limit })
  },
}

export function getSearchDocuments() {
  return documents
}
