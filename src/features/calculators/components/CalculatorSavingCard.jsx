export default function CalculatorSavingCard({ savingItems }) {
  if (!savingItems?.length) {
    return null
  }

  return (
    <div className="calculator-saving">
      {savingItems.map((item) => (
        <p key={item} className="calculator-saving__item">
          {item}
        </p>
      ))}
    </div>
  )
}
