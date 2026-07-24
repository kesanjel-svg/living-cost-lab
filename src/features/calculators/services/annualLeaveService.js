// 연차수당(연차유급휴가 미사용수당) 계산 서비스.
// 근거 법령: 근로기준법 제60조(연차 유급휴가).
// 출처: 법제처 찾기쉬운 생활법령정보·고용노동부 행정해석 교차확인
// ("근속 8년차 기준 15일+가산 3일=18일" 공식 예시로 아래 산식 자체 검산 완료), 2026-07-24 확인.
//
// 연차 발생일수:
// - 계속근로기간 1년 미만: 1개월 개근 시 1일씩 발생(최대 11일)
// - 계속근로기간 1년 이상: 15일. 3년 이상 근속자는 최초 1년을 초과하는 계속근로연수
//   매 2년마다 1일 가산(가산휴가 포함 총 25일 한도)
//   → 총 연차일수 = min(15 + ⌊(근속연수-1)/2⌋, 25)
//
// 연차수당 = 미사용 연차일수 × 1일 통상임금
// 1일 통상임금 = 월 통상임금 ÷ 209(주 40시간 기준 월 소정근로시간) × 8
export const ANNUAL_LEAVE_SOURCE = {
  label: '법제처 찾기쉬운 생활법령정보 · 연차유급휴가',
  url: 'https://www.easylaw.go.kr/CSP/OnhunqueansInfoRetrieve.laf?onhunqnaAstSeq=82&onhunqueSeq=4584',
  effectiveDate: '2026-07-24',
}

export const ANNUAL_LEAVE_DISCLAIMER =
  '1일 통상임금은 월급여(세전)를 월 소정근로시간 209시간(주 40시간 근무 기준)으로 나눈 뒤 8시간을 곱한 근사치입니다. 식대 등 비과세 수당이나 통상임금에 포함되지 않는 항목이 급여에 섞여 있으면 실제 통상임금과 차이가 날 수 있습니다. 1년 미만 근속자의 개근 월수는 입사일부터 기준일까지의 일수를 30일 단위로 근사 환산했습니다. 정확한 금액은 회사 취업규칙과 통상임금 산정 기준을 확인해주세요.'

export const ANNUAL_LEAVE_TIPS = [
  '연차는 발생일로부터 1년간 사용하지 않으면 소멸되지만, 회사가 사용 촉진 절차를 지키지 않았다면 수당으로 받을 수 있습니다',
  '퇴직 시 미사용 연차는 반드시 수당으로 정산받아야 합니다',
  '3년 이상 근속하면 매 2년마다 연차가 1일씩 늘어나 최대 25일까지 늘어납니다',
]

const MS_PER_DAY = 24 * 60 * 60 * 1000
const MONTHLY_STANDARD_HOURS = 209
const DAILY_STANDARD_HOURS = 8
const MAX_FIRST_YEAR_LEAVE_DAYS = 11
const BASE_LEAVE_DAYS = 15
const MAX_LEAVE_DAYS = 25

function parseDateOnly(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day))
}

function daysBetween(from, to) {
  return Math.round((to.getTime() - from.getTime()) / MS_PER_DAY)
}

export function calculateAccruedLeaveDays(tenureDays) {
  const tenureYears = Math.floor(tenureDays / 365)

  if (tenureYears < 1) {
    const monthsWorked = Math.floor(tenureDays / 30)
    return Math.min(monthsWorked, MAX_FIRST_YEAR_LEAVE_DAYS)
  }

  const bonusDays = Math.floor((tenureYears - 1) / 2)
  return Math.min(BASE_LEAVE_DAYS + bonusDays, MAX_LEAVE_DAYS)
}

export function calculateDailyOrdinaryWage(monthlyWage) {
  return Math.floor((monthlyWage / MONTHLY_STANDARD_HOURS) * DAILY_STANDARD_HOURS)
}

export function calculateAnnualLeaveAllowance({
  startDate,
  baseDate,
  usedLeaveDays = 0,
  monthlyWage,
}) {
  const start = parseDateOnly(startDate)
  const base = parseDateOnly(baseDate)
  const tenureDays = daysBetween(start, base)
  const tenureYears = Math.floor(tenureDays / 365)

  const accruedLeaveDays = calculateAccruedLeaveDays(tenureDays)
  const unusedLeaveDays = Math.max(accruedLeaveDays - usedLeaveDays, 0)
  const dailyOrdinaryWage = calculateDailyOrdinaryWage(monthlyWage)
  const allowance = unusedLeaveDays * dailyOrdinaryWage

  return {
    tenureDays,
    tenureYears,
    accruedLeaveDays,
    unusedLeaveDays,
    dailyOrdinaryWage,
    allowance,
  }
}

export function getAnnualLeaveBadge(unusedLeaveDays) {
  if (unusedLeaveDays <= 0) {
    return { label: '미사용 연차 없음', variant: 'normal' }
  }
  return { label: '수당 발생', variant: 'save' }
}

export function buildAnnualLeaveResult(input) {
  const result = calculateAnnualLeaveAllowance(input)

  const analysis =
    result.unusedLeaveDays > 0
      ? `근속 ${result.tenureYears}년 기준 발생 연차 ${result.accruedLeaveDays}일 중 미사용 ${result.unusedLeaveDays}일에 대한 예상 연차수당입니다.`
      : `근속 ${result.tenureYears}년 기준 발생 연차 ${result.accruedLeaveDays}일을 모두 사용해 미사용 연차수당이 없습니다.`

  return {
    ...result,
    analysis,
    badge: getAnnualLeaveBadge(result.unusedLeaveDays),
  }
}

export function getAnnualLeaveRecommendations() {
  return [
    {
      title: '연봉 실수령액 계산기',
      link: '/calculators/net-salary',
      buttonText: '계산하기',
    },
    {
      title: '연차수당 계산 방법 완전 정리',
      link: '/blog/annual-leave-allowance-guide',
      buttonText: '읽어보기',
    },
  ]
}
