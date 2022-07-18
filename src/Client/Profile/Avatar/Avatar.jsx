import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ImageParsing from '../../ImageParsing/ImageParsing';
import { setInputNumber } from '../../store/images';
import './style.css';
import { useParams } from 'react-router-dom';
import { fetchUserUpdate, fetchAllUsers, fetchOneUser } from '../../store/slices/user';
function Avatar() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { id } = useParams();

  const user = state.user.userOne?.[0];



  return (
    <div className="avatar">
      <div className="avatar_backGround">
        {
          <Link to={`/${id}/PhotoAvatar/0`}>
            <img src={user?.imageUrl} alt="" className="avatar_image" />
          </Link>
        }

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
