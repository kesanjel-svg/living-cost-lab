import '../../../styles/calculator/Calculator.css'

export default function CalculatorLayout({ title, description, children }) {
  return (
    <div className="calculator">
      {(title || description) && (
        <header className="calculator__header">
          {title && <h1 className="calculator__title">{title}</h1>}
          {description && (
            <p className="calculator__description">{description}</p>
          )}
        </header>
      )}
      {children}
    </div>
  )
}
