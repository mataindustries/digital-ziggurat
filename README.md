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

Public AI-readable files live in:

```text
public/ai.json
public/projects.json
public/llms.txt
```
