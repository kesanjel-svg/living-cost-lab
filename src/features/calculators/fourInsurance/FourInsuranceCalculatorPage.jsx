import { Link } from 'react-router-dom'
import FourInsuranceCalculator from './FourInsuranceCalculator'
import CalculatorGuide from '../components/CalculatorGuide'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
  { name: '4대보험 계산기', path: '/calculators/four-insurance' },
]

const FOUR_INSURANCE_CALCULATOR_SCHEMA = {
  name: '4대보험 계산기',
  description:
    '보수월액으로 국민연금·건강보험·장기요양보험·고용보험의 근로자 부담분과 사업주 부담분을 함께 계산하는 무료 계산기',
  path: '/calculators/four-insurance',
}

const GUIDE = {
  sections: [
    {
      heading: '4대보험, 근로자와 사업주는 각각 얼마씩 내나요?',
      paragraphs: [
        '국민연금(9.5%)·건강보험(7.19%)·장기요양보험(건강보험료의 13.14%)은 근로자와 사업주가 정확히 절반씩 부담합니다. 반면 고용보험은 실업급여 계정(0.9%)만 절반씩이고, 고용안정·직업능력개발사업(사업장 규모별 0.25%~0.85%)은 사업주가 전액 부담합니다.',
        '즉 사업주는 근로자와 똑같이 내는 3개 보험료에 더해, 고용보험 일부와 산재보험(전액)까지 추가로 부담해 실제로는 근로자보다 더 많은 금액을 냅니다.',
      ],
    },
    {
      heading: '산재보험은 왜 빠져있나요?',
      paragraphs: [
        '산재보험료는 사업주가 전액 부담하며 요율이 업종별 재해 위험도에 따라 0.7%부터 18% 이상까지 크게 차이 납니다. 이 편차가 워낙 커서 하나의 계산기로 정확한 금액을 낼 수 없어, 이 계산기에는 포함하지 않았습니다.',
        '정확한 업종별 산재보험료율은 근로복지공단에서 확인할 수 있습니다.',
      ],
    },
  ],
  faq: [
    {
      question: '사업장 규모를 선택하는 이유는 무엇인가요?',
      answer: '고용보험의 고용안정·직업능력개발사업 요율이 사업장 규모(150인 미만/150인 이상 우선지원/1,000인 미만/1,000인 이상)에 따라 0.25%~0.85%로 달라지기 때문입니다. 다른 3개 보험료에는 영향을 주지 않습니다.',
    },
    {
      question: '프리랜서·자영업자도 이 계산기를 쓸 수 있나요?',
      answer: '이 계산기는 근로자를 고용한 사업주 또는 직장가입자 기준입니다. 지역가입자(자영업자 등)의 건강보험료는 건강보험 계산기의 지역가입자 탭에서 별도로 확인할 수 있습니다.',
    },
    {
      question: '10인 미만 사업장은 보험료를 지원받을 수 있나요?',
      answer: '두루누리 사회보험료 지원사업을 통해 10인 미만 사업장의 저임금 근로자는 국민연금·고용보험료의 상당 부분을 지원받을 수 있습니다. 이 계산기는 지원 전 원래 요율로 계산하며, 지원 여부는 반영하지 않았습니다.',
    },
    {
      question: '노사 합계가 왜 필요한가요?',
      answer: '사업주 입장에서 실제 인건비를 가늠할 때 유용합니다. 급여 외에 매달 추가로 나가는 4대보험료 총액을 확인하면 채용·예산 계획에 참고할 수 있습니다.',
    },
  ],
}

export default function FourInsuranceCalculatorPage() {
  return (
    <div className="page page--four-insurance-calculator">
      <Seo
        title={formatPageTitle('4대보험 계산기')}
        description="보수월액을 입력하면 국민연금·건강보험·장기요양보험·고용보험료의 근로자 부담분과 사업주 부담분을 한 번에 확인할 수 있습니다. 무료 4대보험 계산기."
        keywords="4대보험 계산기, 4대보험 요율, 사업주 부담금, 국민연금 건강보험 고용보험 계산"
        canonical="/calculators/four-insurance"
        breadcrumbs={BREADCRUMBS}
        calculators={[FOUR_INSURANCE_CALCULATOR_SCHEMA]}
        faq={GUIDE.faq}
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <FourInsuranceCalculator />
        <CalculatorGuide guide={GUIDE} />
      </div>
    </div>
  )
}
