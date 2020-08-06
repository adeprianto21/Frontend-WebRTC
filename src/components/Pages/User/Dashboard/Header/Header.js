import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as actions from '../../../../../redux/actions';

import style from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

  return (
    <div className={style.header}>
      <div className={style['header-profile']}>
        <span className={style.name}>{user ? user.name : ''}</span>
        <span className={style.role}>{role ? role : ''}</span>
      </div>
      <Button
        variant='primary'
        onClick={() => {
          dispatch(actions.authLogout());
          history.replace('/user/login');
        }}
      >
        Log Out
      </Button>
    </div>
  );
};

export default Header;
