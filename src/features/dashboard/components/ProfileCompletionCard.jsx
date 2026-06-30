import { Link } from 'react-router-dom'
import './ProfileCompletionCard.css'

export default function ProfileCompletionCard({ completion }) {
  const isComplete = completion >= 100

  return (
    <section className="profile-completion" aria-labelledby="profile-completion-title">
      <div className="profile-completion__header">
        <div>
          <p className="profile-completion__eyebrow">프로필 완성도</p>
          <h2 id="profile-completion-title" className="profile-completion__title">
            {completion}%
          </h2>
        </div>
        <div
          className="profile-completion__ring"
          style={{ '--completion': completion }}
          aria-hidden="true"
        >
          <span>{completion}%</span>
        </div>
      </div>

      <p className="profile-completion__desc">
        {isComplete
          ? '프로필이 완성되었습니다. 맞춤 추천 정확도가 높아집니다.'
          : '프로필을 작성하면 더 정확한 추천을 받을 수 있습니다.'}
      </p>

      {!isComplete && (
        <Link to="/profile" className="profile-completion__cta">
          프로필 작성하기 →
        </Link>
      )}
    </section>
  )
}
