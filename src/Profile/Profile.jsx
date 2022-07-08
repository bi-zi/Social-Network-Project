import React from 'react';

import './profile.css';
import { useSelector } from 'react-redux';
import Avatar from './Avatar/Avatar';
import UserInfo from './UserInfo/UserInfo';
import PhotoSlider from './PhotoSlider/PhotoSlider';
import Post from './Post/Post';
import Wall from './Wall/Wall';

function Profile() {
  const state = useSelector((state) => state);


  return (
    <div className="container">
      <UserInfo />
      <PhotoSlider />
      <Post />
      <Wall/>


      <Avatar />
      {/* <div className="friends">
        <div className="friends_backGround">
          <div className="friends_title">Friends</div>
        </div>
      </div>
      <div className="subscriptions">
        <div className="subscriptions_backGround">
          <div className="subscriptions_title">Subscriptions</div>
        </div>
      </div> */}

      {/* <div className="videos">
        <div className="videos_backGround">
          <div className="videos_title">Video recordings</div>
        </div>
      </div>

      <div className="music_profile">
        <div className="music_backGround">
          <div className="music_title">Music</div>
        </div>
      </div> */}
    </div>
  );
}

export default Profile;
