import { profile } from '../src/data/profile.js'

// Synthetic QA data only. This file is never imported by the production app.
export const populatedProfile = {
  ...profile,
  identity: { name: 'Test Researcher', initials: 'QA', subtitle: 'Test Institution' },
  about: ['Synthetic layout fixture; this is not a personal biography.'],
  links: [{ label: 'Email', href: 'mailto:researcher@example.com' }],
  publications: [
    {
      id: 'test-older', year: '2024', title: 'Older test publication',
      authors: [{ name: 'Test Researcher', self: true }], venue: 'Test venue',
    },
    {
      id: 'test-long', year: '2026',
      title: 'Synthetic publication with a long title for checking responsive academic bibliographies and resource links',
      authors: [{ name: 'Test Coauthor' }, { name: 'Test Researcher', self: true }],
      venue: 'Test venue', status: 'Preprint', highlight: 'Test annotation',
      summary: 'Synthetic summary for layout verification only.',
      links: [{ label: 'Paper', href: 'https://example.com/paper' }, { label: 'Code', href: 'https://example.com/code' }],
      bibtex: '@misc{layout-test,\n  title = {Synthetic layout fixture},\n  note = {' + 'long-unbroken-content'.repeat(12) + '}\n}',
    },
  ],
  projects: [{ id: 'test-project', name: 'Synthetic project', summary: 'Layout verification only.', links: [] }],
  awards: [{ id: 'test-award', year: '2025', title: 'Synthetic award', issuer: 'Test Institution' }],
}
