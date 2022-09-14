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
      {
        path: 'css',
        name: 'css',
        component: () => import('../cases/css.vue'),
      },
      {
        path: 'layout',
        name: 'layout',
        component: () => import('../cases/Layout/index.vue'),
      },
      {
        path: 'TreeList',
        name: 'TreeList',
        component: () => import('../cases/TreeList.vue'),
      },
      {
        path: 'componentIs',
        name: 'componentIs',
        component: () => import('../cases/componentIs.vue'),
      },
      {
        path: 'slot',
        name: 'slot',
        component: () => import('../cases/Slot.vue'),
      },
      {
        path: 'suspense',
        name: 'suspense',
        component: () => import('../cases/suspense.vue'),
      },
      {
        path: 'teleport',
        name: 'teleport',
        component: () => import('../cases/teleport.vue'),
      },
      {
        path: 'keepAlive',
        name: 'keepAlive',
        component: () => import('../cases/keepAlive.vue'),
      },
      {
        path: 'transition',
        name: 'transition',
        component: () => import('../cases/transition.vue'),
      },
      {
        path: 'provide',
        name: 'provide',
        component: () => import('../cases/provide.vue'),
      },
      {
        path: 'directives',
        name: 'directives',
        component: () => import('../cases/directives/index.vue'),
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
