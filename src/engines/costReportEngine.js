import { getRecommendationEngine } from './recommendation'
import { EXAMPLE_SUPPORT_SAVINGS } from './recommendation/mappers'

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

const CATEGORY_META = {
  housing: { label: '주거비', icon: '🏠' },
  energy: { label: '에너지', icon: '⚡' },
  income: { label: '소득·세금', icon: '💰' },
  household: { label: '가구 구성', icon: '👨‍👩‍👧' },
  region: { label: '거주 지역', icon: '📍' },
}

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)))
}

function getScoreLabel(score) {
  if (score >= 75) {
    return '양호'
  }
  if (score >= 50) {
    return '보통'
  }
  return '주의'
}

function getScoreGrade(score) {
  if (score >= 85) {
    return 'A'
  }
  if (score >= 70) {
    return 'B'
  }
  if (score >= 50) {
    return 'C'
  }
  return 'D'
}

function getLevelFromScore(score) {
  if (score >= 70) {
    return 'good'
  }
  if (score >= 45) {
    return 'fair'
  }
  return 'warning'
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

  return clampScore(score)
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

function analyzeCategoryHousing(input) {
  const base = { monthly: 38, jeonse: 58, owned: 82, withParents: 68 }
  let score = base[input.housingType] ?? 55

  if (input.housingType === 'monthly' && (input.age === '20s' || input.age === '30s')) {
    score += 8
  }

  score = clampScore(score)
  const tips = []

  if (input.housingType === 'monthly') {
    tips.push('청년월세지원 등 주거 지원금 대상 여부를 확인하세요.')
    tips.push('월세 외 관리비·공과금 항목도 함께 점검하세요.')
  } else if (input.housingType === 'jeonse') {
    tips.push('전세 유지비와 대출 이자 부담을 함께 확인하세요.')
  } else {
    tips.push('유지·관리 비용을 정기적으로 점검하세요.')
  }

  return {
    id: 'housing',
    ...CATEGORY_META.housing,
    score,
    level: getLevelFromScore(score),
    summary:
      input.housingType === 'monthly'
        ? '월세 부담이 큰 편입니다. 주거 지원금 활용 여지가 있습니다.'
        : input.housingType === 'owned'
          ? '자가 주거로 고정비 부담이 상대적으로 낮습니다.'
          : '주거 형태에 따라 절약·지원 여지가 달라집니다.',
    tips,
  }
}

function analyzeCategoryEnergy(input) {
  let score = 62

  if (input.region === 'metro') {
    score -= 12
  } else if (input.region === 'city') {
    score -= 6
  } else {
    score += 4
  }

  if (input.householdSize === '3' || input.householdSize === '4plus') {
    score -= 8
  }

  if (input.hasDisability === 'yes') {
    score += 6
  }

  score = clampScore(score)
  const tips = [
    '전기요금 계산기로 예상 요금을 먼저 확인하세요.',
    '누진제 구간과 에너지바우처 대상 여부를 점검하세요.',
  ]

  if (input.region === 'metro') {
    tips.push('수도권은 냉난방·전기 사용량 관리가 특히 중요합니다.')
  }

  return {
    id: 'energy',
    ...CATEGORY_META.energy,
    score,
    level: getLevelFromScore(score),
    summary:
      input.region === 'metro'
        ? '에너지 비용 부담이 높은 지역입니다. 절약·지원 활용이 중요합니다.'
        : '에너지 사용량 점검과 지원 제도 확인으로 절약 여지를 찾을 수 있습니다.',
    tips,
  }
}

function analyzeCategoryIncome(input) {
  const base = {
    under200: 32,
    '200to300': 52,
    '300to400': 72,
    over400: 88,
  }
  let score = base[input.monthlyIncome] ?? 55
  score = clampScore(score)

  const tips = []
  if (input.monthlyIncome === 'under200' || input.monthlyIncome === '200to300') {
    tips.push('근로·자녀 장려금 신청 일정을 확인하세요.')
    tips.push('소득 기준 지원금을 우선 검색하세요.')
  } else {
    tips.push('세금 환급·공제 항목을 연말정산 전에 점검하세요.')
  }

  return {
    id: 'income',
    ...CATEGORY_META.income,
    score,
    level: getLevelFromScore(score),
    summary:
      input.monthlyIncome === 'under200' || input.monthlyIncome === '200to300'
        ? '소득 대비 생활비 부담이 클 수 있습니다. 소득 연계 지원금을 확인하세요.'
        : '소득 여유가 있으나 에너지·주거 항목 절약으로 추가 여유를 만들 수 있습니다.',
    tips,
  }
}

function analyzeCategoryHousehold(input) {
  const base = { '1': 78, '2': 65, '3': 48, '4plus': 35 }
  let score = base[input.householdSize] ?? 55

  if (input.childCount && input.childCount !== '0') {
    score -= 6
  }
  if (input.isPregnant === 'yes') {
    score -= 4
  }

  score = clampScore(score)
  const tips = []

  if (input.householdSize !== '1') {
    tips.push('자녀·가구원 수에 맞는 지원금을 확인하세요.')
  }
  if (input.isPregnant === 'yes') {
    tips.push('출산·육아 지원금 신청 일정을 미리 확인하세요.')
  }
  if (input.hasDisability === 'yes') {
    tips.push('에너지바우처 등 취약계층 지원을 우선 검토하세요.')
  }
  if (!tips.length) {
    tips.push('1인 가구도 에너지·통신 절약으로 비용을 줄일 수 있습니다.')
  }

  return {
    id: 'household',
    ...CATEGORY_META.household,
    score,
    level: getLevelFromScore(score),
    summary:
      input.householdSize === '4plus' || (input.childCount && input.childCount !== '0')
        ? '가구원이 많을수록 고정비·생활비 부담이 커질 수 있습니다.'
        : '가구 규모에 맞는 지원·절약 전략을 선택하세요.',
    tips,
  }
}

function analyzeCategoryRegion(input) {
  const base = { metro: 42, city: 58, other: 72 }
  const score = clampScore(base[input.region] ?? 55)
  const tips = []

  if (input.region === 'metro') {
    tips.push('수도권은 주거·교통·에너지 비용이 높은 편입니다.')
    tips.push('지역 기반 지원 제도를 함께 확인하세요.')
  } else if (input.region === 'city') {
    tips.push('광역시 거주 시 통신·교통비 절약도 함께 검토하세요.')
  } else {
    tips.push('지방 거주 시 에너지·교통비는 상대적으로 유리할 수 있습니다.')
  }

  return {
    id: 'region',
    ...CATEGORY_META.region,
    score,
    level: getLevelFromScore(score),
    summary:
      input.region === 'metro'
        ? '수도권 생활비 수준이 높아 절약·지원 활용이 중요합니다.'
        : '거주 지역 특성에 맞는 생활비 관리가 필요합니다.',
    tips,
  }
}

function buildCategoryAnalysis(input) {
  return [
    analyzeCategoryHousing(input),
    analyzeCategoryEnergy(input),
    analyzeCategoryIncome(input),
    analyzeCategoryHousehold(input),
    analyzeCategoryRegion(input),
  ]
}

function buildSavingsBreakdown(input, supports) {
  const supportTotal = supports.reduce(
    (sum, item) => sum + (item.exampleSaving ?? 0),
    0,
  )
  const regionBonus = EXAMPLE_REGION_SAVINGS[input.region] ?? 0
  const housingBonus = EXAMPLE_HOUSING_SAVINGS[input.housingType] ?? 0
  const utilityBonus = input.region === 'metro' ? 12000 : 8000

  const items = [
    {
      id: 'support',
      label: '정부지원금',
      amount: supportTotal,
      note: '추천 지원금 기준 예상 수혜액',
    },
    {
      id: 'housing',
      label: '주거 절약',
      amount: housingBonus,
      note: '주거 형태별 절약 여지',
    },
    {
      id: 'energy',
      label: '에너지 절약',
      amount: utilityBonus + regionBonus,
      note: '전기·가스 절약 및 지역 보정',
    },
  ].filter((item) => item.amount > 0)

  return {
    items,
    total: items.reduce((sum, item) => sum + item.amount, 0),
  }
}

function buildChecklist(input, supports, calculators, blogs) {
  const items = []

  supports.forEach((support, index) => {
    items.push({
      id: `support-${support.id}`,
      text: `${support.title} 신청 자격 확인하기`,
      link: support.link,
      priority: index === 0 ? 'high' : 'medium',
    })
  })

  calculators
    .filter((c) => !c.status)
    .forEach((calc) => {
      items.push({
        id: `calc-${calc.id}`,
        text: `${calc.title}로 예상 비용 점검하기`,
        link: calc.link,
        priority: 'medium',
      })
    })

  blogs
    .filter((b) => !b.status)
    .slice(0, 2)
    .forEach((blog) => {
      items.push({
        id: `blog-${blog.id}`,
        text: `「${blog.title}」 읽기`,
        link: blog.link,
        priority: 'low',
      })
    })

  if (input.housingType === 'monthly') {
    items.push({
      id: 'search-housing',
      text: '월세·주거 지원금 추가 검색하기',
      link: '/support',
      priority: 'medium',
    })
  }

  items.push({
    id: 'profile-update',
    text: '생활비 프로필 업데이트하기',
    link: '/profile',
    priority: 'low',
  })

  return items.slice(0, 8)
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

function buildSummary(score) {
  if (score >= 70) {
    return '전반적으로 양호한 편이지만, 항목별 분석과 추천을 통해 추가 여유를 만들 수 있습니다.'
  }
  if (score >= 45) {
    return '생활비 부담이 있는 편입니다. 항목별 분석과 지원금·절약 체크리스트를 확인해보세요.'
  }
  return '생활비 절감과 정부지원금 활용이 특히 중요합니다. 아래 추천과 체크리스트를 참고하세요.'
}

export function generateCostReport(input, options = {}) {
  const engine = options.engine ?? getRecommendationEngine()
  const recommendations = engine.recommend(input, options.context)
  const { supports, calculators, blogs } = recommendations

  const score = calculateLivingCostScore(input)
  const savingsPotential = getSavingsPotential(score)
  const savingsBreakdown = buildSavingsBreakdown(input, supports)
  const estimatedMonthlySavings = savingsBreakdown.total
  const categoryAnalysis = buildCategoryAnalysis(input)
  const checklist = buildChecklist(input, supports, calculators, blogs)
  const nextActions = buildNextActions(input, supports, calculators)

  return {
    score,
    scoreLabel: getScoreLabel(score),
    scoreGrade: getScoreGrade(score),
    savingsPotential,
    estimatedMonthlySavings,
    savingsBreakdown,
    categoryAnalysis,
    supports,
    calculators,
    blogs,
    checklist,
    nextActions,
    summary: buildSummary(score),
    engineId: engine.id,
    engineName: engine.name,
    recommendationSummary: recommendations.summary,
  }
}

export {
  calculateLivingCostScore,
  getScoreLabel,
  getScoreGrade,
  buildCategoryAnalysis,
  buildSavingsBreakdown,
  buildChecklist,
  EXAMPLE_SUPPORT_SAVINGS,
}
