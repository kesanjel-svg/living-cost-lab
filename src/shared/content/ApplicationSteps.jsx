import './ApplicationSteps.css'

/**
 * 신청방법을 번호가 매겨진 단계 목록으로 보여준다.
 * steps: [{ title, description }]
 */
export default function ApplicationSteps({ steps }) {
  if (!steps?.length) {
    return null
  }

  return (
    <ol className="application-steps">
      {steps.map((step, index) => (
        <li key={step.title} className="application-steps__item">
          <span className="application-steps__number" aria-hidden="true">
            {index + 1}
          </span>
          <div className="application-steps__body">
            <p className="application-steps__title">{step.title}</p>
            <p className="application-steps__desc">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
