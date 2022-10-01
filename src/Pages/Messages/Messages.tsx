import React, { useState, useEffect, useRef } from 'react';
import { Chats } from './components/Chats';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  fetchGetMessages,
  fetchChatUser,
  fetchAddMessage,
  setSelectedUser,
  setAddMessages,
  setFindChat,
} from '../../store/messages/slice';
import { NavLink, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

import { useSort } from './useSort';

export const Messages: React.FC = () => {
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state);
  const auth = useAppSelector((state) => state.auth?.data);
  const messages = useAppSelector((state) => state.messages);

  const divRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState('');

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  window.addEventListener('resize', function () {
    setWindowHeight(window.innerHeight);
    // setWindowWidth(window.innerWidth);
  });

  const {sortedChats, chatIndexWithoutSort, chatIndexWithSort, selectedChat } =
    useSort(messages.data);

  const chats = sortedChats();



  const chatIndex1 = chatIndexWithoutSort();
  const chatIndex2 = chatIndexWithSort();


  const selectedMessage = selectedChat();


  const messagesLength =
    messages.data?.[0]?.correspondence[localStorage.chatIndexWithoutSort]?.messages.length;

  const selectedUser = chats?.[localStorage.chatIndexWithSort];

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

  const onSendMessage = async (e: any, values: string) => {
    e.preventDefault();
    await dispatch(
      fetchAddMessage({
        message: values,
        userId: auth?._id,
        withWho: selectedUser?._id,
        user: auth?._id,
        yourIndex: localStorage.chatIndexWithoutSort,
        hisIndex:
          messages.data2
            .find((userChat) => userChat.user === selectedUser?._id)
            ?.correspondence.findIndex((chat) => chat.withWho === auth?._id) + '',
      }),
    );

    setTimeout(scrollToBottom, 400);
    firstRef.current!.value = '';
    dispatch(fetchGetMessages(auth?._id));
    dispatch(fetchChatUser(selectedUser?._id));
  };

  const loadStatus =
    messages.status === 'loaded' && state.user.status === 'loaded' && state.auth.status === 'loaded';

  useEffect(() => {
    dispatch(fetchGetMessages(auth?._id));
    dispatch(fetchChatUser(selectedUser?._id));
  }, [auth?._id, dispatch, selectedUser?._id]);

  if (localStorage.isAuth === undefined) {
    return <Navigate to="/Login" />;
  }

  return (
    <div className="messages__container">
      <Chats />

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
    </div>
  );
};
