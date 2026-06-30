import { Link } from 'react-router-dom'
import './ContentBreadcrumb.css'

export default function ContentBreadcrumb({ items }) {
  if (!items?.length) {
    return null
  }

  return (
    <nav className="content-breadcrumb" aria-label="breadcrumb">
      <ol className="content-breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.path} className="content-breadcrumb__item">
              {isLast ? (
                <span className="content-breadcrumb__current" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link to={item.path} className="content-breadcrumb__link">
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
