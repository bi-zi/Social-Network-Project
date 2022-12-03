import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import {
  fetchDeleteFriend,
  fetchMainUser,
  fetchOneUser,
  fetchUserFriends,
  fetchUserSubscribers,
} from '../../../../store/old store/user/slice';
import { FriendsPageUser } from '../../../../store/old store/friends/types';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Settings } from '../../../../Svg';
import './style.scss';

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

  const deleteFriend = async (e: React.MouseEvent<HTMLDivElement>, userId: string) => {
    e.preventDefault();

    if (window.confirm('Are you sure you want to delete your friend?')) {
      const mainUserIndex = state.player.findUserFriends
        .find((user) => user._id === userId)!
        .friends.findIndex((friendId) => friendId === state.player.mainUser?._id);

      const secondUserIndex = state.player.mainUser?.friends.findIndex(
        (friendId) => friendId === userId,
      );
      await dispatch(
        fetchDeleteFriend({
          id: userId,
          index: mainUserIndex,
          index2: secondUserIndex,
          user: id,
        }),
      );

      dispatch(fetchOneUser(id));
      dispatch(fetchMainUser(state.oldAuth.data?._id));
      dispatch(fetchUserFriends(id));
      dispatch(fetchUserSubscribers(id));
    }
  };

  const loadStatus = state.player.status === 'loaded' && state.oldAuth.status === 'loaded';

  return (
    <div
      className="users__left-panel__user-block"
      style={friend === lastFriend ? { borderBottom: 'none' } : { borderBottom: `` }}>
      <Link to={`/Profile/${friend?._id}`} onClick={() => window.scrollTo(0, 0)}>
        <img
          src={friend?.imageUrl?.[0]}
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
              onClick={(e) => (loadStatus ? deleteFriend(e, friend?._id) : '')}>
              Delete friend
            </div>
          </div>
          <div className="users__left-panel__user-block__menu-icon">
            <Settings />
          </div>
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
