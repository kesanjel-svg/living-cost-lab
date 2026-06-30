import SearchResultItem from './SearchResultItem'
import './SearchResultGroup.css'

export default function SearchResultGroup({ title, items, onSelect }) {
  if (!items?.length) {
    return null
  }

  return (
    <section className="search-result-group">
      <h2 className="search-result-group__title">{title}</h2>
      <ul className="search-result-group__list">
        {items.map((item) => (
          <li key={item.id}>
            <SearchResultItem item={item} onSelect={onSelect} />
          </li>
        ))}
      </ul>
    </section>
  )
}
