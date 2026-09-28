import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Each page is its own HTML entry, so /work/shoot-the-moon/ is a real file with its own
// title and social tags, and loads directly without a client-side router.
const page = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: page('./index.html'),
        shootTheMoon: page('./work/shoot-the-moon/index.html'),
      },
    },
  },
});
