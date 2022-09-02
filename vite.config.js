import vue from '@vitejs/plugin-vue'
const path = require('path')

export default {
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    rollupOptions: {
      external: [
        /^node:.*/,
      ]
    }
  },
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  plugins: [vue()],
  server: {
    port: 8080,
    hot: true
  }
}