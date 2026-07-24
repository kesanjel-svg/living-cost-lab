import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BRAND_NAME } from '../constants/branding'
import { navItems } from '../data'
import BrandLogo from './BrandLogo'
import HeaderSearch from '../features/search/components/HeaderSearch'
import './Header.css'

const NAV_ID = 'site-nav'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          <BrandLogo className="header__logo-mark" />
          <span>{BRAND_NAME}</span>
        </Link>

        <HeaderSearch />

        <button
          type="button"
          className="header__toggle"
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
          aria-controls={NAV_ID}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id={NAV_ID}
          className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}
          aria-label="주 메뉴"
        >
          <ul className="header__menu">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    isActive ? 'header__link header__link--active' : 'header__link'
                  }
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
