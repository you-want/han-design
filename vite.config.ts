import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertEntry: true,
      cleanVueFileName: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@tokens': resolve(__dirname, 'src/tokens'),
      '@composables': resolve(__dirname, 'src/composables'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'HanDesign',
      fileName: 'han-design',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (info) => {
          if (info.name === 'style.css') return 'style.css';
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    sourcemap: true,
  },
  css: {
    devSourcemap: true,
  },
});
