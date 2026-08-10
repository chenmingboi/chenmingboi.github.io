export const profile = {
  identity: {
    name: 'Mingbo Chen',
    initials: 'MC',
    role: 'Software Engineering Student',
    subtitle: 'NJU',
    location: 'China',
    tagline: 'Designing calm, reliable, and production-ready web experiences.',
    intro:
      'I focus on frontend engineering, interaction design, and maintainable architecture. The goal is simple: build digital products that feel elegant and dependable from day one.',
  },
  about: [
    ''
  ],
  links: {
    blog: '#',
    github: 'https://github.com/chenmingboi',
    email: 'mailto:2161936486@qq.com',
    social: [
      { label: 'Bilibili', value: '@你的账号待补充', href: '#' },
      { label: 'CSDN', value: '技术文章更新中', href: '#' },
      { label: 'Juejin', value: '深度笔记整理中', href: '#' },
    ],
  },
  projects: [
    {
      name: 'Project Atlas',
      summary:
        'A modular dashboard starter focused on clean information hierarchy and predictable state management.',
      stack: ['React', 'Vite', 'Tailwind CSS'],
      href: '#',
    },
    {
      name: 'Pulse Notes',
      summary:
        'A writing-focused knowledge app that connects lightweight markdown editing with structured tagging.',
      stack: ['React', 'TypeScript', 'IndexedDB'],
      href: '#',
    },
    {
      name: 'Aero Deploy',
      summary:
        'A deployment companion UI for student projects, designed to reduce release friction and mistakes.',
      stack: ['Node.js', 'GitHub Actions', 'Docker'],
      href: '#',
    },
    {
      name: 'Signal Board',
      summary:
        'A compact activity board for tracking engineering milestones with glanceable progress visualization.',
      stack: ['React', 'Framer Motion', 'Chart.js'],
      href: '#',
    },
  ],
  posts: [
    {
      title: 'Building Product-Like Student Projects',
      date: '2026-04-12',
      excerpt:
        'How to move beyond assignment-style pages and ship interfaces with real product rhythm.',
      tags: ['Product Thinking', 'UI Engineering'],
      href: '#',
    },
    {
      title: 'Liquid Glass, But Practical',
      date: '2026-03-28',
      excerpt:
        'A practical guide to controlled glassmorphism in dark UIs without sacrificing readability or performance.',
      tags: ['Design System', 'Performance'],
      href: '#',
    },
    {
      title: 'From Components to Systems',
      date: '2026-03-03',
      excerpt:
        'Why consistency tokens and interaction constraints matter more than one-off visual effects.',
      tags: ['Frontend Architecture', 'DX'],
      href: '#',
    },
  ],
}

export const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]
