import { useMemo } from 'react'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import { CtaButton } from '../../../shared/ui'
import DashboardQuickActions from '../components/DashboardQuickActions'
import DashboardSection from '../components/DashboardSection'
import DashboardStatCards from '../components/DashboardStatCards'
import ProfileCompletionCard from '../components/ProfileCompletionCard'
import { getDashboardData } from '../services/dashboardService'
import './DashboardPage.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '생활비 대시보드', path: '/dashboard' },
]

export default function DashboardPage() {
  const data = useMemo(() => getDashboardData(), [])

  const recentItems = data.recentSupports.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    link: `/support/${item.slug}`,
  }))

  return (
    <div className="dashboard-page page">
      <Seo
        title={formatPageTitle('생활비 대시보드')}
        description="추천 지원금, 생활비 점수, 절약 가능 금액, 계산기·블로그 추천을 한눈에 확인하는 생활비 대시보드입니다."
        keywords="생활비 대시보드, 지원금 추천, 생활비 점수, 절약 금액"
        canonical="/dashboard"
        breadcrumbs={BREADCRUMBS}
        noindex
      />

      <div className="dashboard-page__header">
        <h1 className="dashboard-page__title">생활비 대시보드</h1>
        <p className="dashboard-page__desc">
          {data.fromDiagnosis
            ? 'AI 생활비 진단 결과를 바탕으로 맞춤 정보를 보여드립니다.'
            : data.fromProfile
              ? '저장된 프로필을 바탕으로 맞춤 정보를 보여드립니다.'
              : '프로필을 작성하거나 AI 생활비 진단을 실행하면 더 정확한 정보를 확인할 수 있습니다.'}
        </p>
        {!data.fromDiagnosis && !data.fromProfile && (
          <CtaButton
            to="/cost-report"
            variant="soft"
            size="sm"
            className="dashboard-page__cta"
            showArrow
          >
            AI 생활비 진단 시작하기
          </CtaButton>
        )}
      </div>

      <div className="dashboard-page__content">
        <ProfileCompletionCard completion={data.profileCompletion} />

        <DashboardStatCards stats={data.stats} />

        <DashboardQuickActions />

        <div className="dashboard-page__sections">
          <DashboardSection
            title="최근 본 지원금"
            items={recentItems}
            emptyMessage="아직 본 지원금이 없습니다."
            emptyLinkLabel="지원금 찾기"
            emptyLinkTo="/support"
            moreLink="/support"
          />
          <DashboardSection
            title="추천 블로그"
            items={data.recommendedBlogs}
            moreLink="/blog"
          />
          <DashboardSection
            title="추천 계산기"
            items={data.recommendedCalculators}
            moreLink="/calculators"
          />
        </div>

        {data.recommendedSupports.length > 0 && (
          <DashboardSection
            title="현재 추천 지원금"
            items={data.recommendedSupports}
            moreLink="/support"
            moreLabel="전체 보기"
          />
        )}

        <p className="dashboard-page__note">{data.summary}</p>
      </div>
    </div>
  )
}
