import { Link } from 'react-router-dom'
import Card from '../../../components/ui/Card'
import Section from '../../../components/ui/Section'
import SectionHeader from '../../../components/ui/SectionHeader'
import { getLatestSupports } from '../services/homeService'
import './LatestSupports.css'

export default function LatestSupports() {
  const supports = getLatestSupports(5)

  return (
    <Section id="latest-supports" variant="highlight" className="latest-supports">
      <SectionHeader
        title="최신 정부지원금"
        action={{ label: '전체 보기', to: '/support' }}
      />
      <div className="section__grid section__grid--3 latest-supports__grid">
        {supports.map((item, index) => (
          <Card
            key={item.id}
            variant="subsidy"
            title={item.title}
            description={item.summary}
            badge={item.category}
            badgeVariant="active"
            href={`/support/${item.slug}`}
            linkText="신청 안내"
            animationDelay={0.04 + index * 0.04}
          />
        ))}
      </div>
      <div className="section__footer">
        <Link to="/support" className="section__more-btn">
          지원금 더 찾기
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  )
}
