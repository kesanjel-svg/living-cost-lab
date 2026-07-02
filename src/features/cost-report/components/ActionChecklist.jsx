import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getChecklistCompletion,
  getChecklistProgress,
  toggleChecklistItem,
} from '../services/checklistStorage'
import './ActionChecklist.css'

export default function ActionChecklist({ checklist, shareToken }) {
  const [progress, setProgress] = useState(() =>
    shareToken ? getChecklistProgress(shareToken) : {},
  )

  useEffect(() => {
    if (shareToken) {
      setProgress(getChecklistProgress(shareToken))
    }
  }, [shareToken])

  if (!checklist?.length) {
    return null
  }

  const completion = getChecklistCompletion(checklist, progress)

  const handleToggle = (itemId, checked) => {
    if (!shareToken) {
      return
    }

    setProgress(toggleChecklistItem(shareToken, itemId, checked))
  }

  return (
    <section className="action-checklist" aria-labelledby="action-checklist-title">
      <div className="action-checklist__header">
        <div>
          <h2 id="action-checklist-title" className="action-checklist__title">
            실행 체크리스트
          </h2>
          <p className="action-checklist__desc">
            추천 항목을 하나씩 실행하며 생활비 절약을 시작하세요.
          </p>
        </div>
        {shareToken && (
          <div className="action-checklist__progress" aria-live="polite">
            <span className="action-checklist__progress-value">
              {completion.percent}%
            </span>
            <span className="action-checklist__progress-label">
              {completion.completed}/{completion.total} 완료
            </span>
          </div>
        )}
      </div>

      <ul className="action-checklist__list">
        {checklist.map((item) => {
          const checked = Boolean(progress[item.id])

          return (
            <li
              key={item.id}
              className={`action-checklist__item action-checklist__item--${item.priority ?? 'medium'}${checked ? ' action-checklist__item--done' : ''}`}
            >
              {shareToken ? (
                <label className="action-checklist__label">
                  <input
                    type="checkbox"
                    className="action-checklist__checkbox"
                    checked={checked}
                    onChange={(event) =>
                      handleToggle(item.id, event.target.checked)
                    }
                  />
                  <span className="action-checklist__text">{item.text}</span>
                </label>
              ) : (
                <span className="action-checklist__text">{item.text}</span>
              )}
              {item.link && (
                <Link to={item.link} className="action-checklist__link">
                  바로가기 →
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
