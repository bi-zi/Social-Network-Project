import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { fetchSecondUserMessages, setSelectedUser, setFindChat } from '../../../../store/messages/slice';
import { useSort } from '../useSort';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ChatsSkeleton } from './ChatsSkeleton';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

export const Chats: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const auth = useAppSelector((state) => state.auth?.data);
  const messages = useAppSelector((state) => state?.messages);

  const divRef = useRef<HTMLDivElement>(null);

  const { evryChatLastMessage, sortedUsers } = useSort(messages.mainUserMessages?.[0]);

  const lastMessage = evryChatLastMessage();
  
  const users = sortedUsers();

  const selectedUser = users?.[localStorage.chatIndexWithSort];

  const scrollToBottom = () => {
    if (divRef.current !== null) {
      divRef.current!.scrollTop = divRef.current!.scrollHeight;
    }
  };

  // при выборе чата подгружаются данные переписки и обнуляются данные input
  const selectUser = (friendId: string) => {
    dispatch(setSelectedUser(friendId));
    dispatch(fetchSecondUserMessages(selectedUser?._id));
    dispatch(setFindChat(''));

    if (inputRef.current != null) {
      inputRef.current.value = '';
    }
    setTimeout(scrollToBottom, 0);
  };

  const loadStatus = messages.status === 'loaded' && state.auth.status === 'loaded';

  React.useEffect(() => {
    sortedUsers();
  }, [messages.mainUserMessages, sortedUsers]);

  return (
    <div className="chats-container">
      <form className="chats-form__find-chat">
        {loadStatus ? (
          <>
            <FontAwesomeIcon className="chats-form__search-icon" icon={faMagnifyingGlass} />
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
          {users.map((friend, index) => (
            <div
              className={`chats-users__item${
                friend?._id === messages?.selectedUser ? '--selected' : ''
              }`}
              key={friend._id}
              onClick={() => {
                selectUser(friend._id);
              }}>
              <img src={friend.imageUrl} width="10" alt="" className="chats-users__item__avatar" />
              <div className="chats-users__item__full-name-last-message">
                <span className="chats-users__item__full-name-last-message__full-name">
                  {friend.firstName + ' ' + friend.lastName}
                </span>

                {lastMessage![index] !== undefined ? (
                  <div className="chats-users__item__full-name-last-message__message">
                    <span className="chats-users__item__full-name-last-message__message__name">
                      {lastMessage![index]?.userId === friend._id
                        ? friend.firstName + ':'
                        : lastMessage![index].message === undefined
                        ? 'Write the first message'
                        : 'You:'}
                    </span>

                    <span className="chats-users__item__full-name-last-message__message_last-message">
                      {lastMessage![index]?.message?.split(' ').filter((x) => x.length >= 20).length ===
                      1
                        ? 'The message is too big'
                        : lastMessage![index]?.message?.slice(0, 40)}
                      {lastMessage![index]?.message?.length > 40 ? '...' : ''}
                    </span>
                  </div>
                ) : (
                  ''
                )}
              </div>
              {lastMessage![index] !== undefined ? (
                <div className="chats-users__item__time">{`${new Date(
                  lastMessage![index]?.date,
                ).toLocaleTimeString()}`}</div>
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
      ) : users.length !== 0 && !loadStatus ? (
        <ChatsSkeleton chats={10} />
      ) : !loadStatus || (users.length === 0 && loadStatus) ? (
        <div className="chats-users">
          <div className="chats-skeletons-fix-bag ">
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
