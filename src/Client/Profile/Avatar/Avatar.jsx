import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe } from '../../store/slices/auth';
import { setInputNumber } from '../../store/slices/user';
import {
  fetchSubscribe,
  fetchUnsubscribe,
  fetchAcceptFriend,
  fetchDeleteFriend,
  fetchOneUser,
  fetchAllUsers,
} from '../../store/slices/user';
import { useParams } from 'react-router-dom';
import ImageParsing from '../../ImageParsing/ImageParsing';
import { Link } from 'react-router-dom';
import './style.css';

function Avatar() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { id } = useParams();

  const user = state.user?.userOne?.[0];
  const subscribedToYou = state.auth.data?.subscribers.find((x) => x === id) === undefined ? 0 : 1;
  const youSubscriber =
    user?.subscribers?.find((x) => x === state.auth?.data?._id) === undefined ? 0 : 1;
  const friend = state.auth.data?.friends.find((x) => x === id) === undefined ? 0 : 1;

  window.onpopstate = function (event) {
    //  console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
    if (document.location.pathname.split('/')[1] === 'Profile') dispatch(fetchOneUser(id));
  };

  const subscribe = async () => {
    await dispatch(fetchSubscribe({ authUserId: state.auth.data?._id, id: id }, id));
    dispatch(fetchOneUser(id));
    dispatch(fetchAuthMe());
  };

  const unsubscribe = async () => {
    await dispatch(
      fetchUnsubscribe(
        { id: id, index: user?.subscribers.findIndex((x) => x === state.auth.data?._id) },
        id,
      ),
    );
    dispatch(fetchOneUser(id));
    dispatch(fetchAuthMe());
  };

  const acceptFriend = async () => {
    console.log(state.auth.data?.subscribers.findIndex((x) => x === id));

    await dispatch(
      fetchAcceptFriend({ id: id, index: state.auth.data?.subscribers.findIndex((x) => x === id) }, id),
    );
    dispatch(fetchOneUser(id));
    dispatch(fetchAuthMe());
  };

  const deleteFriend = async () => {
    await dispatch(
      fetchDeleteFriend(
        {
          id: id,
          index: user?.friends.findIndex((x) => x === state.auth.data?._id),
          index2: state.auth.data?.friends.findIndex((x) => x === id),
        },
        id,
      ),
    );
    dispatch(fetchOneUser(id));

    dispatch(fetchAuthMe());
  };

  return (
    <div className="avatar">
      <div className="avatar_backGround">
        {state.user.status === 'loaded' ? (
          <Link to={`/${id}/PhotoAvatar/0`}>
            <img src={user?.imageUrl} alt="" className="avatar_image" />
          </Link>
        ) : (
          <img src={user?.imageUrl} alt="" className="avatar_image" />
        )}

        {state.auth?.data?._id === id ? (
          <div
            className="avatar_button"
            onChange={() => {
              dispatch(setInputNumber('0'));
            }}>
            {state.auth.data === null ? '' : <div className="avatar_change">Сhange photo</div>}

            {state.auth.data?._id === id &&
            state.user.status === 'loaded' &&
            state.slider.status === 'loaded' ? (
              <ImageParsing />
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}

        {state.auth.data === null || state.auth?.data?._id === id ? (
          ''
        ) : subscribedToYou !== 0 && youSubscriber === 0 && friend !== id ? (
          <>
            <button className="send_message">Send a message</button>
            <button
              className="delete_friend"
              onClick={() =>
                state.user.status === 'loaded' && state.auth.status === 'loaded' ? acceptFriend() : ''
              }>
              Accept friend request
            </button>
          </>
        ) : friend === 1 ? (
          <>
            <button className="send_message">Send a message</button>
            <button
              className="delete_friend"
              onClick={() =>
                state.user.status === 'loaded' && state.auth.status === 'loaded' ? deleteFriend() : ''
              }>
              Delete friend
            </button>
          </>
        ) : youSubscriber !== 0 ? (
          <>
            <button className="send_message">Send a message</button>
            <button
              className="delete_friend"
              onClick={() =>
                state.user.status === 'loaded' && state.auth.status === 'loaded' ? unsubscribe() : ''
              }>
              Unsubscribe
            </button>
          </>
        ) : youSubscriber === 0 ? (
          <>
            <button className="send_message">Send a message</button>
            <button
              className="delete_friend"
              onClick={() =>
                state.user.status === 'loaded' && state.auth.status === 'loaded' ? subscribe() : ''
              }>
              Send friend request
            </button>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Avatar;
