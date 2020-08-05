import React from 'react';

import style from './Dashboard.module.css';

import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';

const Dashboard = () => {
  return (
    <div className={style.dashboard}>
      <Header />
      <Sidebar />
    </div>
  );
};

export default Dashboard;
