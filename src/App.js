import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import HomePage from './components/Pages/Home/Home';
import LoginPage from './components/Pages/Login/Login';
import RegisterPage from './components/Pages/Register/Register';
import DashboardPage from './components/Pages/Dashboard/Dashboard';
import NotFoundPage from './components/Pages/NotFound/NotFound';

function App() {
  return (
    <div>
      <Header />
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
