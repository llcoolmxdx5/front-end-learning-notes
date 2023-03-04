import type { IConfigFromPlugins } from '@@/core/pluginConfig';

const routes: IConfigFromPlugins['routes'] = [
  { path: '/', component: 'home', layout: false },
  { path: '/category', component: 'category', layout: false },
];

export default routes;
