import './CategoryAnalysisSection.css'

const LEVEL_LABELS = {
  good: '양호',
  fair: '보통',
  warning: '주의',
}

export default function CategoryAnalysisSection({ items }) {
  if (!items?.length) {
    return null
  }

  return (
    <section className="category-analysis" aria-labelledby="category-analysis-title">
      <h2 id="category-analysis-title" className="category-analysis__title">
        항목별 분석
      </h2>
      <p className="category-analysis__desc">
        주거·에너지·소득 등 5개 항목의 생활비 부담 수준을 분석했습니다.
      </p>
      <div className="category-analysis__grid">
        {items.map((item) => (
          <article
            key={item.id}
            className={`category-analysis__card category-analysis__card--${item.level}`}
          >
            <div className="category-analysis__card-head">
              <span className="category-analysis__icon" aria-hidden="true">
                {item.icon}
              </span>
              <div>
                <h3 className="category-analysis__label">{item.label}</h3>
                <p className="category-analysis__score">
                  {item.score}점 · {LEVEL_LABELS[item.level]}
                </p>
              </div>
              <div
                className="category-analysis__bar"
                role="progressbar"
                aria-valuenow={item.score}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${item.label} ${item.score}점`}
              >
                <span style={{ width: `${item.score}%` }} />
              </div>
            </div>
            <p className="category-analysis__summary">{item.summary}</p>
            {item.tips?.length > 0 && (
              <ul className="category-analysis__tips">
                {item.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
