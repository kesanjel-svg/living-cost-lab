import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BRAND_URL } from '../../constants/branding.js'
import { blogPosts } from '../../data/blogPosts.js'
import clusters from '../../data/topics/clusters.json'

const STATIC_PATHS = [
  '/',
  '/support',
  '/cost-report',
  '/calculators',
  '/calculators/electric',
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

function loadSupportSlugs() {
  const slugs = []

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
      slugs.push(raw.slug ?? raw.id)
    }
  }

  return slugs
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
