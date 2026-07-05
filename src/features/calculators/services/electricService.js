import supportPrograms from '../../../data/supportPrograms'
import { generateLivingCostReport } from '../../../engines/recommendationEngine'
import { mapCalculator } from '../../../engines/recommendation/mappers'
import { getProgramsByCalculator } from '../../support/services/supportService'

// 한국전력공사 주택용 전력(저압) 누진제 요금표, 2026-07 기준.
// 출처: KEPCO 한글 전기요금표(https://home.kepco.co.kr/kepco/front/html/CY/E/E/CYEEHP00101.html),
// 요금 계산기(https://cyber.kepco.co.kr/ckepco/front/jsp/CY/J/A/CYJAPP000.jsp)
// 매년 요금 개편이 있을 수 있어 실제 청구 전 최신 고시로 재확인 필요.
const GENERAL_PERIOD_TIERS = [
  { limit: 200, baseFee: 910, unitPrice: 120.0 },
  { limit: 400, baseFee: 1600, unitPrice: 214.6 },
  { limit: Infinity, baseFee: 7300, unitPrice: 307.3 },
]

// 하계(7~8월) 완화 구간: 1단계 200→300kWh, 2단계 400→450kWh로 상향.
// 기본요금/전력량요금 단가 자체는 일반 기간과 동일.
const SUMMER_PERIOD_TIERS = [
  { limit: 300, baseFee: 910, unitPrice: 120.0 },
  { limit: 450, baseFee: 1600, unitPrice: 214.6 },
  { limit: Infinity, baseFee: 7300, unitPrice: 307.3 },
]

// 슈퍼유저 요금: 하계를 제외한 기간에 월 1,000kWh 초과 사용 시 최상위 구간 전력량요금.
const SUPER_USER_THRESHOLD_KWH = 1000
const SUPER_USER_UNIT_PRICE = 736.2

// 기후환경요금·연료비조정요금은 사용량(kWh)에 비례해 별도 가산되는 항목.
const CLIMATE_ENV_CHARGE_PER_KWH = 9
const FUEL_COST_ADJUSTMENT_PER_KWH = 5

const VAT_RATE = 0.1

// 전력산업기반기금 부담금 요율. 2년에 걸쳐 3.7%→2.7%로 단계적 인하 완료.
// 1차 인하: 2024-07~2025-06 3.2%. 2차 인하(현재 적용 중): 2025-07부터 2.7%.
// 출처: 산업통상자원부 "하반기 달라지는 것" 보도자료(전력기금 부담률 총 1%p 인하).
const POWER_FUND_RATE = 0.027

export const PROGRESS_MAX_KWH = 500

export function isCurrentSummerPeriod(date = new Date()) {
  const month = date.getMonth() + 1
  return month === 7 || month === 8
}

function calculateTieredCharge(usage, tiers) {
  let remaining = usage
  let previousLimit = 0
  let baseFee = tiers[0].baseFee
  let energyCharge = 0

  for (const tier of tiers) {
    const tierUsage = Math.min(remaining, tier.limit - previousLimit)
    if (tierUsage <= 0) {
      break
    }

    energyCharge += tierUsage * tier.unitPrice
    baseFee = tier.baseFee
    remaining -= tierUsage
    previousLimit = tier.limit
  }

  return { baseFee, energyCharge }
}

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

  const gasCalculator = mapCalculator('gas')
  if (gasCalculator) {
    items.push(
      gasCalculator.status
        ? { title: gasCalculator.title, status: gasCalculator.status, buttonText: '준비중' }
        : { title: gasCalculator.title, link: gasCalculator.link, buttonText: '계산하기' },
    )
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

export function calculateElectricBillBreakdown(usage, isSummer = isCurrentSummerPeriod()) {
  const tiers = isSummer ? SUMMER_PERIOD_TIERS : GENERAL_PERIOD_TIERS
  const { baseFee, energyCharge } = calculateTieredCharge(usage, tiers)

  // 하계 제외 기간에 한해 월 1,000kWh 초과분은 슈퍼유저 단가 적용
  const superUserCharge =
    !isSummer && usage > SUPER_USER_THRESHOLD_KWH
      ? (usage - SUPER_USER_THRESHOLD_KWH) * (SUPER_USER_UNIT_PRICE - GENERAL_PERIOD_TIERS[2].unitPrice)
      : 0

  const climateCharge = usage * CLIMATE_ENV_CHARGE_PER_KWH
  const fuelAdjustment = usage * FUEL_COST_ADJUSTMENT_PER_KWH
  const subtotal = baseFee + energyCharge + superUserCharge + climateCharge + fuelAdjustment
  const vat = subtotal * VAT_RATE
  const fund = subtotal * POWER_FUND_RATE

  // KEPCO 고지서는 최종 합계를 10원 단위로 절사하는 관행이 있어 근사 반영
  const total = Math.floor((subtotal + vat + fund) / 10) * 10

  return {
    isSummer,
    baseFee,
    energyCharge: Math.round(energyCharge + superUserCharge),
    climateCharge,
    fuelAdjustment,
    vat: Math.round(vat),
    fund: Math.round(fund),
    total,
  }
}

export function calculateElectricBill(usage, isSummer = isCurrentSummerPeriod()) {
  return calculateElectricBillBreakdown(usage, isSummer).total
}

export function analyzeElectricUsage(usage) {
  if (usage <= 200) {
    return '전기 사용량이 1단계 구간(200kWh 이하)으로, 비교적 적은 편입니다.'
  }
  if (usage <= 400) {
    return '전기 사용량이 2단계 구간(201~400kWh)에 해당합니다.'
  }
  if (usage <= 1000) {
    return '전기 사용량이 3단계 구간(400kWh 초과)으로, 누진요금 부담이 커질 수 있습니다.'
  }
  return '월 1,000kWh를 초과해 슈퍼유저 요금이 추가로 적용되는 구간입니다.'
}

export function getElectricBadge(usage) {
  if (usage <= 200) {
    return { label: '절약', variant: 'save' }
  }
  if (usage <= 400) {
    return { label: '보통', variant: 'normal' }
  }
  if (usage <= 1000) {
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

export function buildElectricResult(usage, isSummer = isCurrentSummerPeriod()) {
  const breakdown = calculateElectricBillBreakdown(usage, isSummer)
  const { savings10, savings20 } = getElectricSavings(breakdown.total)

  return {
    usage,
    fee: breakdown.total,
    breakdown,
    analysis: analyzeElectricUsage(usage),
    badge: getElectricBadge(usage),
    progress: getElectricProgress(usage),
    savings10,
    savings20,
  }
}
