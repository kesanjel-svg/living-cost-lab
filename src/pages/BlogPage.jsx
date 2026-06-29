import Card from '../components/ui/Card'
import { blogPosts } from '../data'
import Seo from '../shared/seo/Seo'
import './Page.css'
import './BlogPage.css'

export default function BlogPage() {
  return (
    <div className="page page--blog">
      <Seo
        title="생활비 정보 | 생활비연구소"
        description="전기요금, 지원금, 건강보험 등 생활비 절약에 도움이 되는 정보를 모았습니다."
        keywords="생활비 정보, 전기요금 절약, 지원금 신청"
        canonical="/blog"
      />
      <div className="page__header">
        <h1 className="page__title">생활비 정보</h1>
        <p className="page__description">
          전기요금, 지원금, 건강보험 등 생활비 절약에 도움이 되는 정보를
          모았습니다.
        </p>
      </div>
      <div className="page__content">
        <div className="page-grid page-grid--3">
          {blogPosts.map((post, index) => (
            <Card
              key={post.id}
              variant="blog"
              title={post.title}
              href={post.href}
              animationDelay={0.05 + index * 0.06}
            />
          ))}
        </div>
        <p className="page__notice">블로그 상세 페이지는 준비 중입니다.</p>
      </div>
    </div>
  )
}
