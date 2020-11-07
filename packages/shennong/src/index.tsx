import React, { FC, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { Spin } from 'antd';
import './index.scss';
import RoutesConfig from './common/routes.config';

const App: FC = () => {
  return (
    <Suspense fallback={<Spin />}>
      <HashRouter>
        <Switch>
          {RoutesConfig.map(r => {
            const PageComponent = r.component;
            return (
              <Route key={r.link} path={r.link}>
                <PageComponent />
              </Route>
            );
          })}
        </Switch>
      </HashRouter>
    </Suspense>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
