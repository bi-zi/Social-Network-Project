import React from 'react';
import { useParams } from 'react-router-dom';
import { setFirstName, setLastName, setPassword, setCheckAuth } from '../store/registration';
import { useDispatch, useSelector } from 'react-redux';

function Photo() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);

  return <img src={user.userPhotos[id]} alt="" className="avatar" />;
}

export default Photo;
