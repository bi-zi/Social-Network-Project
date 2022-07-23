import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneUser } from '../../store/slices/user.js';
import {  Link } from 'react-router-dom';
import './style.css';

function Friends() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let arr = state.user?.usersAll;
  return (
    <div className="friends">
      <div className="friends_title">Friends</div>
      <div className="friends_container">
        {arr.map((x, i) => (
          <Link to="/Profile/62dbb19a0fc43f4e0a0a0b6f" key={i}>
            <div className="friend" onClick={() => dispatch(fetchOneUser(x._id))}>
              <img src={x.imageUrl} alt="" className="friend_avatar" />
              <div className="friend_name">{x.fullName}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Friends;
