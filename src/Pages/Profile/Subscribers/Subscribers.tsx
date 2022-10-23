import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchUserSubscribers } from '../../../store/user/slice';
import { setCatergorySort } from '../../../store/friends/slice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface MyParams {
  id: string;
}

export const Subscribers: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const { id } = useParams<keyof MyParams>() as MyParams;

  const subscribers = [...user?.findUserSubscribers?.slice(0, 12)]?.sort(function (a, b) {
    if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
      return 1;
    }
    if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
      return -1;
    }
    return 0;
  });

  React.useEffect(() => {
    dispatch(fetchUserSubscribers(id));
  }, [dispatch, id]);

  return (
    <div className="profile-friends subscribers">
      <Link
        to={`/Friends/${id}`}
        className="profile-friends__title"
        style={{ textDecoration: 'none' }}
        onClick={() => dispatch(setCatergorySort('subscribers'))}>
        Subscribers -&nbsp;
        {user?.findUserSubscribers?.length}
      </Link>

      <div className="profile-friends__container">
        {subscribers.map((subscriber) => (
          <div key={subscriber._id}>
            <Link
              to={`/Profile/${subscriber._id}`}
              key={subscriber._id}
              style={{ textDecoration: 'none' }}>
              <div
                className="profile-friends__container__friend"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}>
                <img
                  src={subscriber.imageUrl}
                  width={10}
                  alt=""
                  className="profile-friends__container__friend__avatar"
                />
                <div className="profile-friends__container__friend__name ">{subscriber.firstName}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
