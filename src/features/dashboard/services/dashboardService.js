import { blogPosts } from '../../../data/blogPosts'
import { calculatorRegistry } from '../../../constants/calculators'
import { generateCostReport } from '../../../engines/costReportEngine'
import { getBlogPath } from '../../blog/services/blogService'
import {
  calculateProfileCompletion,
  hasMinimumProfile,
  profileToCostReportInput,
} from '../../profile/services/profileService'
import { getSavedProfile } from '../../../shared/storage/profileStorage'
import {
  getRecentSupports,
  getSavedCostReport,
} from '../../../shared/storage/userActivityStorage'

const FALLBACK_INPUT = {
  age: '30s',
  householdSize: '2',
  monthlyIncome: '200to300',
  region: 'metro',
  housingType: 'monthly',
}

function getDefaultInput() {
  const profile = getSavedProfile()
  if (hasMinimumProfile(profile)) {
    return profileToCostReportInput(profile)
  }
  return FALLBACK_INPUT
}

function getReportSnapshot() {
  const saved = getSavedCostReport()
  if (saved?.report) {
    return { report: saved.report, fromDiagnosis: true }
  }

  return {
    report: generateCostReport(getDefaultInput()),
    fromDiagnosis: false,
    fromProfile: hasMinimumProfile(getSavedProfile()),
  }
}

function mapBlogPost(post) {
  return {
    id: post.slug,
    title: post.title,
    summary: post.summary,
    link: getBlogPath(post.slug),
  }
}

function getDefaultBlogs(limit = 3) {
  return [...blogPosts]
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
    .slice(0, limit)
    .map(mapBlogPost)
}

function getDefaultCalculators(limit = 3) {
  return Object.entries(calculatorRegistry)
    .slice(0, limit)
    .map(([id, calculator]) => ({
      id,
      title: calculator.title,
      link: calculator.href,
      ...(calculator.available ? {} : { status: '준비중' }),
    }))
}

export function getDashboardData() {
  const snapshot = getReportSnapshot()
  const { report } = snapshot
  const recentSupports = getRecentSupports()
  const profile = getSavedProfile()
  const profileCompletion = calculateProfileCompletion(profile)
  const topSupport = report.supports[0]
  const topCalculator = report.calculators[0]

  return {
    fromDiagnosis: snapshot.fromDiagnosis,
    fromProfile: snapshot.fromProfile ?? false,
    profileCompletion,
    stats: {
      supportCount: report.supports.length,
      supportTitle: topSupport?.title ?? '지원금 확인',
      supportLink: topSupport?.link ?? '/support',
      score: report.score,
      estimatedMonthlySavings: report.estimatedMonthlySavings,
      calculatorCount: report.calculators.length,
      calculatorTitle: topCalculator?.title ?? '전기요금 계산기',
      calculatorLink: topCalculator?.link ?? '/calculators/electric',
    },
    recommendedSupports: report.supports,
    recommendedCalculators:
      report.calculators.length > 0
        ? report.calculators
        : getDefaultCalculators(),
    recommendedBlogs:
      report.blogs.length > 0 ? report.blogs : getDefaultBlogs(),
    recentSupports,
    summary: report.summary,
  }
}
