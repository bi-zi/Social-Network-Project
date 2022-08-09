import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetMessages } from '../store/slices/messages.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

function Messages() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const findFriends = state.messages.data.find((x) => x.user === state.auth?.data?._id)
    ?.correspondence[0];
  const friends = state.user?.usersAll.filter((x, i) => findFriends.withWho.includes(x._id));
  console.log(friends);
  React.useEffect(() => {
    dispatch(fetchGetMessages());
  }, []);

  return (
    <div className="messages_container">
      <div className="messages_friends">
        <div className="messages_control_panel">
          <FontAwesomeIcon className="messages_searchIcon" icon="fa-solid fa-magnifying-glass" />
          <input className="messages_find_friend" />

          {friends.map((friend, i) => (
            <div className="message_left" key={friend._id}>
              <img src={friend.imageUrl} alt="" className="message_left_avatar" />
              <div className='message_left_fullName'>{friend.fullName}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="messages_from_friend"></div>
    </div>
  );
}

export default Messages;
