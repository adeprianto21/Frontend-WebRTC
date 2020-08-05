import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './Login/Login';
import Register from './Register/Register';
import Dashboard from './Dashboard/Dashboard';

const Admin = () => {
  const history = useHistory();
  const route = useRouteMatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (role === 'User') {
      history.replace('/user/dashboard');
    } else if (!role && /admin\/dashboard/.test(history.location.pathname)) {
      history.replace('/admin/login');
    } else if (history.location.pathname === '/admin' && role === 'Admin') {
      history.replace('/admin/dashboard');
    }
  }, [history, role]);

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

export default Admin;
