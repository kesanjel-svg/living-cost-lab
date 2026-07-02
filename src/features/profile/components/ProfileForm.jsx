import { useState } from 'react'
import { ANALYTICS_EVENTS, trackEvent } from '../../../shared/analytics'
import SupportFinderOptionGroup from '../../support/components/SupportFinderOptionGroup'
import {
  ageOptions,
  childCountOptions,
  genderOptions,
  householdSizeOptions,
  housingTypeOptions,
  monthlyIncomeOptions,
  regionOptions,
  yesNoOptions,
} from '../data/profileOptions'
import { EMPTY_PROFILE } from '../../../shared/storage/profileStorage'
import './ProfileForm.css'

export default function ProfileForm({ initialProfile = EMPTY_PROFILE, onSubmit }) {
  const [form, setForm] = useState({ ...EMPTY_PROFILE, ...initialProfile })
  const [error, setError] = useState('')
  const [savedMessage, setSavedMessage] = useState('')

  const setField = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setSavedMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const required = [
      'age',
      'householdSize',
      'region',
      'housingType',
      'monthlyIncome',
      'childCount',
      'isPregnant',
      'hasDisability',
      'isVeteran',
    ]

    const missing = required.find((field) => !form[field])
    if (missing) {
      setError('필수 항목을 모두 선택해주세요. (성별은 선택 사항입니다)')
      return
    }

    setError('')
    onSubmit(form)
    trackEvent(ANALYTICS_EVENTS.PROFILE_SAVE)
    setSavedMessage('프로필이 저장되었습니다.')
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <SupportFinderOptionGroup
        legend="나이"
        name="profile-age"
        options={ageOptions}
        value={form.age}
        onChange={setField('age')}
      />
      <SupportFinderOptionGroup
        legend="성별 (선택)"
        name="profile-gender"
        options={genderOptions}
        value={form.gender}
        onChange={setField('gender')}
      />
      <SupportFinderOptionGroup
        legend="가구원수"
        name="profile-householdSize"
        options={householdSizeOptions}
        value={form.householdSize}
        onChange={setField('householdSize')}
      />
      <SupportFinderOptionGroup
        legend="거주지역"
        name="profile-region"
        options={regionOptions}
        value={form.region}
        onChange={setField('region')}
      />
      <SupportFinderOptionGroup
        legend="주거형태"
        name="profile-housingType"
        options={housingTypeOptions}
        value={form.housingType}
        onChange={setField('housingType')}
      />
      <SupportFinderOptionGroup
        legend="월소득"
        name="profile-monthlyIncome"
        options={monthlyIncomeOptions}
        value={form.monthlyIncome}
        onChange={setField('monthlyIncome')}
      />
      <SupportFinderOptionGroup
        legend="자녀수"
        name="profile-childCount"
        options={childCountOptions}
        value={form.childCount}
        onChange={setField('childCount')}
      />
      <SupportFinderOptionGroup
        legend="임신 여부"
        name="profile-isPregnant"
        options={yesNoOptions}
        value={form.isPregnant}
        onChange={setField('isPregnant')}
      />
      <SupportFinderOptionGroup
        legend="장애 여부"
        name="profile-hasDisability"
        options={yesNoOptions}
        value={form.hasDisability}
        onChange={setField('hasDisability')}
      />
      <SupportFinderOptionGroup
        legend="국가유공자 여부"
        name="profile-isVeteran"
        options={yesNoOptions}
        value={form.isVeteran}
        onChange={setField('isVeteran')}
      />

      {error && <p className="profile-form__error">{error}</p>}
      {savedMessage && <p className="profile-form__success">{savedMessage}</p>}

      <button type="submit" className="profile-form__submit">
        프로필 저장하기
      </button>
    </form>
  )
}
