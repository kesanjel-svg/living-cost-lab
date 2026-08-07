import { Link } from 'react-router-dom'
import SeveranceCalculator from './SeveranceCalculator'
import CalculatorGuide from '../components/CalculatorGuide'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
  { name: '퇴직금 계산기', path: '/calculators/severance' },
]

const SEVERANCE_CALCULATOR_SCHEMA = {
  name: '퇴직금 계산기',
  description:
    '입사일·퇴사일과 급여 정보로 근로기준법 평균임금 산정 방식에 따른 예상 퇴직금을 계산하는 무료 계산기',
  path: '/calculators/severance',
}

const GUIDE = {
  sections: [
    {
      heading: '퇴직금은 어떻게 계산되나요?',
      paragraphs: [
        '퇴직금은 "1일 평균임금 × 30일 × (재직일수 ÷ 365)"로 계산합니다. 평균임금은 퇴직일 이전 3개월간 받은 임금 총액을 그 3개월의 실제 날짜 수(89~92일)로 나눈 값입니다.',
        '3개월 임금 총액에는 기본급·수당 외에 최근 1년간 받은 상여금과 연차수당의 3/12도 포함됩니다. 근속기간이 1년 미만이면 법적으로 지급 의무가 없습니다.',
      ],
    },
    {
      heading: '누가, 언제 받을 수 있나요?',
      paragraphs: [
        '계속근로기간 1년 이상, 4주 평균 1주 소정근로시간 15시간 이상인 근로자라면 정규직뿐 아니라 계약직·아르바이트도 동일하게 받을 수 있습니다. 퇴직금은 퇴직일로부터 14일 이내에 지급되어야 합니다.',
        '평균임금이 통상임금보다 낮으면 통상임금을 기준으로 계산해야 하는데, 이 계산기는 소정근로시간 정보가 없어 이 비교는 반영하지 않습니다.',
      ],
    },
  ],
  faq: [
    {
      question: '상여금·연차수당이 없으면 입력하지 않아도 되나요?',
      answer: '네, 선택 항목이라 비워두면 0으로 계산됩니다. 최근 1년간 상여금이나 연차수당을 받았다면 입력할수록 더 정확한 결과를 얻을 수 있습니다.',
    },
    {
      question: '퇴직소득세는 얼마나 떼나요?',
      answer: '이 계산기는 세전 금액을 계산합니다. 퇴직소득세는 근속연수에 따른 공제가 커서 일반 근로소득세보다 낮게 적용되는 경우가 많으며, 정확한 세액은 회사 또는 홈택스에서 확인할 수 있습니다.',
    },
    {
      question: '중간정산을 받은 적이 있으면 어떻게 계산하나요?',
      answer: '중간정산 이후의 재직기간만 새로운 근속기간으로 봅니다. 이 계산기의 입사일에는 중간정산 이후 재직 시작일을 입력하면 됩니다.',
    },
    {
      question: '아르바이트도 퇴직금을 받을 수 있나요?',
      answer: '네, 고용 형태와 무관하게 1년 이상 근속하고 4주 평균 주 15시간 이상 일했다면 아르바이트·일용직도 퇴직금 지급 대상입니다.',
    },
  ],
}

export default function SeveranceCalculatorPage() {
  return (
    <div className="page page--severance-calculator">
      <Seo
        title={formatPageTitle('퇴직금 계산기')}
        description="입사일·퇴사일과 월급, 상여금, 연차수당을 입력하면 근로기준법 평균임금 산정 방식에 따른 예상 퇴직금을 확인할 수 있습니다. 무료 퇴직금 계산기."
        keywords="퇴직금 계산기, 퇴직금 계산 방법, 평균임금 계산, 퇴직금 지급 기준"
        canonical="/calculators/severance"
        breadcrumbs={BREADCRUMBS}
        calculators={[SEVERANCE_CALCULATOR_SCHEMA]}
        faq={GUIDE.faq}
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <SeveranceCalculator />
        <CalculatorGuide guide={GUIDE} />
      </div>
    </div>
  )
}
