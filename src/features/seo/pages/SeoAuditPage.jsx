import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { runSeoAudit } from '../services/seoAuditService'
import '../../../pages/Page.css'
import './SeoAuditPage.css'

const STATUS_ICON = {
  PASS: '✔',
  WARNING: '⚠',
  ERROR: '❌',
}

function StatusBadge({ status }) {
  const className = `seo-audit__badge seo-audit__badge--${status.toLowerCase()}`
  return <span className={className}>{status}</span>
}

function MetaRow({ label, exists }) {
  return (
    <div className="seo-audit__row">
      <span className="seo-audit__row-label">{label}</span>
      <span className="seo-audit__row-value">
        <StatusBadge status={exists ? 'PASS' : 'ERROR'} />
      </span>
    </div>
  )
}

export default function SeoAuditPage() {
  const [audit, setAudit] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    runSeoAudit()
      .then(setAudit)
      .catch(() => setError('SEO 점검 중 오류가 발생했습니다.'))
      .finally(() => setLoading(false))
  }, [])

  if (!import.meta.env.DEV) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="page page--seo-audit">
      <div className="page__header">
        <span className="seo-audit__dev-badge">DEV ONLY</span>
        <h1 className="page__title">SEO Audit</h1>
        <p className="page__description">
          Search Console 등록 전 robots, sitemap, 메타 태그를 자동 점검합니다.
        </p>
      </div>

      <div className="page__content">
        {loading && <p className="seo-audit__loading">SEO 점검 중...</p>}
        {error && <p className="seo-audit__error">{error}</p>}

        {audit && (
          <>
            <section className="seo-audit__score-card">
              <p className="seo-audit__score-label">SEO Score</p>
              <p className="seo-audit__score-value">{audit.score.total}</p>
              <div className="seo-audit__score-breakdown">
                {Object.entries(audit.score.breakdown).map(([key, value]) => (
                  <span key={key} className="seo-audit__score-item">
                    {key}: {value}
                  </span>
                ))}
              </div>
            </section>

            <div className="seo-audit__grid">
              <article className="seo-audit__card">
                <h2 className="seo-audit__card-title">① robots.txt</h2>
                <div className="seo-audit__row">
                  <span className="seo-audit__row-label">HTTP 상태</span>
                  <span className="seo-audit__row-value">
                    {audit.robots.status}{' '}
                    <StatusBadge
                      status={audit.robots.ok ? 'PASS' : 'ERROR'}
                    />
                  </span>
                </div>
                <div className="seo-audit__row">
                  <span className="seo-audit__row-label">User-agent</span>
                  <span className="seo-audit__row-value">
                    <StatusBadge
                      status={audit.robots.hasUserAgent ? 'PASS' : 'ERROR'}
                    />
                  </span>
                </div>
                <div className="seo-audit__row">
                  <span className="seo-audit__row-label">Sitemap</span>
                  <span className="seo-audit__row-value">
                    <StatusBadge
                      status={audit.robots.hasSitemap ? 'PASS' : 'ERROR'}
                    />
                  </span>
                </div>
                {audit.robots.sitemapUrl && (
                  <div className="seo-audit__row">
                    <span className="seo-audit__row-label">Sitemap URL</span>
                    <span className="seo-audit__row-value">
                      {audit.robots.sitemapUrl}
                    </span>
                  </div>
                )}
              </article>

              <article className="seo-audit__card">
                <h2 className="seo-audit__card-title">② sitemap.xml</h2>
                <div className="seo-audit__row">
                  <span className="seo-audit__row-label">HTTP 상태</span>
                  <span className="seo-audit__row-value">
                    {audit.sitemap.status}{' '}
                    <StatusBadge
                      status={audit.sitemap.ok ? 'PASS' : 'ERROR'}
                    />
                  </span>
                </div>
                <div className="seo-audit__row">
                  <span className="seo-audit__row-label">XML 형식</span>
                  <span className="seo-audit__row-value">
                    <StatusBadge
                      status={audit.sitemap.isXml ? 'PASS' : 'ERROR'}
                    />
                  </span>
                </div>
                <div className="seo-audit__row">
                  <span className="seo-audit__row-label">URL 개수</span>
                  <span className="seo-audit__row-value">
                    {audit.sitemap.urlCount}개
                  </span>
                </div>
                {audit.sitemap.urls.length > 0 && (
                  <ul className="seo-audit__url-list">
                    {audit.sitemap.urls.map((url) => (
                      <li key={url}>{url}</li>
                    ))}
                  </ul>
                )}
              </article>

              <article className="seo-audit__card">
                <h2 className="seo-audit__card-title">③ Home 페이지 head</h2>
                <MetaRow label="title" exists={Boolean(audit.home.meta.title)} />
                <MetaRow
                  label="description"
                  exists={Boolean(audit.home.meta.description)}
                />
                <MetaRow
                  label="canonical"
                  exists={Boolean(audit.home.meta.canonical)}
                />
                <MetaRow
                  label="google-site-verification"
                  exists={Boolean(audit.home.meta.googleSiteVerification)}
                />
                <MetaRow
                  label="og:title"
                  exists={Boolean(audit.home.meta.ogTitle)}
                />
                <MetaRow
                  label="og:description"
                  exists={Boolean(audit.home.meta.ogDescription)}
                />
                <MetaRow
                  label="og:image"
                  exists={Boolean(audit.home.meta.ogImage)}
                />
                <MetaRow
                  label="twitter:card"
                  exists={Boolean(audit.home.meta.twitterCard)}
                />
              </article>

              <article className="seo-audit__card">
                <h2 className="seo-audit__card-title">
                  ④ Search Console Friendly
                </h2>
                {[
                  ['robots', audit.friendly.robots],
                  ['sitemap', audit.friendly.sitemap],
                  ['canonical', audit.friendly.canonical],
                  ['meta description', audit.friendly.metaDescription],
                  ['title length', audit.friendly.titleLength.status],
                  ['description length', audit.friendly.descriptionLength.status],
                  ['OpenGraph', audit.friendly.openGraph],
                  ['Twitter', audit.friendly.twitter],
                  ['Schema', audit.friendly.schema],
                ].map(([label, status]) => (
                  <div key={label} className="seo-audit__row">
                    <span className="seo-audit__row-label">{label}</span>
                    <span className="seo-audit__row-value">
                      <StatusBadge status={status} />
                    </span>
                  </div>
                ))}
              </article>
            </div>

            <article className="seo-audit__card">
              <h2 className="seo-audit__card-title">체크 결과</h2>
              <ul className="seo-audit__list">
                {audit.checks.map((check) => (
                  <li key={check.message} className="seo-audit__list-item">
                    <span
                      className={`seo-audit__icon--${check.status.toLowerCase()}`}
                      aria-hidden="true"
                    >
                      {STATUS_ICON[check.status]}
                    </span>
                    {check.message}
                  </li>
                ))}
              </ul>
            </article>

            <article className="seo-audit__card" style={{ marginTop: '1rem' }}>
              <h2 className="seo-audit__card-title">개선 제안</h2>
              <ul className="seo-audit__suggestions">
                {audit.suggestions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </>
        )}
      </div>
    </div>
  )
}
