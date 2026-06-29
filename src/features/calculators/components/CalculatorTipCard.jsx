export default function CalculatorTipCard({
  title = '생활비 절약 TIP',
  tips,
}) {
  if (!tips?.length) {
    return null
  }

  return (
    <div className="calculator-tip">
      <h3 className="calculator-tip__title">{title}</h3>
      <ul className="calculator-tip__list">
        {tips.map((tip) => (
          <li key={tip}>✔ {tip}</li>
        ))}
      </ul>
    </div>
  )
}
