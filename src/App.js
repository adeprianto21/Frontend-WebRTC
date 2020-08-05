import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import HomePage from './components/Pages/Home/Home';
import LoginPage from './components/Pages/Login/Login';
import RegisterPage from './components/Pages/Register/Register';
import DashboardPage from './components/Pages/Dashboard/Dashboard';
import NotFoundPage from './components/Pages/NotFound/NotFound';

function App() {
  return (
    <div>
      <Switch>
        <Route path='/user/register'>
          <RegisterPage />
        </Route>
        <Route path='/user/login'>
          <LoginPage />
        </Route>
        <Route path='/user/dashboard'>
          <DashboardPage />
        </Route>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
