// 구직급여(실업급여) 계산 서비스.
// 근거 법령: 고용보험법 제45조(구직급여일액)·제46조(소정급여일수)·제50조.
// 출처: 법제처 찾기쉬운 생활법령정보 「구직급여 수급액」·「구직급여 수급일수」
// (easylaw.go.kr, 고용노동부 자료와 소정급여일수 표 교차확인 완료), 2026-07-24 확인.
// 2026-01-01 이후 이직자부터 적용되는 상·하한액(2026년 최저임금 10,320원 연동,
// 66,000원→68,100원, 7년 만의 동시 인상) 반영.
//
// 구직급여일액 = 기초일액(이직 전 평균임금, 상한 113,500원) × 60%
// 단, 최저기초일액(최저임금×8시간) × 80%가 이 값보다 크면 그 금액을 적용
// → 결과적으로 "평균임금×60%를 66,048원(하한)~68,100원(상한) 사이로 제한"과 동일
export const UNEMPLOYMENT_SOURCE = {
  label: '법제처 찾기쉬운 생활법령정보 · 구직급여 수급액',
  url: 'https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=722&ccfNo=2&cciNo=3&cnpClsNo=2',
  effectiveDate: '2026-01-01',
}

export const UNEMPLOYMENT_DISCLAIMER =
  '1일 평균임금은 "이직 전 3개월 평균 월급여 ÷ 30"으로 근사 계산합니다(실제 산정은 3개월 임금총액을 그 기간의 정확한 총 일수로 나눔). 자발적 이직(개인 사정에 의한 퇴사)은 원칙적으로 구직급여 대상이 아니며, 이직 전 18개월간 고용보험 피보험단위기간 180일 이상 등 세부 자격요건은 반영하지 않았습니다. 정확한 대상 여부와 금액은 고용24(work24.go.kr) 실업급여 모의계산 또는 고용센터에서 확인해주세요.'

export const UNEMPLOYMENT_TIPS = [
  '자발적 이직은 원칙적으로 대상이 아니지만, 예외 인정 사유가 있는지 고용센터에서 확인해보세요',
  '실업 신고일로부터 7일간은 대기기간으로 급여가 지급되지 않습니다',
  '수급 기간 중에는 실업인정일마다 적극적인 재취업활동 내역을 신고해야 합니다',
]

const DAILY_WAGE_CAP = 113500 // 기초일액 상한
const BENEFIT_RATE = 0.6
const MINIMUM_DAILY_BENEFIT = 66048 // 2026-01-01 이후 이직자 하한액
const MAXIMUM_DAILY_BENEFIT = 68100 // 2026-01-01 이후 이직자 상한액(=113,500×60%)

export const INSURANCE_PERIOD_OPTIONS = [
  { id: 'under1', label: '1년 미만' },
  { id: '1to3', label: '1년 이상 3년 미만' },
  { id: '3to5', label: '3년 이상 5년 미만' },
  { id: '5to10', label: '5년 이상 10년 미만' },
  { id: 'over10', label: '10년 이상' },
]

// 소정급여일수 표(2019.10.1. 이후 이직자 기준, 현재도 동일 적용).
const BENEFIT_DAYS_TABLE = {
  under50: { under1: 120, '1to3': 150, '3to5': 180, '5to10': 210, over10: 240 },
  over50OrDisabled: { under1: 120, '1to3': 180, '3to5': 210, '5to10': 240, over10: 270 },
}

export function getBenefitDays(insurancePeriodId, isOver50OrDisabled) {
  const table = isOver50OrDisabled
    ? BENEFIT_DAYS_TABLE.over50OrDisabled
    : BENEFIT_DAYS_TABLE.under50
  return table[insurancePeriodId] ?? null
}

export function calculateUnemploymentBenefit({
  monthlyWage,
  age,
  isDisabled = false,
  insurancePeriodId,
  isInvoluntaryLeave = true,
}) {
  const isOver50OrDisabled = age >= 50 || isDisabled
  const benefitDays = getBenefitDays(insurancePeriodId, isOver50OrDisabled)

  const averageDailyWage = Math.floor(monthlyWage / 30)
  const cappedDailyWage = Math.min(averageDailyWage, DAILY_WAGE_CAP)
  const rawDailyBenefit = Math.floor(cappedDailyWage * BENEFIT_RATE)
  const dailyBenefit = Math.min(
    Math.max(rawDailyBenefit, MINIMUM_DAILY_BENEFIT),
    MAXIMUM_DAILY_BENEFIT,
  )

  const totalBenefit = dailyBenefit * benefitDays

  return {
    averageDailyWage,
    dailyBenefit,
    benefitDays,
    totalBenefit,
    isOver50OrDisabled,
    eligible: isInvoluntaryLeave,
  }
}

function getInsurancePeriodLabel(insurancePeriodId) {
  return (
    INSURANCE_PERIOD_OPTIONS.find((option) => option.id === insurancePeriodId)?.label ?? ''
  )
}

export function getUnemploymentBadge(eligible) {
  if (!eligible) {
    return { label: '자격 확인 필요', variant: 'warning' }
  }
  return { label: '지급대상', variant: 'save' }
}

export function buildUnemploymentResult(input) {
  const result = calculateUnemploymentBenefit(input)
  const periodLabel = getInsurancePeriodLabel(input.insurancePeriodId)

  const analysis = result.eligible
    ? `고용보험 가입기간 ${periodLabel}, 소정급여일수 ${result.benefitDays}일 기준 예상 구직급여 총액입니다.`
    : '자발적 이직은 원칙적으로 구직급여 대상이 아닙니다. 아래 금액은 비자발적 이직으로 가정한 참고용 계산 결과입니다.'

  return {
    ...result,
    periodLabel,
    analysis,
    badge: getUnemploymentBadge(result.eligible),
  }
}

export function getUnemploymentRecommendations() {
  return [
    {
      title: '연봉 실수령액 계산기',
      link: '/calculators/net-salary',
      buttonText: '계산하기',
    },
    {
      title: '실업급여 계산 방법 완전 정리',
      link: '/blog/unemployment-benefit-guide',
      buttonText: '읽어보기',
    },
  ]
}
