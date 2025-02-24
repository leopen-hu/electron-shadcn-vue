import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const resolvePath = (alias: string) => path.resolve(__dirname, alias)

// https://vitejs.dev/config
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolvePath('./src'),
    },
  },
})
