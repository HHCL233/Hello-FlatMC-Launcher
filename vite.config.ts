import { defineConfig } from "vite";
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 9999,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'Home.html'),
        Version: resolve(__dirname, 'Version.html'),
        Download: resolve(__dirname, 'Download.html'),
        About: resolve(__dirname, 'About.html'),
        IMG: resolve(__dirname, 'Img.html'),
        Test: resolve(__dirname, 'Test.html'),
        Settings: resolve(__dirname, 'Settings.html'),
      },
    },
    target:['edge90','chrome90','firefox90','safari15']
  },
}));