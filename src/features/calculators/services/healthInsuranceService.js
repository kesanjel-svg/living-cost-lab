import { getProgramsByCalculator } from '../../support/services/supportService'

export const INSURED_TYPES = {
  EMPLOYEE: 'employee',
  REGIONAL: 'regional',
}

// 직장가입자 건강보험료율.
// 출처: 보건복지부 보도자료(2025-08-28 건강보험정책심의위원회 의결).
// 2026년 기준 7.19%(2025년 7.09%에서 인상). 근로자/사업주 각 50%씩 부담.
export const HEALTH_INSURANCE_RATE = 0.0719

// 장기요양보험료율. 직접 임금에 곱하지 않고, 산정된 건강보험료에 곱하는 방식.
// 출처: 국민건강보험공단 "2026년도 보험료율 인상 안내" 공지.
// 2026년 장기요양보험료율 0.9448%(건강보험료 대비 13.14%로 환산해 부과).
export const LONG_TERM_CARE_RATE_OF_HEALTH = 0.1314

// SourceBadge용 공식 출처 메타데이터. 보험료율은 매년 건정심 의결로 갱신.
export const HEALTH_SOURCE = {
  label: '국민건강보험공단 보험료율 안내',
  url: 'https://www.nhis.or.kr',
  effectiveDate: '2026-01-01',
}

export const HEALTH_TIPS = [
  '건강보험료는 매년 변경되니 최신 고시를 확인하세요',
  '장기요양보험료는 건강보험료에 비례해 함께 부과됩니다',
  '지역가입자는 소득·재산·자동차 점수를 합산해 별도로 산정됩니다',
]

// 지역가입자 실제 부과 방식: (소득점수+재산점수+자동차점수) × 점수당 금액.
// 출처: 국민건강보험공단(nhis.or.kr) 지역가입자 보험료 안내, 2026년 기준 점수당 208.4원.
// 다만 소득·재산·자동차를 점수로 환산하는 공식 등급표(수십 개 구간)는
// 이 계산기에서 정확히 재현하지 않음 — 아래 계산은 "소득 기반 간이 추정치"만
// 제공하며, 재산·자동차 보유에 따른 추가 보험료는 반영하지 않는다.
// 정확한 금액은 국민건강보험공단 4대보험료 모의계산(nhis.or.kr)에서 확인 필요.
export const REGIONAL_MIN_PREMIUM = 19780 // 2026년 지역가입자 최저보험료

export const REGIONAL_DISCLAIMER =
  '이 결과는 소득만 반영한 간이 추정치입니다. 재산·자동차 보유에 따라 실제 보험료는 더 높을 수 있으니, 정확한 금액은 국민건강보험공단 홈페이지의 4대보험료 모의계산을 이용해주세요.'

export function calculateEmployeeHealthInsurance(monthlyWage) {
  const totalHealthInsurance = Math.floor(monthlyWage * HEALTH_INSURANCE_RATE)
  const employeeHealthShare = Math.floor(totalHealthInsurance / 2)
  const employerHealthShare = totalHealthInsurance - employeeHealthShare

  const totalLongTermCare = Math.floor(totalHealthInsurance * LONG_TERM_CARE_RATE_OF_HEALTH)
  const employeeLongTermShare = Math.floor(totalLongTermCare / 2)
  const employerLongTermShare = totalLongTermCare - employeeLongTermShare

  return {
    insuredType: INSURED_TYPES.EMPLOYEE,
    monthlyWage,
    totalHealthInsurance,
    employeeHealthShare,
    employerHealthShare,
    totalLongTermCare,
    employeeLongTermShare,
    employerLongTermShare,
    employeeTotal: employeeHealthShare + employeeLongTermShare,
    employerTotal: employerHealthShare + employerLongTermShare,
  }
}

export function calculateRegionalHealthInsuranceEstimate(monthlyIncome) {
  const incomeBasedEstimate = Math.floor(monthlyIncome * HEALTH_INSURANCE_RATE)
  const longTermCareEstimate = Math.floor(incomeBasedEstimate * LONG_TERM_CARE_RATE_OF_HEALTH)
  const rawTotal = incomeBasedEstimate + longTermCareEstimate
  const total = Math.max(rawTotal, REGIONAL_MIN_PREMIUM)

  return {
    insuredType: INSURED_TYPES.REGIONAL,
    monthlyIncome,
    incomeBasedEstimate,
    longTermCareEstimate,
    total,
    isMinimumApplied: rawTotal < REGIONAL_MIN_PREMIUM,
  }
}

export function getHealthInsuranceRecommendations() {
  return getProgramsByCalculator('health')
    .slice(0, 3)
    .map((program) => ({
      title: program.title,
      link: `/support/${program.slug ?? program.id}`,
      buttonText: '자세히 보기',
    }))
}

export function buildEmployeeHealthInsuranceResult(monthlyWage) {
  const breakdown = calculateEmployeeHealthInsurance(monthlyWage)

  return {
    insuredType: INSURED_TYPES.EMPLOYEE,
    breakdown,
    analysis: '보수월액을 기준으로 건강보험료와 장기요양보험료를 근로자·사업주가 절반씩 부담합니다.',
    badge: { label: '직장가입자', variant: 'normal' },
  }
}

export function buildRegionalHealthInsuranceResult(monthlyIncome) {
  const breakdown = calculateRegionalHealthInsuranceEstimate(monthlyIncome)
  const minimumNote = breakdown.isMinimumApplied
    ? `소득 기반 추정액이 최저보험료(${REGIONAL_MIN_PREMIUM.toLocaleString()}원)보다 낮아 최저보험료가 적용됩니다. `
    : ''

  return {
    insuredType: INSURED_TYPES.REGIONAL,
    breakdown,
    analysis: `${minimumNote}${REGIONAL_DISCLAIMER}`,
    badge: { label: '지역가입자', variant: 'warning' },
  }
}
