import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { fetchAuthMe } from '../../../../../store/auth/slice';
import {
  fetchSubscribe,
  fetchUnsubscribe,
  fetchAcceptFriend,
  fetchDeleteFriend,
  fetchOneUser,
} from '../../../../../store/user/slice';

import {
  fetchNotifications,
  fetchNotificationsPost,
  fetchNotificationsPush,
  fetchDeleteRequest,
} from '../../../../../store/notifications/slice';

import { useParams } from 'react-router-dom';

export type MyParams = {
  id: string;
};

export const UserInteraction: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const auth = useAppSelector((state) => state.auth?.data);
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

  const loadStatus =
    state.user.status === 'loaded' &&
    state.auth.status === 'loaded' &&
    state.note.status === 'loaded' &&
    state.messages.status === 'loaded';

  const acceptFriendBool = subscribedToYou !== 0 && youSubscriber === 0 && friend !== +id;
  const friendBool = friend === 1;

  

  return (
    <>
      {auth?._id !== id ? (
        <button
          className="avatar_send-message-user-interaction___interaction"
          onClick={() =>
            loadStatus
              ? acceptFriendBool
                ? acceptFriend()
                : friendBool
                ? deleteFriend()
                : youSubscriber !== 0
                ? unsubscribe()
                : youSubscriber === 0
                ? subscribe()
                : ''
              : ''
          }>
          {acceptFriendBool
            ? 'Accept friend request'
            : friendBool
            ? 'Delete friend'
            : youSubscriber !== 0
            ? 'Unsubscribe'
            : youSubscriber === 0
            ? 'Send friend request'
            : ''}
        </button>
      ) : (
        ''
      )}
    </>
  );
};
