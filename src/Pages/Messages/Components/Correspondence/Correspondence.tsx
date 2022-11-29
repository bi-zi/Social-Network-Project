import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { fetchUsersForChats } from '../../../../store/user/slice';
import {
  fetchMainUserMessages,
  fetchSecondUserMessages,
  fetchAddMessage,
  setAddMessages,
} from '../../../../store/messages/slice';
import { User } from '../../../../store/auth/types';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

export const Correspondence: React.FC = () => {
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state);
  const auth = useAppSelector((state) => state.auth?.data);
  const messages = useAppSelector((state) => state.messages);
  const mainUserMessages = useAppSelector((state) => state.messages?.mainUserMessages?.[0]);

  const divRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState('');

  const data = messages.mainUserMessages?.[0];
  let users: User[] = []; // Массив для отсортированных пользователей

  // Поиск участников чатов
  const chatsUsers = state.user?.chatUsers.filter((user) =>
    data?.correspondence.map((chat) => chat?.withWho)?.includes(user._id),
  );

  const sortedChats = data?.correspondence
    ?.map((chat) => chat?.messages[chat.messages.length - 1])
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  // Массив id отсортированных участников чата
  const usersId = sortedChats?.map((chat) => chat.withWho);

  // Сортировка участников по времени написания последнего сообщения методом сравнения двух массивов
  for (let i = 0; i < usersId!?.length; i++) {
    for (let j = 0; j < chatsUsers?.length; j++)
      if (usersId![i] === chatsUsers[j]?._id) {
        users.push(chatsUsers[j]);
      }
  }

  // Поиск по поисковому запросу
  if (messages?.findChat?.length > 0) {
    users = users.filter(
      (user) =>
        user.firstName[0].toLowerCase().includes(messages?.findChat[0]?.toLowerCase()) &&
        user.firstName.toLowerCase().includes(messages?.findChat?.toLowerCase()),
    );
  }

  if (users.length === 0) users = chatsUsers;

  const chat = messages.mainUserMessages?.[0]?.correspondence[
    localStorage.chatIndexWithoutSort
  ]?.messages
    ?.slice()
    ?.reverse()
    .filter((chat, messageIndex) => messageIndex < messages?.addMessages)
    .reverse();

  const selectedUser = users?.[+localStorage.chatIndexWithSort];

  // Index чата в массиве без сортировки чтобы правильно отправлять данные
  const chatIndexUnSort = mainUserMessages?.correspondence.findIndex(
    (chat) => chat?.withWho === messages?.selectedUser,
  );

  // Index чата в массиве с сортировкой чтобы правильно отправлять данные
  const chatIndexSort = users.findIndex((userId) => userId._id === messages?.selectedUser);

  // Сохранение индексов чтобы на случай перезагрузки страницы открывался последний чат
  if (messages?.selectedUser !== '' || chatIndexSort !== -1) {
    localStorage.setItem('chatIndexWithSort', chatIndexSort + '');
    localStorage.setItem('chatIndexWithoutSort', chatIndexUnSort + '');
    localStorage.setItem('selectedUser', messages?.selectedUser);
  }

  const messagesLength =
    mainUserMessages?.correspondence[localStorage.chatIndexWithoutSort]?.messages.length;

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
          messages.secondUserMessages?.[0]?.correspondence.findIndex(
            (chat) => chat.withWho === auth?._id,
          ) + '',
      }),
    );

    firstRef.current!.value = '';
    dispatch(fetchMainUserMessages(auth?._id));
    dispatch(fetchSecondUserMessages(selectedUser?._id));

    setTimeout(scrollToBottom, 400);
  };

  useEffect(() => {
    if (auth?._id !== undefined) {
      dispatch(fetchMainUserMessages(auth?._id));
      dispatch(fetchUsersForChats(auth?._id));
      dispatch(fetchSecondUserMessages(selectedUser?._id));
    }
  }, [dispatch, auth?._id, selectedUser?._id, chatIndexSort]);

  return (
    <div className="correspondence-container" onLoad={() => setTimeout(scrollToBottom, 0)}>
      {selectedUser !== undefined ? (
        <>
          <div className="correspondence-header">
            {loadStatus ? (
              <>
                <NavLink to={`/Profile/${selectedUser?._id}`}>
                  <div className="correspondence-header__full-name">
                    {selectedUser?.firstName + ' ' + selectedUser?.lastName}
                  </div>
                </NavLink>
                <NavLink to={`/Profile/${selectedUser?._id}`}>
                  <img
                    src={selectedUser?.imageUrl?.[0]}
                    width="10"
                    alt=""
                    className="correspondence-header__avatar"
                  />
                </NavLink>
              </>
            ) : (
              <>
                <Skeleton className="correspondence-header__skeleton-name" />
                <Skeleton className="correspondence-header__skeleton-avatar" />
              </>
            )}
          </div>

          <div className="correspondence" ref={divRef}>
            {messagesLength! > messages?.addMessages && loadStatus ? (
              <div
                className="correspondence__add-20"
                onClick={() => {
                  dispatch(setAddMessages(messages?.addMessages + 40));
                  setTimeout(scrollToTop, 200);
                }}>
                Add more messages
              </div>
            ) : messagesLength! > messages?.addMessages ? (
              <Skeleton className="correspondence__add-20" />
            ) : (
              ''
            )}

            {chat?.length !== 0 ? (
              chat?.map((message, index) => (
                <div className="correspondence-message" key={index}>
                  {(message?.userId !== chat[index - 1]?.userId ||
                    Number(new Date(message?.date)) >
                      Number(new Date(chat[index - 1]?.date)) + 60000 * 3) &&
                  message.userId !== undefined ? (
                    <>
                      {loadStatus ? (
                        <img
                          src={
                            state.user?.chatUsers.filter((user) => message.userId?.includes(user._id))[0]
                              ?.imageUrl?.[0]
                          }
                          alt=""
                          width="10"
                          className="correspondence-message__avatar"
                        />
                      ) : (
                        <Skeleton className="correspondence-message__avatar" />
                      )}

                      <div className="correspondence-message__info">
                        {loadStatus ? (
                          <>
                            <div className="correspondence-message__info-name">
                              {
                                state.user?.chatUsers?.filter((user) =>
                                  message?.userId?.includes(user._id),
                                )[0]?.firstName
                              }
                            </div>

                            <div className="correspondence-message__info-date">{`${new Date(
                              message.date,
                            ).toLocaleDateString()} - ${new Date(
                              message.date,
                            ).toLocaleTimeString()}`}</div>
                          </>
                        ) : (
                          <>
                            <Skeleton className="correspondence-message__info-skeleton-name" />
                            <Skeleton className="correspondence-message__info-skeleton-date" />
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                  {loadStatus ? (
                    <div className="correspondence-message__message">{message.message}</div>
                  ) : message?.message !== undefined ? (
                    <div className="correspondence-message__skeleton-message">
                      <Skeleton />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              ))
            ) : (
              <div className="correspondence-empty">Write the first message in the chat</div>
            )}
          </div>

          <form
            className="correspondence-sending-message"
            onSubmit={(e) => (text?.length !== 0 && loadStatus ? onSendMessage(e, text) : '')}>
            {messages.status === 'loaded' ? (
              <>
                <input
                  type="text"
                  ref={firstRef}
                  className="correspondence-sending-message__input"
                  required={true}
                  minLength={1}
                  maxLength={300}
                  placeholder="Write your message here"
                  pattern="^[a-zA-Z0-9 !#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$"
                  title="Only these characters can be used a-zA-Z0-9 !#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~"
                  onChange={(e) => setText(e.target.value)}
                />
                <button type="submit" className="correspondence-sending-message__button">
                  Send
                </button>
              </>
            ) : (
              <>
                <Skeleton className="correspondence-sending-message__input" />
                <Skeleton className="correspondence-sending-message__skeleton" />
              </>
            )}
          </form>
        </>
      ) : (
        <>
          <div className="correspondence-header"></div>
          <div className="correspondence"></div>
          <form className="correspondence-sending-message"></form>
          <div className="correspondence-select-chat">Select chat</div>
        </>
      )}
    </div>
  );
};
