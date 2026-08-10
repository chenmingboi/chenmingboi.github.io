# MingboChen

个人主页 Landing Page，基于 `Vite + React + Tailwind CSS + Framer Motion`

## Online Website

[访问 MingboChen 个人主页](https://mingbochen.github.io/)

## 使用手册

[查看页面内容与模块修改说明](./使用手册.md)

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
    Awards.jsx
    BlogPreview.jsx
    Contact.jsx
    Footer.jsx
    GlassPanel.jsx
    Hero.jsx
    Navbar.jsx
    Projects.jsx
    Publications.jsx
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

- `identity` (name, initials, subtitle)
- `about`
- `links` (email)
- `publications`
- `awards`

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

- Light academic profile layout with clear typography hierarchy
- Professional publication metadata and resource-link treatment
- Motion is subtle and automatically reduced when user enables `prefers-reduced-motion`
- Single-page anchors: `home / about / publications / awards`
