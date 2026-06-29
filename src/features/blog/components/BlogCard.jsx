import { Link } from 'react-router-dom'
import { formatBlogDate, getBlogPath } from '../services/blogService'
import './BlogCard.css'

export default function BlogCard({ post, index = 0 }) {
  return (
    <Link
      to={getBlogPath(post.slug)}
      className="blog-card"
      style={{ animationDelay: `${0.05 + index * 0.06}s` }}
    >
      <div className={`blog-card__thumb blog-card__thumb--${post.thumbnailTheme}`}>
        <span aria-hidden="true">{post.thumbnail}</span>
      </div>
      <div className="blog-card__body">
        <span className="blog-card__category">{post.category}</span>
        <h3 className="blog-card__title">{post.title}</h3>
        <p className="blog-card__summary">{post.summary}</p>
        <time className="blog-card__date" dateTime={post.datePublished}>
          {formatBlogDate(post.datePublished)}
        </time>
      </div>
    </Link>
  )
}
