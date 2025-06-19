import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: [
      '5174-wuguorongwu-fypuopfront-9posstx6twz.ws-us120.gitpod.io',
    ],
  },
  plugins: [react()], // Add the react plugin here
});
