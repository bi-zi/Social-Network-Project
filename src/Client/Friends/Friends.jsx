import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './style.css';

function Friends() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let arr = state.user?.usersAll;

  return (
    <div className="friends">
      <div className="friends_result">
        {arr.map((x, i) => (
          <div className="friend" key={i}>
            <Link to={`/Profile/${x._id}`}>
              <img src={x.imageUrl} alt="" className="friend_avatar" />
            </Link>
            <Link to={`/Profile/${x._id}`} className="friend_name" style={{ textDecoration: 'none' }}>
              {x.fullName}
            </Link>
            <span className="friend_message">Send message</span>

            <div className="friend_menu">
              <div className="friend_content">
                <div className="friend_delete">Delete friend</div>
                <div className="friend_blackList">Add to blacklist</div>
              </div>
              <FontAwesomeIcon className="friend_menu_icon" icon="fa-solid fa-ellipsis" />
            </div>
          </div>
        ))}
      </div>

      <div className="friends_choice">1</div>
    </div>
  );
}

export default Friends;
