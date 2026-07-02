import clusters from '../../../data/topics/clusters.json'
import { blogPosts } from '../../../data/blogPosts'
import supportPrograms from '../../../data/supportPrograms'
import { calculatorRegistry } from '../../../constants/calculators'
import { getBlogPath } from '../../blog/services/blogService'
import { getProgramsByCategory } from '../../../data/support/index.js'

function getClusterEntries() {
  return Object.values(clusters).sort((a, b) => a.order - b.order)
}

export function getAllTopics() {
  return getClusterEntries()
}

export function getTopicBySlug(slug) {
  return clusters[slug] ?? null
}

function blogMatchesTopic(post, topic) {
  if (topic.blogSlugs?.includes(post.slug)) {
    return true
  }
  return topic.blogCategories?.includes(post.category)
}

function mapBlogItem(post) {
  return {
    id: `blog-${post.slug}`,
    type: 'blog',
    title: post.title,
    summary: post.summary,
    href: getBlogPath(post.slug),
    badge: post.category,
    date: post.datePublished,
  }
}

function mapSupportItem(program) {
  return {
    id: `support-${program.id}`,
    type: 'support',
    title: program.title,
    summary: program.summary,
    href: `/support/${program.slug ?? program.id}`,
    badge: program.category,
  }
}

function mapCalculatorItem(id) {
  const calculator = calculatorRegistry[id]
  if (!calculator) {
    return null
  }

  return {
    id: `calculator-${id}`,
    type: 'calculator',
    title: calculator.title,
    summary: calculator.available ? '바로 계산하기' : '준비 중',
    href: calculator.href,
    badge: '계산기',
    available: calculator.available,
  }
}

function getTopicBlogs(topic) {
  return blogPosts.filter((post) => blogMatchesTopic(post, topic))
}

function getTopicSupports(topic) {
  const byCategory = getProgramsByCategory(topic.slug)
  const byFeatured = (topic.featuredSupportIds ?? [])
    .map((id) => supportPrograms.find((p) => p.id === id))
    .filter(Boolean)

  const merged = [...byFeatured, ...byCategory]
  return [...new Map(merged.map((p) => [p.id, p])).values()]
}

function buildFeaturedContent(topic) {
  const items = []

  for (const id of topic.featuredSupportIds ?? []) {
    const program = supportPrograms.find((p) => p.id === id)
    if (program) {
      items.push(mapSupportItem(program))
    }
  }

  for (const slug of topic.featuredBlogSlugs ?? []) {
    const post = blogPosts.find((p) => p.slug === slug)
    if (post) {
      items.push(mapBlogItem(post))
    }
  }

  for (const id of topic.calculatorIds ?? []) {
    const calculator = mapCalculatorItem(id)
    if (calculator) {
      items.push(calculator)
    }
  }

  return items
}

function buildPopularContent(topic, featuredIds) {
  const supports = getTopicSupports(topic)
    .filter((p) => !featuredIds.has(`support-${p.id}`))
    .slice(0, 3)
    .map(mapSupportItem)

  const blogs = getTopicBlogs(topic)
    .filter((p) => !featuredIds.has(`blog-${p.slug}`))
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
    .slice(0, 3)
    .map(mapBlogItem)

  return [...supports, ...blogs].slice(0, 6)
}

function buildLatestContent(topic, usedIds) {
  return getTopicBlogs(topic)
    .filter((post) => !usedIds.has(`blog-${post.slug}`))
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
    .slice(0, 5)
    .map(mapBlogItem)
}

export function getTopicPath(slug) {
  return `/topics/${slug}`
}

export function buildTopicBreadcrumbs(topic) {
  return [
    { name: '홈', path: '/' },
    { name: '토픽', path: '/topics' },
    { name: topic.label, path: getTopicPath(topic.slug) },
  ]
}

export function getRelatedTopics(topic) {
  return (topic.relatedTopics ?? [])
    .map((slug) => clusters[slug])
    .filter(Boolean)
}

export function getTopicHubData(slug) {
  const topic = getTopicBySlug(slug)
  if (!topic) {
    return null
  }

  const featured = buildFeaturedContent(topic)
  const featuredIds = new Set(featured.map((item) => item.id))
  const popular = buildPopularContent(topic, featuredIds)
  const usedIds = new Set([
    ...featuredIds,
    ...popular.map((item) => item.id),
  ])
  const latest = buildLatestContent(topic, usedIds)
  const supports = getTopicSupports(topic).map(mapSupportItem)
  const relatedTopics = getRelatedTopics(topic)
  const blogCount = getTopicBlogs(topic).length

  return {
    topic,
    breadcrumbs: buildTopicBreadcrumbs(topic),
    featured,
    popular,
    latest,
    supports,
    relatedTopics,
    blogCount,
    clusterCount: featured.length + popular.length + latest.length + supports.length,
  }
}

export function getTopicsIndexData() {
  return getAllTopics().map((topic) => ({
    ...topic,
    href: getTopicPath(topic.slug),
    supportCount: getProgramsByCategory(topic.slug).length,
    blogCount: getTopicBlogs(topic).length,
  }))
}
