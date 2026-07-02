import { useState } from 'react'
import { buildCostReportShareUrl } from '../services/costReportShareService'
import './ShareResultButton.css'

export default function ShareResultButton({ input }) {
  const [status, setStatus] = useState('idle')

  const handleShare = async () => {
    const url = buildCostReportShareUrl(input)

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'AI 생활비 진단 결과 | 생활비연구소',
          text: '내 생활비 진단 결과를 확인해보세요.',
          url,
        })
        setStatus('shared')
      } else {
        await navigator.clipboard.writeText(url)
        setStatus('copied')
      }
    } catch {
      try {
        await navigator.clipboard.writeText(url)
        setStatus('copied')
      } catch {
        setStatus('error')
      }
    }

    window.setTimeout(() => setStatus('idle'), 2500)
  }

  const label =
    status === 'copied'
      ? '링크가 복사되었습니다'
      : status === 'shared'
        ? '공유되었습니다'
        : status === 'error'
          ? '공유에 실패했습니다'
          : '결과 공유하기'

  return (
    <button
      type="button"
      className="share-result-button"
      onClick={handleShare}
      aria-live="polite"
    >
      <span aria-hidden="true">🔗</span>
      {label}
    </button>
  )
}
