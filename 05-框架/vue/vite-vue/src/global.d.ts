import ErrorBoundary from '@/components/ErrorBoundary.vue';
import ElementPlusComponents from 'element-plus/global';

declare module 'vue' {
  export interface GlobalComponents extends ElementPlusComponents {
    ErrorBoundary: typeof ErrorBoundary;
  }
}

export {};
