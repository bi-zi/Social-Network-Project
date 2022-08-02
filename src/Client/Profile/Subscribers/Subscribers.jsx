import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneUser, setCatergory } from '../../store/slices/user.js';
import { fetchUserPostsAll } from '../../store/slices/post';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.css';

function Subscribers() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const state = useSelector((state) => state);
  const profileFriend = state.user?.userOne?.[0];
  let arr = state.user?.usersAll
    .filter((x, i) => profileFriend?.subscribers.includes(x._id))
    .splice(0, 8);

  const fetchData = (id) => {
    dispatch(fetchOneUser(id));
    dispatch(fetchUserPostsAll(id));
  };

  return (
    <div className="profile_subscribers">
      <Link
        to={`/Friends/${id}`}
        className="profile_friends_title"
        style={{ textDecoration: 'none' }}
        onClick={() => dispatch(setCatergory('subscribers'))}>
        Subscribers -
        {state.user?.usersAll.filter((x, i) => profileFriend?.subscribers.includes(x._id))?.length}
      </Link>
      <div className="profile_friends_container">
        {arr.map((x, i) => (
          <Link to={`/Profile/${x._id}`} key={i} style={{ textDecoration: 'none' }}>
            <div className="profile_friend" onClick={() => fetchData(x._id)}>
              <img src={x.imageUrl} alt="" className="profile_friend_avatar" />
              <div className="profile_friend_name">{x.fullName?.split(' ')[0]}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Subscribers;
