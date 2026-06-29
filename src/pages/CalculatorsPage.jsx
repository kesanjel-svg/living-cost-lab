import Card from '../components/ui/Card'
import { popularCalculators } from '../data'
import Seo from '../shared/seo/Seo'
import './Page.css'
import './CalculatorsPage.css'

export default function CalculatorsPage() {
  return (
    <div className="page page--calculators">
      <Seo
        title="생활비 계산기 | 생활비연구소"
        description="전기요금, 도시가스, 건강보험, 국민연금 등 생활비 관련 계산기를 이용해보세요."
        keywords="생활비 계산기, 전기요금 계산기, 도시가스 계산기"
        canonical="/calculators"
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
          전기요금 계산기를 이용할 수 있습니다. 다른 계산기는 준비 중입니다.
        </p>
      </div>
    </div>
  )
}
