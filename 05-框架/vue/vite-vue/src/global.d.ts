import ErrorBoundary from '@/components/ErrorBoundary.vue';
import ElementPlusComponents from 'element-plus/global';

type GlobalFilter = {
  format: <T extends any>(str: T) => string;
};

declare module 'vue' {
  export interface GlobalComponents extends ElementPlusComponents {
    ErrorBoundary: typeof ErrorBoundary;
  }
  // 用于增强组件实例类型以支持自定义全局属性
  export interface ComponentCustomProperties {
    $filters: GlobalFilter;
    $http: () => void;
  }
}
