import React from 'react';
import { Switch, Route } from 'react-router-dom';

import style from './Dashboard.module.css';

import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Product from './Product/Product';

const Dashboard = () => {
  return (
    <div className={style.dashboard}>
      <Header />
      <Sidebar />
      <Switch>
        <Route path='/admin/dashboard/add-product'>
          <Product />
        </Route>
        <Route path='/admin/dashboard'>
          <h1>Dashboard Admin</h1>
        </Route>
      </Switch>
    </div>
  );
};

export default Dashboard;
