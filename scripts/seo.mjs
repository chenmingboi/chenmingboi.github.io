export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character])

export function seoTags({ site, identity, researchInterests, links }) {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: site.url,
    dateModified: site.updated,
    mainEntity: {
      '@type': 'Person',
      name: identity.name,
      url: site.url,
      affiliation: { '@type': 'Organization', name: identity.subtitle },
      knowsAbout: researchInterests,
      sameAs: links.filter((link) => link.kind === 'profile').map((link) => link.href),
    },
  }

  return [
    { tag: 'title', children: escapeHtml(site.title) },
    { tag: 'meta', attrs: { name: 'description', content: site.description } },
    { tag: 'meta', attrs: { name: 'author', content: identity.name } },
    { tag: 'link', attrs: { rel: 'canonical', href: site.url } },
    ...Object.entries({ type: 'profile', title: site.title, description: site.description, url: site.url, site_name: identity.name }).map(([key, content]) => ({
      tag: 'meta', attrs: { property: `og:${key}`, content },
    })),
    ...Object.entries({ card: 'summary', title: site.title, description: site.description }).map(([key, content]) => ({
      tag: 'meta', attrs: { name: `twitter:${key}`, content },
    })),
    { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(person).replace(/</g, '\\u003c') },
  ].map((tag) => ({ ...tag, injectTo: 'head' }))
}
