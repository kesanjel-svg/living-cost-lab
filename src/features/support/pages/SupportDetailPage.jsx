import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { blogRegistry } from '../../../constants/blogs'
import { calculatorRegistry } from '../../../constants/calculators'
import supportPrograms from '../../../data/supportPrograms'
import {
  getSimilarSupports,
  getSupportById,
} from '../services/supportService'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'
import './SupportDetailPage.css'

function DetailSection({ title, children }) {
  if (!children) {
    return null
  }

  return (
    <section className="support-detail__section">
      <h2 className="support-detail__section-title">{title}</h2>
      <div className="support-detail__section-body">{children}</div>
    </section>
  )
}

function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0)

  if (!items?.length) {
    return null
  }

  return (
    <ul className="support-detail__faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <li key={item.question} className="support-detail__faq-item">
            <button
              type="button"
              className="support-detail__faq-trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span className="support-detail__faq-q">{item.question}</span>
              <span className="support-detail__faq-icon" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <p className="support-detail__faq-a">{item.answer}</p>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default function SupportDetailPage() {
  const { id } = useParams()
  const program = getSupportById(id, supportPrograms)
  const similarPrograms = program
    ? getSimilarSupports(program, supportPrograms)
    : []

  const relatedCalculators = (program?.relatedCalculator ?? [])
    .map((calculatorId) => ({
      id: calculatorId,
      ...calculatorRegistry[calculatorId],
    }))
    .filter((item) => item.title)

  const relatedBlogs = (program?.relatedBlogs ?? [])
    .map((blogId) => ({
      id: blogId,
      ...blogRegistry[blogId],
    }))
    .filter((item) => item.title)

  if (!program) {
    return (
      <div className="page page--detail">
        <Seo
          title="지원금을 찾을 수 없습니다 | 생활비연구소"
          description="요청하신 지원금 정보를 찾을 수 없습니다."
          canonical={`/support/${id}`}
        />
        <div className="page__content">
          <Link to="/support" className="page__back">
            ← 지원금 찾기
          </Link>
          <p className="page__empty">지원금을 찾을 수 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page page--detail">
      <Seo
        title={`${program.title} 신청방법 | 생활비연구소`}
        description={program.summary}
        keywords={program.tags?.join(', ')}
        canonical={`/support/${program.id}`}
      />
      <div className="page__content">
        <Link to="/support" className="page__back">
          ← 지원금 찾기
        </Link>

        <article className="support-detail">
          <header className="support-detail__header">
            <span className="support-detail__category">{program.category}</span>
            <h1 className="support-detail__title">{program.title}</h1>
            <p className="support-detail__summary">{program.summary}</p>
            <p className="support-detail__desc">{program.description}</p>

            {program.tags?.length > 0 && (
              <div className="support-detail__tags">
                {program.tags.map((tag) => (
                  <span key={tag} className="support-detail__tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <DetailSection title="지원 대상">
            <p className="support-detail__text">{program.target}</p>
          </DetailSection>

          <DetailSection title="소득 기준">
            <p className="support-detail__text">{program.income}</p>
          </DetailSection>

          <DetailSection title="지원 내용">
            <p className="support-detail__text">{program.benefit}</p>
          </DetailSection>

          <DetailSection title="신청 기간">
            <p className="support-detail__text">{program.period}</p>
          </DetailSection>

          <DetailSection title="신청 방법">
            <p className="support-detail__text">{program.method}</p>
          </DetailSection>

          <DetailSection title="담당 기관">
            <p className="support-detail__text">{program.organization}</p>
          </DetailSection>

          {program.homepage && (
            <a
              href={program.homepage}
              target="_blank"
              rel="noreferrer"
              className="support-detail__link"
            >
              공식 홈페이지 바로가기 →
            </a>
          )}

          {relatedCalculators.length > 0 && (
            <DetailSection title="관련 계산기">
              <ul className="support-detail__calc-list">
                {relatedCalculators.map((calculator) => (
                  <li key={calculator.id} className="support-detail__calc-item">
                    {calculator.available ? (
                      <Link
                        to={calculator.href}
                        className="support-detail__calc-link"
                      >
                        {calculator.title}
                        <span aria-hidden="true">→</span>
                      </Link>
                    ) : (
                      <span className="support-detail__calc-pending">
                        {calculator.title}
                        <span className="support-detail__badge">준비중</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </DetailSection>
          )}

          {relatedBlogs.length > 0 && (
            <DetailSection title="관련 생활비 정보">
              <div className="support-detail__blog-grid">
                {relatedBlogs.map((blog) =>
                  blog.available ? (
                    <Link
                      key={blog.id}
                      to={blog.href}
                      className="support-detail__blog-card"
                    >
                      <h3 className="support-detail__blog-title">{blog.title}</h3>
                      <span className="support-detail__blog-link">
                        읽어보기
                        <span aria-hidden="true">→</span>
                      </span>
                    </Link>
                  ) : (
                    <article
                      key={blog.id}
                      className="support-detail__blog-card support-detail__blog-card--pending"
                    >
                      <h3 className="support-detail__blog-title">{blog.title}</h3>
                      <span className="support-detail__badge">준비중</span>
                    </article>
                  ),
                )}
              </div>
            </DetailSection>
          )}

          {program.faq?.length > 0 && (
            <DetailSection title="FAQ">
              <FaqAccordion items={program.faq} />
            </DetailSection>
          )}

          {similarPrograms.length > 0 && (
            <DetailSection title="비슷한 지원금">
              <div className="support-detail__similar-grid">
                {similarPrograms.map((item) => (
                  <article key={item.id} className="support-detail__similar-card">
                    <span className="support-detail__similar-category">
                      {item.category}
                    </span>
                    <h3 className="support-detail__similar-title">{item.title}</h3>
                    <p className="support-detail__similar-desc">{item.summary}</p>
                    <Link
                      to={`/support/${item.id}`}
                      className="support-detail__similar-btn"
                    >
                      자세히 보기
                      <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                ))}
              </div>
            </DetailSection>
          )}

          <p className="support-detail__notice">
            상세 신청 절차와 필요 서류는 공식 기관 안내를 확인해주세요. 본
            페이지는 MVP 버전으로, 더 자세한 기능은 준비 중입니다.
          </p>
        </article>
      </div>
    </div>
  )
}
