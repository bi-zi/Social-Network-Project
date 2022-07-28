import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneUser } from '../../store/slices/user.js';
import { Link } from 'react-router-dom';
import { fetchUserPostsAll } from '../../store/slices/post';
import './style.css';

function Friends() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let arr = state.user?.usersAll;

  const fetchData = (id) => {
    dispatch(fetchOneUser(id));
    dispatch(fetchUserPostsAll(id));
  };

  return (
    <div className="profile_friends">
      <div className="profile_friends_title">Friends</div>
      <div className="profile_friends_container">
        {arr.map((x, i) => (
          <Link to={`/Profile/${x._id}`} key={i}>
            <div className="profile_friend" onClick={() => fetchData(x._id)}>
              <img src={x.imageUrl} alt="" className="profile_friend_avatar" />
              <div className="profile_friend_name">{x.fullName}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Friends;
