import './SupportDetailHeader.css'

export default function SupportDetailHeader({ program }) {
  return (
    <header className="support-detail-header">
      <span className="support-detail-header__category">{program.category}</span>
      <h1 className="support-detail-header__title">{program.title}</h1>
      <p className="support-detail-header__summary">{program.summary}</p>
      <p className="support-detail-header__desc">{program.description}</p>

      {program.tags?.length > 0 && (
        <div className="support-detail-header__tags">
          {program.tags.map((tag) => (
            <span key={tag} className="support-detail-header__tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>
  )
}
