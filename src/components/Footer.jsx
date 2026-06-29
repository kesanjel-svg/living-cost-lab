import { Link } from 'react-router-dom'
import './Footer.css'

const FOOTER_LINKS = [
  { label: '개인정보처리방침', to: '/privacy' },
  { label: '이용약관', to: '/terms' },
  { label: '문의하기', to: '/contact' },
  { label: '사이트 소개', to: '/about' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__brand">생활비연구소</p>
        <nav className="footer__nav" aria-label="푸터 링크">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="footer__link">
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="footer__copyright">© 2026 Living Cost Lab</p>
      </div>
    </footer>
  )
}
