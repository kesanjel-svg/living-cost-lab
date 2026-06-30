export function getSupportPath(program) {
  return `/support/${program.slug ?? program.id}`
}

export function buildSupportBreadcrumbs(program) {
  return [
    { name: '홈', path: '/' },
    { name: '지원금 찾기', path: '/support' },
    { name: program.title, path: getSupportPath(program) },
  ]
}

export function buildSupportTocSections(program) {
  const sections = [
    { id: 'eligibility', label: '신청자격' },
    { id: 'benefit', label: '지원내용' },
    { id: 'apply', label: '신청방법' },
  ]

  if (program.documents?.length) {
    sections.push({ id: 'documents', label: '제출서류' })
  }

  if (program.faq?.length) {
    sections.push({ id: 'faq', label: '자주 묻는 질문' })
  }

  return sections
}

export function buildSupportSeoConfig(program) {
  const path = getSupportPath(program)
  const description = `${program.summary} ${program.description}`.slice(0, 160)

  return {
    title: `${program.title} 신청방법 | 생활비연구소`,
    description,
    keywords: program.tags?.join(', '),
    canonical: path,
    type: 'article',
    breadcrumbs: buildSupportBreadcrumbs(program),
    faq: program.faq ?? [],
    articles: [
      {
        headline: `${program.title} 신청방법`,
        description,
        path,
        datePublished: '2026-01-01',
        dateModified: '2026-06-27',
      },
    ],
  }
}

export function buildSupportCtaActions() {
  return [
    {
      label: '내 조건 지원금 찾기',
      to: '/support',
      variant: 'primary',
    },
    {
      label: 'AI 생활비 진단',
      to: '/cost-report',
      variant: 'secondary',
    },
    {
      label: '생활비 프로필 작성',
      to: '/profile',
      variant: 'secondary',
    },
    {
      label: '다른 지원금 검색',
      to: '/support',
      variant: 'ghost',
    },
  ]
}
