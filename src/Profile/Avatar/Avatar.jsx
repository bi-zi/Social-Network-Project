import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageParsing from '../../ImageParsing/ImageParsing';
import { setInputNumber } from '../../store/images';
import './avatar.css';

function Avatar() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  localStorage.setItem('avatarImages', (state.images.avatarImages));

  return (
    <div className="avatar">
      <div className="avatar_backGround">
        {localStorage.avatarImages === '' ? (
          <img
            src="https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png"
            alt=""
            className="avatar_image"
          />
        ) : (
          <img src={state.images.avatarImages} alt="" className="avatar_image" />
        )}

        <div className="avatar_button" onChange={() => dispatch(setInputNumber('0'))}>
          <ImageParsing />

          <div className="avatar_change">Сhange photo</div>
        </div>
      </div>
    </div>
  );
}

export default Avatar;
