import { getProgramsByCalculator } from '../../support/services/supportService'
import { CONTRIBUTION_RATE, MAX_INCOME_BASE, MIN_INCOME_BASE } from './pensionService'
import { HEALTH_INSURANCE_RATE, LONG_TERM_CARE_RATE_OF_HEALTH } from './healthInsuranceService'

// 고용보험료율(실업급여 계정, 근로자 부담분).
// 출처: 고용보험법 시행령 제12조. 2022-07-01 인상(0.8%→0.9%) 이후 변동 없이 유지.
// 2026-07-11 재확인 시 고용노동부의 별도 개정 고시를 찾지 못해 동결로 추정 —
// 정확한 최신 요율은 4대사회보험 정보연계센터(www.4insure.or.kr)에서 재확인 권장.
export const EMPLOYMENT_INSURANCE_RATE = 0.009

// 지방소득세 = 원천징수 소득세의 10%. 출처: 지방세법 제103조의13.
export const LOCAL_INCOME_TAX_RATE = 0.1

// 표준세액공제(특별세액공제 미신청 근로자 기본 적용액). 소득세법 제59조의4.
const STANDARD_TAX_CREDIT = 130000

// SourceBadge용 공식 출처 메타데이터.
// 소득세는 실제로는 국세청이 사전 산정한 "근로소득 간이세액표"(수천 구간 룩업)를
// 그대로 적용하므로, 이 계산기의 소득세는 그 표를 만드는 데 쓰인 것과 동일한
// 계산방식(근로소득공제→인적공제→과세표준→누진세율→세액공제)을 따른 근사치다.
// 정확한 원천징수액은 홈택스 자동조회로 확인 가능.
export const NET_SALARY_SOURCE = {
  label: '국세청 근로소득 간이세액표 자동조회(홈택스)',
  url: 'https://teht.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/sf/a/a/UTESFAAF99.xml',
  effectiveDate: '2026-03-01',
}

export const NET_SALARY_DISCLAIMER =
  '이 결과는 근로소득 간이세액표 산정 방식을 따른 근사치입니다. 식대 등 비과세소득, 연금저축·보장성보험료 등 추가 세액공제는 반영하지 않았으니, 정확한 원천징수세액은 홈택스 간이세액표 조회 또는 회사 급여담당자를 통해 확인해주세요.'

export const NET_SALARY_TIPS = [
  '부양가족 수가 많을수록 인적공제가 늘어 원천징수세액은 줄어듭니다',
  '연말정산에서 실제 납부할 세액이 확정되며, 매월 원천징수액과 차이가 날 수 있습니다',
  '연금저축·IRP 납입은 세액공제로 실수령액에 간접적으로 영향을 줍니다',
]

// 근로소득공제. 소득세법 제47조. 2020년 개정 이후 구간·율 변동 없음.
function calculateEarnedIncomeDeduction(annualGross) {
  if (annualGross <= 5000000) {
    return annualGross * 0.7
  }
  if (annualGross <= 15000000) {
    return 3500000 + (annualGross - 5000000) * 0.4
  }
  if (annualGross <= 45000000) {
    return 7500000 + (annualGross - 15000000) * 0.15
  }
  if (annualGross <= 100000000) {
    return 12000000 + (annualGross - 45000000) * 0.05
  }
  return 14750000 + (annualGross - 100000000) * 0.02
}

// 종합소득세율(누진공제 방식). 소득세법 제55조. 2023년 개정 이후 유지.
const TAX_BRACKETS = [
  { limit: 14000000, rate: 0.06, deduction: 0 },
  { limit: 50000000, rate: 0.15, deduction: 1260000 },
  { limit: 88000000, rate: 0.24, deduction: 5760000 },
  { limit: 150000000, rate: 0.35, deduction: 15440000 },
  { limit: 300000000, rate: 0.38, deduction: 19940000 },
  { limit: 500000000, rate: 0.4, deduction: 25940000 },
  { limit: 1000000000, rate: 0.42, deduction: 35940000 },
  { limit: Infinity, rate: 0.45, deduction: 65940000 },
]

function calculateProgressiveTax(taxBase) {
  const bracket = TAX_BRACKETS.find((item) => taxBase <= item.limit)
  return Math.max(taxBase * bracket.rate - bracket.deduction, 0)
}

