import { Component } from 'react'
import { BRAND_NAME } from '../../constants/branding'
import { CtaButton, EmptyState } from '../ui'
import './ErrorFallback.css'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="error-fallback">
          <EmptyState
            icon="!"
            title="일시적인 오류가 발생했습니다"
            description={`${BRAND_NAME} 페이지를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.`}
          >
            <div className="error-fallback__actions">
              <CtaButton href="/" variant="solid" size="sm">
                홈으로 이동
              </CtaButton>
              <button
                type="button"
                className="error-fallback__retry"
                onClick={this.handleRetry}
              >
                다시 시도
              </button>
            </div>
          </EmptyState>
        </div>
      )
    }

    return this.props.children
  }
}
