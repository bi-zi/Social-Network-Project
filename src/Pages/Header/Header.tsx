import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { logout } from '../../store/auth/slice';
import { fetchOneUser, setCatergory } from '../../store/user/slice';
import { fetchNotifications, fetchNotificationsDelete } from '../../store/notifications/slice';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

export type MyParams = {
  id: string;
};

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { id } = useParams<keyof MyParams>() as MyParams;

  const note =
    state.note.notifications?.user === state.auth?.data?._id
      ? state.note?.notifications
      : { friendRequest: [] };

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      localStorage.removeItem('isAuth');
      window.localStorage.removeItem('token');
    }
  };

  const onHideNote = async () => {
    dispatch(fetchNotificationsDelete({ deleteNotifications: localStorage.mainUser }));
    dispatch(fetchNotifications(localStorage.mainUser));
  };

  const path = window.location.pathname.split('/')[1];

  return (
    <div className="header">
      <div className="container">
        <NavLink
          style={{ textDecoration: 0, color: 'white' }}
          to={`/Profile/${state.auth?.data?._id}`}
          className="wave"
          onClick={() => dispatch(fetchOneUser(state.auth?.data._id))}>
          Wave
        </NavLink>

        {localStorage.isAuth !== undefined ? (
          <div className="header_control_panel">
            <NavLink
              to={`/Profile/${state.auth?.data?._id}`}
              style={
                id === state.auth?.data?._id && path === 'Profile'
                  ? { color: 'black' }
                  : { color: 'white' }
              }
              onClick={() => dispatch(fetchOneUser(state.auth?.data?._id))}>
              <FontAwesomeIcon className="profile" icon="fa-regular fa-circle-user" />
            </NavLink>

            <div className="bell">
              <FontAwesomeIcon className="bell_icon" icon="fa-regular fa-bell" />
              {note?.friendRequest!?.length > 0 ? (
                <div className="notifications_number">{note?.friendRequest?.length}</div>
              ) : (
                ''
              )}

              <div className="notifications">
                {note?.friendRequest?.length !== 0 ? (
                  <>
                    <div className="have_friend">
                      You have friend requests! &nbsp;
                      <NavLink
                        to={`/Friends/${state.auth?.data?._id}`}
                        className="note_show"
                        onClick={() => {
                          dispatch(setCatergory('subscribers'));
                          onHideNote();
                        }}>
                        Show
                      </NavLink>
                      &nbsp;
                      <div className="note_hide" onClick={() => onHideNote()}>
                        Hide
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="dont_notе">You don't have notifications</div>
                )}
              </div>
            </div>

            <FontAwesomeIcon className="news" icon="fa-solid fa-pager" />

            <NavLink
              to="/Messages"
              style={path !== 'Messages' ? { color: 'white' } : { color: 'black' }}>
              <FontAwesomeIcon className="message" icon="fa-regular fa-comment" />
            </NavLink>

            <NavLink
              to={`/Friends/${state.auth?.data?._id}`}
              style={
                (id === state.auth?.data?._id && path === 'Profile') ||
                path === state.auth?.data?._id ||
                path === 'Messages'
                  ? { color: 'white' }
                  : { color: 'black' }
              }
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
              onClick={() => dispatch(fetchOneUser(state.auth?.data?._id))}>
              <FontAwesomeIcon className="users" icon="fa-solid fa-user-group" />
            </NavLink>

            <FontAwesomeIcon className="community" icon="fa-solid fa-users" />
            <FontAwesomeIcon className="image" icon="fa-regular fa-image" />
            <FontAwesomeIcon className="video" icon="fa-solid fa-film" />
            <FontAwesomeIcon className="music" icon="fa-solid fa-music" />
          </div>
        ) : (
          ''
        )}
        <div className="menu">
          <FontAwesomeIcon className="menu_burger" icon="fa-solid fa-align-justify" />
          <div className="menu_register_login">
            <NavLink
              to="/Login"
              className="menu_login"
              onClick={() => (localStorage.isAuth === 'true' ? onClickLogout() : '')}>
              Login
            </NavLink>
            <NavLink
              to="/Register"
              className="menu_register"
              onClick={() => (localStorage.isAuth === 'true' ? onClickLogout() : '')}>
              Register
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