// 근로소득세액공제. 소득세법 제59조.
function calculateEarnedIncomeTaxCredit(calculatedTax, annualGross) {
  const credit =
    calculatedTax <= 1300000
      ? calculatedTax * 0.55
      : 1300000 * 0.55 + (calculatedTax - 1300000) * 0.3

  let limit
  if (annualGross <= 33000000) {
    limit = 740000
  } else if (annualGross <= 70000000) {
    limit = Math.max(740000 - (annualGross - 33000000) * 0.008, 660000)
  } else {
    limit = Math.max(660000 - (annualGross - 70000000) * 0.005, 500000)
  }

  return Math.min(credit, limit)
}

function roundDownToTen(amount) {
  return Math.floor(amount / 10 + 1e-6) * 10
}

/**
 * 월급여·부양가족수(본인 포함) 기준 예상 실수령액을 계산한다.
 * 4대보험(근로자 부담분)은 기존 전기·건강보험·국민연금 계산기와 동일한
 * 요율·상하한을 재사용해 사이트 전체의 수치 일관성을 유지한다.
 */
export function calculateNetSalary(monthlyGross, familyCount = 1) {
  const annualGross = monthlyGross * 12

  const pensionIncomeBase = Math.min(Math.max(monthlyGross, MIN_INCOME_BASE), MAX_INCOME_BASE)
  const pension = Math.floor(Math.floor(pensionIncomeBase * CONTRIBUTION_RATE) / 2)

  const healthTotal = Math.floor(monthlyGross * HEALTH_INSURANCE_RATE)
  const health = Math.floor(healthTotal / 2)
  const longTermCareTotal = Math.floor(healthTotal * LONG_TERM_CARE_RATE_OF_HEALTH)
  const longTermCare = Math.floor(longTermCareTotal / 2)

  // +1e-6: 부동소수점 오차(예: 3500000*0.009 = 31499.999999999996)로
  // floor 결과가 1원 낮게 나오는 것을 방지
  const employmentInsurance = Math.floor(monthlyGross * EMPLOYMENT_INSURANCE_RATE + 1e-6)

  const annualSocialInsuranceDeduction = (pension + health + longTermCare) * 12

  const earnedIncomeDeduction = calculateEarnedIncomeDeduction(annualGross)
  const earnedIncomeAmount = Math.max(annualGross - earnedIncomeDeduction, 0)
  const personalDeduction = 1500000 * Math.max(familyCount, 1)

  const taxBase = Math.max(
    earnedIncomeAmount - personalDeduction - annualSocialInsuranceDeduction,
    0,
  )

  const calculatedTax = calculateProgressiveTax(taxBase)
  const earnedIncomeTaxCredit = calculateEarnedIncomeTaxCredit(calculatedTax, annualGross)
  const annualIncomeTax = Math.max(
    Math.floor(calculatedTax - earnedIncomeTaxCredit - STANDARD_TAX_CREDIT),
    0,
  )

  const incomeTax = roundDownToTen(annualIncomeTax / 12)
  const localIncomeTax = roundDownToTen(incomeTax * LOCAL_INCOME_TAX_RATE)

  const totalDeduction = pension + health + longTermCare + employmentInsurance + incomeTax + localIncomeTax
  const netSalary = monthlyGross - totalDeduction

  return {
    monthlyGross,
    familyCount: Math.max(familyCount, 1),
    breakdown: {
      pension,
      health,
      longTermCare,
      employmentInsurance,
      incomeTax,
      localIncomeTax,
      totalDeduction,
    },
    netSalary,
  }
}

export function getNetSalaryBadge(netSalary, monthlyGross) {
  const ratio = netSalary / monthlyGross
  if (ratio >= 0.9) {
    return { label: '공제 적음', variant: 'save' }
  }
  if (ratio >= 0.82) {
    return { label: '보통', variant: 'normal' }
  }
  return { label: '공제 많음', variant: 'warning' }
}

export function getNetSalaryRecommendations() {
  return getProgramsByCalculator('netSalary')
    .slice(0, 3)
    .map((program) => ({
      title: program.title,
      link: `/support/${program.slug ?? program.id}`,
      buttonText: '자세히 보기',
    }))
}

export function buildNetSalaryResult(monthlyGross, familyCount = 1) {
  const result = calculateNetSalary(monthlyGross, familyCount)
  const deductionRate = Math.round((result.breakdown.totalDeduction / monthlyGross) * 100)

  return {
    ...result,
    analysis: `4대보험료와 세금을 합쳐 월급여의 약 ${deductionRate}%가 공제됩니다.`,
    badge: getNetSalaryBadge(result.netSalary, monthlyGross),
  }
}
