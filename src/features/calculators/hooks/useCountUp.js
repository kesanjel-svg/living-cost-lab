import { useEffect, useRef, useState } from 'react'

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * 결과 금액 카운트업 애니메이션.
 * 첫 계산은 0부터, 재계산은 직전 값부터 목표값까지 올라간다.
 * prefers-reduced-motion 환경에서는 애니메이션 없이 즉시 표시.
 */
export default function useCountUp(target, duration = 700) {
  const [value, setValue] = useState(0)
  const fromRef = useRef(0)
  const frameRef = useRef(null)

  useEffect(() => {
    if (typeof target !== 'number' || Number.isNaN(target)) {
      return undefined
    }

    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || duration <= 0) {
      fromRef.current = target
      setValue(target)
      return undefined
    }

    const from = fromRef.current
    const startTime = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const current = from + (target - from) * easeOutCubic(progress)
      setValue(current)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = target
      }
    }

    frameRef.current = requestAnimationFrame(tick)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      fromRef.current = target
    }
  }, [target, duration])

  return Math.round(value)
}
