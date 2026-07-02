import ContentBreadcrumb from '../../../shared/content/ContentBreadcrumb'
import HubContentSection from './HubContentSection'
import RelatedTopicNav from './RelatedTopicNav'
import './HubLayout.css'

export default function HubLayout({
  topic,
  breadcrumbs,
  featured = [],
  popular = [],
  latest = [],
  supports = [],
  relatedTopics = [],
  blogCount = 0,
  children,
}) {
  return (
    <div className="hub-layout">
      <div className="hub-layout__inner">
        <ContentBreadcrumb items={breadcrumbs} />

        <header className="hub-layout__hero">
          <span className="hub-layout__icon" aria-hidden="true">
            {topic.icon}
          </span>
          <div>
            <p className="hub-layout__eyebrow">토픽 클러스터</p>
            <h1 className="hub-layout__title">{topic.title}</h1>
            <p className="hub-layout__description">{topic.description}</p>
          </div>
        </header>

        <div className="hub-layout__stats" aria-label="토픽 콘텐츠 요약">
          <span>{supports.length}개 지원금</span>
          <span>{blogCount}개 가이드</span>
          {topic.calculatorIds?.length > 0 && (
            <span>{topic.calculatorIds.length}개 계산기</span>
          )}
        </div>

        <HubContentSection
          title="추천 콘텐츠"
          description="이 토픽에서 가장 먼저 확인하면 좋은 콘텐츠입니다."
          items={featured}
          emptyText="추천 콘텐츠를 준비 중입니다."
        />

        <HubContentSection
          title="인기 콘텐츠"
          description="많은 사용자가 찾는 지원금과 가이드입니다."
          items={popular}
        />

        <HubContentSection
          title="최신 콘텐츠"
          description="최근 업데이트된 블로그와 정보입니다."
          items={latest}
        />

        {supports.length > 0 && (
          <HubContentSection
            title="지원금 목록"
            description="이 토픽에 속한 지원 제도입니다."
            items={supports}
          />
        )}

        {children}

        <RelatedTopicNav topics={relatedTopics} currentSlug={topic.slug} />
      </div>
    </div>
  )
}
