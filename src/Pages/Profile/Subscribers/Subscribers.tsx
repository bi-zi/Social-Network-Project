import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchOneUser, fetchUserSubscribers, setCatergory } from '../../../store/user/slice';
import { fetchUserPostsAll } from '../../../store/post/slice';
import { fetchSlider } from '../../../store/slider/slice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export type MyParams = {
  id: string;
};

export const Subscribers: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<keyof MyParams>() as MyParams;
  const user = useAppSelector((state) => state.user);
  const [key, setKey] = React.useState(false);

  const userProfile = user?.userOne?.[0];
  const subscribers = user?.findUserSubscribers;

  const fetchData = (id: string) => {
    dispatch(fetchOneUser(id));
    dispatch(fetchUserPostsAll(id));
    dispatch(fetchSlider(id));
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
    dispatch(fetchUserSubscribers(id));
  }, [dispatch, id]);

  return (
    <div className="profile_friends">
      <Link
        to={`/Friends/${id}`}
        className="profile_friends_title"
        style={{ textDecoration: 'none' }}
        onClick={() => dispatch(setCatergory('subscribers'))}>
        Subscribers -&nbsp;
        {subscribers.length}
      </Link>

      <div className="profile_friends_container">
        {subscribers.map((subscriber) => (
          <div key={subscriber._id}>
            {!key ? (
              <Link
                to={`/Profile/${subscriber._id}`}
                key={subscriber._id}
                style={{ textDecoration: 'none' }}>
                <div
                  className="profile_friend"
                  onClick={() => {
                    fetchData(subscriber._id);
                    window.scrollTo(0, 0);
                  }}>
                  <img src={subscriber.imageUrl} width={10} alt="" className="profile_friend_avatar" />
                  <div className="profile_friend_name">{subscriber.firstName}</div>
                </div>
              </Link>
            ) : (
              <div className="profile_friend" key={subscriber._id}>
                <img src={subscriber.imageUrl} alt="" className="profile_friend_avatar" />
                <div className="profile_friend_name">{subscriber.firstName}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
