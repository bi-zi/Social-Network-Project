import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchGetMessages, fetchAddMessage } from '../../store/messages/slice';
import { NavLink, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './style.css';

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

  const findFriends = messages.data.find((x) => x.user === auth?._id);

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
    .find((userChat) => userChat.user === auth?._id)
    ?.correspondence.findIndex((chat) => chat?.withWho === selectUser);

  if (selectUser !== undefined) localStorage.setItem('userIndex', userIndex + '');

  let chatIndex = sortedFriends.findIndex((userId) => userId._id === selectUser);

  if (selectUser !== undefined) localStorage.setItem('chatIndex', chatIndex + '');

  const messagesLength = messages.data.find((userChat) => userChat.user === auth?._id)?.correspondence[
    localStorage.userIndex
  ]?.messages.length;

  const selectedMessage = messages.data
    .find((userChat) => userChat.user === auth?._id)
    ?.correspondence[localStorage.userIndex]?.messages?.slice()
    ?.reverse()
    .filter((chat, messageIndex) => messageIndex < addMessages)
    .reverse();

  const selectedUser = [sortedFriends[localStorage.chatIndex]];

  const scrollToBottom = () => {
    if (divRef.current !== null) divRef.current!.scrollTop = divRef.current!.scrollHeight;
  };

  const onSubmit = async (values: string) => {
    await dispatch(
      fetchAddMessage({
        message: values,
        userId: auth?._id,
        withWho: selectedUser?.[0]._id,
        user: auth?._id,
        yourIndex: localStorage.userIndex,
        hisIndex:
          messages.data
            .find((userChat) => userChat.user === selectedUser?.[0]?._id)
            ?.correspondence.findIndex((chat) => chat.withWho === auth?._id) + '',
      }),
    );

    firstRef.current!.value = '';
    dispatch(fetchGetMessages());
  };

  const loadStatus =
    messages.status === 'loaded' && state.user.status === 'loaded' && state.auth.status === 'loaded';

  useEffect(() => {
    dispatch(fetchGetMessages());
    setTimeout(scrollToBottom, 600);
  }, [dispatch]);

  if (localStorage.isAuth === undefined) {
    return <Navigate to="/Login" />;
  }

  return (
    <div className="messages_container">
      <div className="messages_friends">
        <div className="messages_left_control_panel">
          <FontAwesomeIcon className="messages_searchIcon" icon={faMagnifyingGlass} />
          <input
            type="text"
            pattern="^[a-zA-Z0-9 ]+$"
            onChange={(e) => setFindChat(e.target.value)}
            className="messages_find_friend"
          />
          {sortedFriends.length !== 0 ? (
            <div className="messages_left_container">
              {sortedFriends.map((friend, index) => (
                <div
                  className={`message_left ${selectUser === friend._id ? 'message_color' : ''}`}
                  key={friend._id}
                  onClick={() => {
                    setSelectUser(friend._id);

                    setTimeout(scrollToBottom, 0);
                  }}>
                  <img src={friend.imageUrl} alt="" className="message_left_avatar" />
                  <div className="message_left_fullName">{friend.fullName}</div>

                  {lastMessage![index] !== undefined ? (
                    <div className="message_left_time">{`${new Date(
                      lastMessage![index]?.date,
                    ).toLocaleTimeString()} - ${new Date(
                      lastMessage![index]?.date,
                    ).toLocaleDateString()}`}</div>
                  ) : (
                    ''
                  )}

                  {lastMessage![index] !== undefined ? (
                    <div className="message_name_box">
                      <div className="message_name">
                        {lastMessage![index]?.userId === friend._id
                          ? friend.fullName.split(' ')[0] + ':'
                          : 'You:'}
                      </div>
                      <div className="messages_left_last">
                        {lastMessage![index]?.message?.slice(0, 40)}
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
            <NavLink to={`/Friends/${auth?._id}`} className="message_left_linkToFriends">
              Find friends to chat
            </NavLink>
          )}
        </div>
      </div>
      <div className="messages_from_friend">
        {selectedUser[0] === undefined ? (
          <div className="select_chat">Select chat</div>
        ) : (
          <>
            {selectedUser?.map((select, index) => (
              <div className="messages_right_header" key={select?._id}>
                <NavLink to={`/Profile/${select._id}`}>
                  <img src={select?.imageUrl} alt="" className="messages_right_avatar" />
                  <div className="message_right_fullName">{select?.fullName}</div>
                </NavLink>
              </div>
            ))}
            <div className="messages_all" ref={divRef}>
              {messagesLength! > addMessages && loadStatus ? (
                <div className="messages_add_20" onClick={() => setAddMessages(addMessages + 20)}>
                  Add more messages
                </div>
              ) : (
                ''
              )}
              {selectedMessage?.length === 0 ? (
                <div className="meessages_zero">Write the first message in the chat</div>
              ) : (
                selectedMessage?.map((message, index) => (
                  <div className="message_box" key={index}>
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
                          className="messages_all_avatar"
                        />
                        <div className="messages_all_fullName">
                          {
                            state.user?.usersAll.filter((user) => message.userId?.includes(user._id))[0]
                              ?.fullName
                          }
                        </div>

                        <div className="messages_all_date">{`${new Date(
                          message.date,
                        ).toLocaleDateString()} - ${new Date(message.date).toLocaleTimeString()}`}</div>
                      </>
                    ) : (
                      ''
                    )}
                    <div className="message_user">{message.message}</div>
                  </div>
                ))
              )}
            </div>

            <div className="messages_right_control_panel">
              <input
                type="text"
                ref={firstRef}
                className="messages_right_input"
                required={true}
                minLength={1}
                maxLength={300}
                title="Only latin characters can be used"
                pattern="^[a-zA-Z0-9 ]+$"
                onChange={(e) => setText(e.target.value)}
              />
              <button
                type="submit"
                className="messages_right_button"
                onClick={() =>
                  text?.length !== 0 && loadStatus
                    ? (onSubmit(text), setTimeout(scrollToBottom, 400))
                    : ''
                }>
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
