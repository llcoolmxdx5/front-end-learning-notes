import ErrorBoundary from '@/components/ErrorBoundary.vue';
import { createApp } from 'vue';
import App from './App.vue';
import './global.css';
import router from './router';

createApp(App).component('ErrorBoundary', ErrorBoundary).use(router).mount('#app');
