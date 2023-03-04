import type { IConfigFromPlugins } from '@@/core/pluginConfig';

const routes: IConfigFromPlugins['routes'] = [
  { path: '/', component: 'index' },
  { path: '/docs', component: 'docs' },
];

export default routes;
