import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setUserPhotosDelete } from '../../store/photo';
import { useDispatch, useSelector } from 'react-redux';
import './selectedPhoto.css';

function Photo() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.photo);

  const onPhotoDelete = () => {
    dispatch(setUserPhotosDelete(user.userPhotos.filter((x, index) => index !== +id)));
  };

  return (
    <div className="photo_viewing">
      <Link to="/Profile" style={{ color: '#000000' }} className="cloce">
        <FontAwesomeIcon className="close" icon="fa-solid fa-xmark" />
      </Link>
      <img src={user.userPhotos[id]} alt="" className="photo" />
      <div className="picture_control_panel">
        <Link
          className="delete_photo"
          to="/Profile"
          style={{ color: '#ffffff', textDecoration: 'none' }}
          onClick={onPhotoDelete}>
          Удалить фото
        </Link>
      </div>
    </div>
  );
}

export default Photo;
