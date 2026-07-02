import { Link } from 'react-router-dom'
import { BRAND_COPYRIGHT, BRAND_NAME } from '../constants/branding'
import { getBlogPath, getLatestPosts } from '../features/blog/services/blogService'
import { blogPosts } from '../data/blogPosts'
import './Footer.css'

const FOOTER_NAV = [
  { label: '회사소개', to: '/about' },
  { label: '문의', to: '/contact' },
  { label: '약관', to: '/terms' },
  { label: '개인정보처리방침', to: '/privacy' },
  { label: '블로그', to: '/blog' },
  { label: '토픽', to: '/topics' },
]

const LATEST_POSTS = getLatestPosts(blogPosts, 5)

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__brand">{BRAND_NAME}</p>

        <nav className="footer__nav" aria-label="푸터 링크">
          {FOOTER_NAV.map((link) => (
            <Link key={link.to} to={link.to} className="footer__link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="footer__latest">
          <p className="footer__latest-title">최신 블로그</p>
          <ul className="footer__latest-list">
            {LATEST_POSTS.map((post) => (
              <li key={post.slug}>
                <Link to={getBlogPath(post.slug)} className="footer__latest-link">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="footer__copyright">{BRAND_COPYRIGHT}</p>
      </div>
    </footer>
  )
}
