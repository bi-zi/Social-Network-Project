import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchUserSubscribers, setCatergory } from '../../../store/user/slice';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export type MyParams = {
  id: string;
};

export const Subscribers: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const { id } = useParams<keyof MyParams>() as MyParams;

  const subscribers = user?.findUserSubscribers;

  React.useEffect(() => {
    dispatch(fetchUserSubscribers(id));
  }, [dispatch, id]);

  return (
    <div className="profile-friends subscribers">
      <Link
        to={`/Friends/${id}`}
        className="profile-friends__title"
        style={{ textDecoration: 'none' }}
        onClick={() => dispatch(setCatergory('subscribers'))}>
        Subscribers -&nbsp;
        {subscribers.length}
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
        <div style={{ clear: 'both' }}> </div>
      </div>
    </div>
  );
};
