import supportPrograms from '../../../data/supportPrograms'
import { generateLivingCostReport } from '../../../engines/recommendationEngine'
import { getProgramsByCalculator } from '../../support/services/supportService'
import { getGasRegion, getGasRegionOptions, NATIONWIDE_AVERAGE_REGION_ID } from './gasRegions'

export { getGasRegionOptions, NATIONWIDE_AVERAGE_REGION_ID }

export const USAGE_TYPES = {
  COOKING: 'cooking',
  HEATING: 'heating',
}

export const DEFAULT_REGION_ID = 'seoul'

// 도시가스 요금은 부피(㎥)가 아니라 열량(MJ) 기준으로 부과된다.
// 사용량(MJ) = 사용량(㎥) × 온압보정계수 × 평균열량. 한국가스공사 도시가스 열량제도
// 고시 기준 표준열량(42.5MJ/Nm³)·보정계수(0.9944)를 사용하며, 실제 월별 가중평균열량은
// 공급사·월별로 소폭 다를 수 있어 청구서상 금액과 차이가 있을 수 있다.
// 출처: https://www.kogas.or.kr/site/koGas/1040501000000 (도시가스열량제도)
const PRESSURE_CORRECTION_FACTOR = 0.9944
const AVERAGE_CALORIFIC_VALUE_MJ = 42.5
const HEATING_TIER_THRESHOLD_MJ = 516

const VAT_RATE = 0.1

export const PROGRESS_MAX_M3 = 100

export function convertUsageToMJ(usageM3) {
  return usageM3 * PRESSURE_CORRECTION_FACTOR * AVERAGE_CALORIFIC_VALUE_MJ
}

function calculateUsageCharge(usageMJ, usageType, region) {
  if (usageType === USAGE_TYPES.COOKING) {
    return usageMJ * region.unitPrices.cooking
  }

  const heatingPrice = region.unitPrices.heating
  if (typeof heatingPrice === 'number') {
    return usageMJ * heatingPrice
  }

  const belowMJ = Math.min(usageMJ, HEATING_TIER_THRESHOLD_MJ)
  const aboveMJ = Math.max(usageMJ - HEATING_TIER_THRESHOLD_MJ, 0)
  return belowMJ * heatingPrice.below516 + aboveMJ * heatingPrice.above516
}

export const GAS_TIPS = [
  '보일러 온도를 1~2도만 낮춰도 난방비 절감 효과가 있습니다',
  '에너지바우처·저소득층 도시가스 요금 경감 대상인지 확인해보세요',
  '창문 단열재·문풍지로 열 손실을 줄이면 사용량이 줄어듭니다',
]

function buildGasRecommendCards(report, userInput) {
  const items = []

  let supports = report.supports
  if (supports.length === 0 && userInput.gasUsage != null) {
    supports = getProgramsByCalculator('gas')
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

  const electricCalculator = report.calculators.find((calc) => calc.id === 'electric')
  if (electricCalculator) {
    items.push(
      electricCalculator.status
        ? { title: electricCalculator.title, status: electricCalculator.status, buttonText: '준비중' }
        : { title: electricCalculator.title, link: electricCalculator.link, buttonText: '계산하기' },
    )
  }

  const gasBlog = report.blogs.find((blog) => blog.id === 'gas-saving')
  if (gasBlog) {
    items.push(
      gasBlog.status
        ? { title: gasBlog.title, status: gasBlog.status, buttonText: '준비중' }
        : { title: gasBlog.title, link: gasBlog.link, buttonText: '읽어보기' },
    )
  } else {
    items.push({
      title: '도시가스 절약 팁',
      status: '준비중',
      buttonText: '준비중',
    })
  }

  return items
}

export function calculateGasBillBreakdown(usageM3, regionId = DEFAULT_REGION_ID, usageType = USAGE_TYPES.HEATING) {
  const region = getGasRegion(regionId)
  if (!region) {
    throw new Error(`알 수 없는 지역입니다: ${regionId}`)
  }

  const usageMJ = convertUsageToMJ(usageM3)
  const usageCharge = calculateUsageCharge(usageMJ, usageType, region)
  const subtotal = region.baseFee + usageCharge
  const vat = region.vatIncluded ? 0 : subtotal * VAT_RATE

  // 도시가스 고지서는 최종 합계를 10원 단위로 절사하는 관행이 있어 근사 반영
  const total = Math.floor((subtotal + vat) / 10) * 10

  return {
    region,
    usageMJ: Math.round(usageMJ),
    baseFee: region.baseFee,
    usageCharge: Math.round(usageCharge),
    vat: Math.round(vat),
    total,
  }
}

export function calculateGasBill(usageM3, regionId = DEFAULT_REGION_ID, usageType = USAGE_TYPES.HEATING) {
  return calculateGasBillBreakdown(usageM3, regionId, usageType).total
}

export function analyzeGasUsage(usageM3) {
  if (usageM3 <= 15) {
    return '도시가스 사용량이 적은 편으로, 취사 위주 사용 가정에 해당합니다.'
  }
  if (usageM3 <= 40)
    return '평균적인 가정용 난방·취사 사용량 구간입니다.'
  if (usageM3 <= 80) {
    return '난방 비중이 높은 사용량 구간으로, 보일러 사용 습관 점검이 도움이 될 수 있습니다.'
  }
  return '사용량이 많은 편으로, 단열·보일러 온도 조절 등 절약 방법을 검토해보세요.'
}

export function getGasBadge(usageM3) {
  if (usageM3 <= 15) {
    return { label: '절약', variant: 'save' }
  }
  if (usageM3 <= 40) {
    return { label: '보통', variant: 'normal' }
  }
  if (usageM3 <= 80) {
    return { label: '주의', variant: 'warning' }
  }
  return { label: '높음', variant: 'high' }
}

export function getGasProgress(usageM3) {
  return Math.min((usageM3 / PROGRESS_MAX_M3) * 100, 100)
}

export function getGasSavings(amount) {
  return {
    savings10: Math.round(amount * 0.1),
    savings20: Math.round(amount * 0.2),
  }
}

export function getGasRecommendations(usageM3) {
  const userInput = { gasUsage: usageM3 }
  const report = generateLivingCostReport(userInput, supportPrograms)

  return buildGasRecommendCards(report, userInput)
}

export function buildGasResult(usageM3, regionId = DEFAULT_REGION_ID, usageType = USAGE_TYPES.HEATING) {
  const breakdown = calculateGasBillBreakdown(usageM3, regionId, usageType)
  const { savings10, savings20 } = getGasSavings(breakdown.total)

  return {
    usage: usageM3,
    regionId,
    usageType,
    fee: breakdown.total,
    breakdown,
    analysis: analyzeGasUsage(usageM3),
    badge: getGasBadge(usageM3),
    progress: getGasProgress(usageM3),
    savings10,
    savings20,
  }
}
