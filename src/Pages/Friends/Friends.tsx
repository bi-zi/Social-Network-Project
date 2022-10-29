import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchUsersPagination } from '../../store/friends/slice';
import { fetchOneUser, fetchUserFriends, fetchUserSubscribers } from '../../store/user/slice';
import { fetchNotifications } from '../../store/notifications/slice';

import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { FriendsControlPanel } from './Components/Friends control panel/FriendsControlPanel';
import { FriendsLeftPanel } from './Components/Friends left panel/FriendsLeftPanel';
import { UserSkeleton } from './Components/Friends left panel/UserSkeleton';
import './style.scss';

export type MyParams = {
  id: string;
};

export const Friends: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { id } = useParams<keyof MyParams>() as MyParams;

  let sortedFriends = state.friendsPage.users[2];

  if (state.friendsPage.categorySort === 'people') {
    sortedFriends = state.friendsPage.users[2];
  }

  if (state.friendsPage.categorySort === 'friends') {
    sortedFriends = state.user.findUserFriends;
  }

  if (state.friendsPage.categorySort === 'subscribers') {
    sortedFriends = state.user.findUserSubscribers;
  }

  // все эти if else я пытался выносить в функции но у меня не получалось достичь нужного результата поэтому
  // я решил оставть так тут нет ничего сложного просто сортировки
  if (state.friendsPage.sortBy === 'a-z') {
    sortedFriends = [...sortedFriends]?.sort(function (a, b) {
      if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
        return 1;
      }
      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
        return -1;
      }
      return 0;
    });
  }

  if (state.friendsPage.sortBy === 'z-a') {
    sortedFriends = [...sortedFriends]
      ?.sort(function (a, b) {
        if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
          return 1;
        }
        if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
          return -1;
        }
        return 0;
      })
      .reverse();
  }

  if (state.friendsPage.sortBy === 'friends') {
    sortedFriends = [...sortedFriends]?.sort(function (a, b) {
      if (a.friends.length < b.friends.length) {
        return 1;
      }
      if (a.friends.length > b.friends.length) {
        return -1;
      }
      return 0;
    });
  }

  if (state.friendsPage.sortBy === 'subscribers') {
    sortedFriends = [...sortedFriends]?.sort(function (a, b) {
      if (a.subscribers.length < b.subscribers.length) {
        return 1;
      }
      if (a.subscribers.length > b.subscribers.length) {
        return -1;
      }
      return 0;
    });
  }

  const checkPagination =
    state.friendsPage.users[1] >= state.friendsPage.users[0] &&
    state.friendsPage.categorySort === 'people';

  React.useEffect(() => {
    dispatch(fetchOneUser(id));
    dispatch(fetchUsersPagination(10));

    dispatch(fetchUserFriends(id));
    dispatch(fetchUserSubscribers(id));

    dispatch(fetchNotifications(id));
  }, [dispatch, id]);

  if (localStorage.isAuth === undefined) {
    return <Navigate to="/Login" />;
  }

  return (
    <div className="users">
      <div className="users__left-panel">
        {sortedFriends!.length > 0 && state.friendsPage.status === 'loaded' ? (
          sortedFriends!.map((friend) => (
            <FriendsLeftPanel
              data={friend}
              lastFriend={sortedFriends?.[sortedFriends!.length - 1]}
              key={friend?._id}
            />
          ))
        ) : state.friendsPage.status === 'loading' ? (
          <UserSkeleton users={10} />
        ) : state.friendsPage.categorySort === 'friends' ? (
          <div className="users__left-panel__zero-friends-subs">No friends 😭</div>
        ) : (
          <div className="users__left-panel__zero-friends-subs">No subscribers 😭</div>
        )}

        {checkPagination ? (
          <div
            className="users__left-panel__show-more-people"
            onClick={() =>
              state.friendsPage.status === 'loaded'
                ? dispatch(fetchUsersPagination(state.friendsPage.users[0] + 10))
                : ''
            }>
            Show more users
          </div>
        ) : (
          ''
        )}
      </div>

      <FriendsControlPanel data={id} />
    </div>
  );
};
