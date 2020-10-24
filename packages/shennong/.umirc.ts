import { defineConfig } from 'umi';

export default defineConfig({
  publicPath: '/lab/',
  history: { type: 'hash' },
  routes: [{ path: '/', component: '@/pages/index', title: 'spooky - LAB' }],
});
