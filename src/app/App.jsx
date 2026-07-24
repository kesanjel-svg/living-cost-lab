import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from '../pages/Home'
import { PageSkeleton } from '../shared/ui'
import ErrorBoundary from '../shared/error/ErrorBoundary'
import AnalyticsRouteListener from '../shared/analytics/AnalyticsRouteListener'
import './App.css'

const SupportPage = lazy(() => import('../features/support/pages/SupportPage'))
const SupportDetailPage = lazy(
  () => import('../features/support/pages/SupportDetailPage'),
)
const CalculatorsPage = lazy(() => import('../pages/CalculatorsPage'))
const ElectricCalculatorPage = lazy(
  () => import('../features/calculators/electric/ElectricCalculatorPage'),
)
const GasCalculatorPage = lazy(
  () => import('../features/calculators/gas/GasCalculatorPage'),
)
const PensionCalculatorPage = lazy(
  () => import('../features/calculators/pension/PensionCalculatorPage'),
)
const HealthInsuranceCalculatorPage = lazy(
  () => import('../features/calculators/health/HealthInsuranceCalculatorPage'),
)
const NetSalaryCalculatorPage = lazy(
  () => import('../features/calculators/netSalary/NetSalaryCalculatorPage'),
)
const SeveranceCalculatorPage = lazy(
  () => import('../features/calculators/severance/SeveranceCalculatorPage'),
)
const UnemploymentCalculatorPage = lazy(
  () => import('../features/calculators/unemployment/UnemploymentCalculatorPage'),
)
const AnnualLeaveCalculatorPage = lazy(
  () => import('../features/calculators/annualLeave/AnnualLeaveCalculatorPage'),
)
const ParentalLeaveCalculatorPage = lazy(
  () => import('../features/calculators/parentalLeave/ParentalLeaveCalculatorPage'),
)
const BlogPage = lazy(() => import('../pages/BlogPage'))
const BlogDetailPage = lazy(() => import('../pages/BlogDetailPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage'))
const TermsPage = lazy(() => import('../pages/TermsPage'))
const ContactPage = lazy(() => import('../pages/ContactPage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const SeoAuditPage = lazy(() => import('../features/seo/pages/SeoAuditPage'))
const CostReportPage = lazy(() => import('../features/cost-report/pages/CostReportPage'))
const CostReportSharePage = lazy(
  () => import('../features/cost-report/pages/CostReportSharePage'),
)
const DashboardPage = lazy(() => import('../features/dashboard/pages/DashboardPage'))
const ProfilePage = lazy(() => import('../features/profile/pages/ProfilePage'))
const SearchPage = lazy(() => import('../features/search/pages/SearchPage'))
const TopicsIndexPage = lazy(() => import('../features/topics/pages/TopicsIndexPage'))
const TopicHubPage = lazy(() => import('../features/topics/pages/TopicHubPage'))

function RouteFallback() {
  return <PageSkeleton />
}

function LazyRoute({ children }) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>
}

/**
 * 라우터를 제외한 앱 본체.
 * 클라이언트는 BrowserRouter(App), 프리렌더(entry-server)는 StaticRouter로 감싼다.
 */
export function AppShell() {
  return (
    <div className="app">
        <a href="#main-content" className="skip-link">
          본문 바로가기
        </a>
        <Header />
        <main id="main-content" className="app__main" tabIndex={-1}>
          <AnalyticsRouteListener />
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/support"
                element={
                  <LazyRoute>
                    <SupportPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/support/:id"
                element={
                  <LazyRoute>
                    <SupportDetailPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/cost-report"
                element={
                  <LazyRoute>
                    <CostReportPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/cost-report/share/:token"
                element={
                  <LazyRoute>
                    <CostReportSharePage />
                  </LazyRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <LazyRoute>
                    <DashboardPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <LazyRoute>
                    <ProfilePage />
                  </LazyRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <LazyRoute>
                    <SearchPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/topics"
                element={
                  <LazyRoute>
                    <TopicsIndexPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/topics/:slug"
                element={
                  <LazyRoute>
                    <TopicHubPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/calculators"
                element={
                  <LazyRoute>
                    <CalculatorsPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/calculators/electric"
                element={
                  <LazyRoute>
                    <ElectricCalculatorPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/calculators/gas"
                element={
                  <LazyRoute>
                    <GasCalculatorPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/calculators/pension"
                element={
                  <LazyRoute>
                    <PensionCalculatorPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/calculators/health"
                element={
                  <LazyRoute>
                    <HealthInsuranceCalculatorPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/calculators/net-salary"
                element={
                  <LazyRoute>
                    <NetSalaryCalculatorPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/calculators/severance"
                element={
                  <LazyRoute>
                    <SeveranceCalculatorPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/calculators/unemployment"
                element={
                  <LazyRoute>
                    <UnemploymentCalculatorPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/calculators/annual-leave"
                element={
                  <LazyRoute>
                    <AnnualLeaveCalculatorPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/calculators/parental-leave"
                element={
                  <LazyRoute>
                    <ParentalLeaveCalculatorPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/blog"
                element={
                  <LazyRoute>
                    <BlogPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/blog/:slug"
                element={
                  <LazyRoute>
                    <BlogDetailPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/privacy"
                element={
                  <LazyRoute>
                    <PrivacyPolicyPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/terms"
                element={
                  <LazyRoute>
                    <TermsPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/contact"
                element={
                  <LazyRoute>
                    <ContactPage />
                  </LazyRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <LazyRoute>
                    <AboutPage />
                  </LazyRoute>
                }
              />
              {import.meta.env.DEV && (
                <Route
                  path="/seo/audit"
                  element={
                    <LazyRoute>
                      <SeoAuditPage />
                    </LazyRoute>
                  }
                />
              )}
              <Route
                path="*"
                element={
                  <LazyRoute>
                    <NotFoundPage />
                  </LazyRoute>
                }
              />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
