import DiagnosisCard from './DiagnosisCard'
import CategoryAnalysisSection from './CategoryAnalysisSection'
import SavingsBreakdown from './SavingsBreakdown'
import CostReportResults from './CostReportResults'
import ActionChecklist from './ActionChecklist'
import ShareResultButton from './ShareResultButton'
import './CostReportDetailView.css'

export default function CostReportDetailView({
  report,
  input,
  shareToken,
  showShare = true,
  showDisclaimer = true,
}) {
  return (
    <div className="cost-report-detail">
      {showShare && input && (
        <div className="cost-report-detail__actions">
          <ShareResultButton input={input} />
        </div>
      )}

      <DiagnosisCard report={report} />
      <CategoryAnalysisSection items={report.categoryAnalysis} />
      <SavingsBreakdown
        breakdown={report.savingsBreakdown}
        total={report.estimatedMonthlySavings}
      />
      <CostReportResults report={report} />
      <ActionChecklist checklist={report.checklist} shareToken={shareToken} />

      {showDisclaimer && (
        <p className="cost-report-detail__disclaimer">
          본 진단 결과는 예시 데이터와 규칙 기반 추천을 기반으로 하며, 실제
          지원금 수령 여부와 절약 금액은 개인 상황에 따라 달라질 수 있습니다.
          추천 엔진: {report.engineName ?? 'Rule-based Recommendation Engine'}
        </p>
      )}
    </div>
  )
}
