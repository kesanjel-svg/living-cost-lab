import supportPrograms from '../../data/supportPrograms'
import { filterSupportPrograms } from '../../features/support/services/supportService'
import {
  EXAMPLE_SUPPORT_SAVINGS,
  mapBlog,
  mapCalculator,
  mapSupportProgram,
} from './mappers'
import { DEFAULT_LIMITS } from './types'

/** @type {import('./types').RecommendationEngine} */
export const ruleBasedRecommendationEngine = {
  id: 'rule-based',
  name: 'Rule-based Recommendation Engine',

  recommend(input, context = {}) {
    const programs = context.programs ?? supportPrograms
    const maxSupport = context.maxSupport ?? DEFAULT_LIMITS.maxSupport
    const maxCalculator = context.maxCalculator ?? DEFAULT_LIMITS.maxCalculator
    const maxBlog = context.maxBlog ?? DEFAULT_LIMITS.maxBlog

    const supports = recommendSupports(input, programs, maxSupport)
    const calculators = recommendCalculators(input, maxCalculator)
    const blogs = recommendBlogs(input, maxBlog)

    const hasRecommendations =
      supports.length > 0 || calculators.length > 0 || blogs.length > 0

    return {
      supports,
      calculators,
      blogs,
      summary: hasRecommendations
        ? '입력 조건에 맞는 지원금·계산기·가이드를 추천했습니다.'
        : '추가 정보를 입력하면 더 정확한 추천을 받을 수 있습니다.',
    }
  },
}

function mapToSupportFilters(input) {
  const householdMap = {
    '1': 'single',
    '2': 'newlywed',
    '3': 'withChildren',
    '4plus': 'withChildren',
  }

  const incomeMap = {
    under200: 'low',
    '200to300': 'worker',
    '300to400': 'worker',
    over400: 'selfEmployed',
  }

  return {
    age: input.age,
    household: householdMap[input.householdSize] ?? 'single',
    income: incomeMap[input.monthlyIncome] ?? 'worker',
  }
}

function recommendSupports(input, programs, maxSupport) {
  const filters = mapToSupportFilters(input)
  let results = filterSupportPrograms(filters, programs)

  if (input.age === '20s' || input.age === '30s') {
    if (input.housingType === 'monthly') {
      boostProgram(results, programs, 'youth-rent', 'prepend')
    }
  }

  if (input.householdSize !== '1' || (input.childCount && input.childCount !== '0')) {
    boostProgram(results, programs, 'child', 'append')
  }

  if (input.isPregnant === 'yes') {
    boostProgram(results, programs, 'birth', 'prepend')
  }

  if (input.hasDisability === 'yes') {
    boostProgram(results, programs, 'energy', 'prepend')
  }

  return [...new Map(results.map((p) => [p.id, p])).values()]
    .slice(0, maxSupport)
    .map((program) =>
      mapSupportProgram(
        program,
        EXAMPLE_SUPPORT_SAVINGS[program.id] ?? 20000,
      ),
    )
}

function boostProgram(results, programs, id, position) {
  const program = programs.find((p) => p.id === id)
  if (!program || results.some((p) => p.id === id)) {
    return
  }

  if (position === 'prepend') {
    results.unshift(program)
  } else {
    results.push(program)
  }
}

function recommendCalculators(input, maxCalculator) {
  const results = []
  const seen = new Set()

  const add = (id, reason) => {
    if (seen.has(id)) {
      return
    }
    const item = mapCalculator(id)
    if (!item) {
      return
    }
    seen.add(id)
    results.push({ ...item, reason })
  }

  add('electric', '전기요금 절감 여지를 확인할 수 있습니다')

  if (input.housingType === 'monthly' || input.region === 'metro') {
    add('gas', '난방·가스비 절약에 도움이 됩니다')
  }

  if (input.monthlyIncome !== 'over400') {
    add('health', '건강보험료 부담을 점검할 수 있습니다')
  }

  if (input.age === '50plus') {
    add('pension', '국민연금 납부 현황을 확인할 수 있습니다')
  }

  return results.slice(0, maxCalculator)
}

function recommendBlogs(input, maxBlog) {
  const results = []
  const seen = new Set()

  const add = (id, reason) => {
    if (seen.has(id)) {
      return
    }
    const item = mapBlog(id)
    if (!item) {
      return
    }
    seen.add(id)
    results.push({ ...item, reason })
  }

  add('electric-saving', '에너지 절약 실전 팁')
  add('living-cost-checklist', '월급날 생활비 점검')

  if (input.monthlyIncome === 'under200' || input.monthlyIncome === '200to300') {
    add('earned-income-schedule', '근로·자녀 장려금 일정')
  }

  if (input.housingType === 'monthly' && (input.age === '20s' || input.age === '30s')) {
    add('gas-saving', '주거·에너지 절약')
  }

  return results.slice(0, maxBlog)
}

export default ruleBasedRecommendationEngine
