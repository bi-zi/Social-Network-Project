import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { usePostLogoutMutation } from '../../../../store/auth/authApi';
import { setCreatText, setCreateVid } from '../../../../store/old store/post/slice';
import { Loading } from '../Loading/Loading';
import { NavLink } from 'react-router-dom';
import { Burger } from '../../../../Svg';
import './style.scss';

export const Menu: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.oldAuth);
  const state = useAppSelector((state) => state);

  const [logout, { isLoading }] = usePostLogoutMutation();

  const onClickLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (window.confirm('Do you really want to leave?')) {
      localStorage.clear();
      dispatch(setCreatText(''));
      dispatch(setCreateVid(''));
      logout('');
    }
  };

  return (
    <>
      <div className="header__menu">
        <Loading />

        <div style={{ fill: 'white' }} className="header__menu-burger">
          <Burger />
        </div>

        <div className="header__menu-burger__block">
          <NavLink to="/Login" onClick={(e) => onClickLogout(e)}>
            <div className="header__menu-burger__block-login">Login</div>
          </NavLink>

          <NavLink to="/Registration" onClick={(e) => onClickLogout(e)}>
            <div className="header__menu-burger__block-register">Register</div>
          </NavLink>
        </div>
      </div>
    </>
  );
};
