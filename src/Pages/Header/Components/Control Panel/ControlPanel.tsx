import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

import { Profile, Bell, Chats, Users } from '../../../../Svg';

import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './style.scss';

export type MyParams = {
  id: string;
};

export const ControlPanel: React.FC = () => {
  const state = useAppSelector((state) => state);
  const { id } = useParams<keyof MyParams>() as MyParams;

  const loading = state.oldAuth.status === 'loading' || state.player.status === 'loading';

  const error = state.oldAuth.status === 'error' || state.player.status === 'error';

  const firstPath = window.location.pathname.split('/')[1];
  const secondPath = window.location.pathname.split('/')[2];

  const profileIconColor =
    firstPath === 'Profile' && secondPath === state.oldAuth?.data?._id ? 'black' : 'white';

  const chatsIconColor = firstPath === 'Messages' ? 'black' : 'white';

  const usersIconColor =
    firstPath === 'Users' || (firstPath === 'Profile' && state.oldAuth?.data?._id !== id)
      ? 'black'
      : 'white';

  return (
    <>
      {state.oldAuth.status === 'loaded' ? (
        <div className="header__control-panel">
          <NavLink
            to={`/Profile/${state.oldAuth?.data?._id}`}
            style={{ stroke: profileIconColor }}
            className="header__control-panel__icons">
            <Profile />
          </NavLink>
          <div style={{ stroke: 'white' }} className="header__control-panel__icons">
            <Bell />
          </div>
          <NavLink
            to="/Messages"
            style={{ fill: chatsIconColor }}
            className="header__control-panel__icons">
            <Chats />
          </NavLink>
          <NavLink
            to={`/Users/${state.oldAuth?.data?._id}`}
            style={{ stroke: usersIconColor }}
            className="header__control-panel__icons">
            <Users />
          </NavLink>
        </div>
      ) : error ? (
        <div className="header__error" style={{ color: 'green' }}>
          You need to register or login
        </div>
      ) : loading ? (
        <div className="header__error" style={{ color: 'red' }}>
          Please wait for loading
        </div>
      ) : (
        ''
      )}
    </>
  );
};
