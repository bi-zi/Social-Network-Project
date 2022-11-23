import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchNotifications, fetchNotificationsDelete } from '../../../store/notifications/slice';

import { Profile, Bell, Chats, Users } from '../../../Svg';

import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export type MyParams = {
  id: string;
};

export const ControlPanel: React.FC = () => {
  const state = useAppSelector((state) => state);
  const { id } = useParams<keyof MyParams>() as MyParams;

  const loading = state.auth.status === 'loading' || state.user.status === 'loading';

  const error = state.auth.status === 'error' || state.user.status === 'error';

  return (
    <>
      {localStorage.isAuth !== undefined && state.auth.status === 'loaded' ? (
        <div className="header__control-panel">
          <NavLink to={`/Profile/${state.auth?.data?._id}`} className="header__control-panel__icons">
            <Profile />
          </NavLink>
          <div className="header__control-panel__icons">
            <Bell />
          </div>
          <NavLink to="/Messages" className="header__control-panel__icons">
            <Chats />
          </NavLink>
          <NavLink to={`/Friends/${state.auth?.data?._id}`} className="header__control-panel__icons">
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
