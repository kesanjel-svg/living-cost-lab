import { Fragment } from 'react'
import BlogCard from '../features/blog/components/BlogCard'
import { formatPageTitle } from '../constants/branding'
import { getBlogPath } from '../features/blog/services/blogService'
import { blogPosts } from '../data'
import Seo from '../shared/seo/Seo'
import AdSlot, { AD_SLOT_IDS } from '../shared/ads/AdSlot'
import './Page.css'
import './BlogPage.css'

const ADS_EVERY_N_CARDS = 5

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '생활비 정보', path: '/blog' },
]

const ARTICLE_SCHEMAS = blogPosts.map((post) => ({
  headline: post.title,
  description: post.summary,
  path: getBlogPath(post.slug),
  datePublished: post.datePublished,
  dateModified: post.dateModified,
}))

export default function BlogPage() {
  return (
    <div className="page page--blog">
      <Seo
        title={formatPageTitle('생활비 정보')}
        description="전기요금, 지원금, 건강보험 등 생활비 절약에 도움이 되는 정보를 모았습니다. 실생활에 바로 적용할 수 있는 절약 팁과 지원금 안내를 확인하세요."
        keywords="생활비 정보, 전기요금 절약, 지원금 신청, 도시가스 절약"
        canonical="/blog"
        breadcrumbs={BREADCRUMBS}
        articles={ARTICLE_SCHEMAS}
      />
      <div className="page__header">
        <h1 className="page__title">생활비 정보</h1>
        <p className="page__description">
          전기요금, 지원금, 건강보험 등 생활비 절약에 도움이 되는 정보를
          모았습니다.
        </p>
      </div>
      <div className="page__content">
        <div className="blog-page__grid">
          {blogPosts.map((post, index) => (
            <Fragment key={post.slug}>
              <BlogCard post={post} index={index} />
              {(index + 1) % ADS_EVERY_N_CARDS === 0 && (
                <AdSlot
                  slotId={AD_SLOT_IDS.BLOG_LIST}
                  className="blog-page__ad-slot"
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
