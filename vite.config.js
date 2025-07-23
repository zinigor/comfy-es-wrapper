import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import copy from 'rollup-plugin-copy'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*'],
      exclude: ['src/**/*.test.*', 'src/examples/**/*']
    })
  ],
  resolve: {
    alias: {
      '@comfyui': resolve(__dirname, 'node_modules/comfyui_frontend/src'),
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        editor: resolve(__dirname, 'src/editor/index.ts'),
        components: resolve(__dirname, 'src/components/index.ts')
      },
      name: 'ComfyUIWrapper',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [
        'vue',
        '@comfyorg/litegraph',
        'pinia'
      ],
      output: {
        globals: {
          'vue': 'Vue',
          '@comfyorg/litegraph': 'LiteGraph',
          'pinia': 'Pinia'
        }
      },
      plugins: [
        copy({
          targets: [
            {
              src: 'node_modules/comfyui_frontend/dist/assets/css/*',
              dest: 'dist/assets/css'
            }
          ],
          hook: 'writeBundle'
        })
      ]
    }
  }
})
