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
          <div key={i}>
            <div className="users__left-panel__user-block">
              <Skeleton className="users__left-panel__user-block__avatar" />
              <Skeleton className="users__left-panel__user-block__avatar__full-name" width={'12vw'} />

              <div className="users__left-panel__user-block__skeleton">
                <Skeleton width={'6vw'} style={{ margin: 0 }} />
                <Skeleton width={'8vw'} style={{ margin: 0 }} />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
