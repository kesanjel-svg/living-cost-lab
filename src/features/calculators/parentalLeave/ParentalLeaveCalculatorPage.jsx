import { Link } from 'react-router-dom'
import ParentalLeaveCalculator from './ParentalLeaveCalculator'
import CalculatorGuide from '../components/CalculatorGuide'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
  { name: '육아휴직급여 계산기', path: '/calculators/parental-leave' },
]

const PARENTAL_LEAVE_CALCULATOR_SCHEMA = {
  name: '육아휴직급여 계산기',
  description:
    '월 통상임금과 사용 개월수로 구간별 지급률·상한액을 반영한 예상 육아휴직급여 총액을 계산하는 무료 계산기',
  path: '/calculators/parental-leave',
}

const GUIDE = {
  sections: [
    {
      heading: '육아휴직급여는 3단계로 나뉩니다',
      paragraphs: [
        '2025년 1월 개편 이후 육아휴직급여는 휴직 시작 후 경과 개월에 따라 지급률과 상한액이 달라집니다. 1~3개월은 통상임금의 100%(상한 250만원), 4~6개월도 100%(상한 200만원), 7개월째부터는 80%(상한 160만원)로 낮아집니다.',
        '통상임금이 아무리 낮아도 전 구간 공통으로 월 70만원의 하한액이 보장됩니다. 육아휴직 급여 지급기간은 최대 12개월입니다.',
      ],
    },
    {
      heading: '6+6 부모육아휴직제 — 부모가 함께 쓰면 더 받습니다',
      paragraphs: [
        '생후 18개월 이내 자녀를 대상으로 부모가 함께(동시 또는 순차) 육아휴직을 사용하면 특례가 적용됩니다. 첫 6개월간 통상임금의 100%를 받을 수 있고, 상한액도 매달 올라가는 구조(1개월째 250만원~6개월째 450만원)로 일반 육아휴직보다 유리합니다.',
        '이 계산기는 지급 구조가 훨씬 복잡한 6+6 특례는 다루지 않고, 부모가 각자 순차적으로 사용하는 일반 육아휴직만 계산합니다. 특례 대상이라면 고용24에서 정확한 금액을 확인해주세요.',
      ],
    },
  ],
  faq: [
    {
      question: '통상임금과 세전 월급여는 같은 건가요?',
      answer: '대체로 비슷하지만 정확히는 다를 수 있습니다. 통상임금은 정기적·일률적으로 지급이 정해진 기본급성 임금으로, 초과근무수당 산정 등의 기준이 되는 임금입니다. 이 계산기는 월 통상임금을 입력값으로 받습니다.',
    },
    {
      question: '12개월을 다 채우지 않고 중간에 복직하면 어떻게 되나요?',
      answer: '사용한 개월수만큼만 지급됩니다. 예를 들어 6개월만 사용했다면 1~6개월 구간의 급여만 받고, 7개월 이후 구간은 지급되지 않습니다.',
    },
    {
      question: '예전보다 육아휴직급여가 늘어난 게 맞나요?',
      answer: '네, 2024년까지는 전체 기간 동일하게 통상임금 80%·상한 150만원이었지만, 2025년 1월 개편으로 초반 6개월의 지급률과 상한액이 크게 올랐습니다.',
    },
    {
      question: '급여는 매달 받나요, 나중에 몰아서 받나요?',
      answer: '예전에는 급여 일부(25%)를 복직 후 6개월 뒤에 지급하는 사후지급 방식이었지만, 현재는 매월 전액을 지급합니다.',
    },
  ],
}

export default function ParentalLeaveCalculatorPage() {
  return (
    <div className="page page--parental-leave-calculator">
      <Seo
        title={formatPageTitle('육아휴직급여 계산기')}
        description="월 통상임금과 육아휴직 사용 개월수를 입력하면 1~3개월·4~6개월·7개월 이후 구간별 지급률과 상한액을 반영한 예상 육아휴직급여 총액을 확인할 수 있습니다. 무료 육아휴직급여 계산기."
        keywords="육아휴직급여 계산기, 육아휴직 급여 계산, 육아휴직 상한액, 6+6 부모육아휴직제"
        canonical="/calculators/parental-leave"
        breadcrumbs={BREADCRUMBS}
        calculators={[PARENTAL_LEAVE_CALCULATOR_SCHEMA]}
        faq={GUIDE.faq}
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <ParentalLeaveCalculator />
        <CalculatorGuide guide={GUIDE} />
      </div>
    </div>
  )
}
