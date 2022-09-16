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
  fetchChatUser,
  fetchPushChat,
  setSortedId,
} from '../../../store/messages/slice';
import { ImageParsing } from '../../../ImageParsing/ImageParsing';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.scss';

export type MyParams = {
  id: string;
};

export const Avatar: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const auth = useAppSelector((state) => state.auth?.data);
  const messages = useAppSelector((state) => state.messages);
  const { id } = useParams<keyof MyParams>() as MyParams;

  const user = state.user?.userOne?.[0];

  const subscribedToYou = auth?.subscribers?.find((userId) => userId === id) === undefined ? 0 : 1;
  const youSubscriber = user?.subscribers?.find((userId) => userId === auth?._id) === undefined ? 0 : 1;
  const friend = auth?.friends?.find((userId) => userId === id) === undefined ? 0 : 1;

  window.onpopstate = function () {
    if (document.location.pathname.split('/')[1] === 'Profile') dispatch(fetchOneUser(id));
  };

  const base = !state.note?.notifications?.friendRequest?.find((userId) => userId.fromWho === auth?._id);

  const friendRequestIndex = state.note?.notifications?.friendRequest?.findIndex(
    (x) => x.fromWho === auth?._id,
  );

  const subscribe = async () => {
    await dispatch(fetchSubscribe({ authUserId: auth?._id, id: id, user: id }));

    if (state.note.notifications?.user === id && base) {
      await dispatch(fetchNotificationsPush({ fromWho: auth?._id, id: id }));
    }

    if (state.note.notifications?.user === undefined) {
      await dispatch(fetchNotificationsPost({ fromWho: auth?._id, user: id }));
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
        index: user?.subscribers.findIndex((userId) => userId === auth?._id),
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
        index: auth?.subscribers.findIndex((userId) => userId === id),
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
        index: user?.friends.findIndex((userId) => userId === auth?._id),
        index2: auth?.friends.findIndex((userId) => userId === id),
        user: id,
      }),
    );
    dispatch(fetchOneUser(id));
    dispatch(fetchAuthMe());
  };

  let you = !messages.data.find((userID) => userID?.user === auth?._id);
  let him = !messages.data2.find((userID) => userID?.user === id);
  let checkChat = !messages.data2
    .find((userID) => userID?.user === id)
    ?.correspondence?.find((chat) => chat?.withWho === auth?._id);

  const createMessages = async () => {
    if (you) {
      // console.log(1);
      await dispatch(fetchCreateMessages({ withWho: id, user: auth?._id }));
    }
    if (him) {
      // console.log(2);
      await dispatch(fetchCreateMessages({ withWho: auth?._id, user: id }));
    }
    if (checkChat) {
      // console.log(3);
      await dispatch(fetchPushChat({ withWho: id, user: auth?._id }));
    }

    dispatch(setSortedId(id));

    dispatch(fetchChatUser(id));
    dispatch(fetchGetMessages(auth?._id));
  };

  const loadStatus =
    state.user.status === 'loaded' &&
    state.auth.status === 'loaded' &&
    state.note.status === 'loaded' &&
    state.messages.status === 'loaded';

  React.useEffect(() => {
    dispatch(fetchNotifications(id));
    dispatch(fetchChatUser(id));
    dispatch(fetchGetMessages(auth?._id));
  }, [auth?._id, dispatch, id]);

  return (
    <div className="avatar">
      {loadStatus ? (
        <Link to={`/${id}/PhotoAvatar/0`}>
          <img src={user?.imageUrl} alt="" className="avatar_image" />
        </Link>
      ) : (
        <img src={user?.imageUrl} alt="" className="avatar_image" />
      )}

      {auth?._id === id ? (
        <>
          <div
            className="avatar_button"
            onChange={() => {
              dispatch(setInputNumber('0'));
            }}>
            {auth?._id === id && loadStatus ? (
              <ImageParsing />
            ) : (
              <div className="image_input_parser"></div>
            )}
            {auth === null ? '' : <div className="avatar_change">Change photo</div>}
          </div>
        </>
      ) : (
        ''
      )}

      {auth === null || auth?._id === id ? (
        ''
      ) : subscribedToYou !== 0 && youSubscriber === 0 && friend !== +id ? (
        <>
          <Link to="/Messages" className="avatar_send_message" onClick={() => createMessages()}>
            Send a message
          </Link>

          <button className="avatar_delete_friend" onClick={() => (loadStatus ? acceptFriend() : '')}>
            Accept friend request
          </button>
        </>
      ) : friend === 1 ? (
        <>
          <Link to="/Messages" className="avatar_send_message" onClick={() => createMessages()}>
            Send a message
          </Link>

          <button className="avatar_delete_friend" onClick={() => (loadStatus ? deleteFriend() : '')}>
            Delete friend
          </button>
        </>
      ) : youSubscriber !== 0 ? (
        <>
          <Link to="/Messages" className="avatar_send_message" onClick={() => createMessages()}>
            Send a message
          </Link>

          <button className="avatar_delete_friend" onClick={() => (loadStatus ? unsubscribe() : '')}>
            Unsubscribe
          </button>
        </>
      ) : youSubscriber === 0 ? (
        <>
          <Link to="/Messages" className="avatar_send_message" onClick={() => createMessages()}>
            Send a message
          </Link>

          <button className="avatar_delete_friend" onClick={() => (loadStatus ? subscribe() : '')}>
            Send friend request
          </button>
        </>
      ) : (
        ''
      )}
    </div>
  );
};
