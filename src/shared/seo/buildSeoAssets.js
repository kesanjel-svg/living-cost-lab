import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  BRAND_URL,
  formatPageTitle,
  getBrandOgImageUrl,
} from '../../constants/branding.js'
import { blogPosts } from '../../data/blogPosts.js'
import clusters from '../../data/topics/clusters.json'

export const STATIC_PATHS = [
  '/',
  '/support',
  '/cost-report',
  '/calculators',
  '/calculators/electric',
  '/calculators/pension',
  '/calculators/health',
  '/calculators/gas',
  '/calculators/net-salary',
  '/calculators/severance',
  '/calculators/unemployment',
  '/calculators/annual-leave',
  '/calculators/parental-leave',
  '/blog',
  '/topics',
  '/search',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
]

const ROBOTS_DISALLOW = ['/dashboard', '/profile', '/cost-report/share/']

const moduleDir = dirname(fileURLToPath(import.meta.url))
const supportRoot = join(moduleDir, '../../data/support')

function loadSupportPrograms() {
  const programs = []

  for (const category of readdirSync(supportRoot, { withFileTypes: true })) {
    if (!category.isDirectory()) {
      continue
    }

    const categoryPath = join(supportRoot, category.name)
    for (const file of readdirSync(categoryPath, { withFileTypes: true })) {
      if (!file.isFile() || !file.name.endsWith('.json')) {
        continue
      }

      const raw = JSON.parse(
        readFileSync(join(categoryPath, file.name), 'utf8'),
      )
      programs.push(raw)
    }
  }

  return programs
}

function loadSupportSlugs() {
  return loadSupportPrograms().map((program) => program.slug ?? program.id)
}

function toAbsolute(path) {
  return `${BRAND_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function collectSitemapPaths() {
  const paths = new Set(STATIC_PATHS)

  Object.keys(clusters).forEach((slug) => {
    paths.add(`/topics/${slug}`)
  })

  loadSupportSlugs().forEach((slug) => {
    paths.add(`/support/${slug}`)
  })

  blogPosts.forEach((post) => {
    paths.add(`/blog/${post.slug}`)
  })

  return [...paths].sort()
}

export function buildSitemapXml() {
  const paths = collectSitemapPaths()
  const today = new Date().toISOString().slice(0, 10)

  const urls = paths
    .map(
      (path) => `  <url>
    <loc>${toAbsolute(path)}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

export function buildRobotsTxt() {
  const disallowRules = ROBOTS_DISALLOW.map((path) => `Disallow: ${path}`).join('\n')

  return `User-agent: *
Allow: /
${disallowRules}

Sitemap: ${toAbsolute('/sitemap.xml')}
`
}

/**
 * Route -> OG meta manifest for the Edge Middleware social-crawler bypass.
 * Only covers content routes that are actually shared (blog/support/topics) —
 * static pages already get correct default meta from index.html.
 */
export function buildOgMetaManifest() {
  const image = getBrandOgImageUrl()
  const manifest = {}

  blogPosts.forEach((post) => {
    manifest[`/blog/${post.slug}`] = {
      title: formatPageTitle(post.title),
      description: post.summary,
      image,
      type: 'article',
    }
  })

  loadSupportPrograms().forEach((program) => {
    const slug = program.slug ?? program.id
    manifest[`/support/${slug}`] = {
      title: formatPageTitle(program.title),
      description: program.summary,
      image,
      type: 'article',
    }
  })

  Object.values(clusters).forEach((topic) => {
    manifest[`/topics/${topic.slug}`] = {
      title: formatPageTitle(topic.title),
      description: topic.description,
      image,
      type: 'website',
    }
  })

  return manifest
}

export function buildAdsTxt(publisherId) {
  if (!publisherId) {
    return `# Google AdSense ads.txt
# Set VITE_ADSENSE_PUBLISHER_ID (e.g. pub-XXXXXXXXXXXXXXXX) before launch.
`
  }

  const normalized = publisherId.startsWith('pub-') ? publisherId : `pub-${publisherId}`

  return `google.com, ${normalized}, DIRECT, f08c47fec0942fa0
`
}
