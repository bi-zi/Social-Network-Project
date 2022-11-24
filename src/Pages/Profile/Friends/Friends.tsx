import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchUserFriends } from '../../../store/user/slice';
import { setCatergorySort } from '../../../store/friends/slice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.scss';
import { UserSkeleton } from './UserSkeleton';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type MyParams = {
  id: string;
};

export const Friends: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const { id } = useParams<keyof MyParams>() as MyParams;

  let userFriends = [...user?.findUserFriends?.slice(0, 12)]?.sort(function (a, b) {
    if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
      return 1;
    }
    if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
      return -1;
    }
    return 0;
  });

  const loadStatus = user.status === 'loaded';

  React.useEffect(() => {
    dispatch(fetchUserFriends(id));
  }, [dispatch, id]);

  return (
    <div className="profile-friends">
      {loadStatus ? (
        <Link
          to={`/Users/${id}`}
          className="profile-friends__title"
          onClick={() => dispatch(setCatergorySort('friends'))}>
          Friends - {user?.findUserFriends?.length}
        </Link>
      ) : (
        <Skeleton className="profile-friends__title-skeleton" />
      )}

      <div className="profile-friends__container">
        {loadStatus ? (
          userFriends.map((friend, index) => (
            <div key={friend._id} className={`${index}`}>
              <Link to={`/Profile/${friend._id}`}>
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
          ))
        ) : (
          <UserSkeleton users={12} />
        )}
      </div>
    </div>
  );
};
