import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchChatUser, setSelectedUser, setFindChat } from '../../../store/messages/slice';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSort } from '../useSort';

export const Chats: React.FC = () => {
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth?.data);
  const messages = useAppSelector((state) => state?.messages);

  const divRef = useRef<HTMLDivElement>(null);

  const { evryChatLastMessage, sortedUsers } = useSort(messages.userMessages?.[0]);

  const lastMessage = evryChatLastMessage();
  const users = sortedUsers();

  const selectedUser = users?.[localStorage.chatIndexWithSort];

  const scrollToBottom = () => {
    if (divRef.current !== null) {
      divRef.current!.scrollTop = divRef.current!.scrollHeight;
    }
  };

  return (
    <div className="messages__chats-container">
      <form className="messages__find-chat">
        <FontAwesomeIcon className="messages__search-icon" icon={faMagnifyingGlass} />
        <input
          type="text"
          pattern="^[a-zA-Z0-9 ]+$"
          onChange={(e) => dispatch(setFindChat(e.target.value))}
          className="messages__find-chat-input"
        />
      </form>

      {users.length !== 0 ? (
        <div className="messages__chats">
          {users.map((friend, index) => (
            <div
              className={`messages__chats-item ${
                messages?.selectedUser === friend._id ? 'messages__chats-item-color' : ''
              }`}
              key={friend._id}
              onClick={() => {
                dispatch(setSelectedUser(friend._id));
                dispatch(fetchChatUser(selectedUser?._id));
                setTimeout(scrollToBottom, 0);
              }}>
              <img src={friend.imageUrl} width="100" alt="" className="messages__chats-item-avatar" />

              <div className='messages_name_lastMessages_block'>
                <div className="messages__chats-item-fullName">
                  {friend.firstName + ' ' + friend.lastName}
                </div>

                {lastMessage![index] !== undefined ? (
                  <div className="messages__chats-item-message__name-block">
                    <div className="messages__chats-item-message-name">
                      {lastMessage![index]?.userId === friend._id
                        ? friend.firstName + ':'
                        : lastMessage![index].message === undefined
                        ? 'Write the first message'
                        : 'You:'}
                    </div>

                    <div className="messages__chats-item-last-message">
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
                <div className="messages__chats-item-time">{`${new Date(
                  lastMessage![index]?.date,
                ).toLocaleTimeString()}`}</div>
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="messages__chats-empty">
          <NavLink to={`/Friends/${auth?._id}`}>Find friends to chat</NavLink>
        </div>
      )}
    </div>
  );
};
