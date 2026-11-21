import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { buildMailto } from './src/data/projects.js';

// Each case study is its own HTML entry, so its route is a real file with its own
// title and social tags, and loads directly without a client-side router.
const page = (path) => fileURLToPath(new URL(path, import.meta.url));
const partnersPage = page('./partners/index.html');
const partnersQuoteHref = buildMailto('ENM Studio event motion quote', `Hi Sergio,

I would like a quote for event motion.

Business / event:
Event date:
Screen resolution and aspect ratio:
Playback format:
Branding assets:
Deadline:
`).replaceAll('&', '&amp;');

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'partners-quote-link',
      transformIndexHtml(html, { filename }) {
        if (filename === partnersPage) {
          return html.replaceAll('%PARTNERS_QUOTE_HREF%', partnersQuoteHref);
        }
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        shootTheMoon: page('./work/shoot-the-moon/index.html'),
        deadChannel: page('./work/dead-channel/index.html'),
        partners: partnersPage,
      },
    },
  },
});
