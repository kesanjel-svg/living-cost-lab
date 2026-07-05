import { getProgramsByCalculator } from '../../support/services/supportService'

// 국민연금 보험료율.
// 출처: 국민연금공단(nps.or.kr) 연금보험료 안내, 보건복지부 연금개혁 안내.
// 2026-01-01부로 9%→9.5%로 인상(2033년까지 매년 0.5%p씩 인상되어 13%까지 오를 예정).
// 매년 초 요율이 갱신되므로 실제 청구 전 최신 고시로 재확인 필요.
export const CONTRIBUTION_RATE = 0.095

// 기준소득월액 상·하한액, 2026-07-01~2027-06-30 적용분.
// 출처: 국민연금공단(nps.or.kr) 연금보험료 안내 페이지, 2026-07-05 재확인 완료.
// (직전 적용분인 2025-07-01~2026-06-30 기준 하한 40만원/상한 637만원과는
//  적용기간이 다른 값이므로 혼동 주의 — 매년 7월 1일부로 갱신됨)
export const MIN_INCOME_BASE = 410000
export const MAX_INCOME_BASE = 6590000

export const PENSION_TIPS = [
  '지역가입자는 보험료를 본인이 전액 부담합니다',
  '저소득 지역가입자·농어업인은 국고 지원 대상일 수 있습니다',
  '기준소득월액은 상한액과 하한액 사이로 조정되어 적용됩니다',
]

function clampIncomeBase(income) {
  return Math.min(Math.max(income, MIN_INCOME_BASE), MAX_INCOME_BASE)
}

export function calculatePensionBreakdown(monthlyIncome, isEmployed = true) {
  const incomeBase = clampIncomeBase(monthlyIncome)
  const totalContribution = Math.floor(incomeBase * CONTRIBUTION_RATE)
  const employeeShare = isEmployed
    ? Math.floor(totalContribution / 2)
    : totalContribution
  const employerShare = isEmployed ? totalContribution - employeeShare : 0

  return {
    incomeBase,
    isEmployed,
    totalContribution,
    employeeShare,
    employerShare,
  }
}

export function analyzePensionIncome(monthlyIncome) {
  if (monthlyIncome < MIN_INCOME_BASE) {
    return `기준소득월액 하한액(${MIN_INCOME_BASE.toLocaleString()}원)이 적용되어 계산됩니다.`
  }
  if (monthlyIncome > MAX_INCOME_BASE) {
    return `기준소득월액 상한액(${MAX_INCOME_BASE.toLocaleString()}원)이 적용되어 계산됩니다.`
  }
  return '입력하신 소득이 그대로 기준소득월액으로 적용됩니다.'
}

export function getPensionBadge(isEmployed) {
  return isEmployed
    ? { label: '사업장가입자', variant: 'normal' }
    : { label: '지역가입자', variant: 'warning' }
}

export function getPensionRecommendations() {
  return getProgramsByCalculator('pension')
    .slice(0, 3)
    .map((program) => ({
      title: program.title,
      link: `/support/${program.slug ?? program.id}`,
      buttonText: '자세히 보기',
    }))
}

export function buildPensionResult(monthlyIncome, isEmployed = true) {
  const breakdown = calculatePensionBreakdown(monthlyIncome, isEmployed)

  return {
    monthlyIncome,
    isEmployed,
    breakdown,
    analysis: analyzePensionIncome(monthlyIncome),
    badge: getPensionBadge(isEmployed),
  }
}
