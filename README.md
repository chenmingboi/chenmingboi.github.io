# chenmingboi.github.io

个人主页 Landing Page，基于 `Vite + React + Tailwind CSS + Framer Motion`

访问链接：https://chenmingboi.github.io/

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 3
- Framer Motion

## Project Structure

```text
src/
  components/
    About.jsx
    BlogPreview.jsx
    Contact.jsx
    Footer.jsx
    GlassPanel.jsx
    Hero.jsx
    Navbar.jsx
    Projects.jsx
    Reveal.jsx
  data/
    profile.js
  App.jsx
  index.css
  main.jsx
```

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Default preview URL:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Content Customization

All personal content is centralized in:

- `src/data/profile.js`

You can update:

- `identity` (name, role, subtitle, tagline, intro)
- `links` (blog, github, email, social)
- `projects`
- `posts`

## GitHub Pages Deployment

This repo includes GitHub Actions workflow:

- `.github/workflows/deploy.yml`

Deployment flow:

1. Push to `main`
2. Action builds with `npm ci && npm run build`
3. `dist` is deployed to GitHub Pages

GitHub settings checklist:

1. Go to `Settings -> Pages`
2. Set `Source` to `GitHub Actions`
3. Keep repository public or enable Pages for private repo plan

## Design Notes

- Dark, low-saturation palette with clear typography hierarchy
- Controlled Liquid Glass only on key modules (Navbar, Profile card, Projects, Contact)
- Motion is subtle and automatically reduced when user enables `prefers-reduced-motion`
- Single-page anchors: `home / about / projects / blog / contact`
