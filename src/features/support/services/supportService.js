import supportPrograms from '../../../data/supportPrograms'
import { blogPosts } from '../../../data/blogPosts'
import { getBlogPath } from '../../blog/services/blogService'

function mapAge(value) {
  if (value === '20s') return '20'
  if (value === '30s') return '30'
  if (value === '40s') return '40'
  if (value === '50plus') return '50'
  return value
}

function mapIncomeLevel(value) {
  if (value === 'low') return 'low'
  return 'middle'
}

function mapFamily(value) {
  if (value === 'single' || value === 'newlywed') return 'single'
  if (value === 'withChildren') return 'child'
  return 'all'
}

function matchesCriteria(programValue, selectedValue) {
  return programValue === 'all' || programValue === selectedValue
}

export function filterSupportPrograms(filters, programs) {
  const { age, household, income } = filters

  if (!age || !household || !income) {
    return []
  }

  const selectedAge = mapAge(age)
  const selectedIncomeLevel = mapIncomeLevel(income)
  const selectedFamily = mapFamily(household)

  return programs.filter(
    (program) =>
      matchesCriteria(program.age, selectedAge) &&
      matchesCriteria(program.incomeLevel, selectedIncomeLevel) &&
      matchesCriteria(program.family, selectedFamily),
  )
}

export function searchSupportPrograms(query, programs, categoryKey = '') {
  const keyword = query.trim().toLowerCase()

  return programs.filter((program) => {
    const matchesCategory =
      !categoryKey || program.categoryKey === categoryKey

    if (!keyword) {
      return matchesCategory
    }

    const haystack = [
      program.title,
      program.category,
      ...(program.tags ?? []),
    ]
      .join(' ')
      .toLowerCase()

    return matchesCategory && haystack.includes(keyword)
  })
}

export function getSupportById(id, programs) {
  return programs.find(
    (program) => program.id === id || program.slug === id,
  )
}

export function getSimilarSupports(currentSupport, programs, limit = 3) {
  const sameCategory = programs.filter(
    (program) =>
      program.id !== currentSupport.id &&
      program.categoryKey === currentSupport.categoryKey,
  )

  if (sameCategory.length > 0) {
    return sameCategory.slice(0, limit)
  }

  return programs
    .filter((program) => program.id !== currentSupport.id)
    .slice(0, limit)
}

export function resolveRelatedPosts(postSlugs = []) {
  return postSlugs
    .map((slug) => blogPosts.find((post) => post.slug === slug))
    .filter(Boolean)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      summary: post.summary,
      href: getBlogPath(post.slug),
    }))
}

export function getRecommendedPrograms(filters) {
  return filterSupportPrograms(filters, supportPrograms)
}

export function getProgramById(id) {
  return getSupportById(id, supportPrograms)
}

export function getProgramsByCalculator(calculatorId) {
  return supportPrograms.filter((program) =>
    program.relatedCalculators?.includes(calculatorId),
  )
}

export function getSimilarPrograms(id, limit = 3) {
  const current = getProgramById(id)
  if (!current) {
    return []
  }

  return getSimilarSupports(current, supportPrograms, limit)
}

export function getSupportSeoDescription(program) {
  return `${program.summary} ${program.description}`.slice(0, 160)
}
