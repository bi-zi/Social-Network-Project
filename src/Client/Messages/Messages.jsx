import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetMessages, fetchAddMessage } from '../store/slices/messages.js';
import { useForm } from 'react-hook-form';
import { NavLink, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

function Messages() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const divRef = React.useRef(null);

  const [select, setSelect] = React.useState();
  const [text, setText] = React.useState();

  const findFriends = state.messages.data
    .find((x) => x.user === state.auth?.data?._id)
    ?.correspondence.map((x) => x.withWho);

  const friends = state.user?.usersAll
    .filter((x, i) => findFriends?.includes(x._id))
    .sort((a, b) => b.date - a.date);

  const selectedMessage = state.messages.data.find((x) => x.user === state.auth?.data?._id)
    ?.correspondence[select]?.messages;

  const selectedUser = [friends[select]];

  const scrollToBottom = () => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  };

  const onSubmit = async (values) => {
    await dispatch(
      fetchAddMessage({
        message: values,
        userId: state.auth.data._id,
        withWho: selectedUser?.[0]._id,
        user: state.auth.data._id,
        yourIndex: select,
        hisIndex: state.messages.data
          .find((x) => x.user === selectedUser?.[0]?._id)
          ?.correspondence.findIndex((x) => x.withWho === state.auth.data?._id),
      }),
    );

    dispatch(fetchGetMessages());
  };

  const lastMessage = state.messages.data
    .find((x) => x.user === state.auth.data?._id)
    ?.correspondence.map((x) => x.messages[x.messages.length - 1]);

  React.useEffect(() => {
    dispatch(fetchGetMessages());
  }, []);

  if (localStorage.isAuth === undefined) {
    return <Navigate to="/Login" />;
  }

  const aaaaa = [];

  let cor = state.messages.data
    .find((x) => x.user === state.auth?.data?._id)
    ?.correspondence?.map((x) =>
      x.messages[x.messages.length - 1] !== undefined
        ? x.messages[x.messages.length - 1]
        : { userId: x.withWho },
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((x) => x.message);

  let bigBOn = state.messages.data
    .find((x) => x.user === state.auth?.data?._id)
    ?.correspondence?.filter((x, i) =>
      cor.includes(x.messages[x.messages?.length - 1].message)
        ? aaaaa.push(x.withWho)
        : '',
    );

  console.log(aaaaa);

  //d = `${d.toLocaleDateString()} ${d.toLocaleTimeString().slice(0, -3)}

  return (
    <div className="messages_container">
      <div className="messages_friends">
        <div className="messages_left_control_panel">
          <FontAwesomeIcon className="messages_searchIcon" icon="fa-solid fa-magnifying-glass" />
          <input className="messages_find_friend" />
          <div className="messages_left_container">
            {friends.map((friend, i) => (
              <div
                className="message_left"
                key={friend._id}
                onClick={() => {
                  setSelect(i);
                  setTimeout(scrollToBottom, 0);
                }}>
                <img src={friend.imageUrl} alt="" className="message_left_avatar" />
                <div className="message_left_fullName">{friend.fullName}</div>
                {lastMessage[i] !== undefined ? (
                  <div className="message_name_box">
                    <div className="message_name">
                      {lastMessage[i]?.userId === friend._id
                        ? friend.fullName.split(' ')[0] + ':'
                        : 'You:'}
                    </div>
                    <div className="messages_left_last">
                      {lastMessage[i]?.message.slice(0, 40)}
                      {lastMessage[i]?.message.length > 40 ? '...' : ''}
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
                    {message?.userId !== selectedMessage[i - 1]?.userId ||
                    message?.date !== selectedMessage[i - 1]?.date ? (
                      <>
                        <img
                          src={
                            state.user?.usersAll.filter((x, i) => message.userId.includes(x._id))[0]
                              .imageUrl
                          }
                          alt=""
                          className="messages_all_avatar"
                        />
                        <div className="messages_all_fullName">
                          {
                            state.user?.usersAll.filter((x, i) => message.userId.includes(x._id))[0]
                              .fullName
                          }
                        </div>

                        <div className="messages_all_date">{message.date}</div>
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
                className="messages_right_input"
                maxLength={300}
                defaultValue={''}
                title="Only latin characters can be used"
                pattern="^[a-zA-Z0-9 ]+$"
                onChange={(e) => setText(e.target.value)}
              />
              <button
                type="submit"
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
}

export default Messages;
