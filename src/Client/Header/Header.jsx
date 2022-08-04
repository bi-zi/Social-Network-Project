import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../store/slices/auth';
import { fetchOneUser, setCatergory } from '../store/slices/user';
import { fetchNotifications, fetchNotificationsDelete } from '../store/slices/notifications';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const state = useSelector((state) => state);
  const { id } = useParams();

  const note = state.note?.notifications?.user === state.auth?.data?._id ? state.note?.notifications : '';
  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      localStorage.removeItem('isAuth');
      window.localStorage.removeItem('token');
    }
  };

  const onHideNote = async () => {
    dispatch(fetchNotificationsDelete({ deleteNotifications: id }));
    dispatch(fetchNotifications(id));
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
              {note?.friendRequest?.length > 0 ? (
                <div className="notifications_number">{note?.friendRequest?.length}</div>
              ) : (
                ''
              )}

              <div className="notifications">
                {note?.friendRequest?.length > 0 ? (
                  <>
                    <div className="have_friend">
                      You have friend requests! &nbsp;
                      <NavLink
                        to={`/Friends/${state.auth?.data?._id}`}
                        className="note_show"
                        onClick={() => dispatch(setCatergory('subscribers'))}>
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
            <FontAwesomeIcon className="message" icon="fa-regular fa-comment" />

            <NavLink
              to={`/Friends/${state.auth?.data?._id}`}
              style={
                (id === state.auth?.data?._id && path === 'Profile') || path === state.auth?.data?._id
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

        <FontAwesomeIcon className="menu" icon="fa-solid fa-align-justify" onClick={onClickLogout} />
      </div>
    </div>
  );
}

export default Header;
