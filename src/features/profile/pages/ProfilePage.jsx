import { useMemo, useState } from 'react'
import { getSavedProfile, saveProfile } from '../../../shared/storage/profileStorage'
import {
  calculateProfileCompletion,
} from '../services/profileService'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import ProfileForm from '../components/ProfileForm'
import './ProfilePage.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '생활비 프로필', path: '/profile' },
]

export default function ProfilePage() {
  const [profile, setProfile] = useState(() => getSavedProfile())
  const completion = useMemo(() => calculateProfileCompletion(profile), [profile])

  const handleSubmit = (nextProfile) => {
    saveProfile(nextProfile)
    setProfile(nextProfile)
  }

  return (
    <div className="profile-page page">
      <Seo
        title={formatPageTitle('생활비 프로필')}
        description="나이, 가구, 소득, 주거 정보를 입력해 AI 생활비 진단과 지원금 추천의 기본값으로 활용하세요. 로그인 없이 localStorage에 저장됩니다."
        keywords="생활비 프로필, 맞춤 추천, 지원금, AI 진단"
        canonical="/profile"
        breadcrumbs={BREADCRUMBS}
        noindex
      />

      <div className="profile-page__header">
        <h1 className="profile-page__title">생활비 프로필</h1>
        <p className="profile-page__desc">
          프로필을 작성하면 AI 생활비 진단, 지원금 추천, 계산기에서 더 정확한
          맞춤 정보를 받을 수 있습니다.
        </p>
        <div className="profile-page__completion">
          <span className="profile-page__completion-label">프로필 완성도</span>
          <strong className="profile-page__completion-value">{completion}%</strong>
        </div>
      </div>

      <div className="profile-page__content">
        <ProfileForm initialProfile={profile} onSubmit={handleSubmit} />
        <p className="profile-page__note">
          입력 정보는 브라우저 localStorage에만 저장되며, 서버로 전송되지
          않습니다.
        </p>
      </div>
    </div>
  )
}
