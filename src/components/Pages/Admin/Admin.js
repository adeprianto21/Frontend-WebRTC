import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Login from './Login/Login';
import Register from './Register/Register';
import isLoggedIn from '../../../hooks/useIsLoggedIn';

const Admin = () => {
  isLoggedIn();

  const route = useRouteMatch();

  return (
    <Switch>
      <Route path={`${route.url}/login`}>
        <Login />
      </Route>
      <Route path={`${route.url}/register`}>
        <Register />
      </Route>
      <Route path={`${route.url}/dashboard`}>
        <div>Dashboard Admin</div>
      </Route>
    </Switch>
  );
};

export default Admin;
