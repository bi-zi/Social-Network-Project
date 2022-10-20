import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchUserFriends } from '../../../store/user/slice';
import { setCatergorySort } from '../../../store/friends/slice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.scss';

export type MyParams = {
  id: string;
};

export const Friends: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const { id } = useParams<keyof MyParams>() as MyParams;

  const userFriends = user?.findUserFriends;

  React.useEffect(() => {
    dispatch(fetchUserFriends(id));
  }, [dispatch, id]);

  return (
    <div className="profile-friends">
      <Link
        to={`/Friends/${id}`}
        className="profile-friends__title"
        style={{ textDecoration: 'none' }}
        onClick={() => dispatch(setCatergorySort('friends'))}>
        Friends - {userFriends?.length}
      </Link>

      <div className="profile-friends__container">
        {userFriends.map((friend) => (
          <div key={friend._id}>
            <Link to={`/Profile/${friend._id}`} key={friend._id} style={{ textDecoration: 'none' }}>
              <div
                className="profile-friends__container__friend"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}>
                <img
                  src={friend.imageUrl}
                  width={10}
                  alt=""
                  className="profile-friends__container__friend__avatar"
                />
                <div className="profile-friends__container__friend__name">{friend.firstName}</div>
              </div>
            </Link>
          </div>
        ))}
        <div style={{ clear: 'both' }}> </div>
      </div>
    </div>
  );
};
