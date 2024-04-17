import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@components', replacement: '/src/components' },
<<<<<<< HEAD
=======
      { find: '@player', replacement: '/src/player' },
>>>>>>> feature/player
      { find: '@pages', replacement: '/src/pages' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@recoil', replacement: '/src/recoil' },
    ],
  },
});
