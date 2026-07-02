import { Link } from 'react-router-dom'
import Seo from '../../../shared/seo/Seo'
import ContentBreadcrumb from '../../../shared/content/ContentBreadcrumb'
import { getTopicsIndexData } from '../services/topicHubService'
import './TopicsIndexPage.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '토픽', path: '/topics' },
]

export default function TopicsIndexPage() {
  const topics = getTopicsIndexData()

  return (
    <>
      <Seo
        title="토픽 클러스터 | 생활비연구소"
        description="에너지, 청년, 출산, 교육, 주거, 소득 등 생활비 주제별 지원금·가이드·계산기를 모았습니다."
        keywords="생활비 토픽, 지원금 카테고리, 에너지, 청년, 출산, 주거, 소득"
        canonical="/topics"
        breadcrumbs={BREADCRUMBS}
      />

      <div className="topics-index">
        <div className="topics-index__inner">
          <ContentBreadcrumb items={BREADCRUMBS} />

          <header className="topics-index__hero">
            <h1 className="topics-index__title">토픽 클러스터</h1>
            <p className="topics-index__description">
              주제별로 지원금, 블로그, 계산기를 묶어 필요한 정보를 빠르게 찾을
              수 있습니다.
            </p>
          </header>

          <div className="topics-index__grid">
            {topics.map((topic, index) => (
              <Link
                key={topic.slug}
                to={topic.href}
                className="topics-index__card"
                style={{ animationDelay: `${0.05 + index * 0.05}s` }}
              >
                <span className="topics-index__icon" aria-hidden="true">
                  {topic.icon}
                </span>
                <h2 className="topics-index__card-title">{topic.label}</h2>
                <p className="topics-index__card-desc">{topic.description}</p>
                <div className="topics-index__meta">
                  <span>{topic.supportCount}개 지원금</span>
                  <span>{topic.blogCount}개 가이드</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
