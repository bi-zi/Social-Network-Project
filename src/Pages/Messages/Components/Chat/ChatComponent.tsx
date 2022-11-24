import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { fetchSecondUserMessages, setSelectedUser, setFindChat } from '../../../../store/messages/slice';
import { User } from '../../../../store/user/types';
import { useSort } from '../useSort';
import './style.scss';

interface MyProps {
  users: User;
  indexId: number;
  selected: User;
}

export const ChatComponent: React.FC<MyProps> = ({ users, indexId, selected }: MyProps) => {
  const dispatch = useAppDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const friend = users;
  const index = indexId;
  const selectedUser = selected;



  const messages = useAppSelector((state) => state?.messages);

  const divRef = useRef<HTMLDivElement>(null);

  const { evryChatLastMessage } = useSort(messages.mainUserMessages?.[0]);

  const lastMessage = evryChatLastMessage();

  const scrollToBottom = () => {
    if (divRef.current !== null) {
      divRef.current!.scrollTop = divRef.current!.scrollHeight;
    }
  };


  console.log(index,friend === selectedUser);

  // при выборе чата подгружаются данные переписки и обнуляются данные input
  const selectUser = (friendId: string) => {
    dispatch(setSelectedUser(friendId));
    if (selectedUser?._id !== friendId) {
      dispatch(fetchSecondUserMessages(selectedUser?._id));
    }
    dispatch(setFindChat(''));

    if (inputRef.current != null) {
      inputRef.current.value = '';
    }
    setTimeout(scrollToBottom, 0);
  };

  return (
    <div
      className={`chats-users__item${friend?._id === messages?.selectedUser ? '--selected' : ''}`}
      key={friend._id}
      onClick={(e) => {
        selectUser(friend._id);
      }}>
      <img src={friend.imageUrl} width="10" alt="" className="chats-users__item-avatar" />

      <div className="chats-users__item__info">
        <span className="chats-users__item__info-full-name">
          {friend.firstName + ' ' + friend.lastName}
        </span>

        {lastMessage![index] !== undefined ? (
          <div className="chats-users__item__info__message">
            <span className="chats-users__item__info__message-name">
              {lastMessage![index]?.userId === friend._id
                ? friend.firstName + ':'
                : lastMessage![index].message === undefined
                ? 'Write the first message'
                : 'You:'}
            </span>

            <span className="chats-users__item__info__message-last">
              {lastMessage![index]?.message?.split(' ').filter((x) => x.length >= 20).length === 1
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
  );
};
