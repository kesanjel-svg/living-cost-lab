// 4대보험 계산 서비스(근로자·사업주 부담분 동시 산출).
// 요율은 사이트 전체 수치 일관성을 위해 기존 계산기 상수를 그대로 재사용한다.
import { CONTRIBUTION_RATE, MAX_INCOME_BASE, MIN_INCOME_BASE } from './pensionService'
import { HEALTH_INSURANCE_RATE, LONG_TERM_CARE_RATE_OF_HEALTH } from './healthInsuranceService'
import { EMPLOYMENT_INSURANCE_RATE } from './netSalaryService'

// 고용보험 고용안정·직업능력개발사업 요율(사업주 100% 부담, 사업장 규모별 차등).
// 근거: 고용보험법 시행령 제12조. 0.25/0.45/0.65/0.85% 4단계 구조는 수년간 유지되고 있으며,
// 2026-07-24 복수 노무·인사 전문 자료에서 동일 수치로 교차확인.
// (실업급여 계정 요율은 근로자·사업주 각 0.9%로 netSalaryService의 상수를 재사용)
export const EMPLOYMENT_STABILITY_OPTIONS = [
  { id: 'under150', label: '150인 미만', rate: 0.0025 },
  { id: 'priority150', label: '150인 이상 (우선지원 대상기업)', rate: 0.0045 },
  { id: 'under1000', label: '150인 이상 ~ 1,000인 미만', rate: 0.0065 },
  { id: 'over1000', label: '1,000인 이상 · 국가/지자체', rate: 0.0085 },
]

export const FOUR_INSURANCE_SOURCE = {
  label: '국민연금공단·건강보험공단·고용보험법 시행령',
  url: 'https://www.4insure.or.kr',
  effectiveDate: '2026-07-01',
}

export const FOUR_INSURANCE_DISCLAIMER =
  '산재보험료는 업종별 요율 편차가 매우 커(약 0.7%~18%) 이 계산기에는 포함하지 않았습니다. 산재보험은 사업주가 전액 부담하며, 정확한 업종별 요율은 근로복지공단에서 확인해주세요. 또한 국민연금은 기준소득월액 상·하한(월 41만원~659만원)이 적용되어 실제 급여와 부과 기준이 다를 수 있으며, 두루누리 사회보험료 지원 등 감면 제도는 반영하지 않았습니다.'

export const FOUR_INSURANCE_TIPS = [
  '국민연금·건강보험·장기요양보험은 근로자와 사업주가 정확히 절반씩 부담합니다',
  '고용보험은 실업급여 계정만 절반씩이고, 고용안정·직업능력개발사업은 사업주가 전액 부담합니다',
  '10인 미만 사업장의 저임금 근로자는 두루누리 지원으로 보험료를 최대 80%까지 지원받을 수 있습니다',
]

function getStabilityRate(sizeId) {
  return (
    EMPLOYMENT_STABILITY_OPTIONS.find((option) => option.id === sizeId)?.rate ??
    EMPLOYMENT_STABILITY_OPTIONS[0].rate
  )
}

/**
 * 보수월액 기준 4대보험(산재 제외) 근로자·사업주 부담분을 계산한다.
 * 요율·상하한·단수처리는 기존 연봉 실수령액 계산기와 동일하게 맞춰 수치 일관성을 유지한다.
 */
export function calculateFourInsurance({ monthlyWage, companySizeId = 'under150' }) {
  // 국민연금: 기준소득월액 상·하한 적용 후 노사 절반씩
  const pensionIncomeBase = Math.min(Math.max(monthlyWage, MIN_INCOME_BASE), MAX_INCOME_BASE)
  const pensionTotal = Math.floor(pensionIncomeBase * CONTRIBUTION_RATE)
  const pensionEmployee = Math.floor(pensionTotal / 2)
  const pensionEmployer = pensionTotal - pensionEmployee

  // 건강보험 + 장기요양보험(건강보험료에 비례 부과), 각각 노사 절반씩
  const healthTotal = Math.floor(monthlyWage * HEALTH_INSURANCE_RATE)
  const healthEmployee = Math.floor(healthTotal / 2)
  const healthEmployer = healthTotal - healthEmployee

  const longTermCareTotal = Math.floor(healthTotal * LONG_TERM_CARE_RATE_OF_HEALTH)
  const longTermCareEmployee = Math.floor(longTermCareTotal / 2)
  const longTermCareEmployer = longTermCareTotal - longTermCareEmployee

  // 고용보험: 실업급여 계정은 노사 각 0.9%, 고용안정·직업능력개발사업은 사업주 전액
  // (+1e-6: 부동소수점 오차로 floor 결과가 1원 낮아지는 것 방지 — netSalaryService와 동일)
  const stabilityRate = getStabilityRate(companySizeId)
  const employmentEmployee = Math.floor(monthlyWage * EMPLOYMENT_INSURANCE_RATE + 1e-6)
  const employmentEmployer = Math.floor(
    monthlyWage * (EMPLOYMENT_INSURANCE_RATE + stabilityRate) + 1e-6,
  )

  const employeeTotal =
    pensionEmployee + healthEmployee + longTermCareEmployee + employmentEmployee
  const employerTotal =
    pensionEmployer + healthEmployer + longTermCareEmployer + employmentEmployer

  return {
    monthlyWage,
    pensionIncomeBase,
    stabilityRate,
    employee: {
      pension: pensionEmployee,
      health: healthEmployee,
      longTermCare: longTermCareEmployee,
      employment: employmentEmployee,
      total: employeeTotal,
    },
    employer: {
      pension: pensionEmployer,
      health: healthEmployer,
      longTermCare: longTermCareEmployer,
      employment: employmentEmployer,
      total: employerTotal,
    },
    grandTotal: employeeTotal + employerTotal,
  }
}

export function buildFourInsuranceResult(input) {
  const result = calculateFourInsurance(input)
  const employeeRate = Math.round((result.employee.total / result.monthlyWage) * 1000) / 10

  const isPensionCapped = result.pensionIncomeBase !== result.monthlyWage
  const analysis = isPensionCapped
    ? `보수월액의 약 ${employeeRate}%가 근로자 부담분으로 공제됩니다. 국민연금은 기준소득월액 상·하한이 적용되어 ${result.pensionIncomeBase.toLocaleString('ko-KR')}원 기준으로 부과됩니다.`
    : `보수월액의 약 ${employeeRate}%가 근로자 부담분으로 공제됩니다.`

  return {
    ...result,
    employeeRate,
    analysis,
    badge: { label: '근로자 부담', variant: 'normal' },
  }
}

export function getFourInsuranceRecommendations() {
  return [
    {
      title: '연봉 실수령액 계산기',
      link: '/calculators/net-salary',
      buttonText: '계산하기',
    },
    {
      title: '4대보험 요율과 부담 구조 정리',
      link: '/blog/four-insurance-guide',
      buttonText: '읽어보기',
    },
  ]
}
