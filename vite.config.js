import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@components', replacement: '/src/components' },
      { find: '@public', replacement: '/public' },
      { find: '@player', replacement: '/src/player' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@recoil', replacement: '/src/recoil' },
      { find: '@public', replacement: '/public' },
      { find: '@styles', replacement: '/styles' },
      { find: '@youtube', replacement: '/src/youtube' },
      { find: '@assets', replacement: '/src/assets' },
    ],
  },
});
