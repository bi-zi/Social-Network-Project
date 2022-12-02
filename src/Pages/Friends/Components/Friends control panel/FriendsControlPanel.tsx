import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { setCatergorySort, setSortBy } from '../../../../store/old store/friends/slice';
import './style.scss';

export type MyProps = {
  data: string;
};

export const FriendsControlPanel: React.FC<MyProps> = ({ data }: MyProps) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  const category = state.friendsPage.categorySort;
  const sortBy = state.friendsPage.sortBy;

  const loadStatus =
    state.user.status === 'loaded' &&
    state.oldAuth.status === 'loaded' &&
    state.friendsPage.status === 'loaded';

  return (
    <div className="users__right-panel">
      <div
        className="users__right-panel__all-people"
        style={category === 'people' ? { color: 'black' } : {}}
        onClick={() => (loadStatus ? dispatch(setCatergorySort('people')) : '')}>
        All people
      </div>
      <div
        className="users__right-panel__friends"
        style={category === 'friends' ? { color: 'black' } : {}}
        onClick={() => (loadStatus ? dispatch(setCatergorySort('friends')) : '')}>
        Friends
      </div>
      <div
        className="users__right-panel__subscribers"
        style={category === 'subscribers' ? { color: 'black' } : {}}
        onClick={() => (loadStatus ? dispatch(setCatergorySort('subscribers')) : '')}>
        Subscribers
      </div>

      <div className="users__right-panel__menu">
        <div className="users__right-panel__menu-sort">Sort by</div>

        <div className="users__right-panel__menu__category">
          <div
            className="users__right-panel__menu__category-all"
            style={sortBy === 'a-z' ? { color: 'black' } : {}}
            onClick={() => (loadStatus ? dispatch(setSortBy('a-z')) : '')}>
            Sort by A-Z
          </div>

          <div
            className="users__right-panel__menu__category-all"
            style={sortBy === 'z-a' ? { color: 'black' } : {}}
            onClick={() => (loadStatus ? dispatch(setSortBy('z-a')) : '')}>
            Sort by Z-A
          </div>

          <div
            className="users__right-panel__menu__category-all"
            style={sortBy === 'friends' ? { color: 'black' } : {}}
            onClick={() => (loadStatus ? dispatch(setSortBy('friends')) : '')}>
            Sort by friends
          </div>

          <div
            className="users__right-panel__menu__category-all"
            style={sortBy === 'subscribers' ? { color: 'black' } : {}}
            onClick={() => (loadStatus ? dispatch(setSortBy('subscribers')) : '')}>
            Sort by subscribers
          </div>

          <div
            className="users__right-panel__menu__category-default"
            style={sortBy !== 'people' ? { color: 'red' } : {}}
            onClick={() =>
              loadStatus ? (dispatch(setCatergorySort('people')), dispatch(setSortBy(''))) : ''
            }>
            Do not sort
          </div>
        </div>
      </div>
    </div>
  );
};
