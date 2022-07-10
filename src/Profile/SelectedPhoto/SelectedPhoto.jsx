import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAvatarImageDelete, setSLiderImagesDelete, setPostImagesDelete } from '../../store/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

function Photo() {
  const dispatch = useDispatch();
  const { category, id } = useParams();
  const state = useSelector((state) => state);



  let readyPhotos =
    category === 'PhotoAvatar'
      ? [state.images.avatarImages]
      : category === 'PhotoSlider'
      ? state.images.sliderImages
      : state.images.postImages;


  const onPhotoDelete = () => {
    category === 'PhotoAvatar'
      ? dispatch(setAvatarImageDelete('https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png'))
      : category === 'PhotoSlider'
      ? dispatch(setSLiderImagesDelete(readyPhotos.filter((x, index) => index !== +id)))
      : dispatch(setPostImagesDelete(readyPhotos.filter((x, index) => index !== +id)));
  };



  return (
    <div className="photo_viewing">
      <Link to="/Profile" style={{ color: '#000000' }} className="cloce">
        <FontAwesomeIcon className="close" icon="fa-solid fa-xmark" />
      </Link>
      <img src={readyPhotos[id]} alt="" className="photo" />
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
