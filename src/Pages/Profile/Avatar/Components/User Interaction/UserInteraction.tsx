import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import {
  fetchOneUser,
  fetchMainUser,
  fetchSubscribe,
  fetchUnsubscribe,
  fetchAcceptFriend,
  fetchDeleteFriend,
  fetchUserFriends,
  fetchUserSubscribers,
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
  const mainUser = useAppSelector((state) => state.user?.mainUser);

  const { id } = useParams<keyof MyParams>() as MyParams;

  const user = state.user?.userOne?.[0];

  // Подписаться на пользователя
  const subscribe = async () => {
    const base = !state.note?.notifications?.friendRequest?.find(
      (userId) => userId.fromWho === mainUser?._id,
    );

    await dispatch(fetchSubscribe({ authUserId: mainUser?._id, id: id, user: id }));

    if (state.note.notifications?.user === id && base) {
      await dispatch(fetchNotificationsPush({ fromWho: mainUser?._id, id: id }));
    }

    if (state.note.notifications?.user === undefined) {
      await dispatch(fetchNotificationsPost({ fromWho: mainUser?._id, user: id }));
    }

    dispatch(fetchMainUser(state.auth?.data?._id));
    dispatch(fetchOneUser(id));
    dispatch(fetchUserSubscribers(id));
    dispatch(fetchNotifications(id));
  };

  // Отписаться от пользователя
  const unsubscribe = async () => {
    const friendRequestIndex = state.note?.notifications?.friendRequest?.findIndex(
      (x) => x.fromWho === mainUser?._id,
    );

    await dispatch(fetchDeleteRequest({ index: friendRequestIndex, id: id }));

    await dispatch(
      fetchUnsubscribe({
        id: id,
        index: user?.subscribers.findIndex((userId) => userId === mainUser?._id),
        user: id,
      }),
    );
    dispatch(fetchNotifications(id));
    dispatch(fetchMainUser(state.auth?.data?._id));
    dispatch(fetchUserSubscribers(id));
    dispatch(fetchOneUser(id));
  };

  // Принять пользователя в друзья
  const acceptFriend = async () => {
    await dispatch(
      fetchAcceptFriend({
        id: id,
        index: mainUser?.subscribers.findIndex((userId) => userId === id),
        user: id,
      }),
    );
    dispatch(fetchMainUser(state.auth?.data?._id));
    dispatch(fetchUserFriends(id));
    dispatch(fetchOneUser(id));
  };

  // Удалить пользователя из друзей
  const deleteFriend = async () => {
    await dispatch(
      fetchDeleteFriend({
        id: id,
        index: user?.friends.findIndex((userId) => userId === mainUser?._id),
        index2: mainUser?.friends.findIndex((userId) => userId === id),
        user: id,
      }),
    );
    dispatch(fetchMainUser(state.auth?.data?._id));
    dispatch(fetchUserFriends(id));
    dispatch(fetchOneUser(id));
  };

  const loadStatus =
    state.user.status === 'loaded' &&
    state.auth.status === 'loaded' &&
    state.note.status === 'loaded' &&
    state.messages.status === 'loaded';

  const subscribedToYou = mainUser?.subscribers?.find((userId) => userId === id) === undefined ? 0 : 1;

  const youSubscriber =
    user?.subscribers?.find((userId) => userId === mainUser?._id) === undefined ? 0 : 1;

  const friend = mainUser?.friends?.find((userId) => userId === id) === undefined ? 0 : 1;

  const acceptFriendBool = subscribedToYou !== 0 && youSubscriber === 0 && friend !== +id;

  return (
    <>
      {mainUser?._id !== id ? (
        <button
          className="avatar_send-message-user-interaction___interaction"
          onClick={() =>
            loadStatus
              ? acceptFriendBool
                ? acceptFriend()
                : friend === 1
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
            : friend === 1
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
