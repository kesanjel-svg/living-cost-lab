import { Link } from 'react-router-dom'
import UnemploymentCalculator from './UnemploymentCalculator'
import CalculatorGuide from '../components/CalculatorGuide'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
  { name: '실업급여 계산기', path: '/calculators/unemployment' },
]

const UNEMPLOYMENT_CALCULATOR_SCHEMA = {
  name: '실업급여(구직급여) 계산기',
  description:
    '나이·고용보험 가입기간과 이직 전 평균 월급여로 예상 구직급여 총액을 계산하는 무료 계산기',
  path: '/calculators/unemployment',
}

const GUIDE = {
  sections: [
    {
      heading: '실업급여 수급 조건',
      paragraphs: [
        '구직급여를 받으려면 이직일 이전 18개월간 고용보험 피보험단위기간이 통산 180일 이상이어야 하고, 근로 의사와 능력이 있는데도 취업하지 못한 상태여야 하며, 적극적으로 재취업 활동을 해야 합니다.',
        '가장 중요한 조건은 비자발적 이직입니다. 권고사직·계약만료·해고 등이 대표적이며, 개인 사정에 의한 자발적 퇴사는 원칙적으로 대상이 아닙니다(단, 법으로 정한 예외 사유가 있으면 인정될 수 있습니다).',
      ],
    },
    {
      heading: '1일 구직급여액과 소정급여일수',
      paragraphs: [
        '1일 구직급여액은 이직 전 평균임금의 60%이며, 2026년 1월 1일 이후 이직자부터는 66,048원(하한)~68,100원(상한) 사이로 제한됩니다. 이 상·하한은 최저임금 인상과 연동해 7년 만에 동시 조정된 값입니다.',
        '받을 수 있는 총 일수(소정급여일수)는 나이와 고용보험 가입기간에 따라 120일부터 270일까지 달라집니다. 50세 이상이거나 장애인이면 같은 가입기간이라도 더 길게 받습니다.',
      ],
    },
  ],
  faq: [
    {
      question: '자발적으로 퇴사했는데도 받을 수 있나요?',
      answer: '원칙적으로는 대상이 아니지만, 임금체불·근로조건 저하·통근 곤란 등 법으로 정한 예외 사유가 있으면 인정받을 수 있습니다. 애매하다면 고용센터에 미리 확인하는 것이 좋습니다.',
    },
    {
      question: '소정급여일수는 왜 사람마다 다른가요?',
      answer: '나이(50세 기준)와 고용보험 가입기간(1년 미만~10년 이상 5단계)의 조합으로 정해지기 때문입니다. 가입기간이 길수록, 50세 이상일수록 더 오래 받습니다.',
    },
    {
      question: '월급이 아주 높으면 구직급여도 그만큼 많이 받나요?',
      answer: '아니요, 1일 구직급여액에 상한(68,100원)이 있어 월급이 아무리 높아도 이 금액을 넘지 않습니다.',
    },
    {
      question: '신청하면 바로 받을 수 있나요?',
      answer: '아니요, 실업 신고일로부터 7일간은 대기기간으로 이 기간에는 급여가 지급되지 않습니다. 이후 실업인정일마다 재취업활동을 신고해야 계속 지급됩니다.',
    },
  ],
}

export default function UnemploymentCalculatorPage() {
  return (
    <div className="page page--unemployment-calculator">
      <Seo
        title={formatPageTitle('실업급여 계산기')}
        description="나이, 고용보험 가입기간, 이직 전 평균 월급여를 입력하면 소정급여일수와 1일 구직급여액을 반영한 예상 실업급여 총액을 확인할 수 있습니다. 무료 실업급여 계산기."
        keywords="실업급여 계산기, 구직급여 계산, 실업급여 조건, 소정급여일수"
        canonical="/calculators/unemployment"
        breadcrumbs={BREADCRUMBS}
        calculators={[UNEMPLOYMENT_CALCULATOR_SCHEMA]}
        faq={GUIDE.faq}
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <UnemploymentCalculator />
        <CalculatorGuide guide={GUIDE} />
      </div>
    </div>
  )
}
