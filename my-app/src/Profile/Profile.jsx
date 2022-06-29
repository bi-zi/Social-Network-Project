import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './profile.css';

function Profile() {
  return (
    <div className="container">
      <div className="avatar">
        <div className="avatar_backGround">
          <img
            className="avatar_image"
            src="https://smmis.ru/wp-content/uploads/2015/01/gifnaavatar.gif"
            alt=""
          />

          <div className="avatar_button">
            <div className="avatar_change">Сhange photo</div>
          </div>
        </div>
      </div>

      <div className="about">
        <div className="about_backGround"></div>
        <div className="full_name">Alexey Tsvetkov</div>
        <div className="line"></div>
        <div className="lives">Lives in</div>
        <div className="from">From</div>
        <div className="born">Born on</div>
        <div className="profession">Profession</div>
        <div className="relationship">In a relationship with</div>
        <div className="student">Student at</div>
      </div>
      <div className="friends">
        <div className="friends_backGround">
          <div className="friends_title">Friends</div>
        </div>
      </div>

      <div className="images">
        <div className="images_backGround">
          <img
            src="https://i.pinimg.com/originals/89/06/bc/8906bcf9230e01dc532d2a47c594c50a.gif"
            alt=""
            className="image_1"
          />
          <img src="https://i.gifer.com/PGB7.gif" alt="" className="image_2" />
        </div>
      </div>

      <div className="subscriptions">
        <div className="subscriptions_backGround">
          <div className="subscriptions_title">Subscriptions</div>
        </div>
      </div>

      <div className="post">
        <div className="post_backGround">
          <img
            src="https://smmis.ru/wp-content/uploads/2015/01/gifnaavatar.gif"
            alt=""
            className="post_avatar"
          />
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
          <img
            src="https://smmis.ru/wp-content/uploads/2015/01/gifnaavatar.gif"
            alt=""
            className="ready_post_avatar"
          />
          <div className="ready_post_fullName">Alexey Tsvetkov</div>
          <div className="ready_post_date"> 23 July 2022</div>
          <FontAwesomeIcon className="ready_post_menu" icon="fa-solid fa-ellipsis" />
          <div className="ready_post_message">Who is your friend?</div>
          <img src="https://i.gifer.com/8ngt.gif" alt="" className="ready_post_content"></img>
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
