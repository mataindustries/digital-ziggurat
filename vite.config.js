import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Each case study is its own HTML entry, so its route is a real file with its own
// title and social tags, and loads directly without a client-side router.
const page = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        shootTheMoon: page('./work/shoot-the-moon/index.html'),
        deadChannel: page('./work/dead-channel/index.html'),
      },
    },
  },
});
