import { Link } from 'react-router-dom'
import PensionCalculator from './PensionCalculator'
import CalculatorGuide from '../components/CalculatorGuide'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
  { name: '국민연금 계산기', path: '/calculators/pension' },
]

const PENSION_CALCULATOR_SCHEMA = {
  name: '국민연금 계산기',
  description: '월 소득으로 예상 국민연금 보험료를 계산하는 무료 계산기',
  path: '/calculators/pension',
}

const GUIDE = {
  sections: [
    {
      heading: '국민연금 보험료는 어떻게 정해지나요?',
      paragraphs: [
        '국민연금 보험료는 월 소득에 보험료율 9.5%를 곱해 계산합니다(2026-01-01부로 9%에서 인상, 2033년까지 매년 0.5%p씩 인상되어 13%까지 오를 예정). 사업장가입자는 이 금액을 회사와 절반씩 나눠 내고, 지역가입자는 전액 본인이 부담합니다.',
        '실제 소득이 그대로 쓰이지 않고, 기준소득월액이라는 상·하한 범위 안의 금액으로 조정됩니다. 2026년 7월~2027년 6월 적용 기준 하한은 41만원, 상한은 659만원으로, 이 범위를 벗어난 소득은 상한 또는 하한 금액을 기준으로 부과됩니다.',
      ],
    },
    {
      heading: '사업장가입자와 지역가입자 차이',
      paragraphs: [
        '직장에 다니는 사업장가입자는 보험료 전체(9.5%)를 근로자와 사업주가 절반씩(각 4.75%) 부담합니다. 반면 자영업자·프리랜서 등 지역가입자는 소득 전체에 대한 보험료를 혼자 내야 합니다.',
        '저소득 지역가입자나 농어업인은 국고 지원을 받을 수 있는 제도도 있으니, 대상 여부가 궁금하다면 국민연금공단에 문의하는 것이 좋습니다.',
      ],
    },
  ],
  faq: [
    {
      question: '월급이 41만원보다 적어도 보험료를 내나요?',
      answer: '네, 기준소득월액 하한선(41만원)이 적용되어 실제 소득이 이보다 적어도 41만원을 기준으로 보험료가 부과됩니다.',
    },
    {
      question: '고소득자는 소득이 많을수록 보험료도 계속 오르나요?',
      answer: '아니요, 기준소득월액 상한(659만원)이 있어 실제 소득이 이보다 높아도 659만원을 초과하는 부분에는 보험료가 부과되지 않습니다.',
    },
    {
      question: '기준소득월액 상·하한은 왜 매년 바뀌나요?',
      answer: '전체 가입자의 평균소득 변동률을 반영해 매년 7월 1일에 갱신됩니다. 이 계산기는 2026-07-01~2027-06-30 적용 기준(하한 41만원, 상한 659만원)을 사용합니다.',
    },
    {
      question: '국민연금은 나중에 얼마나 돌려받나요?',
      answer: '이 계산기는 매달 납부하는 보험료를 계산하는 도구로, 향후 수령할 연금액은 가입기간·소득 이력 등을 종합해 별도로 산정됩니다. 예상 수령액은 국민연금공단 내연금 홈페이지에서 확인할 수 있습니다.',
    },
  ],
}

export default function PensionCalculatorPage() {
  return (
    <div className="page page--pension-calculator">
      <Seo
        title={formatPageTitle('국민연금 계산기')}
        description="월 소득으로 예상 국민연금 보험료(사업장가입자/지역가입자)를 계산하세요. 기준소득월액 상·하한액을 반영한 무료 계산기입니다."
        keywords="국민연금 계산기, 국민연금 보험료, 기준소득월액, 국민연금공단"
        canonical="/calculators/pension"
        breadcrumbs={BREADCRUMBS}
        calculators={[PENSION_CALCULATOR_SCHEMA]}
        faq={GUIDE.faq}
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <PensionCalculator />
        <CalculatorGuide guide={GUIDE} />
      </div>
    </div>
  )
}
