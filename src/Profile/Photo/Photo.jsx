import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setUserPhotosDelete, setPhotosChange } from '../../store/registration';
import { useDispatch, useSelector } from 'react-redux';
import './photo.css';

function Photo() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.user);

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
        <button className="delete_photo" onClick={onPhotoDelete}>
          <Link to="/Profile" style={{ color: '#ffffff', textDecoration: 'none' }}>
            Удалить фото
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Photo;
