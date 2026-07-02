import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import BlogCard from '../features/blog/components/BlogCard'
import {
  formatBlogDate,
  getBlogPath,
  getPostBySlug,
  getRelatedPosts,
} from '../features/blog/services/blogService'
import { blogPosts } from '../data/blogPosts'
import Seo from '../shared/seo/Seo'
import { EmptyState } from '../shared/ui'
import { toAbsoluteUrl } from '../shared/seo/siteConfig'
import './Page.css'
import './BlogDetailPage.css'

function ShareButtons({ title, slug }) {
  const [copied, setCopied] = useState(false)
  const url = toAbsoluteUrl(getBlogPath(slug))

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`

  return (
    <div className="blog-detail__share">
      <span className="blog-detail__share-label">공유하기</span>
      <div className="blog-detail__share-actions">
        <button type="button" className="blog-detail__share-btn" onClick={handleCopy}>
          {copied ? '링크 복사됨' : '링크 복사'}
        </button>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noreferrer"
          className="blog-detail__share-btn blog-detail__share-btn--link"
        >
          X 공유
        </a>
      </div>
    </div>
  )
}

export default function BlogDetailPage() {
  const { slug } = useParams()
  const post = getPostBySlug(blogPosts, slug)
  const relatedPosts = post ? getRelatedPosts(blogPosts, post, 3) : []

  if (!post) {
    return (
      <div className="page page--blog-detail">
        <Seo
          title="글을 찾을 수 없습니다"
          description="요청하신 블로그 글을 찾을 수 없습니다."
          canonical={`/blog/${slug}`}
          noindex
        />
        <div className="page__content">
          <Link to="/blog" className="page__back">
            ← 생활비 정보
          </Link>
          <EmptyState
            title="글을 찾을 수 없습니다"
            description="주소가 변경되었거나 삭제된 글일 수 있습니다."
            actionLabel="생활비 정보 목록"
            actionTo="/blog"
            actionVariant="soft"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="page page--blog-detail">
      <Seo
        title={`${post.title} | 생활비연구소`}
        description={post.summary}
        keywords={`${post.category}, 생활비, ${post.title}`}
        canonical={getBlogPath(post.slug)}
        type="article"
        breadcrumbs={[
          { name: '홈', path: '/' },
          { name: '생활비 정보', path: '/blog' },
          { name: post.title, path: getBlogPath(post.slug) },
        ]}
        articles={[
          {
            headline: post.title,
            description: post.summary,
            path: getBlogPath(post.slug),
            datePublished: post.datePublished,
            dateModified: post.dateModified,
          },
        ]}
      />

      <div className="page__content blog-detail">
        <Link to="/blog" className="page__back">
          ← 생활비 정보
        </Link>

        <div className="blog-detail__layout">
          <article className="blog-detail__article">
            <header className="blog-detail__header">
              <span className="blog-detail__category">{post.category}</span>
              <h1 className="blog-detail__title">{post.title}</h1>
              <time className="blog-detail__date" dateTime={post.datePublished}>
                {formatBlogDate(post.datePublished)}
              </time>
            </header>

            <div
              className={`blog-detail__hero blog-detail__hero--${post.thumbnailTheme}`}
            >
              <span aria-hidden="true">{post.thumbnail}</span>
            </div>

            <nav className="blog-detail__toc" aria-label="목차">
              <h2 className="blog-detail__toc-title">목차</h2>
              <ol className="blog-detail__toc-list">
                {post.content.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.heading}</a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="blog-detail__body">
              {post.content.map((section) => (
                <section key={section.id} id={section.id} className="blog-detail__section">
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>

            <ShareButtons title={post.title} slug={post.slug} />
          </article>

          {relatedPosts.length > 0 && (
            <aside className="blog-detail__related">
              <h2 className="blog-detail__related-title">관련글</h2>
              <div className="blog-detail__related-list">
                {relatedPosts.map((item, index) => (
                  <BlogCard key={item.slug} post={item} index={index} />
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
