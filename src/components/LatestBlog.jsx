import Card from './ui/Card'
import Section from './ui/Section'
import SectionHeader from './ui/SectionHeader'
import { blogPosts } from '../data'

export default function LatestBlog() {
  return (
    <Section id="blog" variant="muted">
      <SectionHeader
        title="최신 생활비 정보"
        action={{ label: '전체 보기', to: '/blog' }}
      />
      <div className="section__grid section__grid--5">
        {blogPosts.map((post, index) => (
          <Card
            key={post.id}
            variant="blog"
            title={post.title}
            href={post.href}
            animationDelay={0.08 + index * 0.06}
          />
        ))}
      </div>
    </Section>
  )
}
