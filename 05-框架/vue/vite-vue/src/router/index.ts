import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    redirect: '/case',
  },
  {
    path: '/case',
    name: 'case',
    component: () => import('../cases/index.vue'),
    children: [
      {
        path: 'base',
        name: 'base',
        component: () => import('../cases/base.vue'),
      },
      {
        path: 'ref',
        name: 'ref',
        component: () => import('../cases/ref.vue'),
      },
    ],
  },
  {
    path: '/echarts',
    name: 'echarts',
    component: () => import('../Echarts/01-QuickStart'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
