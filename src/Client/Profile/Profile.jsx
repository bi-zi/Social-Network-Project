import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth } from '../store/slices/auth';

import Avatar from './Avatar/Avatar';
import UserInfo from './UserInfo/UserInfo';
import PhotoSlider from './PhotoSlider/PhotoSlider';
import Post from './Post/Post';
import Wall from './Wall/Wall';
import Friends from './Friends/Friends';
import Subscribers from './Subscribers/Subscribers';
import Groups from './Groups/Groups';
import Videos from './Videos/Videos';
import Music from './Music/Music';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  // console.log(
  // '-----AVATAR-----',state.user.status,
  // '-----SLIDER-----',state.slider.status,
  // '-----POST-----',state.post.userPosts.status);

  const isAuth = useSelector(selectIsAuth);


  if (localStorage.isAuth === undefined) {
    return <Navigate to="/Login" />;
  }

  return (
    <div className="container">
      <UserInfo />
      <PhotoSlider />
      {state.auth.data?._id === id ? <Post /> : ''}
      <Wall />
      <div className="left_container">
        <Avatar />
        <Friends />
        <Subscribers />
      </div>

      {/* <Groups />
      <Videos />
      <Music /> */}
    </div>
  );
}

export default Profile;
