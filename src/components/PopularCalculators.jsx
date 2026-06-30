import Card from './ui/Card'
import Section from './ui/Section'
import SectionHeader from './ui/SectionHeader'
import { popularCalculators } from '../data'

export default function PopularCalculators() {
  return (
    <Section id="popular-calculators" variant="default" className="popular-calculators">
      <SectionHeader
        title="인기 계산기"
        action={{ label: '전체 보기', to: '/calculators' }}
      />
      <div className="section__grid section__grid--4">
        {popularCalculators.map((item, index) => (
          <Card
            key={item.id}
            variant="calculator"
            icon={item.icon}
            title={item.title}
            description={item.description}
            href={item.href}
            linkText="계산하기"
            animationDelay={0.1 + index * 0.07}
          />
        ))}
      </div>
    </Section>
  )
}
