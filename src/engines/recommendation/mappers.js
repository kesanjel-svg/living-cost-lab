import { blogRegistry } from '../../constants/blogs'
import { calculatorRegistry } from '../../constants/calculators'

export function mapSupportProgram(program, exampleSaving = 20000) {
  return {
    id: program.id,
    title: program.title,
    link: `/support/${program.slug ?? program.id}`,
    summary: program.summary,
    exampleSaving,
  }
}

// 미제공(available: false) 항목은 null을 반환해 추천 목록에서 아예 제외한다.
// "준비중" 배지 노출은 애드센스 탐색(Navigation) 정책상 미완성 페이지 신호가 되므로 금지.
export function mapCalculator(id) {
  const calculator = calculatorRegistry[id]
  if (!calculator?.available) {
    return null
  }

  return {
    id,
    title: calculator.title,
    link: calculator.href,
  }
}

export function mapBlog(id) {
  const blog = blogRegistry[id]
  if (!blog?.available) {
    return null
  }

  return {
    id,
    title: blog.title,
    link: blog.href,
  }
}

export const EXAMPLE_SUPPORT_SAVINGS = {
  energy: 40000,
  work: 85000,
  'youth-rent': 150000,
  child: 60000,
  training: 30000,
  birth: 80000,
}
