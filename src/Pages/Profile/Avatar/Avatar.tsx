import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchAuthMe } from '../../../store/auth/slice';
import {
  fetchSubscribe,
  fetchUnsubscribe,
  fetchAcceptFriend,
  fetchDeleteFriend,
  fetchOneUser,
  setInputNumber,
} from '../../../store/user/slice';

import {
  fetchNotifications,
  fetchNotificationsPost,
  fetchNotificationsPush,
  fetchDeleteRequest,
} from '../../../store/notifications/slice';

import {
  fetchCreateMessages,
  fetchGetMessages,
  fetchPushChat,
  setSortedId,
} from '../../../store/messages/slice';
import {ImageParsing} from '../../../ImageParsing/ImageParsing';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.css';

export type MyParams = {
  id: string;
};

export const Avatar: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { id } = useParams<keyof MyParams>() as MyParams;

  const user = state.user?.userOne?.[0];

  const subscribedToYou = state.auth.data?.subscribers?.find((x) => x === id) === undefined ? 0 : 1;
  const youSubscriber =
    user?.subscribers?.find((x) => x === state.auth?.data?._id) === undefined ? 0 : 1;
  const friend = state.auth.data?.friends?.find((x) => x === id) === undefined ? 0 : 1;

  window.onpopstate = function () {
    if (document.location.pathname.split('/')[1] === 'Profile') dispatch(fetchOneUser(id));
  };

  const base = !state.note?.notifications?.friendRequest?.find(
    (x) => x.fromWho === state.auth.data?._id,
  );

  const friendRequestIndex = state.note?.notifications?.friendRequest?.findIndex(
    (x) => x.fromWho === state.auth.data?._id,
  );

  const subscribe = async () => {
    await dispatch(fetchSubscribe({ authUserId: state.auth.data?._id, id: id, user: id }));

    if (state.note.notifications?.user === id && base) {
      await dispatch(fetchNotificationsPush({ fromWho: state.auth.data?._id, id: id }));
    }

    if (state.note.notifications?.user === undefined) {
      await dispatch(fetchNotificationsPost({ fromWho: state.auth.data?._id, user: id }));
    }

    dispatch(fetchNotifications(id));
    dispatch(fetchOneUser(id));
    dispatch(fetchAuthMe());
  };

  const unsubscribe = async () => {
    await dispatch(fetchDeleteRequest({ index: friendRequestIndex, id: id }));

    await dispatch(
      fetchUnsubscribe({
        id: id,
        index: user?.subscribers.findIndex((x) => x === state.auth.data?._id),
        user: id,
      }),
    );
    dispatch(fetchNotifications(id));
    dispatch(fetchOneUser(id));
    dispatch(fetchAuthMe());
  };

  const acceptFriend = async () => {
    await dispatch(
      fetchAcceptFriend({
        id: id,
        index: state.auth.data?.subscribers.findIndex((x) => x === id),
        user: id,
      }),
    );
    dispatch(fetchOneUser(id));
    dispatch(fetchAuthMe());
  };

  const deleteFriend = async () => {
    await dispatch(
      fetchDeleteFriend({
        id: id,
        index: user?.friends.findIndex((x) => x === state.auth.data?._id),
        index2: state.auth.data?.friends.findIndex((x) => x === id),
        user: id,
      }),
    );
    dispatch(fetchOneUser(id));
    dispatch(fetchAuthMe());
  };

  let you = !state.messages?.data.find((x) => x.user === state.auth.data?._id);
  let him = !state.messages?.data.find((x) => x.user === id);
  let checkChat = !state.messages?.data
    .find((x) => x.user === id)
    ?.correspondence?.find((x) => x?.withWho === state.auth.data?._id);

  const createMessages = async () => {
    if (you) {
      console.log(1);
      await dispatch(fetchCreateMessages({ withWho: id, user: state.auth?.data?._id }));
    }
    if (him) {
      console.log(2);
      await dispatch(fetchCreateMessages({ withWho: state.auth?.data?._id, user: id }));
    }
    if (checkChat) {
      console.log(3);
      await dispatch(fetchPushChat({ withWho: id, user: state.auth?.data?._id }));
    }

    dispatch(setSortedId(id));
    dispatch(fetchGetMessages());
  };

  React.useEffect(() => {
    dispatch(fetchNotifications(id));
    dispatch(fetchGetMessages());
  }, [dispatch, id]);

  return (
    <div className="avatar">
      <div className="avatar_backGround">
        {state.user.status === 'loaded' ? (
          <Link to={`/${id}/PhotoAvatar/0`}>
            <img src={user?.imageUrl} alt="" className="avatar_image" />
          </Link>
        ) : (
          <img src={user?.imageUrl} alt="" className="avatar_image" />
        )}

        {state.auth?.data?._id === id ? (
          <div
            className="avatar_button"
            onChange={() => {
              dispatch(setInputNumber('0'));
            }}>
            {state.auth.data === null ? '' : <div className="avatar_change">Change photo</div>}

            {state.auth.data?._id === id &&
            state.user.status === 'loaded' &&
            state.slider.status === 'loaded' ? (
              <ImageParsing />
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}

        {state.auth.data === null || state.auth?.data?._id === id ? (
          ''
        ) : subscribedToYou !== 0 && youSubscriber === 0 && friend !== +id ? (
          <>
            <Link to="/Messages" className="send_message" onClick={() => createMessages()}>
              Send a message
            </Link>

            <button
              className="delete_friend"
              onClick={() =>
                state.user.status === 'loaded' && state.auth.status === 'loaded' ? acceptFriend() : ''
              }>
              Accept friend request
            </button>
          </>
        ) : friend === 1 ? (
          <>
            <Link to="/Messages" className="send_message" onClick={() => createMessages()}>
              Send a message
            </Link>
            <button
              className="delete_friend"
              onClick={() =>
                state.user.status === 'loaded' && state.auth.status === 'loaded' ? deleteFriend() : ''
              }>
              Delete friend
            </button>
          </>
        ) : youSubscriber !== 0 ? (
          <>
            <Link to="/Messages" className="send_message" onClick={() => createMessages()}>
              Send a message
            </Link>
            <button
              className="delete_friend"
              onClick={() =>
                state.user.status === 'loaded' &&
                state.auth.status === 'loaded' &&
                state.note.status === 'loaded'
                  ? unsubscribe()
                  : ''
              }>
              Unsubscribe
            </button>
          </>
        ) : youSubscriber === 0 ? (
          <>
            <Link to="/Messages" className="send_message" onClick={() => createMessages()}>
              Send a message
            </Link>
            <button
              className="delete_friend"
              onClick={() =>
                state.user.status === 'loaded' &&
                state.auth.status === 'loaded' &&
                state.note.status === 'loaded'
                  ? subscribe()
                  : ''
              }>
              Send friend request
            </button>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
