import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ImageParsing from '../../ImageParsing/ImageParsing';
import { setInputNumber } from '../../store/slices/user';
import './style.css';
import { useParams } from 'react-router-dom';
import { fetchSubscribe, fetchAcceptFriend, fetchOneUser } from '../../store/slices/user';
import { fetchAuthMe } from '../../store/slices/auth';
import { useNavigate } from 'react-router-dom';

function Avatar() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { id } = useParams();

  const subscribe = async () => {
    await dispatch(fetchSubscribe({ authUserId: state.auth.data?._id, id: id }, id));
    dispatch(fetchOneUser(id));
    dispatch(fetchAuthMe());
  };

  const acceptFriend = async () => {
    await dispatch(
      fetchAcceptFriend({ id: id, index: state.auth.data?.subscribers.findIndex((x) => x === id) }, id),
    );
    dispatch(fetchOneUser(id));
    dispatch(fetchAuthMe());
  };

  const user = state.user?.userOne?.[0];
  const yourSubscriber = state.auth.data?.subscribers.find((x) => x === id);
  const youSubscriber = user?.subscribers?.find((x) => x === state.auth?.data?._id);
  const friend = state.auth.data?.friends.find((x) => x === id);



    // Нужно сделать отслеживание кнопки назад и вперед 


  // console.log('Ysub', yourSubscriber, 'youSub', youSubscriber, 'fri', friend);
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

        <div
          className="avatar_button"
          onChange={() => {
            dispatch(setInputNumber('0'));
          }}>
          <div className="avatar_change">Сhange photo</div>
          {state.auth.data?._id === id &&
          state.user.status === 'loaded' &&
          state.slider.status === 'loaded' ? (
            <ImageParsing />
          ) : (
            ''
          )}
        </div>

        {state.auth.data?._id === id || state.auth.data === null ? (
          ''
        ) : yourSubscriber !== undefined && friend !== id ? (
          <div className="add_friend" onClick={() => acceptFriend()}>
            <div className="add_friend_text">Accept friend request</div>
          </div>
        ) : friend === id ? (
          <div className="add_friend">
            <div className="add_friend_text">In friends</div>
          </div>
        ) : youSubscriber !== undefined ? (
          <div className="add_friend">
            <div className="add_friend_text">You subscriber</div>
          </div>
        ) : youSubscriber === undefined ? (
          <div className="add_friend" onClick={() => subscribe()}>
            <div className="add_friend_text">Send friend request</div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Avatar;
