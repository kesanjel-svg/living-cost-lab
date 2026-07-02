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

export function mapCalculator(id) {
  const calculator = calculatorRegistry[id]
  if (!calculator) {
    return null
  }

  return {
    id,
    title: calculator.title,
    link: calculator.href,
    ...(calculator.available ? {} : { status: '준비중' }),
  }
}

export function mapBlog(id) {
  const blog = blogRegistry[id]
  if (!blog) {
    return null
  }

  return {
    id,
    title: blog.title,
    link: blog.href,
    ...(blog.available ? {} : { status: '준비중' }),
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
