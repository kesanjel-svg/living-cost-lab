import { useState } from 'react'
import Section from '../../../components/ui/Section'
import SupportFinderOptionGroup from './SupportFinderOptionGroup'
import SupportFinderResultCard from './SupportFinderResultCard'
import { profileToSupportFinderDefaults } from '../../profile/services/profileService'
import supportPrograms, {
  ageOptions,
  householdOptions,
  incomeOptions,
} from '../../../data/supportPrograms'
import { filterSupportPrograms } from '../services/supportService'
import './SupportFinder.css'

function getInitialFinderState() {
  return profileToSupportFinderDefaults()
}

export default function SupportFinder({
  variant = 'default',
  showPageHeader = true,
}) {
  const defaults = getInitialFinderState()
  const [age, setAge] = useState(defaults.age)
  const [household, setHousehold] = useState(defaults.household)
  const [income, setIncome] = useState(defaults.income)
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')

  const sectionVariant = variant === 'compact' ? 'default' : 'default'
  const className = [
    'support-finder',
    variant === 'full' ? 'support-finder--full' : '',
    variant === 'compact' ? 'support-finder--compact' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!age || !household || !income) {
      setError('나이대, 가구 형태, 소득 수준을 모두 선택해주세요.')
      setResults(null)
      return
    }

    setError('')
    setResults(
      filterSupportPrograms({ age, household, income }, supportPrograms),
    )
  }

  return (
    <Section id="support-finder" variant={sectionVariant} className={className}>
      {showPageHeader && (
        <div className="support-finder__header">
          <h2 className="support-finder__title">내가 받을 수 있는 지원금 찾기</h2>
          <p className="support-finder__intro">
            나이, 가구 형태, 소득 수준을 선택하면 받을 가능성이 있는 지원금을
            간단히 확인할 수 있습니다. 생활비 프로필이 저장되어 있으면 기본값으로
            채워집니다.
          </p>
        </div>
      )}

      <form className="support-finder__form" onSubmit={handleSubmit}>
        <SupportFinderOptionGroup
          legend="나이대"
          name="age"
          options={ageOptions}
          value={age}
          onChange={setAge}
        />
        <SupportFinderOptionGroup
          legend="가구 형태"
          name="household"
          options={householdOptions}
          value={household}
          onChange={setHousehold}
        />
        <SupportFinderOptionGroup
          legend="소득 수준"
          name="income"
          options={incomeOptions}
          value={income}
          onChange={setIncome}
        />

        {error && <p className="support-finder__error">{error}</p>}

        <button type="submit" className="support-finder__submit">
          지원금 확인하기
        </button>
      </form>

      {results !== null && (
        <div className="support-finder__results">
          {results.length > 0 ? (
            <>
              <p className="support-finder__results-count">
                추천 지원금 {results.length}건
              </p>
              <div className="support-finder__results-grid">
                {results.map((program, index) => (
                  <SupportFinderResultCard
                    key={program.id}
                    program={program}
                    index={index}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="support-finder__empty">
              조건에 맞는 지원금을 찾지 못했습니다.
            </p>
          )}
        </div>
      )}
    </Section>
  )
}
