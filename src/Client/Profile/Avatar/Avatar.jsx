import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ImageParsing from '../../ImageParsing/ImageParsing';
import { setInputNumber } from '../../store/images';
import './style.css';
import { useParams } from 'react-router-dom';
import { fetchUserUpdate, fetchAllUsers } from '../../store/slices/user';
function Avatar() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { id } = useParams();

  localStorage.setItem('avatarImages', state.images.avatarImages);
  if (state.images.avatarImages.length === 0) {
    localStorage.setItem('avatarImages', 'https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png');
  }
  const users = state.user.users?.find((x) => x._id === id);

  // const onSubmit = async () => {
  //   await dispatch(fetchUserUpdate({ imageUrl: [state.images.avatarImages][0] }, id));
  //   dispatch(fetchAllUsers());
  // };
console.log(4);
  // console.log(state.images.avatarImages);
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
            <img src={users?.imageUrl} alt="" className="avatar_image" />
          </Link>
        )}

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
      </div>
    </div>
  );
}

export default Avatar;
