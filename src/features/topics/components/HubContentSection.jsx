import { EmptyState } from '../../../shared/ui'
import HubContentCard from './HubContentCard'
import './HubContentSection.css'

export default function HubContentSection({ title, description, items, emptyText }) {
  if (!items?.length) {
    if (!emptyText) {
      return null
    }

    return (
      <section className="hub-content-section">
        <header className="hub-content-section__header">
          <h2 className="hub-content-section__title">{title}</h2>
        </header>
        <EmptyState variant="compact" icon="" title={emptyText} />
      </section>
    )
  }

  return (
    <section className="hub-content-section">
      <header className="hub-content-section__header">
        <h2 className="hub-content-section__title">{title}</h2>
        {description && (
          <p className="hub-content-section__description">{description}</p>
        )}
      </header>
      <div className="hub-content-section__grid">
        {items.map((item, index) => (
          <HubContentCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}
