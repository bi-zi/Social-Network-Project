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

  let readyPhotos = [];
  let local = localStorage.slider.split(',');
  let bufferPhotos = local;
  if (bufferPhotos[0].length === 0) {
    bufferPhotos.shift();
  }
  if (local.length > 1) {
    bufferPhotos.map((x, i) => (i % 2 === 0 ? readyPhotos.push(x + ',' + local[i + 1]) : ''));
  }
  if (local === 1) {
    readyPhotos = [
      'https://cdn.icon-icons.com/icons2/510/PNG/512/android-arrow-down-right_icon-icons.com_50544.png',
    ];
  }

  const onPhotoDelete = () => {
    dispatch(setUserPhotosDelete(readyPhotos.filter((x, index) => index !== +id)));
  };

  //console.log('удаление', user.userPhotos);
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
