import { lazy } from 'react';

interface IMenuItem {
  link: string;
  component: React.LazyExoticComponent<any>;
  title: string;
}

export const routesConfig: IMenuItem[] = [
  {
    link: '/coca-cola',
    component: lazy(() => import('../pages/coca-cola')),
    title: 'ENERGY - KYU',
  },
  {
    link: '/search-engine',
    component: lazy(() => import('../pages/search-engine')),
    title: 'SEARCH - KYU',
  },
];

export default routesConfig;
