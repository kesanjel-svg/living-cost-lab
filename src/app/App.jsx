import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from '../pages/Home'
import SupportPage from '../features/support/pages/SupportPage'
import SupportDetailPage from '../features/support/pages/SupportDetailPage'
import CalculatorsPage from '../pages/CalculatorsPage'
import ElectricCalculatorPage from '../features/calculators/electric/ElectricCalculatorPage'
import BlogPage from '../pages/BlogPage'
import BlogDetailPage from '../pages/BlogDetailPage'
import NotFoundPage from '../pages/NotFoundPage'
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage'
import TermsPage from '../pages/TermsPage'
import ContactPage from '../pages/ContactPage'
import AboutPage from '../pages/AboutPage'
import SeoAuditPage from '../features/seo/pages/SeoAuditPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/support/:id" element={<SupportDetailPage />} />
            <Route path="/calculators" element={<CalculatorsPage />} />
            <Route
              path="/calculators/electric"
              element={<ElectricCalculatorPage />}
            />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            {import.meta.env.DEV && (
              <Route path="/seo/audit" element={<SeoAuditPage />} />
            )}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
