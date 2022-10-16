import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { fetchSecondUserMessages, setSelectedUser, setFindChat } from '../../../../store/messages/slice';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSort } from '../useSort';
import './style.scss';

export const Chats: React.FC = () => {
  const dispatch = useAppDispatch();

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

  const selectUser = (friendId: string) => {
    dispatch(setSelectedUser(friendId));
    dispatch(fetchSecondUserMessages(selectedUser?._id));
    dispatch(setFindChat(''));

    if (inputRef.current != null) {
      inputRef.current.value = '';
    }
    setTimeout(scrollToBottom, 0);
  };

  return (
    <div className="chats-container">
      <form className="chats-form__find-chat">
        <FontAwesomeIcon className="chats-form__search-icon" icon={faMagnifyingGlass} />
        <input
          ref={inputRef}
          type="text"
          pattern="^[a-zA-Z0-9 ]+$"
          onChange={(e) => dispatch(setFindChat(e.target.value))}
          className="chats-form__input"
        />
      </form>

      {users.length !== 0 ? (
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
                <div className="chats-users__item__full-name-last-message__full-name">
                  {friend.firstName + ' ' + friend.lastName}
                </div>

                {lastMessage![index] !== undefined ? (
                  <div className="chats-users__item__full-name-last-message__message">
                    <div className="chats-users__item__full-name-last-message__message__name">
                      {lastMessage![index]?.userId === friend._id
                        ? friend.firstName + ':'
                        : lastMessage![index].message === undefined
                        ? 'Write the first message'
                        : 'You:'}
                    </div>

                    <div className="chats-users__item__full-name-last-message__message_last-message">
                      {lastMessage![index]?.message?.split(' ').filter((x) => x.length >= 20).length ===
                      1
                        ? 'The message is too big'
                        : lastMessage![index]?.message?.slice(0, 40)}
                      {lastMessage![index]?.message?.length > 40 ? '...' : ''}
                    </div>
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
      ) : (
        <div className="chats-empty">
          <NavLink to={`/Friends/${auth?._id}`}>Find friends to chat</NavLink>
        </div>
      )}
    </div>
  );
};
