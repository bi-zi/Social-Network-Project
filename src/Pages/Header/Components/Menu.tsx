import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { logout } from '../../../store/auth/slice';
import { setAttention } from '../../../store/user/slice';
import { setCreatText, setCreateVid } from '../../../store/post/slice';
import { Loading } from './Loading';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';

export const Menu: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      localStorage.removeItem('isAuth');
      window.localStorage.removeItem('token');
      localStorage.removeItem('postText');
      localStorage.removeItem('postVideo');
      dispatch(setCreatText(''));
      dispatch(setCreateVid(''));
    }
  };
  

  return (
    <>
      <div className="header_menu">
        <Loading />

        <FontAwesomeIcon className="header_menu_burger" icon={faAlignJustify} />

        <div className="header_menu_block">
          <NavLink
            to="/Login"
            className="header_menu_login"
            onClick={() =>
              !(auth.status === 'loading')
                ? localStorage.isAuth === 'true'
                  ? onClickLogout()
                  : dispatch(setAttention(1))
                : 'Loading, please wait'
            }>
            Login
          </NavLink>

          <NavLink
            to="/Register"
            className="header_menu_register"
            onClick={() =>
              !(auth.status === 'loading')
                ? localStorage.isAuth === 'true'
                  ? onClickLogout()
                  : dispatch(setAttention(1))
                : 'Loading, please wait'
            }>
            Register
          </NavLink>
        </div>
      </div>
    </>
  );
};
