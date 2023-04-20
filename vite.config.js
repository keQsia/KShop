import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import { resolve } from 'path';

export default defineConfig({
    plugins: [vue()],
    base:"./",
    resolve: {
        alias: {
            '@': resolve(__dirname,'src')
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})