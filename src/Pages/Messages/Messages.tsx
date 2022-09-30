import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchGetMessages, fetchChatUser, fetchAddMessage } from '../../store/messages/slice';
import { NavLink, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

export const Messages: React.FC = () => {
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state);
  const auth = useAppSelector((state) => state.auth?.data);
  const messages = useAppSelector((state) => state.messages);

  const divRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState('');
  const [findChat, setFindChat] = useState<any>();
  const [addMessages, setAddMessages] = useState<number>(20);
  const [selectUser, setSelectUser] = useState(
    messages?.sortedId.length !== 0 ? messages.sortedId : undefined,
  );

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  window.addEventListener('resize', function () {
    setWindowHeight(window.innerHeight);
    // setWindowWidth(window.innerWidth);
  });

  const findFriends = messages.data.find((x) => x?.user === auth?._id);

  const lastMessage = findFriends?.correspondence
    .map((x) => x?.messages[x.messages.length - 1])
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  const friends = state.user?.usersAll.filter((user) =>
    findFriends?.correspondence.map((chat) => chat?.withWho)?.includes(user._id),
  );

  const friendId = findFriends?.correspondence
    ?.map((chat) => chat?.messages[chat.messages.length - 1])
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .map((chat) => chat.withWho);

  let sortedFriends = [];

  for (let i = 0; i < friendId!?.length; i++) {
    for (let j = 0; j < friends?.length; j++)
      if (friendId![i] === friends[j]?._id) {
        sortedFriends.push(friends[j]);
      }
  }

  if (findChat?.length > 0) {
    sortedFriends = friends.filter((user) =>
      user.fullName.toLowerCase().includes(findChat?.toLowerCase()),
    );
  }

  if (sortedFriends.length === 0) sortedFriends = friends;

  let userIndex = messages.data
    .find((userChat) => userChat?.user === auth?._id)
    ?.correspondence.findIndex((chat) => chat?.withWho === selectUser);

  if (selectUser !== undefined) localStorage.setItem('userIndex', userIndex + '');

  let chatIndex = sortedFriends.findIndex((userId) => userId._id === selectUser);

  if (selectUser !== undefined) localStorage.setItem('chatIndex', chatIndex + '');

  const messagesLength = messages.data.find((userChat) => userChat?.user === auth?._id)?.correspondence[
    localStorage.userIndex
  ]?.messages.length;

  const selectedMessage = messages.data
    .find((userChat) => userChat?.user === auth?._id)
    ?.correspondence[localStorage.userIndex]?.messages?.slice()
    ?.reverse()
    .filter((chat, messageIndex) => messageIndex < addMessages)
    .reverse();

  const selectedUser = [sortedFriends[localStorage.chatIndex]];

  const scrollToBottom = () => {
    if (divRef.current !== null) {
      divRef.current!.scrollTop = divRef.current!.scrollHeight;
    }
  };

  const scrollToTop = () => {
    if (divRef.current !== null) {
      divRef.current!.scrollTop = 0;
    }
  };

  const onSubmit = async (e: any, values: string) => {
    e.preventDefault();
    await dispatch(
      fetchAddMessage({
        message: values,
        userId: auth?._id,
        withWho: selectedUser?.[0]._id,
        user: auth?._id,
        yourIndex: localStorage.userIndex,
        hisIndex:
          messages.data2
            .find((userChat) => userChat.user === selectedUser?.[0]?._id)
            ?.correspondence.findIndex((chat) => chat.withWho === auth?._id) + '',
      }),
    );

    setTimeout(scrollToBottom, 400);
    firstRef.current!.value = '';
    dispatch(fetchGetMessages(auth?._id));
    dispatch(fetchChatUser(selectedUser?.[0]?._id));
  };

  const loadStatus =
    messages.status === 'loaded' && state.user.status === 'loaded' && state.auth.status === 'loaded';

  useEffect(() => {
    dispatch(fetchGetMessages(auth?._id));
    dispatch(fetchChatUser(selectedUser?.[0]?._id));
  }, [auth?._id, dispatch, selectedUser?.[0]?._id]);

  if (localStorage.isAuth === undefined) {
    return <Navigate to="/Login" />;
  }

  return (
    <div className="messages__container">
      <div className="messages__chats-container">
        <form className="messages__find-chat">
          <FontAwesomeIcon className="messages__search-icon" icon={faMagnifyingGlass} />
          <input
            type="text"
            pattern="^[a-zA-Z0-9 ]+$"
            onChange={(e) => setFindChat(e.target.value)}
            className="messages__find-chat-input"
          />
        </form>

        {sortedFriends.length !== 0 ? (
          <div className="messages__chats">
            {sortedFriends.map((friend, index) => (
              <div
                className={`messages__chats-item ${
                  selectUser === friend._id ? 'messages__chats-item-color' : ''
                }`}
                key={friend._id}
                onClick={() => {
                  setSelectUser(friend._id);
                  dispatch(fetchChatUser(selectedUser?.[0]?._id));
                  setTimeout(scrollToBottom, 0);
                }}>
                <img src={friend.imageUrl} width="100" alt="" className="messages__chats-item-avatar" />
                <div className="messages__chats-item-fullName">{friend.fullName}</div>
                {lastMessage![index] !== undefined ? (
                  <div className="messages__chats-item-time">{`${new Date(
                    lastMessage![index]?.date,
                  ).toLocaleTimeString()}`}</div>
                ) : (
                  ''
                )}

                {lastMessage![index] !== undefined ? (
                  <div className="messages__chats-item-message__name-block">
                    <div className="messages__chats-item-message-name">
                      {lastMessage![index]?.userId === friend._id
                        ? friend.fullName.split(' ')[0] + ':'
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
            ))}
          </div>
        ) : (
          <div className="messages__chats-empty">
            <NavLink to={`/Friends/${auth?._id}`}>Find friends to chat</NavLink>
          </div>
        )}
      </div>

      <div className="messages__correspondence-container" onLoad={() => setTimeout(scrollToBottom, 0)}>
        {selectedUser[0] === undefined ? (
          <div className="messages__correspondence-select-chat">Select chat</div>
        ) : (
          <>
            {selectedUser?.map((select, index) => (
              <div className="messages__correspondence-header" key={select?._id}>
                <NavLink to={`/Profile/${select._id}`}>
                  <div className="messages__correspondence-header-fullName">{select?.fullName}</div>
                </NavLink>

                <NavLink to={`/Profile/${select._id}`}>
                  <img
                    src={select?.imageUrl}
                    width="100"
                    alt=""
                    className="messages__correspondence-header-avatar"
                  />
                </NavLink>
              </div>
            ))}

            <div className="messages__correspondence" ref={divRef}>
              {messagesLength! > addMessages && loadStatus ? (
                <div
                  className="messages__correspondence-add-20"
                  onClick={() => {
                    setAddMessages(addMessages + 20);
                    setTimeout(scrollToTop, 20);
                  }}>
                  Add more messages
                </div>
              ) : (
                ''
              )}
              {selectedMessage?.length === 0 ? (
                <div className="messages__correspondence-empty">Write the first message in the chat</div>
              ) : (
                selectedMessage?.map((message, index) => (
                  <div className="messages__correspondence-message-block" key={index}>
                    {(message?.userId !== selectedMessage[index - 1]?.userId ||
                      message?.date !== selectedMessage[index - 1]?.date) &&
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
              onSubmit={(e) => (text?.length !== 0 && loadStatus ? onSubmit(e, text) : '')}>
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
    </div>
  );
};
