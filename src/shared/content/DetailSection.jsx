import './DetailSection.css'

export default function DetailSection({ id, title, children, className = '' }) {
  if (!children) {
    return null
  }

  return (
    <section id={id} className={`detail-section ${className}`.trim()}>
      <h2 className="detail-section__title">{title}</h2>
      <div className="detail-section__body">{children}</div>
    </section>
  )
}
