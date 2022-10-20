import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import {
  fetchDeleteFriend,
  fetchMainUser,
  fetchOneUser,
  fetchUserFriends,
  fetchUserSubscribers,
} from '../../../../store/user/slice';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

import { FriendsPageUser } from '../../../../store/friends/types';

export type MyParams = {
  id: string;
};

interface MyProps {
  data: FriendsPageUser;
  lastFriend: FriendsPageUser;
}

export const FriendsLeftPanel: React.FC<MyProps> = ({ data, lastFriend }: MyProps) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { id } = useParams<keyof MyParams>() as MyParams;

  const friend = data;

  const deleteFriend = async (userId: string) => {
    await dispatch(
      fetchDeleteFriend({
        id: userId,
        index: state.user.findUserFriends
          .find((user) => user._id === userId)!
          .friends.findIndex((friendId) => friendId === state.user.mainUser?._id),
        index2: state.user.mainUser?.friends.findIndex((friendId) => friendId === userId),
        user: id,
      }),
    );

    dispatch(fetchOneUser(id));
    dispatch(fetchMainUser(state.auth.data?._id));
    dispatch(fetchUserFriends(id));
    dispatch(fetchUserSubscribers(id));
  };

  const loadStatus = state.user.status === 'loaded' && state.auth.status === 'loaded';

  return (
    <div
      className="users__left-panel__user-block"
      style={friend === lastFriend ? { borderBottom: 'none' } : { borderBottom: `` }}>
      <Link to={`/Profile/${friend?._id}`} onClick={() => window.scrollTo(0, 0)}>
        <img
          src={friend?.imageUrl}
          alt=""
          width={10}
          className="users__left-panel__user-block__avatar"
        />
      </Link>
      <Link
        to={`/Profile/${friend?._id}`}
        className="users__left-panel__user-block__avatar__full-name"
        style={{ textDecoration: 'none' }}>
        {friend?.firstName + ' ' + friend?.lastName}
      </Link>

      {state.friendsPage.categorySort === 'friends' ? (
        <div className="users__left-panel__user-block__menu">
          <div className="users__left-panel__user-block__menu-content">
            <div
              className="users__left-panel__user-block__menu-content-delete"
              onClick={() => (loadStatus ? deleteFriend(friend?._id) : '')}>
              Delete friend
            </div>
          </div>
          <FontAwesomeIcon className="users__left-panel__user-block__menu-icon" icon={faEllipsis} />
        </div>
      ) : (
        ''
      )}

      <div className="users__left-panel__user-block__number-friends-subs">
        <span>Friends {friend?.friends?.length}</span>
        <span>Subscribers {friend?.subscribers?.length}</span>
      </div>
    </div>
  );
};