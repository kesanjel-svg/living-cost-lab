import './SupportFinderOptionGroup.css'

export default function SupportFinderOptionGroup({
  legend,
  name,
  options,
  value,
  onChange,
}) {
  return (
    <fieldset className="support-finder__field">
      <legend className="support-finder__legend">{legend}</legend>
      <div className="support-finder__options">
        {options.map((option) => (
          <label
            key={option.value}
            className={`support-finder__option ${
              value === option.value ? 'support-finder__option--selected' : ''
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
