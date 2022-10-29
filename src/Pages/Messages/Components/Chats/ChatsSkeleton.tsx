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
            <Skeleton className="chats-users__item__avatar" />
            <div className="chats-users__item__full-name-last-message">
              <Skeleton
                className="chats-users__item__full-name-last-message__full-name"
                height={'2vh'}
                width={'12vw'}
              />

              <div className="chats-users__item__full-name-last-message__message">
                <Skeleton
                  className="chats-users__item__full-name-last-message__message__name"
                  height={'1.5vh'}
                  width={'3vw'}
                />
                <Skeleton
                  className="chats-users__item__full-name-last-message__message_last-message"
                  height={'1.5vh'}
                  width={'15vw'}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
