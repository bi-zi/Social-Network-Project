import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import {
  fetchGetMessages,
  fetchChatUser,
  fetchAddMessage,
  setAddMessages,
} from '../../../store/messages/slice';
import { NavLink } from 'react-router-dom';
import { useSort } from '../useSort';

export const Correspondence: React.FC = () => {
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state);
  const auth = useAppSelector((state) => state.auth?.data);
  const messages = useAppSelector((state) => state.messages);
  const userMessages = useAppSelector((state) => state.messages?.userMessages?.[0]);

  const divRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState('');

  const { sortedUsers, selectedChat } = useSort(userMessages);
  const users = sortedUsers();
  const chat = selectedChat();

  const selectedUser = users?.[localStorage.chatIndexWithSort];

  // Index чата в массиве без сортировки чтобы правильно отправлять данные
  const chatIndexUnSort = userMessages?.correspondence.findIndex(
    (chat) => chat?.withWho === messages?.selectedUser,
  );

  // Index чата в массиве с сортировкой чтобы правильно отправлять данные
  const chatIndexSort = users.findIndex((userId) => userId._id === messages?.selectedUser);

  // Сохранение индексов чтобы на случай перезагрузки страницы открывался последний чат
  if (messages?.selectedUser !== '') {
    localStorage.setItem('chatIndexWithSort', chatIndexSort + '');
    localStorage.setItem('chatIndexWithoutSort', chatIndexUnSort + '');
  }

  const messagesLength =
    userMessages?.correspondence[localStorage.chatIndexWithoutSort]?.messages.length;

  const loadStatus =
    messages.status === 'loaded' && state.user.status === 'loaded' && state.auth.status === 'loaded';

  const scrollToTop = () => {
    if (divRef.current !== null) {
      divRef.current!.scrollTop = 0;
    }
  };

  const scrollToBottom = () => {
    if (divRef.current !== null) {
      divRef.current!.scrollTop = divRef.current!.scrollHeight;
    }
  };

  const onSendMessage = async (e: React.FormEvent<HTMLFormElement>, values: string) => {
    e.preventDefault();

    await dispatch(
      fetchAddMessage({
        message: values,
        userId: auth?._id,
        withWho: selectedUser?._id,
        user: auth?._id,
        yourIndex: localStorage.chatIndexWithoutSort,
        hisIndex:
          messages.data2?.[0]?.correspondence.findIndex((chat) => chat.withWho === auth?._id) + '',
      }),
    );

    firstRef.current!.value = '';
    dispatch(fetchGetMessages(auth?._id));
    dispatch(fetchChatUser(selectedUser?._id));

    setTimeout(scrollToBottom, 400);
  };

  useEffect(() => {
    dispatch(fetchGetMessages(auth?._id));
    dispatch(fetchChatUser(selectedUser?._id));
  }, [auth?._id, dispatch, selectedUser?._id]);

  return (
    <div className="messages__correspondence-container" onLoad={() => setTimeout(scrollToBottom, 0)}>
      {selectedUser === undefined ? (
        <div className="messages__correspondence-select-chat">Select chat</div>
      ) : (
        <>
          <div className="messages__correspondence-header">
            <NavLink to={`/Profile/${selectedUser?._id}`}>
              <div className="messages__correspondence-header-fullName">{selectedUser?.fullName}</div>
            </NavLink>

            <NavLink to={`/Profile/${selectedUser?._id}`}>
              <img
                src={selectedUser?.imageUrl}
                width="100"
                alt=""
                className="messages__correspondence-header-avatar"
              />
            </NavLink>
          </div>

          <div className="messages__correspondence" ref={divRef}>
            {messagesLength! > messages?.addMessages && loadStatus ? (
              <div
                className="messages__correspondence-add-20"
                onClick={() => {
                  dispatch(setAddMessages(messages?.addMessages + 20));
                  setTimeout(scrollToTop, 20);
                }}>
                Add more messages
              </div>
            ) : (
              ''
            )}
            {chat?.length === 0 ? (
              <div className="messages__correspondence-empty">Write the first message in the chat</div>
            ) : (
              chat?.map((message, index) => (
                <div className="messages__correspondence-message-block" key={index}>
                  {(message?.userId !== chat[index - 1]?.userId ||
                    Number(new Date(message?.date)) >
                      Number(new Date(chat[index - 1]?.date)) + 60000 * 3) &&
                  message.userId !== undefined ? (
                    <>
                      <img
                        src={
                          state.user?.usersAll.filter((user) => message.userId?.includes(user._id))[0]
                            ?.imageUrl
                        }
                        alt=""
                        width="100"
                        className="messages__correspondence-message-avatar"
                      />
                      <div className="messages__correspondence-message-fullName">
                        {
                          state.user?.usersAll.filter((user) => message.userId?.includes(user._id))[0]
                            ?.fullName
                        }
                      </div>
                      <div className="messages__correspondence-message-date">{`${new Date(
                        message.date,
                      ).toLocaleDateString()} - ${new Date(message.date).toLocaleTimeString()}`}</div>
                    </>
                  ) : (
                    ''
                  )}
                  <div className="messages_correspondence-message">{message.message}</div>
                </div>
              ))
            )}
          </div>

          <form
            className="messages__correspondence-panel"
            onSubmit={(e) => (text?.length !== 0 && loadStatus ? onSendMessage(e, text) : '')}>
            <label>
              <input
                type="text"
                ref={firstRef}
                className="messages__correspondence-panel-input"
                required={true}
                minLength={1}
                maxLength={300}
                pattern="^[a-zA-Z0-9 !#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$"
                title="Only these characters can be used a-zA-Z0-9 !#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~"
                onChange={(e) => setText(e.target.value)}
              />
            </label>
            <button type="submit" className="messages__correspondence-panel-button">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};
