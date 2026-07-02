import { useMemo, useState } from 'react'
import { formatPageTitle } from '../../../constants/branding'
import { ANALYTICS_EVENTS, trackEvent } from '../../../shared/analytics'
import { generateCostReport } from '../../../engines/costReportEngine'
import {
  calculateProfileCompletion,
  profileToCostReportInput,
} from '../../profile/services/profileService'
import { getSavedProfile } from '../../../shared/storage/profileStorage'
import { saveCostReport } from '../../../shared/storage/userActivityStorage'
import { encodeCostReportShare } from '../services/costReportShareService'
import Seo from '../../../shared/seo/Seo'
import { CtaButton } from '../../../shared/ui'
import CostReportForm from '../components/CostReportForm'
import CostReportDetailView from '../components/CostReportDetailView'
import './CostReportPage.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: 'AI 생활비 진단', path: '/cost-report' },
]

export default function CostReportPage() {
  const [report, setReport] = useState(null)
  const [input, setInput] = useState(null)
  const profileCompletion = useMemo(
    () => calculateProfileCompletion(getSavedProfile()),
    [],
  )

  const shareToken = useMemo(
    () => (input ? encodeCostReportShare(input) : null),
    [input],
  )

  const handleSubmit = (formInput) => {
    const merged = { ...profileToCostReportInput(getSavedProfile()), ...formInput }
    const nextReport = generateCostReport(merged)
    saveCostReport({ input: merged, report: nextReport })
    trackEvent(ANALYTICS_EVENTS.COST_REPORT_COMPLETE, {
      score: nextReport.score,
    })
    setInput(merged)
    setReport(nextReport)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="cost-report-page page">
      <Seo
        title={formatPageTitle('AI 생활비 진단')}
        description="나이, 가구원수, 월소득, 거주지역, 주거형태를 입력하면 생활비 점수, 항목별 분석, 절약 예상 금액, 지원금·계산기·블로그 추천과 실행 체크리스트를 확인할 수 있습니다."
        keywords="AI 생활비 진단, 생활비 점수, 정부지원금 추천, 생활비 절약"
        canonical="/cost-report"
        breadcrumbs={BREADCRUMBS}
      />

      <div className="page__header cost-report-page__header">
        <h1 className="page__title">AI 생활비 진단</h1>
        <p className="page__description">
          간단한 정보를 입력하면 생활비 점수, 항목별 분석, 절약 예상 금액,
          맞춤 추천과 실행 체크리스트를 확인할 수 있습니다.
        </p>
        {profileCompletion < 100 && (
          <CtaButton
            to="/profile"
            variant="soft"
            size="sm"
            className="cost-report-page__profile-cta"
            showArrow
          >
            프로필을 작성하면 더 정확한 추천을 받을 수 있습니다
          </CtaButton>
        )}
      </div>

      <div className="cost-report-page__content">
        {!report && <CostReportForm onSubmit={handleSubmit} />}

        {report && (
          <CostReportDetailView
            report={report}
            input={input}
            shareToken={shareToken}
          />
        )}

        {report && (
          <div className="cost-report-page__retry">
            <button
              type="button"
              className="cost-report-page__retry-btn"
              onClick={() => {
                setReport(null)
                setInput(null)
              }}
            >
              다시 진단하기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
