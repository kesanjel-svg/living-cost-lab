import { Link } from 'react-router-dom'
import AnnualLeaveCalculator from './AnnualLeaveCalculator'
import CalculatorGuide from '../components/CalculatorGuide'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
  { name: '연차수당 계산기', path: '/calculators/annual-leave' },
]

const ANNUAL_LEAVE_CALCULATOR_SCHEMA = {
  name: '연차수당 계산기',
  description:
    '입사일과 월 통상임금으로 근로기준법 기준 발생 연차일수와 예상 연차수당을 계산하는 무료 계산기',
  path: '/calculators/annual-leave',
}

const GUIDE = {
  sections: [
    {
      heading: '연차는 근속연수에 따라 다르게 발생합니다',
      paragraphs: [
        '계속근로기간 1년 미만은 1개월 개근할 때마다 1일씩 연차가 발생하며 최대 11일입니다. 1년 이상부터는 15일이 발생하고, 3년 이상 근속하면 최초 1년을 초과하는 계속근로연수 매 2년마다 1일씩 가산되어(최대 25일) 8년차에는 18일까지 늘어납니다.',
        '연차수당은 미사용 연차일수에 1일 통상임금을 곱해 계산합니다. 1일 통상임금은 월급여를 월 소정근로시간(주 40시간 기준 209시간)으로 나눈 뒤 8시간을 곱해 구합니다.',
      ],
    },
    {
      heading: '연차 소멸과 사용 촉진 제도',
      paragraphs: [
        '연차는 발생일로부터 1년간 사용하지 않으면 원칙적으로 소멸됩니다. 다만 회사가 근로기준법이 정한 연차 사용 촉진 절차를 제대로 지키지 않았다면, 소멸된 연차라도 수당으로 청구할 수 있습니다.',
        '퇴직 시에는 이 소멸 규정과 무관하게 그때까지 미사용한 연차를 반드시 수당으로 정산받아야 합니다.',
      ],
    },
  ],
  faq: [
    {
      question: '연차 산정 기준일은 무엇을 입력해야 하나요?',
      answer: '보통 오늘 날짜나 퇴사 예정일을 입력합니다. 입사일부터 이 날짜까지의 근속기간을 기준으로 발생 연차일수를 계산합니다.',
    },
    {
      question: '이미 사용한 연차가 있으면 어떻게 입력하나요?',
      answer: '"이미 사용한 연차일수" 항목에 지금까지 실제로 쉰 연차 일수를 입력하면, 발생 연차에서 이를 뺀 미사용 연차만큼만 수당으로 계산됩니다.',
    },
    {
      question: '통상임금과 평균임금 중 어느 것을 써야 하나요?',
      answer: '연차수당은 통상임금(또는 평균임금) 기준으로 계산할 수 있는데, 실무에서는 통상임금을 사용하는 경우가 많습니다. 이 계산기는 통상임금 기준입니다.',
    },
    {
      question: '연차는 최대 며칠까지 발생하나요?',
      answer: '3년 이상 근속자의 가산휴가를 포함해 총 25일이 한도입니다. 아무리 오래 근속해도 25일을 넘지 않습니다.',
    },
  ],
}

export default function AnnualLeaveCalculatorPage() {
  return (
    <div className="page page--annual-leave-calculator">
      <Seo
        title={formatPageTitle('연차수당 계산기')}
        description="입사일, 연차 산정 기준일, 월 통상임금을 입력하면 근로기준법 기준 발생 연차일수와 예상 연차수당을 확인할 수 있습니다. 무료 연차수당 계산기."
        keywords="연차수당 계산기, 연차수당 계산 방법, 연차 발생 기준, 미사용 연차수당"
        canonical="/calculators/annual-leave"
        breadcrumbs={BREADCRUMBS}
        calculators={[ANNUAL_LEAVE_CALCULATOR_SCHEMA]}
        faq={GUIDE.faq}
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <AnnualLeaveCalculator />
        <CalculatorGuide guide={GUIDE} />
      </div>
    </div>
  )
}
