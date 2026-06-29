import supportPrograms from '../../../data/supportPrograms'
import { generateLivingCostReport } from '../../../engines/recommendationEngine'
import { getProgramsByCalculator } from '../../support/services/supportService'

export const RATE_PER_KWH = 180
export const PROGRESS_MAX_KWH = 500

export const ELECTRIC_TIPS = [
  '에너지캐시백 신청 가능',
  '에너지바우처 대상인지 확인',
  'LED 조명 사용 시 절약 가능',
]

function buildElectricRecommendCards(report, userInput) {
  const items = []

  let supports = report.supports
  if (supports.length === 0 && userInput.electricUsage != null) {
    supports = getProgramsByCalculator('electric')
      .slice(0, 1)
      .map((program) => ({
        id: program.id,
        title: program.title,
        link: `/support/${program.id}`,
      }))
  }

  if (supports[0]) {
    items.push({
      title: supports[0].title,
      link: supports[0].link,
      buttonText: '자세히 보기',
    })
  }

  items.push({
    title: '에너지캐시백',
    status: '준비중',
    buttonText: '준비중',
  })

  const gasCalculator = report.calculators.find((calc) => calc.id === 'gas')
  if (gasCalculator) {
    items.push({
      title: gasCalculator.title,
      status: gasCalculator.status || '준비중',
      buttonText: '준비중',
    })
  } else {
    items.push({
      title: '도시가스 계산기',
      status: '준비중',
      buttonText: '준비중',
    })
  }

  const electricBlog = report.blogs.find((blog) => blog.id === 'electric-saving')
  if (electricBlog) {
    items.push({
      title: electricBlog.title,
      status: electricBlog.status || '준비중',
      buttonText: '준비중',
    })
  } else {
    items.push({
      title: '전기요금 절약 팁',
      status: '준비중',
      buttonText: '준비중',
    })
  }

  return items
}

export function calculateElectricBill(usage) {
  return usage * RATE_PER_KWH
}

export function analyzeElectricUsage(usage) {
  if (usage <= 100) {
    return '전기 사용량이 매우 적은 편입니다.'
  }
  if (usage <= 250) {
    return '평균적인 사용량입니다.'
  }
  if (usage <= 400) {
    return '전기 사용량이 높은 편입니다. 절약을 고려해보세요.'
  }
  return '전기 사용량이 매우 높습니다. 누진요금 부담이 커질 수 있습니다.'
}

export function getElectricBadge(usage) {
  if (usage <= 100) {
    return { label: '절약', variant: 'save' }
  }
  if (usage <= 250) {
    return { label: '보통', variant: 'normal' }
  }
  if (usage <= 400) {
    return { label: '주의', variant: 'warning' }
  }
  return { label: '높음', variant: 'high' }
}

export function getElectricProgress(usage) {
  return Math.min((usage / PROGRESS_MAX_KWH) * 100, 100)
}

export function getElectricSavings(amount) {
  return {
    savings10: Math.round(amount * 0.1),
    savings20: Math.round(amount * 0.2),
  }
}

export function getElectricRecommendations(usage) {
  const userInput = { electricUsage: usage }
  const report = generateLivingCostReport(userInput, supportPrograms)

  return buildElectricRecommendCards(report, userInput)
}

export function buildElectricResult(usage) {
  const fee = calculateElectricBill(usage)
  const { savings10, savings20 } = getElectricSavings(fee)

  return {
    usage,
    fee,
    analysis: analyzeElectricUsage(usage),
    badge: getElectricBadge(usage),
    progress: getElectricProgress(usage),
    savings10,
    savings20,
  }
}
