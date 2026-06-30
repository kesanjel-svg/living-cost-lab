import { Link } from 'react-router-dom'
import DetailSection from './DetailSection'
import './RelatedBlogs.css'

export default function RelatedBlogs({
  title = '관련 블로그',
  posts = [],
  id = 'related-blogs',
}) {
  if (!posts.length) {
    return null
  }

  return (
    <DetailSection id={id} title={title}>
      <div className="related-blogs__grid">
        {posts.map((post) => (
          <Link key={post.slug} to={post.href} className="related-blogs__card">
            <h3 className="related-blogs__title">{post.title}</h3>
            {post.summary && (
              <p className="related-blogs__summary">{post.summary}</p>
            )}
            <span className="related-blogs__cta">
              읽어보기
              <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </DetailSection>
  )
}
