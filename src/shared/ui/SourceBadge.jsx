import './SourceBadge.css'

function formatEffectiveDate(effectiveDate) {
  if (!effectiveDate) {
    return null
  }

  const [year, month] = effectiveDate.split('-')

  if (!year || !month) {
    return effectiveDate
  }

  return `${year}.${Number(month)}월 기준`
}

/**
 * 공식 출처·적용 기준일 배지.
 * 계산기·지원금 페이지에서 데이터의 신뢰 근거를 일관된 형태로 노출한다.
 */
export default function SourceBadge({ label, url, effectiveDate, note }) {
  if (!label) {
    return null
  }

  const dateText = formatEffectiveDate(effectiveDate)

  return (
    <div className="source-badge">
      <svg
        className="source-badge__icon"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 1.5 13.5 4v3.5c0 3.4-2.3 6.1-5.5 7-3.2-.9-5.5-3.6-5.5-7V4L8 1.5Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path
          d="m5.8 8 1.6 1.6L10.5 6.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="source-badge__text">
        <span className="source-badge__label">
          출처{' '}
          {url ? (
            <a
              className="source-badge__link"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          ) : (
            label
          )}
        </span>
        {dateText && (
          <span className="source-badge__date">{dateText}</span>
        )}
        {note && <span className="source-badge__note">{note}</span>}
      </span>
    </div>
  )
}
