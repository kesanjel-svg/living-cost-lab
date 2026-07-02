import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
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

export default defineConfig({
  plugins: [react(), brandingHtmlPlugin()],
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
    modulePreload: { polyfill: false },
  },
})
