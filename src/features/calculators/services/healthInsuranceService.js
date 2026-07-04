import { getProgramsByCalculator } from '../../support/services/supportService'

export const INSURED_TYPES = {
  EMPLOYEE: 'employee',
  REGIONAL: 'regional',
}

// 직장가입자 건강보험료율.
// 출처: 국민건강보험공단(nhis.or.kr) 보험료율 안내, 보건복지부 고시.
// 2026년 기준 7.19%(2025년 7.09%에서 인상). 근로자/사업주 각 50%씩 부담.
export const HEALTH_INSURANCE_RATE = 0.0719

// 장기요양보험료율. 직접 임금에 곱하지 않고, 산정된 건강보험료에 곱하는 방식.
// 출처: 국민건강보험공단, 2026년도 장기요양보험료율 고시(건강보험료 대비 13.14%).
export const LONG_TERM_CARE_RATE_OF_HEALTH = 0.1314

export const HEALTH_TIPS = [
  '건강보험료는 매년 변경되니 최신 고시를 확인하세요',
  '장기요양보험료는 건강보험료에 비례해 함께 부과됩니다',
  '지역가입자는 소득·재산·자동차 점수를 합산해 별도로 산정됩니다',
]

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
