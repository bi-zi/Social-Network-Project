import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchOneUser, setCatergory } from '../../../store/user/slice';
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
        <div className="header_control_panel">
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
            <FontAwesomeIcon className="header_profile_icon" icon={faCircleUser} />
          </NavLink>

          <div className="header_bell_block">
            <FontAwesomeIcon className="header_bell_icon" icon={faBell} />
            {note?.friendRequest!?.length > 0 ? (
              <div className="notifications_number">{note?.friendRequest?.length}</div>
            ) : (
              ''
            )}

            <div className="notifications">
              {note?.friendRequest?.length !== 0 ? (
                <>
                  <div className="header_friend_requests">
                    You have friend requests! &nbsp;
                    <NavLink
                      to={`/Friends/${state.auth?.data?._id}`}
                      className="notifications_show"
                      onClick={() => {
                        dispatch(setCatergory('subscribers'));
                        onHideNote();
                      }}>
                      Show
                    </NavLink>
                    &nbsp;
                    <div className="notifications_hide" onClick={() => onHideNote()}>
                      Hide
                    </div>
                  </div>
                </>
              ) : (
                <div className="no_notifications">You don't have notifications</div>
              )}
            </div>
          </div>

          <FontAwesomeIcon className="header_news_icon" icon={faPager} />

          <NavLink to="/Messages" style={path !== 'Messages' ? { color: 'white' } : { color: 'black' }}>
            <FontAwesomeIcon className="header_messages_icon" icon={faComment} />
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
            <FontAwesomeIcon className="header_users_icon" icon={faUserGroup} />
          </NavLink>

          <FontAwesomeIcon className="header_community_icon" icon={faUsers} />
          <FontAwesomeIcon className="header_image_icon" icon={faImage} />
          <FontAwesomeIcon className="header_video_icon" icon={faFilm} />
          <FontAwesomeIcon className="header_music_icon" icon={faMusic} />
        </div>
      ) : error ? (
        <div className="header_error" style={{ color: 'green' }}>
          You need to register or login
        </div>
      ) : loading ? (
        <div className="header_error" style={{ color: 'red' }}>
          Please wait for loading
        </div>
      ) : (
        ''
      )}
    </>
  );
};
