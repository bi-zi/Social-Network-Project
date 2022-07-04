import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { setPostText } from '../../store/post';
import './style.css';

function Post() {
  const dispatch = useDispatch();
  const avatar = useSelector((state) => state.photo);
  const post = useSelector((state) => state.post)
 console.log(post.postText)

  return (
    <div className="post">
      <div className="post_backGround">
        <img src={avatar.userAvatar} alt="" className="post_avatar" />
        <input
          type="text"
          className="post_input"
          placeholder="Post an entry"
          onChange={(e) => dispatch(setPostText(e.target.value))}
        />
        <button className="post_button">
          <FontAwesomeIcon className="post_send" icon="fa-solid fa-play" />
        </button>

        <FontAwesomeIcon className="post_image" icon="fa-regular fa-image" />
        <FontAwesomeIcon className="post_video" icon="fa-solid fa-film" />
        <FontAwesomeIcon className="post_audio" icon="fa-solid fa-music" />
        <FontAwesomeIcon className="post_location" icon="fa-solid fa-location-pin" />
        <FontAwesomeIcon className="post_file" icon="fa-solid fa-file-lines" />
      </div>
    </div>
  );
}

export default Post;
