import supportPrograms from '../data/supportPrograms'
import { getRecommendationEngine } from './recommendation'
import { mapBlog, mapCalculator } from './recommendation/mappers'
import { DEFAULT_LIMITS } from './recommendation/types'

function toCostReportInput(userInput) {
  const incomeMap = {
    low: 'under200',
    worker: '200to300',
    selfEmployed: 'over400',
  }

  const householdMap = {
    single: '1',
    newlywed: '2',
    withChildren: '3',
  }

  return {
    age: userInput.age ?? '30s',
    householdSize: householdMap[userInput.family] ?? '2',
    monthlyIncome: incomeMap[userInput.incomeLevel] ?? '200to300',
    region: 'metro',
    housingType: 'monthly',
  }
}

function mapSupportProgram(program) {
  return {
    id: program.id,
    title: program.title,
    link: `/support/${program.slug ?? program.id}`,
    summary: program.summary,
  }
}

export function recommendSupport(userInput, programs = supportPrograms) {
  const engine = getRecommendationEngine()
  const input = toCostReportInput(userInput)
  const { supports } = engine.recommend(input, {
    programs,
    maxSupport: DEFAULT_LIMITS.maxSupport,
  })

  return supports.map((item) => ({
    id: item.id,
    title: item.title,
    link: item.link,
    summary: item.summary,
  }))
}

export function recommendCalculators(userInput) {
  const results = []
  const seen = new Set()

  const addCalculator = (id) => {
    if (seen.has(id)) {
      return
    }

    const calculator = mapCalculator(id)
    if (!calculator) {
      return
    }

    seen.add(id)
    results.push(calculator)
  }

  addCalculator('electric')

  if (userInput.electricUsage != null) {
    addCalculator('electric')
  }

  if (userInput.gasUsage != null) {
    addCalculator('gas')
  }

  return results
}

export function recommendBlogs(userInput) {
  const results = []
  const seen = new Set()

  const addBlog = (id) => {
    if (seen.has(id)) {
      return
    }

    const blog = mapBlog(id)
    if (!blog) {
      return
    }

    seen.add(id)
    results.push(blog)
  }

  if (userInput.electricUsage != null) {
    addBlog('electric-saving')
  }

  if (userInput.gasUsage != null) {
    addBlog('gas-saving')
  }

  if (userInput.incomeLevel === 'low' || userInput.incomeLevel === 'worker') {
    addBlog('earned-income-schedule')
  }

  return results
}

export function recommendSavingTips(userInput) {
  const tips = []

  if (userInput.electricUsage >= 250) {
    tips.push('전기 사용량을 10% 줄이면 전기요금을 절약할 수 있습니다.')
  }

  if (userInput.gasUsage >= 20) {
    tips.push('도시가스 사용량이 높다면 난방 온도 조절을 권장합니다.')
  }

  if (userInput.incomeLevel === 'low') {
    tips.push('에너지바우처 대상 여부를 확인해보세요.')
  }

  return tips
}

export function generateLivingCostReport(userInput, programs = supportPrograms) {
  const supports = recommendSupport(userInput, programs)
  const calculators = recommendCalculators(userInput)
  const blogs = recommendBlogs(userInput)
  const tips = recommendSavingTips(userInput)

  const hasRecommendations =
    supports.length > 0 ||
    calculators.length > 0 ||
    blogs.length > 0 ||
    tips.length > 0

  return {
    supports,
    calculators,
    blogs,
    tips,
    summary: hasRecommendations
      ? '현재 조건에서 확인할 만한 생활비 절약 항목을 찾았습니다.'
      : '입력 정보를 바탕으로 맞춤 추천을 준비했습니다.',
  }
}
