import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { logout } from '../../store/auth/slice';
import { fetchOneUser, setCatergory } from '../../store/user/slice';
import { fetchNotifications, fetchNotificationsDelete } from '../../store/notifications/slice';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPager,
  faUserGroup,
  faUsers,
  faFilm,
  faMusic,
  faAlignJustify,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleUser, faBell, faComment, faImage } from '@fortawesome/free-regular-svg-icons';
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
              <FontAwesomeIcon className="profile" icon={faCircleUser} />
            </NavLink>
            <div className="bell">
              <FontAwesomeIcon className="bell_icon" icon={faBell} />
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
            <FontAwesomeIcon className="news" icon={faPager} />
            <NavLink
              to="/Messages"
              style={path !== 'Messages' ? { color: 'white' } : { color: 'black' }}>
              <FontAwesomeIcon className="message" icon={faComment} />
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
              <FontAwesomeIcon className="users" icon={faUserGroup} />
            </NavLink>
            <FontAwesomeIcon className="community" icon={faUsers} />
            <FontAwesomeIcon className="image" icon={faImage} />
            <FontAwesomeIcon className="video" icon={faFilm} />
            <FontAwesomeIcon className="music" icon={faMusic} />
          </div>
        ) : (
          ''
        )}
        <div className="menu">
          <FontAwesomeIcon className="menu_burger" icon={faAlignJustify} />
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
