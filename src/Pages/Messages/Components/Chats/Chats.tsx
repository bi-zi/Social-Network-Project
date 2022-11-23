import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { setFindChat } from '../../../../store/messages/slice';
import { useSort } from '../useSort';
import { NavLink } from 'react-router-dom';
import { ChatComponent } from '../Chat/ChatComponent';

import { Search } from '../../../../Svg';
import { ChatsSkeleton } from '../Chat/ChatsSkeleton';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

export const Chats: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const auth = useAppSelector((state) => state.auth?.data);
  const messages = useAppSelector((state) => state?.messages);

  const { sortedUsers } = useSort(messages.mainUserMessages?.[0]);

  const users = sortedUsers();
  const selectedUser = users?.[localStorage.chatIndexWithSort];

  const loadStatus = messages.status === 'loaded' && state.auth.status === 'loaded';

  React.useEffect(() => {
    sortedUsers();
  }, [messages.mainUserMessages, sortedUsers]);

  return (
    <div className="chats-container">
      <form className="chats-form__find-chat">
        {loadStatus ? (
          <>
            <div className="chats-form__search-icon">
              <Search />
            </div>
            <input
              ref={inputRef}
              type="text"
              pattern="^[a-zA-Z0-9 ]+$"
              onChange={(e) => dispatch(setFindChat(e.target.value))}
              className="chats-form__input"
            />
          </>
        ) : (
          <Skeleton className="chats-form__search-icon" />
        )}
      </form>

      {users.length !== 0 && loadStatus ? (
        <div className="chats-users">
          {users.map((user, index) => (
            <ChatComponent users={user} indexId={index} selected={selectedUser} key={user._id} />
          ))}
        </div>
      ) : users.length !== 0 && !loadStatus ? (
        <ChatsSkeleton chats={10} />
      ) : !loadStatus || (users.length === 0 && loadStatus) ? (
        <div className="chats-users">
          <div className="chats-empty">
            <NavLink to={`/Friends/${auth?._id}`}>Find friends to chat</NavLink>
          </div>
        </div>
      ) : (
        ''
      )}

      <div className="chats-footer">
        {loadStatus ? (
          <a href="https://github.com/bi-zi" className="chats-footer__link">
            Github
          </a>
        ) : (
          <Skeleton className="chats-footer__link" width={'8vw'} />
        )}
      </div>
    </div>
  );
};
