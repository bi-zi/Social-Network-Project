import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

type MyProps = {
  chats: number;
};

export const ChatsSkeleton: React.FC<MyProps> = ({ chats }: MyProps) => {
  return (
    <div className="chats-users">
      {Array(chats)
        .fill(0)
        .map((user, i) => (
          <div className={`chats-users__item`} key={i}>
            <Skeleton className="chats-users__item-avatar" />

            <div className="chats-users__item__info">
              <Skeleton className="chats-users__item__info-full-name chats-skeleton-name" />

              <div className="chats-users__item__info__message">
                <Skeleton className="chats-users__item__info__message-name chats-skeleton-message" />
                <Skeleton className="chats-users__item__info__message-last chats-skeleton-last" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
