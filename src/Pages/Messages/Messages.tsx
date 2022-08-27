import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchGetMessages, fetchAddMessage } from '../../store/messages/slice';
import { NavLink, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

export const Messages: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const divRef = React.useRef<HTMLDivElement>(null);
  const firstRef = React.useRef<HTMLInputElement>(null);

  const [selectUser, setSelectUser] = React.useState(
    state.messages?.sortedId.length !== 0 ? state.messages.sortedId : undefined,
  );

  const [text, setText] = React.useState('');
  const [findChat, setFindChat] = React.useState<any>();

  const findFriends = state.messages.data.find((x) => x.user === state.auth?.data?._id);

  const lastMessage = findFriends?.correspondence
    .map((x) => x?.messages[x.messages.length - 1])
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  const friends = state.user?.usersAll.filter((x, i) =>
    findFriends?.correspondence.map((x) => x?.withWho)?.includes(x._id),
  );

  const friendId = findFriends?.correspondence
    ?.map((x) => x?.messages[x.messages.length - 1])
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .map((x) => x.withWho);

  let sortedFriends = [];

  for (let i = 0; i < friendId!?.length; i++) {
    for (let j = 0; j < friends?.length; j++)
      if (friendId![i] === friends[j]?._id) {
        sortedFriends.push(friends[j]);
      }
  }

  if (findChat?.length > 0) {
    sortedFriends = friends.filter((x) => x.fullName.toLowerCase().includes(findChat?.toLowerCase()));
  }

  if (sortedFriends.length === 0) sortedFriends = friends;

  let userIndex = state.messages.data
    .find((x) => x.user === state.auth?.data?._id)
    ?.correspondence.findIndex((x) => x?.withWho === selectUser);

  if (selectUser !== undefined) localStorage.setItem('userIndex', userIndex + '');

  let chatIndex = sortedFriends.findIndex((x) => x._id === selectUser);

  if (selectUser !== undefined) localStorage.setItem('chatIndex', chatIndex + '');

  const selectedMessage = state.messages.data.find((x) => x.user === state.auth?.data?._id)
    ?.correspondence[localStorage.userIndex]?.messages;

  const selectedUser = [sortedFriends[localStorage.chatIndex]];

  const scrollToBottom = () => {
    divRef.current!.scrollTop = divRef.current!.scrollHeight;
  };

  const onSubmit = async (values: string) => {
    await dispatch(
      fetchAddMessage({
        message: values,
        userId: state.auth.data._id,
        withWho: selectedUser?.[0]._id,
        user: state.auth.data._id,
        yourIndex: localStorage.userIndex,
        hisIndex:
          state.messages.data
            .find((x) => x.user === selectedUser?.[0]?._id)
            ?.correspondence.findIndex((x) => x.withWho === state.auth.data?._id) + '',
      }),
    );

    firstRef.current!.value = '';
    dispatch(fetchGetMessages());
  };

  React.useEffect(() => {
    dispatch(fetchGetMessages());
    setTimeout(scrollToBottom, 200);
  }, [dispatch]);

  if (localStorage.isAuth === undefined) {
    return <Navigate to="/Login" />;
  }

  return (
    <div className="messages_container">
      <div className="messages_friends">
        <div className="messages_left_control_panel">
          <FontAwesomeIcon className="messages_searchIcon" icon="fa-solid fa-magnifying-glass" />
          <input
            type="text"
            pattern="^[a-zA-Z0-9 ]+$"
            onChange={(e) => setFindChat(e.target.value)}
            className="messages_find_friend"
          />
          <div className="messages_left_container">
            {sortedFriends.map((friend, i) => (
              <div
                className="message_left"
                key={friend._id}
                onClick={() => {
                  setSelectUser(friend._id);

                  setTimeout(scrollToBottom, 0);
                }}>
                <img src={friend.imageUrl} alt="" className="message_left_avatar" />
                <div className="message_left_fullName">{friend.fullName}</div>

                {lastMessage![i] !== undefined ? (
                  <div className="message_left_time">{`${new Date(
                    lastMessage![i]?.date,
                  ).toLocaleTimeString()} - ${new Date(
                    lastMessage![i]?.date,
                  ).toLocaleDateString()}`}</div>
                ) : (
                  ''
                )}

                {lastMessage![i] !== undefined ? (
                  <div className="message_name_box">
                    <div className="message_name">
                      {lastMessage![i]?.userId === friend._id
                        ? friend.fullName.split(' ')[0] + ':'
                        : 'You:'}
                    </div>
                    <div className="messages_left_last">
                      {lastMessage![i]?.message?.slice(0, 40)}
                      {lastMessage![i]?.message?.length > 40 ? '...' : ''}
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="messages_from_friend">
        {selectedUser[0] === undefined ? (
          <div className="select_chat">Select chat</div>
        ) : (
          <>
            {selectedUser?.map((select, i) => (
              <div className="messages_right_header" key={select?._id}>
                <NavLink to={`/Profile/${select._id}`}>
                  <img src={select?.imageUrl} alt="" className="messages_right_avatar" />
                  <div className="message_right_fullName">{select?.fullName}</div>
                </NavLink>
              </div>
            ))}
            <div className="messages_all" ref={divRef}>
              {selectedMessage?.length === 0 ? (
                <div className="meessages_zero">Write the first message in the chat</div>
              ) : (
                selectedMessage?.map((message, i) => (
                  <div className="message_box" key={i}>
                    {(message?.userId !== selectedMessage[i - 1]?.userId ||
                      message?.date !== selectedMessage[i - 1]?.date) &&
                    message.userId !== undefined ? (
                      <>
                        <img
                          src={
                            state.user?.usersAll.filter((x, i) => message.userId?.includes(x._id))[0]
                              ?.imageUrl
                          }
                          alt=""
                          className="messages_all_avatar"
                        />
                        <div className="messages_all_fullName">
                          {
                            state.user?.usersAll.filter((x, i) => message.userId?.includes(x._id))[0]
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
                  text?.length !== 0 ? (onSubmit(text), setTimeout(scrollToBottom, 200)) : ''
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