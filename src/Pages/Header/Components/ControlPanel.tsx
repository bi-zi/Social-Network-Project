import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchOneUser } from '../../../store/user/slice';
import { setCatergorySort } from '../../../store/friends/slice';
import { fetchNotifications, fetchNotificationsDelete } from '../../../store/notifications/slice';
import { fetchSlider } from '../../../store/slider/slice';

import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { faPager, faUserGroup, faUsers, faFilm, faMusic } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser, faBell, faComment, faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type MyParams = {
  id: string;
};

export const ControlPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { id } = useParams<keyof MyParams>() as MyParams;

  const note =
    state.note.notifications?.user === state.auth?.data?._id
      ? state.note?.notifications
      : { friendRequest: [] };

  const onHideNote = async () => {
    dispatch(fetchNotificationsDelete({ deleteNotifications: localStorage.mainUser }));
    dispatch(fetchNotifications(localStorage.mainUser));
  };

  const loading = state.auth.status === 'loading' || state.user.status === 'loading';

  const error = state.auth.status === 'error' || state.user.status === 'error';

  const path = window.location.pathname.split('/')[1];

  return (
    <>
      {localStorage.isAuth !== undefined && state.auth.status === 'loaded' ? (
        <div className="header__control-panel">
          <NavLink
            to={`/Profile/${state.auth?.data?._id}`}
            style={
              id === state.auth?.data?._id && path === 'Profile'
                ? { color: 'black' }
                : { color: 'white' }
            }
            onClick={() => {
              dispatch(fetchOneUser(state.auth?.data?._id));
              dispatch(fetchSlider(state.auth?.data?._id));
            }}>
            <FontAwesomeIcon className="header__control-panel__icons" icon={faCircleUser} />
          </NavLink>

          <div className="header__control-panel__profile-icon__bell-block">
            <FontAwesomeIcon className="header__control-panel__icons" icon={faBell} />
            {note?.friendRequest!?.length > 0 ? (
              <div className="header__notifications-number">{note?.friendRequest?.length}</div>
            ) : (
              ''
            )}

            <div className="header__notifications">
              {note?.friendRequest?.length !== 0 ? (
                <>
                  <div className="header__notifications__friend-requests">
                    You have friend requests! &nbsp;
                    <NavLink
                      to={`/Friends/${state.auth?.data?._id}`}
                      className="header__notifications-show"
                      onClick={() => {
                        dispatch(setCatergorySort('subscribers'));
                        onHideNote();
                      }}>
                      Show
                    </NavLink>
                    &nbsp;
                    <div className="header__notifications-hide" onClick={() => onHideNote()}>
                      Hide
                    </div>
                  </div>
                </>
              ) : (
                <div className="header__notifications__no-note">You don't have notifications</div>
              )}
            </div>
          </div>



          <NavLink to="/Messages" style={path !== 'Messages' ? { color: 'white' } : { color: 'black' }}>
            <FontAwesomeIcon className="header__control-panel__icons" icon={faComment} />
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
            <FontAwesomeIcon className="header__control-panel__icons" icon={faUserGroup} />
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
