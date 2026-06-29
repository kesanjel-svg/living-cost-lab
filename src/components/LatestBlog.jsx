import Card from './ui/Card'
import Section from './ui/Section'
import SectionHeader from './ui/SectionHeader'
import { getBlogPath, getLatestPosts } from '../features/blog/services/blogService'
import { blogPosts } from '../data'

export default function LatestBlog() {
  const latestPosts = getLatestPosts(blogPosts, 5)

  return (
    <Section id="blog" variant="muted">
      <SectionHeader
        title="최신 생활비 정보"
        action={{ label: '전체 보기', to: '/blog' }}
      />
      <div className="section__grid section__grid--5">
        {latestPosts.map((post, index) => (
          <Card
            key={post.slug}
            variant="blog"
            title={post.title}
            href={getBlogPath(post.slug)}
            animationDelay={0.08 + index * 0.06}
          />
        ))}
      </div>
    </Section>
  )
}
