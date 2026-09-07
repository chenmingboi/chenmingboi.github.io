import assert from 'node:assert/strict'
import { readFile, writeFile, access } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'
import { profile } from '../src/data/profile.js'
import { validateProfile } from './validate-profile.mjs'
import { escapeHtml } from './seo.mjs'

validateProfile(profile)
const resourceLinks = [
  ...profile.links,
  ...profile.publications.flatMap((item) => item.links ?? []),
  ...profile.projects.flatMap((item) => item.links ?? []),
  ...profile.awards.filter((item) => item.href),
]
for (const { href } of resourceLinks) {
  if (href.startsWith('/')) {
    const path = resolve('dist', '.' + new URL(href, profile.site.url).pathname)
    await access(path)
  }
}

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const markup = renderToString(createElement(App))
  const template = await readFile('dist/index.html', 'utf8')
  assert(template.includes('<!--app-html-->'), 'Missing prerender marker in index.html')
  const html = template.replace('<!--app-html-->', () => markup)
  await writeFile('dist/index.html', html)
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${profile.site.url}sitemap.xml\n`)
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapeHtml(profile.site.url)}</loc><lastmod>${profile.site.updated}</lastmod></url></urlset>\n`)
  console.log('Prerendered the complete homepage; generated robots.txt and sitemap.xml from profile data.')
} finally {
  await server.close()
}
