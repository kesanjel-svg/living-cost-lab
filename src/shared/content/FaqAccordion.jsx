import { useState } from 'react'
import './FaqAccordion.css'

export default function FaqAccordion({ items, id }) {
  const [openIndex, setOpenIndex] = useState(0)

  if (!items?.length) {
    return null
  }

  return (
    <ul {...(id ? { id } : {})} className="faq-accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <li key={item.question} className="faq-accordion__item">
            <button
              type="button"
              className="faq-accordion__trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span className="faq-accordion__question">{item.question}</span>
              <span className="faq-accordion__icon" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <p className="faq-accordion__answer">{item.answer}</p>
            )}
          </li>
        )
      })}
    </ul>
  )
}
