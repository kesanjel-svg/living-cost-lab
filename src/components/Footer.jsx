import { Link } from 'react-router-dom'
import {
  BRAND_CONTACT_EMAIL,
  BRAND_COPYRIGHT,
  BRAND_NAME,
  BRAND_NAME_EN,
  BRAND_TAGLINE,
} from '../constants/branding'
import { getBlogPath, getLatestPosts } from '../features/blog/services/blogService'
import { blogPosts } from '../data/blogPosts'
import './Footer.css'

const SERVICE_LINKS = [
  { label: '지원금 찾기', to: '/support' },
  { label: '생활비 계산기', to: '/calculators' },
  { label: 'AI 생활비 진단', to: '/cost-report' },
  { label: '통합 검색', to: '/search' },
]

const LEGAL_LINKS = [
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
        <div className="footer__top">
          <div className="footer__brand-block">
            <p className="footer__brand">{BRAND_NAME}</p>
            <p className="footer__tagline">{BRAND_TAGLINE}</p>
            <p className="footer__name-en">{BRAND_NAME_EN}</p>
          </div>

          <nav className="footer__nav-group" aria-label="서비스 링크">
            <p className="footer__nav-title">서비스</p>
            <ul className="footer__nav-list">
              {SERVICE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__nav-group" aria-label="푸터 링크">
            <p className="footer__nav-title">정보</p>
            <ul className="footer__nav-list">
              {LEGAL_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__latest">
            <p className="footer__nav-title">최신 블로그</p>
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
        </div>

        <div className="footer__bottom">
          <p className="footer__contact">
            문의:{' '}
            <a href={`mailto:${BRAND_CONTACT_EMAIL}`} className="footer__email">
              {BRAND_CONTACT_EMAIL}
            </a>
          </p>
          <p className="footer__copyright">{BRAND_COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  )
}
