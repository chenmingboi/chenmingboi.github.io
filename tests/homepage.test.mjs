import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'
import { profile, getNavigation } from '../src/data/profile.js'
import { validateProfile } from '../scripts/validate-profile.mjs'
import { seoTags } from '../scripts/seo.mjs'
import { populatedProfile } from './fixtures.mjs'

let server
let App
before(async () => {
  server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  App = (await server.ssrLoadModule('/src/App.jsx')).default
})
after(async () => { await server?.close() })

test('confirmed content and optional academic entries validate', () => {
  validateProfile(profile)
  validateProfile(populatedProfile)
})

test('invalid and placeholder links cannot be published', () => {
  for (const href of ['#', 'javascript:alert(1)', '//example.com', 'http://example.com', 'https://user:password@example.com']) {
    assert.throws(() => validateProfile({ ...profile, links: [{ label: 'Test', href }] }))
  }
})

test('missing authors, duplicate IDs, and invalid dates fail validation', () => {
  assert.throws(() => validateProfile({ ...populatedProfile, publications: [{ ...populatedProfile.publications[0], authors: [] }] }))
  assert.throws(() => validateProfile({ ...populatedProfile, publications: Array(2).fill(populatedProfile.publications[0]) }))
  assert.throws(() => validateProfile({ ...profile, site: { ...profile.site, updated: '2026-02-30' } }))
})

test('every navigation target exists exactly once in both sparse and populated pages', () => {
  for (const data of [profile, populatedProfile]) {
    const html = renderToString(createElement(App, { data }))
    for (const { id } of getNavigation(data)) assert.equal(html.split(`id="${id}"`).length - 1, 1)
    assert.equal((html.match(/<h1>/g) ?? []).length, 1)
    assert.equal((html.match(/<main /g) ?? []).length, 1)
    assert.match(html, /href="#main-content"/)
    assert.doesNotMatch(html, /opacity:0|href="#"/)
  }
})

test('empty optional sections stay hidden, with readable publication and contact content', () => {
  const html = renderToString(createElement(App))
  assert.doesNotMatch(html, /id="awards"|id="projects"|after confirmation|Test Researcher/)
  assert.match(html, /No publications listed yet/)
  assert.match(html, /mailto:2161936486@qq.com/)
})

test('publications sort by year, preserve author order, and expose native BibTeX disclosure', () => {
  const html = renderToString(createElement(App, { data: populatedProfile }))
  assert.ok(html.indexOf('test-long') === -1) // Internal identifiers are not presentation text.
  assert.ok(html.indexOf('dateTime="2026"') < html.indexOf('dateTime="2024"'))
  assert.match(html, /Test Coauthor<\/span><span>, <strong>Test Researcher<\/strong>/)
  assert.match(html, /<details class="citation"><summary>BibTeX/)
})

test('metadata uses the same confirmed identity and safely escapes markup', () => {
  const tags = seoTags(profile)
  const json = JSON.parse(tags.find((tag) => tag.attrs?.type === 'application/ld+json').children)
  assert.equal(json.mainEntity.name, profile.identity.name)
  assert.equal(json.url, profile.site.url)
  assert.deepEqual(json.mainEntity.sameAs, [])
  const hostile = seoTags({ ...profile, identity: { ...profile.identity, name: '</script><script>alert(1)</script>' } })
  assert.doesNotMatch(hostile.find((tag) => tag.attrs?.type === 'application/ld+json').children, /<script|<\/script/)
})
