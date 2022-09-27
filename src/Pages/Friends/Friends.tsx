import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchAuthMe } from '../../store/auth/slice';
import { fetchAllUsers, fetchDeleteFriend, fetchOneUser } from '../../store/user/slice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { fetchNotifications } from '../../store/notifications/slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

interface User {
  _id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  friends: string[];
  subscribers: string[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export type MyParams = {
  id: string;
};

export const Friends: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { id } = useParams<keyof MyParams>() as MyParams;

  const [catergory, setCategory] = React.useState(
    state.user.catergory === '' ? 'people' : state.user.catergory,
  );
  const [sortBy, setSortBy] = React.useState('');

  const user =
    state.user?.userOne?.[0] === undefined
      ? state.user.usersAll?.find((user) => user._id === id)
      : state.user?.userOne?.[0];

  let sortedFriends = [] as User[];

  if (catergory === 'friends') {
    sortedFriends = state.user.usersAll?.filter((userId) => user?.friends.includes(userId._id));
  }

  if (catergory === 'people') {
    sortedFriends = state.user.usersAll;
  }

  if (catergory === 'subscribers') {
    sortedFriends = state.user.usersAll?.filter((userId) => user?.subscribers.includes(userId._id));
  }

  if (sortBy === 'a-z') {
    sortedFriends = [...sortedFriends]?.sort(function (a, b) {
      if (a.fullName.toLowerCase() > b.fullName.toLowerCase()) {
        return 1;
      }
      if (a.fullName.toLowerCase() < b.fullName.toLowerCase()) {
        return -1;
      }
      return 0;
    });
  }

  if (sortBy === 'z-a') {
    sortedFriends = [...sortedFriends]
      ?.sort(function (a, b) {
        if (a.fullName.toLowerCase() > b.fullName.toLowerCase()) {
          return 1;
        }
        if (a.fullName.toLowerCase() < b.fullName.toLowerCase()) {
          return -1;
        }
        return 0;
      })
      .reverse();
  }

  if (sortBy === 'friends') {
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

  if (sortBy === 'subscribers') {
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

  const deleteFriend = async (userId: string) => {
    await dispatch(
      fetchDeleteFriend({
        id: userId,
        index: state.user.usersAll
          .find((user) => user._id === userId)!
          .friends.findIndex((friendId) => friendId === state.auth.data?._id),
        index2: state.auth.data?.friends.findIndex((friendId) => friendId === userId),
        user: id,
      }),
    );
    dispatch(fetchOneUser(id));
    dispatch(fetchAuthMe());
  };

  const loadStatus = state.user.status === 'loaded' && state.auth.status === 'loaded';

  React.useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchNotifications(id));
  }, []);

  if (localStorage.isAuth === undefined) {
    return <Navigate to="/Login" />;
  }

  return (
    <div className="friends">
      <div className="friends_left_panel">
        {sortedFriends.length > 0 ? (
          sortedFriends.map((friend) => (
            <div
              className="friends_user_block"
              key={friend._id}
              style={
                friend === sortedFriends[sortedFriends.length - 1]
                  ? { borderBottom: 'none' }
                  : { borderBottom: `` }
              }>
              <Link to={`/Profile/${friend._id}`} onClick={() => window.scrollTo(0, 0)}>
                <img src={friend.imageUrl} alt="" width={100} className="friends_user_avatar" />
              </Link>
              <Link
                to={`/Profile/${friend._id}`}
                className="friends_user_fullname"
                style={{ textDecoration: 'none' }}>
                {friend.fullName}
              </Link>

              {catergory === 'friends' ? (
                <div className="friend_menu">
                  <div className="friend_content">
                    <div
                      className="friend_delete"
                      onClick={() => (loadStatus ? deleteFriend(friend._id) : '')}>
                      Delete friend
                    </div>
                  </div>
                  <FontAwesomeIcon className="friend_menu_icon" icon={faEllipsis} />
                </div>
              ) : (
                ''
              )}

              <div className='number_of_friends_subs'>
                <span>Friends {friend.friends?.length}</span>
                <span>Subscribers {friend.subscribers?.length}</span>
              </div>
            </div>
          ))
        ) : catergory === 'friends' ? (
          <div className="zero_friends_subs">No friends 😭</div>
        ) : (
          <div className="zero_friends_subs">No subscribers 😭</div>
        )}
      </div>

      <div className="friends_right_panel">
        <div
          className="all_people"
          style={catergory === 'people' ? { color: 'black' } : {}}
          onClick={() => (loadStatus ? setCategory('people') : '')}>
          All people
        </div>
        <div
          className="all_friends"
          style={catergory === 'friends' ? { color: 'black' } : {}}
          onClick={() => (loadStatus ? setCategory('friends') : '')}>
          Friends
        </div>
        <div
          className="friend_subscribers"
          style={catergory === 'subscribers' ? { color: 'black' } : {}}
          onClick={() => (loadStatus ? setCategory('subscribers') : '')}>
          Subscribers
        </div>

        <div className="friends_sort_menu">
          <div className="friends_sort_category">
            <div
              className="A-Z_sort"
              style={sortBy === 'a-z' ? { color: 'black' } : {}}
              onClick={() => (loadStatus ? setSortBy('a-z') : '')}>
              Sort by A-Z
            </div>
            <div
              className="Z-A_sort"
              style={sortBy === 'z-a' ? { color: 'black' } : {}}
              onClick={() => (loadStatus ? setSortBy('z-a') : '')}>
              Sort by Z-A
            </div>
            <div
              className="friends_sort"
              style={sortBy === 'friends' ? { color: 'black' } : {}}
              onClick={() => (loadStatus ? setSortBy('friends') : '')}>
              Sort by friends
            </div>
            <div
              className="friends_sort"
              style={sortBy === 'subscribers' ? { color: 'black' } : {}}
              onClick={() => (loadStatus ? setSortBy('subscribers') : '')}>
              Sort by subscribers
            </div>
            <div
              className="subscribers_sort"
              style={sortBy !== 'people' ? { color: 'red' } : {}}
              onClick={() => (loadStatus ? setSortBy('people') : '')}>
              Do not sort
            </div>
          </div>
          <div className="friend_sort">Sort by</div>
        </div>
      </div>
    </div>
  );
};
