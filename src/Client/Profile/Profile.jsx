import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Avatar from './Avatar/Avatar';
import UserInfo from './UserInfo/UserInfo';
import PhotoSlider from './PhotoSlider/PhotoSlider';
import Post from './Post/Post';
import Wall from './Wall/Wall';
import Friends from './Friends/Friends';
import Groups from './Groups/Groups';
import Videos from './Videos/Videos';
import Music from './Music/Music';
import { Navigate } from 'react-router-dom';
import { selectIsAuth } from '../store/slices/auth';

function Profile() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const isAuth = useSelector(selectIsAuth);
  if (isAuth === false) {
    return <Navigate to="/Login" />;
  }

  return (
    <div className="container">
      <UserInfo />
      <PhotoSlider />
      <Post />
      <Wall />
      <Avatar />
      <Friends />
      <Groups />
      <Videos />
      <Music />
    </div>
  );
}

export default Profile;
