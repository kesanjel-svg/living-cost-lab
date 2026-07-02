import EmptyState from '../../../shared/ui/EmptyState'

export default function SearchEmptyState({
  title = '검색 결과가 없습니다',
  description = '다른 키워드로 검색하거나 인기 검색어를 눌러보세요.',
  children,
}) {
  return (
    <EmptyState icon="⌕" title={title} description={description}>
      {children}
    </EmptyState>
  )
}
