import React from 'react';

import { Link } from 'react-router-dom';

import style from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <Link to='/'>
        <h3 className={style['sidebar-header']}>Apo-Tech</h3>
      </Link>
      <hr className={style['sidebar-divider']} />
      <Link to='/user/dashboard'>
        <span className={style['sidebar-menu']}>Dashboard</span>
      </Link>
      <Link to='#!'>
        <span className={style['sidebar-menu']}>Checkout</span>
      </Link>
    </div>
  );
};

export default Sidebar;
