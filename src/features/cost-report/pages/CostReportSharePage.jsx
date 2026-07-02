import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { generateCostReport } from '../../../engines/costReportEngine'
import Seo from '../../../shared/seo/Seo'
import CostReportDetailView from '../components/CostReportDetailView'
import {
  decodeCostReportShare,
  encodeCostReportShare,
} from '../services/costReportShareService'
import './CostReportSharePage.css'

export default function CostReportSharePage() {
  const { token } = useParams()

  const payload = useMemo(() => {
    const input = decodeCostReportShare(token)
    if (!input) {
      return null
    }

    const report = generateCostReport(input)
    return { input, report }
  }, [token])

  if (!payload) {
    return (
      <div className="cost-report-share page">
        <div className="cost-report-share__inner">
          <h1 className="page__title">공유된 진단 결과를 찾을 수 없습니다</h1>
          <p className="page__description">
            링크가 만료되었거나 잘못된 주소입니다. 새로 진단을 받아보세요.
          </p>
          <Link to="/cost-report" className="cost-report-share__cta">
            AI 생활비 진단 시작하기
          </Link>
        </div>
      </div>
    )
  }

  const { input, report } = payload
  const breadcrumbs = [
    { name: '홈', path: '/' },
    { name: 'AI 생활비 진단', path: '/cost-report' },
    { name: '공유 결과', path: `/cost-report/share/${token}` },
  ]

  return (
    <div className="cost-report-share page">
      <Seo
        title={`생활비 ${report.score}점 진단 결과 | 생활비연구소`}
        description={`생활비 점수 ${report.score}점, 예상 절약 월 ${report.estimatedMonthlySavings.toLocaleString('ko-KR')}원. 지원금·계산기·체크리스트 추천 결과입니다.`}
        keywords="AI 생활비 진단, 생활비 점수, 지원금 추천"
        canonical={`/cost-report/share/${token}`}
        breadcrumbs={breadcrumbs}
      />

      <div className="cost-report-share__inner">
        <header className="cost-report-share__header">
          <p className="cost-report-share__badge">공유된 진단 결과</p>
          <h1 className="page__title">AI 생활비 진단 결과</h1>
          <p className="page__description">
            입력 조건을 바탕으로 생성된 생활비 점수와 맞춤 추천입니다.
          </p>
          <Link to="/cost-report" className="cost-report-share__cta">
            나도 진단받기 →
          </Link>
        </header>

        <CostReportDetailView
          report={report}
          input={input}
          shareToken={encodeCostReportShare(input)}
          showShare
        />
      </div>
    </div>
  )
}
