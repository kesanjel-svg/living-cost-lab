import Card from './ui/Card'
import Section from './ui/Section'
import SectionHeader from './ui/SectionHeader'
import { features } from '../data'

export default function FeatureCards() {
  return (
    <Section id="features" variant="compact">
      <SectionHeader title="주요 서비스" />
      <div className="section__grid section__grid--4">
        {features
          .filter((feature) => feature.available)
          .map((feature, index) => (
            <Card
              key={feature.id}
              variant="default"
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              href={feature.href}
              linkText="바로가기"
              animationDelay={0.1 + index * 0.07}
            />
          ))}
      </div>
    </Section>
  )
}
