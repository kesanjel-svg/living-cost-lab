import './Skeleton.css'

export default function Skeleton({
  width = '100%',
  height = '1rem',
  radius = 'var(--radius-md)',
  className = '',
  ...rest
}) {
  return (
    <span
      className={`skeleton ${className}`.trim()}
      style={{ width, height, borderRadius: radius }}
      aria-hidden="true"
      {...rest}
    />
  )
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`skeleton-text ${className}`.trim()} aria-hidden="true">
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          height="0.875rem"
          width={index === lines - 1 ? '72%' : '100%'}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`skeleton-card ${className}`.trim()} aria-hidden="true">
      <Skeleton height="1.25rem" width="40%" />
      <SkeletonText lines={2} />
      <Skeleton height="2.5rem" width="120px" radius="999px" />
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="page-skeleton" aria-busy="true" aria-label="페이지 로딩 중">
      <Skeleton height="2rem" width="min(320px, 70%)" className="page-skeleton__title" />
      <Skeleton height="1rem" width="min(480px, 90%)" />
      <div className="page-skeleton__grid">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  )
}

export function SearchResultsSkeleton() {
  return (
    <div className="search-skeleton" aria-busy="true" aria-label="검색 중">
      <Skeleton height="1rem" width="120px" />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}
