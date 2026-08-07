import { Link } from 'react-router-dom'
import HealthInsuranceCalculator from './HealthInsuranceCalculator'
import CalculatorGuide from '../components/CalculatorGuide'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
  { name: '건강보험 계산기', path: '/calculators/health' },
]

const HEALTH_CALCULATOR_SCHEMA = {
  name: '건강보험 계산기',
  description: '보수월액으로 예상 건강보험료·장기요양보험료를 계산하는 무료 계산기',
  path: '/calculators/health',
}

const GUIDE = {
  sections: [
    {
      heading: '건강보험료는 어떻게 계산되나요?',
      paragraphs: [
        '직장가입자의 건강보험료는 보수월액의 7.19%(2026년 기준, 2025년 7.09%에서 인상)이며, 근로자와 사업주가 절반씩(각 3.595%) 부담합니다. 여기에 건강보험료의 13.14%가 장기요양보험료로 추가되고, 이 역시 노사가 절반씩 나눠 냅니다.',
        '지역가입자는 소득·재산·자동차를 각각 점수로 환산해 합산한 뒤 점수당 금액(2026년 기준 208.4원)을 곱하는 방식이라, 근로소득만으로 계산하는 직장가입자보다 산정 방식이 훨씬 복잡합니다.',
      ],
    },
    {
      heading: '직장가입자 vs 지역가입자',
      paragraphs: [
        '이 계산기의 직장가입자 탭은 보수월액만 입력하면 정확한 보험료가 계산됩니다. 반면 지역가입자 탭은 재산·자동차 점수를 정확히 반영하기 어려워 소득 기반의 간이 추정치로 제공되며, 최저보험료(월 19,780원) 하한은 정확히 반영했습니다.',
        '지역가입자의 정확한 금액이 필요하다면 국민건강보험공단 홈페이지의 4대보험료 모의계산을 이용하는 것이 가장 정확합니다.',
      ],
    },
  ],
  faq: [
    {
      question: '장기요양보험료는 왜 따로 계산되나요?',
      answer: '장기요양보험료는 임금이 아니라 산정된 건강보험료에 비례해 부과되는 별도 보험입니다(건강보험료의 13.14%). 두 보험료 모두 매년 요율이 조정됩니다.',
    },
    {
      question: '지역가입자 보험료가 직장가입자보다 훨씬 비싸 보이는 이유는?',
      answer: '지역가입자는 소득뿐 아니라 재산(부동산 등)과 자동차까지 점수로 환산해 합산하기 때문에, 소득이 같아도 재산이 있으면 직장가입자보다 보험료가 높게 나올 수 있습니다.',
    },
    {
      question: '건강보험료 상한이 있나요?',
      answer: '네, 매년 고시되는 보수월액 상한액이 있어 이를 초과하는 소득에는 보험료가 추가로 부과되지 않습니다. 정확한 상한액은 국민건강보험공단 공식 안내를 확인해주세요.',
    },
    {
      question: '휴직 중에도 건강보험료를 내야 하나요?',
      answer: '무급휴직 등 일정 요건을 충족하면 보험료가 감면되거나 유예될 수 있습니다. 정확한 감면 조건은 국민건강보험공단에 문의하는 것이 좋습니다.',
    },
  ],
}

export default function HealthInsuranceCalculatorPage() {
  return (
    <div className="page page--health-calculator">
      <Seo
        title={formatPageTitle('건강보험 계산기')}
        description="보수월액으로 예상 건강보험료와 장기요양보험료를 계산하세요. 국민건강보험공단 공식 요율을 반영한 무료 계산기입니다."
        keywords="건강보험 계산기, 건강보험료, 장기요양보험료, 국민건강보험공단"
        canonical="/calculators/health"
        breadcrumbs={BREADCRUMBS}
        calculators={[HEALTH_CALCULATOR_SCHEMA]}
        faq={GUIDE.faq}
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <HealthInsuranceCalculator />
        <CalculatorGuide guide={GUIDE} />
      </div>
    </div>
  )
}
