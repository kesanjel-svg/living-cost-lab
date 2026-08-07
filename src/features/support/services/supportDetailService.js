import { formatPageTitle } from '../../../constants/branding'

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
    title: formatPageTitle(`${program.title} 신청방법`),
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

/**
 * 신청방법 단계별 안내를 프로그램 자체의 필드(신청대상·소득기준·서류·신청방법·
 * 담당기관)에서 구성한다. 새로운 사실을 추가하지 않고 이미 검증된 JSON 필드를
 * 절차 형태로 재구성하는 것이므로 별도 출처 확인 없이 전체 프로그램에 적용 가능하다.
 */
export function buildApplicationSteps(program) {
  const steps = []

  steps.push({
    title: '신청 자격 확인',
    description: program.income
      ? `${program.target} (소득 기준: ${program.income})`
      : program.target,
  })

  if (program.documents?.length) {
    steps.push({
      title: '필요 서류 준비',
      description: `${program.documents.join(', ')}을(를) 미리 준비합니다.`,
    })
  }

  steps.push({
    title: '신청하기',
    description: program.applyPeriod
      ? `${program.applyMethod} (신청 기간: ${program.applyPeriod})`
      : program.applyMethod,
  })

  if (program.organization) {
    steps.push({
      title: '문의 및 확인',
      description: `자세한 사항은 담당 기관(${program.organization})에 문의하거나 공식 홈페이지에서 확인할 수 있습니다.`,
    })
  }

  return steps
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
