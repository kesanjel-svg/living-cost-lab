import { useState } from 'react'
import SupportFinderOptionGroup from '../../support/components/SupportFinderOptionGroup'
import {
  ageOptions,
  householdSizeOptions,
  housingTypeOptions,
  monthlyIncomeOptions,
  regionOptions,
} from '../data/costReportOptions'
import './CostReportForm.css'

const INITIAL = {
  age: '',
  householdSize: '',
  monthlyIncome: '',
  region: '',
  housingType: '',
}

export default function CostReportForm({ onSubmit }) {
  const [form, setForm] = useState(INITIAL)
  const [error, setError] = useState('')

  const setField = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const missing = Object.entries(form).find(([, value]) => !value)
    if (missing) {
      setError('모든 항목을 선택해주세요.')
      return
    }

    setError('')
    onSubmit(form)
  }

  return (
    <form className="cost-report-form" onSubmit={handleSubmit}>
      <SupportFinderOptionGroup
        legend="나이"
        name="age"
        options={ageOptions}
        value={form.age}
        onChange={setField('age')}
      />
      <SupportFinderOptionGroup
        legend="가구원수"
        name="householdSize"
        options={householdSizeOptions}
        value={form.householdSize}
        onChange={setField('householdSize')}
      />
      <SupportFinderOptionGroup
        legend="월소득"
        name="monthlyIncome"
        options={monthlyIncomeOptions}
        value={form.monthlyIncome}
        onChange={setField('monthlyIncome')}
      />
      <SupportFinderOptionGroup
        legend="거주지역"
        name="region"
        options={regionOptions}
        value={form.region}
        onChange={setField('region')}
      />
      <SupportFinderOptionGroup
        legend="주거형태"
        name="housingType"
        options={housingTypeOptions}
        value={form.housingType}
        onChange={setField('housingType')}
      />

      {error && <p className="cost-report-form__error">{error}</p>}

      <button type="submit" className="cost-report-form__submit">
        AI 생활비 진단 받기
      </button>
    </form>
  )
}
