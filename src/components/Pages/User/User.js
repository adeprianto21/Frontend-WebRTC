import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './Login/Login';
import Register from './Register/Register';
import Dashboard from './Dashboard/Dashboard';

const User = () => {
  const history = useHistory();
  const route = useRouteMatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (role === 'Admin') {
      history.replace('/admin/dashboard');
    } else if (!role) {
      history.replace('/user/login');
    } else if (history.location.pathname === '/user' && role === 'User') {
      history.replace('/user/dashboard');
    }
  });

  return (
    <Switch>
      <Route path={`${route.url}/login`}>
        <Login />
      </Route>
      <Route path={`${route.url}/register`}>
        <Register />
      </Route>
      <Route path={`${route.url}/dashboard`}>
        <Dashboard />
      </Route>
    </Switch>
  );
};

export default User;
