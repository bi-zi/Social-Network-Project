import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './profile.css';
import { useSelector } from 'react-redux';
import Avatar from './Avatar/Avatar';
import UserInfo from './UserInfo/UserInfo';
import PhotoSlider from './PhotoSlider/PhotoSlider';

function Profile() {
  const avatar = useSelector((state) => state.photo);

  return (
    <div className="container">
      <Avatar />
      <UserInfo />

      <div className="friends">
        <div className="friends_backGround">
          <div className="friends_title">Friends</div>
        </div>
      </div>

      <PhotoSlider />

      <div className="subscriptions">
        <div className="subscriptions_backGround">
          <div className="subscriptions_title">Subscriptions</div>
        </div>
      </div>

      <div className="post">
        <div className="post_backGround">
          <img src={avatar.userAvatar} alt="" className="post_avatar" />
          <div className="post_title">Post an entry</div>
          <FontAwesomeIcon className="post_image" icon="fa-regular fa-image" />
          <FontAwesomeIcon className="post_video" icon="fa-solid fa-film" />
          <FontAwesomeIcon className="post_audio" icon="fa-solid fa-music" />
          <FontAwesomeIcon className="post_location" icon="fa-solid fa-location-pin" />
          <FontAwesomeIcon className="post_file" icon="fa-solid fa-file-lines" />
        </div>
      </div>

      <div className="videos">
        <div className="videos_backGround">
          <div className="videos_title">Video recordings</div>
        </div>
      </div>

      <div className="ready_post">
        <div className="ready_post_backGround">
          <img src={avatar.userAvatar} alt="" className="ready_post_avatar" />
          <div className="ready_post_fullName">Alexey Tsvetkov</div>
          <div className="ready_post_date"> 23 July 2022</div>
          <FontAwesomeIcon className="ready_post_menu" icon="fa-solid fa-ellipsis" />
          <div className="ready_post_message">Who is your friend?</div>
          <img src="" alt="" className="ready_post_content"></img>
          <div className="ready_post_from">Videos from Alexey Tsvetkov</div>
          <div className="ready_post_views">Views 341</div>
          <FontAwesomeIcon className="ready_post_like" icon="fa-regular fa-thumbs-up" />
          <FontAwesomeIcon className="ready_post_dislike" icon="fa-regular fa-thumbs-down" />
          <FontAwesomeIcon className="ready_post_comment" icon="fa-regular fa-comment-dots" />
          <FontAwesomeIcon className="ready_post_share" icon="fa-solid fa-share-nodes" />
        </div>
      </div>

      <div className="music_profile">
        <div className="music_backGround">
          <div className="music_title">Music</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
