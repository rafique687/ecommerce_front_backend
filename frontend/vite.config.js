import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


// vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '192.168.9.115', // your local IP
//     port: 3000,             // or any port you want
//     strictPort: true,       // optional, prevents auto-changing port
//   },
// });

