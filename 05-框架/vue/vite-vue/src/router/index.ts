import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
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
      {
        path: 'reactive',
        name: 'reactive',
        component: () => import('../cases/reactive.vue'),
      },
      {
        path: 'to',
        name: 'to',
        component: () => import('../cases/to.vue'),
      },
      {
        path: 'computed',
        name: 'computed',
        component: () => import('../cases/computed.vue'),
      },
      {
        path: 'watch',
        name: 'watch',
        component: () => import('../cases/watch.vue'),
      },
      {
        path: 'lifeCycle',
        name: 'lifeCycle',
        component: () => import('../cases/lifeCycle.vue'),
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
