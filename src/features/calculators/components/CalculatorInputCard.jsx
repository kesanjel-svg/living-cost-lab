export default function CalculatorInputCard({
  label,
  value,
  onChange,
  buttonText,
  onCalculate,
  error,
  placeholder,
  inputId = 'calculator-input',
}) {
  const handleSubmit = (event) => {
    event.preventDefault()
    onCalculate?.()
  }

  return (
    <form className="calculator-input" onSubmit={handleSubmit}>
      <label className="calculator-input__label" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        type="number"
        min="1"
        step="1"
        className="calculator-input__field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {error && <p className="calculator-input__error">{error}</p>}

      <button type="submit" className="calculator-input__submit">
        {buttonText}
      </button>
    </form>
  )
}
