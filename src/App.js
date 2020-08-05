import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import HomePage from './components/Pages/Home/Home';
import NotFoundPage from './components/Pages/NotFound/NotFound';
import User from './components/Pages/User/User';
import Admin from './components/Pages/Admin/Admin';

function App() {
  const location = useLocation();

  return (
    <div>
      {!/dashboard/.test(location.pathname) && <Header />}
      <Switch>
        <Route path='/admin'>
          <Admin />
        </Route>
        <Route path='/user'>
          <User />
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
