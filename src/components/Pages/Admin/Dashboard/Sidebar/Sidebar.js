import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import style from './Sidebar.module.css';

const Sidebar = () => {
  const route = useRouteMatch();

  return (
    <div className={style.sidebar}>
      <Link to='/'>
        <h3 className={style['sidebar-header']}>Apo-Tech</h3>
      </Link>
      <hr className={style['sidebar-divider']} />
      <Link to={`${route.url}/add-product`}>
        <span className={style['sidebar-menu']}>Tambah Product</span>
      </Link>
    </div>
  );
};

export default Sidebar;
