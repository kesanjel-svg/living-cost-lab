import FaqAccordion from '../../../shared/content/FaqAccordion'
import './CalculatorGuide.css'

/**
 * 계산기 하단 해설·FAQ 섹션.
 * 계산기 페이지가 "입력폼만 있는 얇은 도구 페이지"로 보이지 않도록,
 * 계산 방식 설명과 자주 묻는 질문을 페이지 자체에 담는다(애드센스 콘텐츠 가치 대응).
 * FAQ는 페이지 Seo의 faq prop으로도 전달해 FAQPage 구조화 데이터를 함께 생성한다.
 *
 * guide: { sections: [{ heading, paragraphs[] }], faq: [{ question, answer }] }
 */
export default function CalculatorGuide({ guide }) {
  if (!guide?.sections?.length) {
    return null
  }

  return (
    <section className="calculator-guide" aria-label="계산기 이용 안내">
      {guide.sections.map((section) => (
        <div key={section.heading} className="calculator-guide__section">
          <h2 className="calculator-guide__heading">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="calculator-guide__paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      ))}

      {guide.faq?.length > 0 && (
        <div className="calculator-guide__section">
          <h2 className="calculator-guide__heading">자주 묻는 질문</h2>
          <FaqAccordion items={guide.faq} />
        </div>
      )}
    </section>
  )
}
