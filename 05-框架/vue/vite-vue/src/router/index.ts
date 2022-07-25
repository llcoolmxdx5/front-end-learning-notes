import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../Echarts/01-QuickStart'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
