import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ImageParsing from '../../ImageParsing/ImageParsing';
import { setInputNumber } from '../../store/images';
import './style.css';

function Avatar() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  localStorage.setItem('avatarImages', state.images.avatarImages);
  if (state.images.avatarImages.length === 0) {
    localStorage.setItem('avatarImages', 'https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png');
  }
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
          <Link to={`/PhotoAvatar/0`}>
            <img src={state.images.avatarImages} alt="" className="avatar_image" />
          </Link>
        )}

        <div className="avatar_button">
          <div className="avatar_change">Сhange photo</div>
          <button onChange={() => dispatch(setInputNumber('0'))} className="avatar_input">
            <ImageParsing  />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Avatar;
