import { Link } from 'react-router-dom'

export default function CalculatorRecommendCard({
  title = '추천 서비스',
  items,
}) {
  if (!items?.length) {
    return null
  }

  return (
    <div className="calculator-recommend">
      <h3 className="calculator-recommend__title">{title}</h3>
      <div className="calculator-recommend__grid">
        {items.map((item) => (
          <div key={item.title} className="calculator-recommend__card">
            <p className="calculator-recommend__name">{item.title}</p>
            <Link to={item.link} className="calculator-recommend__btn">
              {item.buttonText || '자세히 보기'}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
