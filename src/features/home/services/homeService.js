import supportPrograms from '../../../data/supportPrograms'

const SAVING_TIPS = [
  {
    text: '대기전력 차단만으로도 월 전기요금을 줄일 수 있습니다.',
    link: '/blog/electric-saving-tips',
  },
  {
    text: '누진제 구간을 피하면 전기요금 부담이 크게 줄어듭니다.',
    link: '/blog/electric-discount',
  },
  {
    text: '도시가스 사용량이 높다면 난방 온도를 1~2도 낮춰보세요.',
    link: '/blog/gas-cashback',
  },
  {
    text: '근로·자녀 장려금 신청 기간을 놓치지 않도록 미리 확인하세요.',
    link: '/blog/earned-income-schedule',
  },
  {
    text: '월급날 생활비 체크리스트로 고정비와 지원금을 점검해보세요.',
    link: '/blog/living-cost-checklist',
  },
  {
    text: '겨울철 난방비는 단열·환기 습관만으로도 절약할 수 있습니다.',
    link: '/blog/winter-heating-save',
  },
]

export function getTodaysSupport() {
  const index = new Date().getDate() % supportPrograms.length
  return supportPrograms[index]
}

export function getTodaysSavingTip() {
  const index = new Date().getDate() % SAVING_TIPS.length
  return SAVING_TIPS[index]
}

export function getLatestSupports(limit = 5) {
  return supportPrograms.slice(0, limit)
}
