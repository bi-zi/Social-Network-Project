import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ImageParsing from '../../ImageParsing/ImageParsing';
import { setInputNumber } from '../../store/slices/user';
import './style.css';
import { useParams } from 'react-router-dom';
import { fetchSubscribe } from '../../store/slices/user';
function Avatar() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { id } = useParams();

  const user = state.user.usersAll.find((x) => x._id === id);

  console.log();
  return (
    <div className="avatar">
      <div className="avatar_backGround">
        {state.user.status === 'loaded' ? (
          <Link to={`/${id}/PhotoAvatar/0`}>
            <img src={user?.imageUrl} alt="" className="avatar_image" />
          </Link>
        ) : (
          ''
        )}

        {state.auth.data?._id === id && state.user.status === 'loaded' ? (
          <div className="avatar_button">
            <div className="avatar_change">Сhange photo</div>
            <button
              onChange={() => {
                dispatch(setInputNumber('0'));
              }}
              className="avatar_input">
              <ImageParsing />
            </button>
          </div>
        ) : (
          <div
            className="add_friend"
            onClick={() =>  dispatch(fetchSubscribe({ userId: state.auth.data?._id }, "62e2f500149541c80f009ecb"))}>
            <div className="add_friend_text">Send friend request</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Avatar;
