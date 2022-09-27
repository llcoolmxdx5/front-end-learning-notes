import ErrorBoundary from '@/components/ErrorBoundary.vue';
import { createApp } from 'vue';
import App from './App.vue';
import './global.css';
import router from './router';

const app = createApp(App);

app.config.globalProperties.$http = () => {
  console.log('http');
};

app.config.globalProperties.$filters = {
  format<T extends any>(str: T): string {
    return `$${str}`;
  },
};

app.component('ErrorBoundary', ErrorBoundary).use(router).mount('#app');
