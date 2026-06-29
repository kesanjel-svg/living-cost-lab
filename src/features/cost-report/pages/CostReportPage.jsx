import { useState } from 'react'
import { generateCostReport } from '../../../engines/costReportEngine'
import Seo from '../../../shared/seo/Seo'
import CostReportForm from '../components/CostReportForm'
import CostReportResults from '../components/CostReportResults'
import DiagnosisCard from '../components/DiagnosisCard'
import './CostReportPage.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: 'AI 생활비 진단', path: '/cost-report' },
]

export default function CostReportPage() {
  const [report, setReport] = useState(null)

  const handleSubmit = (input) => {
    setReport(generateCostReport(input))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="cost-report-page page">
      <Seo
        title="AI 생활비 진단 | 생활비연구소"
        description="나이, 가구원수, 월소득, 거주지역, 주거형태를 입력하면 맞춤 지원금·계산기·블로그 추천과 생활비 점수, 절약 가능 금액을 확인할 수 있습니다."
        keywords="AI 생활비 진단, 생활비 점검, 정부지원금 추천, 생활비 절약"
        canonical="/cost-report"
        breadcrumbs={BREADCRUMBS}
      />

      <div className="page__header cost-report-page__header">
        <h1 className="page__title">AI 생활비 진단</h1>
        <p className="page__description">
          간단한 정보를 입력하면 생활비 점수, 추천 지원금, 절약 가능 금액을
          확인할 수 있습니다.
        </p>
      </div>

      <div className="cost-report-page__content">
        <CostReportForm onSubmit={handleSubmit} />

        {report && (
          <div className="cost-report-page__results">
            <DiagnosisCard report={report} />
            <CostReportResults report={report} />
            <p className="cost-report-page__disclaimer">
              본 진단 결과는 MVP 예시 데이터를 기반으로 하며, 실제 지원금
              수령 여부와 절약 금액은 개인 상황에 따라 달라질 수 있습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
