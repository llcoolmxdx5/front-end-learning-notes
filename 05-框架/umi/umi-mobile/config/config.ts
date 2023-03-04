import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  routes,
  npmClient: 'pnpm',
  postcssLoader: {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 16,
        propList: ['*'],
      },
    },
  },
});
