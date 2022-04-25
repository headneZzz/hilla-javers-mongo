import { Route } from '@vaadin/router';
import './views/grocery/grocery-view';
import './views/grocery/history-view';
import './views/main-layout';

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const viewRoutes: ViewRoute[] = [
  // place routes below (more info https://hilla.dev/docs/routing)
  {
    path: '',
    component: 'grocery-view',
    icon: '',
    title: '',
  },
  {
    path: 'grocery',
    component: 'grocery-view',
    icon: 'las la-list-alt',
    title: 'Продукты',
  },
  {
    path: 'grocery/:itemId',
    action: async () => { await import('./views/grocery/grocery-item-view'); },
    component: 'grocery-item-view',
  },
  {
    path: 'history',
    component: 'history-view',
    icon: 'las la-history',
    title: 'История',
  },
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: 'main-layout',
    children: [...viewRoutes],
  }
];
