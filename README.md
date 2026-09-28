# The Digital Ziggurat

A standalone Vite React public site for Sergio's cinematic proof-of-work monument.

## Local setup

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The generated `dist/` folder is compatible with Cloudflare Pages.

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- Framework preset: Vite

## Editing content

Project cards, ziggurat tier mapping, and build log entries live in:

```text
src/data/projects.js
```

The Shoot the Moon case study is a second Vite page entry at `/work/shoot-the-moon/`:

```text
work/shoot-the-moon/index.html      page title, canonical and social tags
src/case-study.jsx                  page sections
src/data/shootTheMoonCaseStudy.js   copy, with the commit its facts were verified against
src/case-study.css                  page-only styles
```

Components shared by both pages live in `src/shared.jsx`.

Public AI-readable files live in:

```text
public/ai.json
public/projects.json
public/llms.txt
```
