import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { calculatorRegistry } from '../../../constants/calculators'
import supportPrograms from '../../../data/supportPrograms'
import ContentBreadcrumb from '../../../shared/content/ContentBreadcrumb'
import ContentCtaSection from '../../../shared/content/ContentCtaSection'
import ContentToc from '../../../shared/content/ContentToc'
import DetailSection from '../../../shared/content/DetailSection'
import FaqAccordion from '../../../shared/content/FaqAccordion'
import RelatedBenefits from '../../../shared/content/RelatedBenefits'
import RelatedBlogs from '../../../shared/content/RelatedBlogs'
import RelatedCalculators from '../../../shared/content/RelatedCalculators'
import Seo from '../../../shared/seo/Seo'
import { EmptyState } from '../../../shared/ui'
import { addRecentSupportView } from '../../../shared/storage/userActivityStorage'
import SupportDetailHeader from '../components/detail/SupportDetailHeader'
import SupportDetailSeo from '../components/detail/SupportDetailSeo'
import {
  buildSupportBreadcrumbs,
  buildSupportCtaActions,
  buildSupportTocSections,
  getSupportPath,
} from '../services/supportDetailService'
import {
  getSimilarSupports,
  getSupportById,
  resolveRelatedPosts,
} from '../services/supportService'
import '../../../pages/Page.css'
import './SupportDetailPage.css'

function resolveCalculators(program) {
  return (program?.relatedCalculators ?? [])
    .map((calculatorId) => ({
      id: calculatorId,
      ...calculatorRegistry[calculatorId],
    }))
    .filter((item) => item.title)
}

export default function SupportDetailPage() {
  const { id } = useParams()
  const program = getSupportById(id, supportPrograms)

  const similarPrograms = useMemo(
    () => (program ? getSimilarSupports(program, supportPrograms) : []),
    [program],
  )

  const relatedPosts = useMemo(
    () => (program ? resolveRelatedPosts(program.relatedPosts) : []),
    [program],
  )

  const relatedCalculators = useMemo(
    () => (program ? resolveCalculators(program) : []),
    [program],
  )

  const tocSections = useMemo(
    () => (program ? buildSupportTocSections(program) : []),
    [program],
  )

  const breadcrumbs = useMemo(
    () => (program ? buildSupportBreadcrumbs(program) : []),
    [program],
  )

  const ctaActions = useMemo(() => buildSupportCtaActions(), [])

  useEffect(() => {
    if (program) {
      addRecentSupportView(program)
    }
  }, [program])

  if (!program) {
    return (
      <div className="page page--detail">
        <Seo
          title="지원금을 찾을 수 없습니다"
          description="요청하신 지원금 정보를 찾을 수 없습니다."
          canonical={`/support/${id}`}
          noindex
          breadcrumbs={[
            { name: '홈', path: '/' },
            { name: '지원금 찾기', path: '/support' },
          ]}
        />
        <div className="page__content support-detail-page">
          <ContentBreadcrumb
            items={[
              { name: '홈', path: '/' },
              { name: '지원금 찾기', path: '/support' },
            ]}
          />
          <EmptyState
            title="지원금을 찾을 수 없습니다"
            description="주소가 변경되었거나 삭제된 지원금일 수 있습니다."
            actionLabel="지원금 찾기"
            actionTo="/support"
            actionVariant="soft"
          />
          <Link to="/support" className="page__back">
            ← 지원금 찾기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page page--detail">
      <SupportDetailSeo program={program} />

      <div className="page__content support-detail-page">
        <ContentBreadcrumb items={breadcrumbs} />

        <div className="support-detail-page__layout">
          <article className="support-detail">
            <SupportDetailHeader program={program} />

            <ContentToc sections={tocSections} />

            <DetailSection id="eligibility" title="신청자격">
              <p className="support-detail-page__text">{program.target}</p>
              {program.income && (
                <p className="support-detail-page__subtext">
                  <strong>소득 기준</strong> {program.income}
                </p>
              )}
            </DetailSection>

            <DetailSection id="benefit" title="지원내용">
              <p className="support-detail-page__text">{program.benefit}</p>
            </DetailSection>

            <DetailSection id="apply" title="신청방법">
              <p className="support-detail-page__text">{program.applyMethod}</p>
              {program.applyPeriod && (
                <p className="support-detail-page__subtext">
                  <strong>신청 기간</strong> {program.applyPeriod}
                </p>
              )}
              {program.organization && (
                <p className="support-detail-page__subtext">
                  <strong>담당 기관</strong> {program.organization}
                </p>
              )}
              {program.website && (
                <a
                  href={program.website}
                  target="_blank"
                  rel="noreferrer"
                  className="support-detail-page__external-link"
                >
                  공식 홈페이지 바로가기 →
                </a>
              )}
            </DetailSection>

            {program.documents?.length > 0 && (
              <DetailSection id="documents" title="제출서류">
                <ul className="support-detail-page__doc-list">
                  {program.documents.map((document) => (
                    <li key={document}>{document}</li>
                  ))}
                </ul>
              </DetailSection>
            )}

            {program.faq?.length > 0 && (
              <DetailSection id="faq" title="자주 묻는 질문">
                <FaqAccordion items={program.faq} />
              </DetailSection>
            )}

            <RelatedBenefits
              title="관련 지원금"
              intro={`${program.category} 카테고리 및 유사 조건의 다른 지원금입니다.`}
              programs={similarPrograms}
            />

            <RelatedBlogs posts={relatedPosts} />

            <RelatedCalculators calculators={relatedCalculators} />

            <ContentCtaSection
              title="맞춤 추천 받기"
              description="프로필을 작성하면 더 정확한 추천을 받을 수 있습니다."
              actions={ctaActions}
            />

            <p className="support-detail-page__notice">
              상세 신청 절차와 필요 서류는 공식 기관 안내를 확인해주세요. 본
              페이지의 canonical URL은{' '}
              <span className="support-detail-page__canonical">
                {getSupportPath(program)}
              </span>
              입니다.
            </p>
          </article>
        </div>
      </div>
    </div>
  )
}
