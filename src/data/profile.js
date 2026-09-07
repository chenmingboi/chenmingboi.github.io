/**
 * Public, confirmed information only. Empty collections are intentional.
 * Publications: { id, year, title, authors: [{ name, self? }], venue,
 *   status?, highlight?, summary?, links?: [{ label, href }], bibtex? }
 * Projects: { id, name, summary, role?, stack?: string[], links?: [{ label, href }] }
 * Awards: { id, year, title, issuer?, description?, href? }
 * Links: { label, href }; omit resources until their URLs are confirmed.
 */
export const profile = {
  site: {
    url: 'https://mingbochen.github.io/',
    title: 'Mingbo Chen | Computer Systems & LLM Systems',
    description: 'Mingbo Chen at NJU. Research interests in computer systems and LLM systems. Academic homepage and contact information.',
    updated: '2026-09-07',
  },
  identity: {
    name: 'Mingbo Chen',
    initials: 'MC',
    subtitle: 'NJU',
  },
  about: ['I am Mingbo Chen at NJU.'],
  // Broad directions supplied by the owner; no specific projects or results are implied.
  researchInterests: ['Computer systems', 'LLM systems'],
  links: [
    { label: 'Email', href: 'mailto:2161936486@qq.com' },
  ],
  publications: [],
  projects: [],
  awards: [],
}

export const getNavigation = (data) => [
  { id: 'about', label: 'About' },
  { id: 'publications', label: 'Publications' },
  ...(data.projects.length ? [{ id: 'projects', label: 'Projects' }] : []),
  ...(data.awards.length ? [{ id: 'awards', label: 'Awards' }] : []),
  { id: 'contact', label: 'Contact' },
]
