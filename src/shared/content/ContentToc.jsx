import './ContentToc.css'

export default function ContentToc({ sections, title = '목차' }) {
  if (!sections?.length) {
    return null
  }

  return (
    <nav className="content-toc" aria-label={title}>
      <h2 className="content-toc__title">{title}</h2>
      <ol className="content-toc__list">
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="content-toc__link">
              {section.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
