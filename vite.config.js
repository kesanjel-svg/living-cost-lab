import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  BRAND,
  BRAND_DEFAULT_TITLE,
  BRAND_DESCRIPTION,
  BRAND_KEYWORDS,
  BRAND_URL,
  getBrandLogoUrl,
  getBrandOgImageUrl,
} from './src/constants/branding.js'
import { buildHomeSchemaGraph } from './src/shared/seo/schemaBuilders.js'
import {
  buildAdsTxt,
  buildOgMetaManifest,
  buildRobotsTxt,
  buildSitemapXml,
} from './src/shared/seo/buildSeoAssets.js'

function brandingHtmlPlugin() {
  return {
    name: 'branding-html',
    transformIndexHtml(html) {
      const schemaGraph = JSON.stringify(buildHomeSchemaGraph(BRAND_DESCRIPTION))

      return html
        .replaceAll('__BRAND_DEFAULT_TITLE__', BRAND_DEFAULT_TITLE)
        .replaceAll('__BRAND_DESCRIPTION__', BRAND_DESCRIPTION)
        .replaceAll('__BRAND_KEYWORDS__', BRAND_KEYWORDS)
        .replaceAll('__BRAND_URL__', BRAND_URL)
        .replaceAll('__BRAND_THEME_COLOR__', BRAND.themeColor)
        .replaceAll('__BRAND_NAME__', BRAND.name)
        .replaceAll('__BRAND_LOGO_URL__', getBrandLogoUrl())
        .replaceAll('__BRAND_OG_IMAGE_URL__', getBrandOgImageUrl())
        .replaceAll('__BRAND_HOME_SCHEMA__', schemaGraph)
    },
  }
}

function brandingManifestPlugin() {
  return {
    name: 'branding-manifest',
    generateBundle() {
      const manifest = {
        name: BRAND.name,
        short_name: BRAND.manifestShortName,
        description: BRAND.manifestDescription,
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: BRAND.themeColor,
        lang: 'ko-KR',
        icons: [
          {
            src: BRAND.logoPath,
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      }

      this.emitFile({
        type: 'asset',
        fileName: 'site.webmanifest',
        source: JSON.stringify(manifest, null, 2),
      })
    },
  }
}

function seoAssetsPlugin(env) {
  let outDir = 'dist'

  return {
    name: 'seo-assets',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const publisherId = env.VITE_ADSENSE_PUBLISHER_ID?.trim() || ''

      writeFileSync(join(outDir, 'sitemap.xml'), buildSitemapXml(), 'utf8')
      writeFileSync(join(outDir, 'robots.txt'), buildRobotsTxt(), 'utf8')
      writeFileSync(join(outDir, 'ads.txt'), buildAdsTxt(publisherId), 'utf8')
      writeFileSync(
        join(outDir, 'og-meta.json'),
        JSON.stringify(buildOgMetaManifest()),
        'utf8',
      )
    },
  }
}

export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // SSR 번들(프리렌더용)에는 SEO 자산 생성/청크 분리가 불필요 — 클라이언트 빌드에만 적용
  if (isSsrBuild) {
    return {
      plugins: [react()],
    }
  }

  return {
    plugins: [
      react(),
      brandingHtmlPlugin(),
      brandingManifestPlugin(),
      seoAssetsPlugin(env),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
              return 'vendor-react'
            }
            if (id.includes('node_modules/react-router')) {
              return 'vendor-router'
            }
            if (id.includes('node_modules/react-helmet-async')) {
              return 'vendor-helmet'
            }
          },
        },
      },
      cssMinify: true,
      // CSS 압축기가 미디어쿼리를 최신 range 문법(width<=900px)으로 바꾸면
      // 구형 모바일 브라우저(Safari 16.3 이하 등)에서 반응형 분기 전체가 무시됨 —
      // 헤더 겹침 버그의 재발 방지를 위해 호환 문법(max-width)으로 출력 고정
      cssTarget: ['chrome87', 'safari14', 'firefox78', 'edge88'],
      modulePreload: { polyfill: false },
    },
  }
})
