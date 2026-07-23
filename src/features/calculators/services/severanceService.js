// 퇴직금(평균임금 기준) 계산 서비스.
// 근거 법령: 근로기준법 제2조(평균임금)·제34조, 근로자퇴직급여 보장법 제8조.
// 공식 계산 방식: 고용노동부 퇴직금 계산기(moel.go.kr/retirementpayCal.do) 및
// 「퇴직금 및 평균임금 산정공식」FAQ(moel.go.kr/faq/faqView.do?seqRepeat=89), 2026-07-24 확인.
// 퇴직금 = 1일 평균임금 × 30 × (재직일수 / 365)
// 평균임금 = [퇴직 사유 발생일(퇴사일) 이전 3개월간 임금총액] / [그 3개월간의 총 일수(역일수)]
// 임금총액에는 최근 3개월분 기본급·기타수당 외에, 연간 상여금·연차수당의 3/12 해당분도 포함된다.
export const SEVERANCE_SOURCE = {
  label: '고용노동부 퇴직금 계산기·평균임금 산정공식',
  url: 'https://www.moel.go.kr/retirementpayCal.do',
  effectiveDate: '2026-07-24',
}

export const SEVERANCE_DISCLAIMER =
  '이 결과는 최근 3개월간 기본급·기타수당이 동일하다고 가정한 근사치입니다. 평균임금이 통상임금보다 낮은 경우 통상임금을 적용해야 하나(근로기준법 제2조) 이 계산기는 소정근로시간 정보를 반영하지 않아 이를 비교하지 않으며, 육아휴직 등 평균임금 산정 제외기간도 반영하지 않습니다. 세전 금액이며 실제 수령액은 퇴직소득세 원천징수 후 금액입니다. 정확한 금액은 고용노동부 퇴직금 계산기에서 확인해주세요.'

export const SEVERANCE_TIPS = [
  '근속기간 1년 미만은 법적으로 퇴직금 지급 의무가 없습니다',
  '평균임금이 통상임금보다 낮으면 통상임금을 기준으로 계산합니다',
  '퇴직금은 원칙적으로 퇴직일로부터 14일 이내에 지급되어야 합니다',
]

const MS_PER_DAY = 24 * 60 * 60 * 1000
const MIN_TENURE_DAYS_FOR_ELIGIBILITY = 365

function parseDateOnly(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day))
}

function addMonthsUTC(date, months) {
  const copy = new Date(date.getTime())
  copy.setUTCMonth(copy.getUTCMonth() + months)
  return copy
}

function daysBetween(from, to) {
  return Math.round((to.getTime() - from.getTime()) / MS_PER_DAY)
}

export function calculateSeverance({
  startDate,
  endDate,
  monthlyBase,
  monthlyAllowance = 0,
  annualBonus = 0,
  annualLeavePay = 0,
}) {
  const start = parseDateOnly(startDate)
  const end = parseDateOnly(endDate)

  const tenureDays = daysBetween(start, end)

  // 평균임금 산정기간: 퇴직 사유 발생일(퇴사일) 이전 3개월(역일수)
  const periodStart = addMonthsUTC(end, -3)
  const periodTotalDays = daysBetween(periodStart, end)

  const threeMonthWage = (monthlyBase + monthlyAllowance) * 3
  const bonusPortion = annualBonus * (3 / 12)
  const leavePayPortion = annualLeavePay * (3 / 12)
  const totalWageForAverage = threeMonthWage + bonusPortion + leavePayPortion

  // 1일 평균임금을 원 단위로 절사한 뒤 이 값으로 퇴직금을 계산한다.
  // (절사 전 값으로 계산하면 화면에 표시되는 "1일 평균임금"과 실제 퇴직금 계산에
  // 쓰인 값이 달라져, 사용자가 표시된 숫자로 직접 검산했을 때 결과가 안 맞는
  // 불일치가 생긴다 — 항상 화면에 보이는 값과 계산에 쓰이는 값을 일치시킬 것)
  const averageDailyWage = Math.floor(totalWageForAverage / periodTotalDays)
  const severancePay = Math.floor(averageDailyWage * 30 * (tenureDays / 365))
  const eligible = tenureDays >= MIN_TENURE_DAYS_FOR_ELIGIBILITY

  return {
    tenureDays,
    tenureYears: tenureDays / 365,
    periodTotalDays,
    averageDailyWage,
    severancePay,
    eligible,
    breakdown: {
      threeMonthWage: Math.round(threeMonthWage),
      bonusPortion: Math.round(bonusPortion),
      leavePayPortion: Math.round(leavePayPortion),
    },
  }
}

function formatTenure(tenureDays) {
  const years = Math.floor(tenureDays / 365)
  const remainingDays = tenureDays - years * 365
  const months = Math.floor(remainingDays / 30)

  if (years === 0 && months === 0) {
    return `${tenureDays}일`
  }
  if (years === 0) {
    return `${months}개월`
  }
  return `${years}년 ${months}개월`
}

export function getSeveranceBadge(eligible) {
  if (!eligible) {
    return { label: '지급의무 없음', variant: 'warning' }
  }
  return { label: '지급대상', variant: 'save' }
}

export function buildSeveranceResult(input) {
  const result = calculateSeverance(input)
  const tenureLabel = formatTenure(result.tenureDays)

  const analysis = result.eligible
    ? `근속 ${tenureLabel}(${result.tenureDays}일) 기준 예상 퇴직금입니다.`
    : `근속기간이 ${tenureLabel}(${result.tenureDays}일)로 1년 미만이면 근로자퇴직급여 보장법상 퇴직금 지급 의무가 없습니다. 아래 금액은 참고용 계산 결과입니다.`

  return {
    ...result,
    tenureLabel,
    analysis,
    badge: getSeveranceBadge(result.eligible),
  }
}

export function getSeveranceRecommendations() {
  return [
    {
      title: '연봉 실수령액 계산기',
      link: '/calculators/net-salary',
      buttonText: '계산하기',
    },
    {
      title: '퇴직금 계산 방법 완전 정리',
      link: '/blog/severance-pay-guide',
      buttonText: '읽어보기',
    },
  ]
}
