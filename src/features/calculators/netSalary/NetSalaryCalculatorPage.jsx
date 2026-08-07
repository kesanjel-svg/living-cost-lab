import { Link } from 'react-router-dom'
import NetSalaryCalculator from './NetSalaryCalculator'
import CalculatorGuide from '../components/CalculatorGuide'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
  { name: '연봉 실수령액 계산기', path: '/calculators/net-salary' },
]

const NET_SALARY_CALCULATOR_SCHEMA = {
  name: '연봉 실수령액 계산기',
  description:
    '월급여와 부양가족 수로 4대보험료·소득세를 제외한 예상 실수령액을 계산하는 무료 계산기',
  path: '/calculators/net-salary',
}

const GUIDE = {
  sections: [
    {
      heading: '실수령액은 어떻게 계산되나요?',
      paragraphs: [
        '월급여(세전)에서 국민연금(4.75%)·건강보험(3.595%)·장기요양보험(건강보험료의 13.14%)·고용보험(0.9%) 4대보험료와, 근로소득 간이세액표 방식으로 산정한 소득세·지방소득세(소득세의 10%)를 뺀 금액이 실수령액입니다.',
        '부양가족 수가 많을수록 인적공제(1인당 150만원)가 커져 과세표준이 줄고, 결과적으로 매달 원천징수되는 소득세도 줄어듭니다.',
      ],
    },
    {
      heading: '왜 계산기마다 결과가 조금씩 다른가요?',
      paragraphs: [
        '실제 원천징수 소득세는 국세청이 미리 만들어 둔 간이세액표(수천 개 구간의 룩업 테이블)를 그대로 적용합니다. 이 계산기는 그 표를 만드는 데 쓰인 것과 동일한 계산 방식(근로소득공제→인적공제→과세표준→누진세율→세액공제)을 따른 근사치입니다.',
        '식대 등 비과세소득이나 연금저축·보장성보험료 세액공제는 반영하지 않으므로, 실제 급여명세서와는 소폭 차이가 날 수 있습니다.',
      ],
    },
  ],
  faq: [
    {
      question: '연봉을 입력하면 안 되나요?',
      answer: '이 계산기는 월급여를 기준으로 계산합니다. 연봉을 12로 나눈 세전 월급여를 입력해주세요(상여금이 별도라면 상여금은 포함하지 않은 기본급 기준입니다).',
    },
    {
      question: '부양가족 수는 어떻게 세나요?',
      answer: '본인을 포함한 인원수입니다. 배우자·자녀 등 실제 공제 대상 부양가족이 있다면 본인 포함 인원수를 선택하면 됩니다.',
    },
    {
      question: '연말정산과 결과가 다른 이유는?',
      answer: '이 계산기는 매달 원천징수되는 세전제 근사치이고, 연말정산은 1년치 소득과 실제 공제 항목(의료비·교육비·신용카드 등)을 모두 반영해 정확히 재계산하는 절차입니다. 두 금액은 원래 다르며, 연말정산에서 차액을 환급받거나 추가 납부합니다.',
    },
    {
      question: '4대보험료만 따로 확인하고 싶어요.',
      answer: '4대보험 계산기에서 근로자·사업주 부담분을 항목별로 자세히 확인할 수 있습니다.',
    },
  ],
}

export default function NetSalaryCalculatorPage() {
  return (
    <div className="page page--net-salary-calculator">
      <Seo
        title={formatPageTitle('연봉 실수령액 계산기')}
        description="월급여(세전)와 부양가족 수를 입력하면 국민연금·건강보험·고용보험·소득세를 제외한 예상 실수령액을 확인할 수 있습니다. 무료 연봉 실수령액 계산기."
        keywords="연봉 실수령액 계산기, 월급 실수령액, 세후 월급, 4대보험 계산기"
        canonical="/calculators/net-salary"
        breadcrumbs={BREADCRUMBS}
        calculators={[NET_SALARY_CALCULATOR_SCHEMA]}
        faq={GUIDE.faq}
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <NetSalaryCalculator />
        <CalculatorGuide guide={GUIDE} />
      </div>
    </div>
  )
}
