import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchOneUser, fetchUserFriends, setCatergory } from '../../../store/user/slice';
import { fetchUserPostsAll } from '../../../store/post/slice';
import { fetchSlider } from '../../../store/slider/slice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.scss';

export type MyParams = {
  id: string;
};

export const Friends: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<keyof MyParams>() as MyParams;
  const user = useAppSelector((state) => state.user);
  const [key, setKey] = React.useState(false);

  const userProfile = user?.userOne?.[0];
  const userFriends = user?.findUserFriends;

  const fetchData = async (userId: string) => {
    dispatch(fetchOneUser(userId));
    dispatch(fetchUserPostsAll(userId));
    dispatch(fetchSlider(userId));
  };

  document.onkeydown = (e: any) => {
    if (e.key) {
      setKey(true);
    }
  };

  document.onkeyup = (e: any) => {
    if (e.key) {
      setKey(false);
    }
  };

  React.useEffect(() => {
    dispatch(fetchUserFriends(id));
  }, [dispatch, id]);

  return (
    <div className="profile_friends">
      <Link
        to={`/Friends/${id}`}
        className="profile_friends_title"
        style={{ textDecoration: 'none' }}
        onClick={() => dispatch(setCatergory('friends'))}>
        Friends - {userFriends?.length}
      </Link>

      <div className="profile_friends_container">
        {userFriends.map((friend) => (
          <div key={friend._id}>
            {!key ? (
              <Link to={`/Profile/${friend._id}`} key={friend._id} style={{ textDecoration: 'none' }}>
                <div
                  className="profile_friend"
                  onClick={() => {
                    fetchData(friend._id);
                    window.scrollTo(0, 0);
                  }}>
                  <img src={friend.imageUrl} width={10} alt="" className="profile_friend_avatar" />
                  <div className="profile_friend_name">{friend.firstName}</div>
                </div>
              </Link>
            ) : (
              <div className="profile_friend" key={friend._id}>
                <img src={friend.imageUrl} alt="" className="profile_friend_avatar" />
                <div className="profile_friend_name">{friend.firstName}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
