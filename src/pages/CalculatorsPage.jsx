import Card from '../components/ui/Card'
import { formatPageTitle } from '../constants/branding'
import { popularCalculators } from '../data'
import Seo from '../shared/seo/Seo'
import './Page.css'
import './CalculatorsPage.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
]

const CALCULATOR_SCHEMAS = [
  {
    name: '연봉 실수령액 계산기',
    description: '월급여와 부양가족 수로 4대보험료·소득세 제외 예상 실수령액을 계산하는 무료 계산기',
    path: '/calculators/net-salary',
  },
  {
    name: '퇴직금 계산기',
    description: '입사일·퇴사일과 급여로 평균임금 기준 예상 퇴직금을 계산하는 무료 계산기',
    path: '/calculators/severance',
  },
  {
    name: '실업급여(구직급여) 계산기',
    description: '나이·고용보험 가입기간과 평균 월급여로 예상 구직급여 총액을 계산하는 무료 계산기',
    path: '/calculators/unemployment',
  },
  {
    name: '연차수당 계산기',
    description: '입사일과 월 통상임금으로 발생 연차일수와 예상 연차수당을 계산하는 무료 계산기',
    path: '/calculators/annual-leave',
  },
  {
    name: '전기요금 계산기',
    description: '월 전력 사용량(kWh)으로 예상 전기요금을 계산하는 무료 계산기',
    path: '/calculators/electric',
  },
  {
    name: '도시가스 계산기',
    description: '도시가스 사용량 기준 예상 요금을 확인하는 생활비 계산기',
    path: '/calculators/gas',
  },
  {
    name: '국민연금 계산기',
    description: '월 소득 기준 예상 국민연금 보험료를 계산하는 무료 계산기',
    path: '/calculators/pension',
  },
  {
    name: '건강보험 계산기',
    description: '보수월액 기준 예상 건강보험료·장기요양보험료를 계산하는 무료 계산기',
    path: '/calculators/health',
  },
]

export default function CalculatorsPage() {
  return (
    <div className="page page--calculators">
      <Seo
        title={formatPageTitle('생활비 계산기')}
        description="전기요금, 도시가스, 건강보험, 국민연금, 퇴직금, 실업급여, 연차수당 등 생활비 관련 계산기를 이용해보세요. 무료로 예상 생활비를 확인하고 절약 방법을 찾아보세요."
        keywords="생활비 계산기, 전기요금 계산기, 도시가스 계산기, 건강보험 계산기, 퇴직금 계산기, 실업급여 계산기, 연차수당 계산기"
        canonical="/calculators"
        breadcrumbs={BREADCRUMBS}
        calculators={CALCULATOR_SCHEMAS}
      />
      <div className="page__header">
        <h1 className="page__title">계산기</h1>
        <p className="page__description">
          전기요금, 도시가스, 건강보험, 국민연금 등 생활비 관련 계산기를
          이용해보세요.
        </p>
      </div>
      <div className="page__content">
        <div className="page-grid page-grid--4">
          {popularCalculators.map((item, index) => (
            <Card
              key={item.id}
              variant="calculator"
              icon={item.icon}
              title={item.title}
              description={item.description}
              href={item.href}
              linkText="계산하기"
              animationDelay={0.05 + index * 0.06}
            />
          ))}
        </div>
        <p className="page__notice">
          연봉 실수령액·퇴직금·실업급여·연차수당·전기요금·도시가스·국민연금·건강보험(직장가입자) 계산기를 이용할 수 있습니다.
          도시가스 계산기는 서울·부산·대구·인천·김포·광주·대전 등 48개 지역의 실제 요금표를 지원하며, 그 외 지역은 전국 평균 근사치로 계산됩니다.
        </p>
      </div>
    </div>
  )
}
