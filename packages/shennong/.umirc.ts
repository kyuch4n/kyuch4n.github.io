import { defineConfig } from 'umi';

export default defineConfig({
  publicPath: '/lab/',
  routes: [{ path: '/', component: '@/pages/index' }],
});
