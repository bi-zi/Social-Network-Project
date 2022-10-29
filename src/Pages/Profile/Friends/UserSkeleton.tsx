import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

type MyProps = {
  users: number;
};

export const UserSkeleton: React.FC<MyProps> = ({ users }: MyProps) => {
  return (
    <>
      {Array(users)
        .fill(0)
        .map((user, i) => (
          <div key={i} className={`${i}`}>
            <div className="profile-friends__container__friend-skeleton">
              <Skeleton
                circle
                className="profile-friends__container__friend__avatar"
                style={{ borderWidth: 0, cursor: 'auto' }}
              />
              <Skeleton width={'90%'} height={'1vh'} style={{ marginTop: '.5vh', cursor: 'auto' }} />
            </div>
          </div>
        ))}
    </>
  );
};
