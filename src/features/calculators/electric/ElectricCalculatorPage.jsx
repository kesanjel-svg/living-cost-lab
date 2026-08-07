import { Link } from 'react-router-dom'
import ElectricCalculator from './ElectricCalculator'
import CalculatorGuide from '../components/CalculatorGuide'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
  { name: '전기요금 계산기', path: '/calculators/electric' },
]

const ELECTRIC_CALCULATOR_SCHEMA = {
  name: '전기요금 계산기',
  description:
    '월 전력 사용량(kWh)으로 예상 전기요금을 계산하고 절약 방법을 확인하는 무료 계산기',
  path: '/calculators/electric',
}

const GUIDE = {
  sections: [
    {
      heading: '전기요금은 어떻게 계산되나요?',
      paragraphs: [
        '주택용 전기요금(저압)은 사용량이 늘어날수록 단가가 오르는 3단계 누진제입니다. 일반 기간에는 200kWh·400kWh를 기준으로 구간이 나뉘고, 냉방 수요가 느는 7~8월에는 이 기준이 300kWh·450kWh로 완화됩니다.',
        '최종 청구액에는 전력량요금과 기본요금 외에도 기후환경요금(9원/kWh)과 연료비조정요금(5원/kWh)이 사용량에 비례해 더해지고, 여기에 부가가치세 10%와 전력산업기반기금 2.7%가 추가로 붙습니다. 이 계산기는 이 모든 항목을 반영해 청구서와 동일한 구조로 계산합니다.',
      ],
    },
    {
      heading: '전기요금을 줄이는 실전 방법',
      paragraphs: [
        '누진제 구조상 상위 구간으로 넘어가는 순간 평균 단가가 크게 오르므로, 구간 경계 부근에서는 사용량을 조금만 줄여도 체감 절감 효과가 큽니다. 에어컨 적정 온도 유지, 대기전력 차단, LED 조명 교체가 대표적인 절약 방법입니다.',
        '취약계층이라면 전기요금 복지할인이나 에너지바우처로 별도 지원을 받을 수 있고, 사용량을 줄인 가구는 한전 에너지캐시백으로 절감분을 돌려받을 수도 있습니다.',
      ],
    },
  ],
  faq: [
    {
      question: '하계요금 구간은 정확히 언제 적용되나요?',
      answer: '7월 1일부터 8월 31일까지 사용한 전력량에 하계요금 구간(1단계 300kWh, 2단계 450kWh 이하)이 적용됩니다. 이 계산기의 "하계요금 구간 적용" 체크박스로 직접 선택할 수 있습니다.',
    },
    {
      question: '누진 구간별로 단가가 정확히 얼마나 차이 나나요?',
      answer: '1단계(120.0원/kWh) 대비 2단계는 214.6원/kWh, 3단계는 307.3원/kWh로, 최상위 구간은 1단계의 약 2.6배에 달합니다. 사용량이 상위 구간으로 넘어갈수록 평균 단가가 빠르게 오르는 이유입니다.',
    },
    {
      question: '전기요금 계산기와 실제 고지서 금액이 다를 수 있나요?',
      answer: '네, 월별 사용기간(검침일 기준 일수)이 실제로는 30일이 아닐 수 있고, 계약 종별(일반용·산업용 등)이나 지역별 특례가 다르면 차이가 날 수 있습니다. 이 계산기는 가장 일반적인 주택용(저압) 기준입니다.',
    },
    {
      question: '월 1,000kWh를 넘게 쓰면 어떻게 되나요?',
      answer: '하계를 제외한 기간에 월 1,000kWh를 초과하면 초과분에 대해 슈퍼유저 요금(736.2원/kWh)이 적용되어 일반 3단계보다도 훨씬 높은 단가가 부과됩니다.',
    },
  ],
}

export default function ElectricCalculatorPage() {
  return (
    <div className="page page--electric-calculator">
      <Seo
        title={formatPageTitle('전기요금 계산기')}
        description="월 전력 사용량(kWh)으로 예상 전기요금을 계산하고 절약 방법을 확인하세요. 무료 전기요금 계산기로 생활비를 점검해보세요."
        keywords="전기요금 계산기, 전기요금, 전력 사용량, 전기요금 절약"
        canonical="/calculators/electric"
        breadcrumbs={BREADCRUMBS}
        calculators={[ELECTRIC_CALCULATOR_SCHEMA]}
        faq={GUIDE.faq}
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <ElectricCalculator />
        <CalculatorGuide guide={GUIDE} />
      </div>
    </div>
  )
}
