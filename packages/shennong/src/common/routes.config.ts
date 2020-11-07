import { lazy } from 'react';

interface IMenuItem {
  link: string;
  component: React.LazyExoticComponent<any>;
}

export const routesConfig: IMenuItem[] = [
  {
    link: '/coca-cola',
    component: lazy(() => import('../pages/coca-cola/index')),
  },
];

export default routesConfig;
