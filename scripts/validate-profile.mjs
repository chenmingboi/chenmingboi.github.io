import assert from 'node:assert/strict'

const text = (value, field) => assert(typeof value === 'string' && value.trim(), `${field} must be non-empty text`)

function link(value, field) {
  text(value, field)
  assert(!/\s/.test(value), `${field} must not contain whitespace`)
  if (/^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) return
  if (/^\/(?!\/)/.test(value) && value.length > 1 && !value.includes('#')) return
  const url = new URL(value)
  assert(url.protocol === 'https:' && !url.username && !url.password, `${field} must use HTTPS, mailto, or a local /path`)
}

function links(items, field) {
  assert(Array.isArray(items), `${field} must be an array`)
  const labels = new Set()
  for (const item of items) {
    text(item.label, `${field}.label`)
    assert(!labels.has(item.label), `${field} labels must be unique`)
    labels.add(item.label)
    link(item.href, `${field}.href`)
    if (item.kind !== undefined) {
      assert(item.kind === 'profile' && item.href.startsWith('https://'), `${field}.kind must be profile with an HTTPS URL`)
    }
  }
}

export function validateProfile(data) {
  for (const key of ['name', 'initials', 'subtitle']) text(data.identity[key], `identity.${key}`)
  for (const key of ['title', 'description', 'url', 'updated']) text(data.site[key], `site.${key}`)
  const canonical = new URL(data.site.url)
  assert(canonical.protocol === 'https:' && canonical.pathname === '/' && !canonical.search && !canonical.hash && !canonical.username && !canonical.password, 'site.url must be an HTTPS origin with a trailing slash')
  assert(data.site.url === canonical.origin + '/', 'site.url must end in /')
  assert(/^\d{4}-\d{2}-\d{2}$/.test(data.site.updated) && new Date(data.site.updated).toISOString().slice(0, 10) === data.site.updated, 'site.updated must be a valid YYYY-MM-DD date')
  for (const key of ['about', 'researchInterests']) {
    assert(Array.isArray(data[key]), `${key} must be an array`)
    data[key].forEach((value) => text(value, key))
  }
  links(data.links, 'links')
  for (const collection of ['publications', 'projects', 'awards']) {
    assert(Array.isArray(data[collection]), `${collection} must be an array`)
    const ids = new Set()
    for (const item of data[collection]) {
      text(item.id, `${collection}.id`)
      assert(!ids.has(item.id), `${collection} IDs must be unique`)
      ids.add(item.id)
      text(collection === 'projects' ? item.name : item.title, `${collection}.title/name`)
      if (collection !== 'projects') assert(typeof item.year === 'string' && /^\d{4}$/.test(item.year), `${collection}.year must be a four-digit string`)
      if (collection === 'publications') {
        text(item.venue, 'publication.venue')
        assert(Array.isArray(item.authors) && item.authors.length > 0, 'publication.authors must not be empty')
        item.authors.forEach((author) => text(author.name, 'author.name'))
      }
      if (collection === 'projects') {
        text(item.summary, 'project.summary')
        if (item.stack !== undefined) {
          assert(Array.isArray(item.stack), 'project.stack must be an array')
          item.stack.forEach((value) => text(value, 'project.stack'))
        }
      }
      if (item.links !== undefined) links(item.links, `${collection}.links`)
      if (item.href !== undefined) link(item.href, `${collection}.href`)
      for (const key of ['status', 'highlight', 'summary', 'bibtex', 'role', 'issuer', 'description']) {
        if (item[key] !== undefined) text(item[key], `${collection}.${key}`)
      }
    }
  }
}
