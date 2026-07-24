// 육아휴직급여 계산 서비스(일반 육아휴직, 단독 사용 기준).
// 근거 법령: 고용보험법 시행령 제95조.
// 출처: 고용평등 노동법률사무소·복수 노동법 전문 매체 교차확인
// (2024년 이전 대비 2025-01-01 시행 개편 전후 비교표로 검증), 2026-07-24 확인.
//
// 육아휴직 시작 후 경과 개월에 따라 지급률·상한액이 3단계로 달라진다.
// 1~3개월: 통상임금 100%, 월 상한 250만원
// 4~6개월: 통상임금 100%, 월 상한 200만원
// 7개월 이후(최대 12개월까지): 통상임금 80%, 월 상한 160만원
// 전 구간 공통 하한액: 월 70만원
export const PARENTAL_LEAVE_SOURCE = {
  label: '고용평등 노동법률사무소 · 육아휴직급여 안내',
  url: 'https://www.nodong.kr/equl/403834',
  effectiveDate: '2025-01-01',
}

export const PARENTAL_LEAVE_DISCLAIMER =
  '이 결과는 부모가 각자 순차적으로 사용하는 일반 육아휴직 기준입니다. 생후 18개월 이내 자녀에 대해 부모가 함께(동시 또는 순차) 육아휴직을 사용하는 "6+6 부모육아휴직제"는 첫 6개월간 더 높은 상한액(월 250만~450만원)이 적용되는 별도 특례로, 이 계산기에는 반영되지 않았습니다. 해당 사항이 있다면 고용24(work24.go.kr)에서 정확한 금액을 확인해주세요. 또한 육아휴직 급여 지급기간은 최대 12개월입니다.'

export const PARENTAL_LEAVE_TIPS = [
  '예전에는 급여 일부(25%)를 복직 후 6개월 뒤에 지급했지만, 현재는 매월 전액을 지급합니다',
  '생후 18개월 이내 자녀를 부모가 함께 육아휴직하면 "6+6 부모육아휴직제"로 더 큰 혜택을 받을 수 있습니다',
  '육아휴직급여는 고용보험 피보험단위기간 180일 이상이어야 신청할 수 있습니다',
]

const MAX_LEAVE_MONTHS = 12
const MINIMUM_MONTHLY_BENEFIT = 700000

const TIERS = [
  { fromMonth: 1, toMonth: 3, rate: 1.0, cap: 2500000 },
  { fromMonth: 4, toMonth: 6, rate: 1.0, cap: 2000000 },
  { fromMonth: 7, toMonth: 12, rate: 0.8, cap: 1600000 },
]

function getTierForMonth(monthIndex) {
  return TIERS.find((tier) => monthIndex >= tier.fromMonth && monthIndex <= tier.toMonth)
}

function calculateMonthlyBenefit(monthlyOrdinaryWage, tier) {
  const raw = Math.floor(monthlyOrdinaryWage * tier.rate)
  return Math.min(Math.max(raw, MINIMUM_MONTHLY_BENEFIT), tier.cap)
}

export function calculateParentalLeaveBenefit({ monthlyOrdinaryWage, leaveMonths }) {
  const clampedMonths = Math.min(Math.max(Math.round(leaveMonths), 1), MAX_LEAVE_MONTHS)

  const monthlyBreakdown = []
  let totalBenefit = 0

  for (let month = 1; month <= clampedMonths; month += 1) {
    const tier = getTierForMonth(month)
    const amount = calculateMonthlyBenefit(monthlyOrdinaryWage, tier)
    totalBenefit += amount

    const last = monthlyBreakdown[monthlyBreakdown.length - 1]
    if (last && last.rate === tier.rate && last.cap === tier.cap && last.amount === amount) {
      last.toMonth = month
    } else {
      monthlyBreakdown.push({
        fromMonth: month,
        toMonth: month,
        rate: tier.rate,
        cap: tier.cap,
        amount,
      })
    }
  }

  return {
    leaveMonths: clampedMonths,
    monthlyBreakdown,
    totalBenefit,
  }
}

function formatMonthRange(segment) {
  const range =
    segment.fromMonth === segment.toMonth
      ? `${segment.fromMonth}개월째`
      : `${segment.fromMonth}~${segment.toMonth}개월째`
  return `${range}(${Math.round(segment.rate * 100)}%, 상한 ${(segment.cap / 10000).toLocaleString('ko-KR')}만원)`
}

export function buildParentalLeaveResult(input) {
  const result = calculateParentalLeaveBenefit(input)

  const analysis = `육아휴직 ${result.leaveMonths}개월 사용 기준, 구간별 지급률·상한액을 반영한 예상 총 지급액입니다.`

  return {
    ...result,
    analysis,
    segmentLabels: result.monthlyBreakdown.map(formatMonthRange),
    badge: { label: '예상 지급액', variant: 'save' },
  }
}

export function getParentalLeaveRecommendations() {
  return [
    {
      title: '연봉 실수령액 계산기',
      link: '/calculators/net-salary',
      buttonText: '계산하기',
    },
    {
      title: '육아휴직급여 계산 방법 완전 정리',
      link: '/blog/parental-leave-benefit-guide',
      buttonText: '읽어보기',
    },
  ]
}
