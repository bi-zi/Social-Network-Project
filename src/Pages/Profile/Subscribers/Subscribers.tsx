import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchOneUser, setCatergory } from '../../../store/user/slice';
import { fetchUserPostsAll } from '../../../store/post/slice';
import { fetchSlider } from '../../../store/slider/slice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.css';

export const Subscribers: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const state = useAppSelector((state) => state);
  const [key, setKey] = React.useState(false);

  const profileFriend = state.user?.userOne?.[0];
  let arr = state.user?.usersAll
    .filter((x, i) => profileFriend?.subscribers.includes(x._id))
    .splice(0, 8);

  const fetchData = (id: string) => {
    dispatch(fetchOneUser(id));
    dispatch(fetchUserPostsAll(id));
    dispatch(fetchSlider(id));
  };

  document.onkeydown = function (e) {
    if (e.ctrlKey) setKey(true);
    if (!e.ctrlKey) setKey(false);
  };

  return (
    <div className="profile_subscribers">
      <Link
        to={`/Friends/${id}`}
        className="profile_friends_title"
        style={{ textDecoration: 'none' }}
        onClick={() => dispatch(setCatergory('subscribers'))}>
        Subscribers -{' '}
        {state.user?.usersAll.filter((x, i) => profileFriend?.subscribers.includes(x._id))?.length}
      </Link>

      <div className="profile_friends_container">
        {arr.map((x, i) => (
          <div key={i}>
            {!key ? (
              <Link to={`/Profile/${x._id}`} key={i} style={{ textDecoration: 'none' }}>
                <div className="profile_friend" onClick={() => { fetchData(x._id);  window.scrollTo(0, 0);}}>
                  <img src={x.imageUrl} alt="" className="profile_friend_avatar" />
                  <div className="profile_friend_name">{x.fullName?.split(' ')[0]}</div>
                </div>
              </Link>
            ) : (
              <div className="profile_friend" key={i}>
                <img src={x.imageUrl} alt="" className="profile_friend_avatar" />
                <div className="profile_friend_name">{x.fullName?.split(' ')[0]}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
