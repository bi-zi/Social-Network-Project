import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { logout } from '../../../store/auth/slice';
import { setAttention } from '../../../store/user/slice';
import { setCreatText, setCreateVid } from '../../../store/post/slice';
import { Loading } from './Loading';
import { NavLink } from 'react-router-dom';
import { Burger } from '../../../Svg';

export const Menu: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const onClickLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (window.confirm('Do you really want to leave?')) {
      dispatch(logout());
      localStorage.clear();
      dispatch(setCreatText(''));
      dispatch(setCreateVid(''));
    }
  };

  return (
    <>
      <div className="header__menu">
        <Loading />

        <div className="header__menu-burger">
          <Burger />
        </div>

        <div className="header__menu-burger__block">
          <NavLink
            to="/Login"
            onClick={(e) =>
              !(auth.status === 'loading')
                ? localStorage.isAuth === 'true'
                  ? onClickLogout(e)
                  : dispatch(setAttention(1))
                : 'Loading, please wait'
            }>
            <div className="header__menu-burger__block-login">Login</div>
          </NavLink>

          <NavLink
            to="/Register"
            onClick={(e) =>
              !(auth.status === 'loading')
                ? localStorage.isAuth === 'true'
                  ? onClickLogout(e)
                  : dispatch(setAttention(1))
                : 'Loading, please wait'
            }>
            <div className="header__menu-burger__block-register">Register</div>
          </NavLink>
        </div>
      </div>
    </>
  );
};
