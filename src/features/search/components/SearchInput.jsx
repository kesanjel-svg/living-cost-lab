import { BRAND_SEARCH_PLACEHOLDER_DETAILED } from '../../../constants/branding'
import './SearchInput.css'

export default function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = BRAND_SEARCH_PLACEHOLDER_DETAILED,
  autoFocus = false,
  size = 'md',
  id = 'search-input',
  name = 'q',
  inputRef,
  onFocus,
  onBlur,
  ariaControls,
  ariaExpanded,
  ariaAutocomplete = 'list',
}) {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit?.(value)
  }

  return (
    <form
      className={`search-input search-input--${size}`}
      role="search"
      onSubmit={handleSubmit}
    >
      <label htmlFor={id} className="search-input__sr-only">
        검색
      </label>
      <span className="search-input__icon" aria-hidden="true">
        ⌕
      </span>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="search"
        className="search-input__field"
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        autoComplete="off"
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        aria-autocomplete={ariaAutocomplete}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <button type="submit" className="search-input__submit">
        검색
      </button>
    </form>
  )
}
