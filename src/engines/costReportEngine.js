import { blogRegistry } from '../constants/blogs'
import { calculatorRegistry } from '../constants/calculators'
import supportPrograms from '../data/supportPrograms'
import { filterSupportPrograms } from '../features/support/services/supportService'

const MAX_SUPPORT = 3
const MAX_CALCULATOR = 3
const MAX_BLOG = 3

const EXAMPLE_SUPPORT_SAVINGS = {
  energy: 40000,
  work: 85000,
  'youth-rent': 150000,
  child: 60000,
  training: 30000,
  birth: 80000,
}

const EXAMPLE_REGION_SAVINGS = {
  metro: 15000,
  city: 10000,
  other: 8000,
}

const EXAMPLE_HOUSING_SAVINGS = {
  monthly: 20000,
  jeonse: 10000,
  owned: 5000,
  withParents: 8000,
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

function mapSupport(program) {
  return {
    id: program.id,
    title: program.title,
    link: `/support/${program.slug ?? program.id}`,
    summary: program.summary,
    exampleSaving: EXAMPLE_SUPPORT_SAVINGS[program.id] ?? 20000,
  }
}

function mapCalculator(id) {
  const calculator = calculatorRegistry[id]
  if (!calculator) {
    return null
  }

  return {
    id,
    title: calculator.title,
    link: calculator.href,
    ...(calculator.available ? {} : { status: '준비중' }),
  }
}

function mapBlog(id) {
  const blog = blogRegistry[id]
  if (!blog) {
    return null
  }

  return {
    id,
    title: blog.title,
    link: blog.href,
    ...(blog.available ? {} : { status: '준비중' }),
  }
}

function recommendSupports(input) {
  const filters = mapToSupportFilters(input)
  let programs = filterSupportPrograms(filters, supportPrograms)

  if (input.age === '20s' || input.age === '30s') {
    if (input.housingType === 'monthly') {
      const youthRent = supportPrograms.find((p) => p.id === 'youth-rent')
      if (youthRent && !programs.some((p) => p.id === youthRent.id)) {
        programs = [youthRent, ...programs]
      }
    }
  }

  if (input.householdSize !== '1') {
    const childProgram = supportPrograms.find((p) => p.id === 'child')
    if (childProgram && !programs.some((p) => p.id === childProgram.id)) {
      programs = [...programs, childProgram]
    }
  }

  if (input.childCount && input.childCount !== '0') {
    const childProgram = supportPrograms.find((p) => p.id === 'child')
    if (childProgram && !programs.some((p) => p.id === childProgram.id)) {
      programs = [...programs, childProgram]
    }
  }

  if (input.isPregnant === 'yes') {
    const birthProgram = supportPrograms.find((p) => p.id === 'birth')
    if (birthProgram && !programs.some((p) => p.id === birthProgram.id)) {
      programs = [birthProgram, ...programs]
    }
  }

  if (input.hasDisability === 'yes') {
    const energyProgram = supportPrograms.find((p) => p.id === 'energy')
    if (energyProgram && !programs.some((p) => p.id === energyProgram.id)) {
      programs = [energyProgram, ...programs]
    }
  }

  return [...new Map(programs.map((p) => [p.id, p])).values()]
    .slice(0, MAX_SUPPORT)
    .map(mapSupport)
}

function recommendCalculators(input) {
  const results = []
  const seen = new Set()

  const add = (id) => {
    if (seen.has(id)) {
      return
    }
    const item = mapCalculator(id)
    if (!item) {
      return
    }
    seen.add(id)
    results.push(item)
  }

  add('electric')

  if (input.housingType === 'monthly' || input.region === 'metro') {
    add('gas')
  }

  if (input.monthlyIncome !== 'over400') {
    add('health')
  }

  return results.slice(0, MAX_CALCULATOR)
}

function recommendBlogs(input) {
  const results = []
  const seen = new Set()

  const add = (id) => {
    if (seen.has(id)) {
      return
    }
    const item = mapBlog(id)
    if (!item) {
      return
    }
    seen.add(id)
    results.push(item)
  }

  add('electric-saving')
  add('living-cost-checklist')

  if (input.monthlyIncome === 'under200' || input.monthlyIncome === '200to300') {
    add('earned-income-schedule')
  }

  if (input.housingType === 'monthly' && (input.age === '20s' || input.age === '30s')) {
    add('gas-saving')
  }

  return results.slice(0, MAX_BLOG)
}

function calculateLivingCostScore(input) {
  let score = 72

  const incomeAdjust = {
    under200: -18,
    '200to300': -8,
    '300to400': 4,
    over400: 12,
  }
  score += incomeAdjust[input.monthlyIncome] ?? 0

  const householdAdjust = {
    '1': 6,
    '2': 0,
    '3': -6,
    '4plus': -12,
  }
  score += householdAdjust[input.householdSize] ?? 0

  const regionAdjust = {
    metro: -10,
    city: -4,
    other: 2,
  }
  score += regionAdjust[input.region] ?? 0

  const housingAdjust = {
    monthly: -12,
    jeonse: -4,
    owned: 8,
    withParents: 4,
  }
  score += housingAdjust[input.housingType] ?? 0

  if (input.age === '50plus') {
    score -= 4
  }

  return Math.max(0, Math.min(100, score))
}

function getSavingsPotential(score) {
  if (score < 45) {
    return { label: '높음', level: 'high' }
  }
  if (score < 70) {
    return { label: '보통', level: 'medium' }
  }
  return { label: '낮음', level: 'low' }
}

function estimateMonthlySavings(input, supports) {
  const supportTotal = supports.reduce(
    (sum, item) => sum + (item.exampleSaving ?? 0),
    0,
  )
  const regionBonus = EXAMPLE_REGION_SAVINGS[input.region] ?? 0
  const housingBonus = EXAMPLE_HOUSING_SAVINGS[input.housingType] ?? 0
  const utilityBonus = input.region === 'metro' ? 12000 : 8000

  return supportTotal + regionBonus + housingBonus + utilityBonus
}

function buildNextActions(input, supports, calculators) {
  const actions = []

  if (supports.length > 0) {
    actions.push({
      text: `${supports[0].title} 신청 자격 확인하기`,
      link: supports[0].link,
    })
  }

  const electricCalc = calculators.find((c) => c.id === 'electric')
  if (electricCalc?.link) {
    actions.push({
      text: '전기요금 계산기로 예상 요금 점검하기',
      link: electricCalc.link,
    })
  }

  if (input.housingType === 'monthly') {
    actions.push({
      text: '월세·주거 지원금 추가 검색하기',
      link: '/support',
    })
  } else {
    actions.push({
      text: '내 조건에 맞는 지원금 더 찾아보기',
      link: '/support',
    })
  }

  if (input.monthlyIncome === 'under200' || input.monthlyIncome === '200to300') {
    actions.push({
      text: '근로·자녀 장려금 신청 일정 확인하기',
      link: '/blog/earned-income-schedule',
    })
  }

  return actions.slice(0, 4)
}

export function generateCostReport(input) {
  const supports = recommendSupports(input)
  const calculators = recommendCalculators(input)
  const blogs = recommendBlogs(input)
  const score = calculateLivingCostScore(input)
  const savingsPotential = getSavingsPotential(score)
  const estimatedMonthlySavings = estimateMonthlySavings(input, supports)
  const nextActions = buildNextActions(input, supports, calculators)

  return {
    score,
    savingsPotential,
    estimatedMonthlySavings,
    supports,
    calculators,
    blogs,
    nextActions,
    summary:
      score >= 70
        ? '전반적으로 양호한 편이지만, 지원금과 절약 팁으로 추가 여유를 만들 수 있습니다.'
        : score >= 45
          ? '생활비 부담이 있는 편입니다. 지원금과 계산기로 절약 여지를 확인해보세요.'
          : '생활비 절감과 정부지원금 활용이 특히 중요합니다. 아래 추천을 참고해보세요.',
  }
}
