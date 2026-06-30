import { useState } from 'react'
import Section from '../../../components/ui/Section'
import SectionHeader from '../../../components/ui/SectionHeader'
import { HOME_FAQ } from '../data/homeFaq'
import './HomeFaq.css'

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <Section id="faq" variant="muted" className="home-faq">
      <SectionHeader title="자주 묻는 질문" />
      <ul className="home-faq__list">
        {HOME_FAQ.map((item, index) => {
          const isOpen = openIndex === index

          return (
            <li key={item.question} className="home-faq__item">
              <button
                type="button"
                className="home-faq__trigger"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span>{item.question}</span>
                <span className="home-faq__icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen && <p className="home-faq__answer">{item.answer}</p>}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
