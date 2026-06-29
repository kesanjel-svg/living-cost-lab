import { Link } from 'react-router-dom'
import Card from './ui/Card'
import Section from './ui/Section'
import SectionHeader from './ui/SectionHeader'
import { todaySubsidies } from '../data'

export default function TodaySubsidies() {
  return (
    <Section id="today-subsidies" variant="highlight">
      <SectionHeader title="🔥 오늘 신청 가능한 지원금" />
      <div className="section__grid section__grid--3">
        {todaySubsidies.map((item, index) => (
          <Card
            key={item.id}
            variant="subsidy"
            title={item.title}
            description={item.description}
            badge={item.badge}
            badgeVariant="active"
            href={item.href}
            animationDelay={0.05 + index * 0.07}
          />
        ))}
      </div>
      <div className="section__footer">
        <Link to="/support" className="section__more-btn">
          더보기
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  )
}
