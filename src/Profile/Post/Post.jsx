import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { setPostText } from '../../store/post';
import './style.css';

function Post() {
  const dispatch = useDispatch();
  const avatar = useSelector((state) => state.photo);
  const post = useSelector((state) => state.post);
  const [postEffect, setPostEffect] = React.useState(67);
  let test = ['photos', 'video', 'music', 'geo', 'file'];
  console.log(test[postEffect]);
  return (
    <div className={`post ${post.postText > 0 ? 'post_text' : ''} post_${test[postEffect]} `}>
      <div className="post_backGround">
        <img src={avatar.userAvatar} alt="" className="post_avatar" />
        <input
          type="text"
          className="post_input"
          placeholder="Post an entry"
          maxLength={175}
          onChange={(e) => dispatch(setPostText(e.target.value))}
        />
        <button className="post_button">
          <FontAwesomeIcon className="post_send" icon="fa-solid fa-play" />
        </button>
        <FontAwesomeIcon
          className="post_image"
          icon="fa-regular fa-image"
          onClick={() => (postEffect !== 0 ? setPostEffect(0) : setPostEffect())}
        />
        <FontAwesomeIcon className="post_video" icon="fa-solid fa-film" />
        <FontAwesomeIcon className="post_audio" icon="fa-solid fa-music" />
        <FontAwesomeIcon className="post_location" icon="fa-solid fa-location-pin" />
        <FontAwesomeIcon className="post_file" icon="fa-solid fa-file-lines" />

        {post.postText.length > 0 ? <div className="postText">{post.postText}</div> : ''}

        {postEffect === 0 ? (
          <div class="container1">
            <img
              src="https://funart.pro/uploads/posts/2021-04/1618438416_9-funart_pro-p-oboi-fon-klassnii-fon-9.png"
              alt=""
              className="photo1 photo-1 large"
            />
            <img
              src="https://funart.pro/uploads/posts/2021-04/1618424300_22-funart_pro-p-oboi-fon-krutoi-fon-22.jpg"
              alt=""
              className="photo1 photo-2 small"
            />
            <img
              src="https://kartinkin.net/uploads/posts/2021-07/1625631028_33-kartinkin-com-p-krutoi-fon-dlya-arta-art-krasivo-33.jpg"
              alt=""
              className="photo1 photo-3 small"
            />
            <img
              src="https://krot.info/uploads/posts/2021-01/1611759789_44-p-prikolnii-fon-dlya-avi-58.jpg"
              alt=""
              className="photo1 photo-4 small"
            />
            <img
              src="https://kartinkin.net/uploads/posts/2021-07/1625525396_28-kartinkin-com-p-fon-s-melkimi-detalyami-krasivie-foni-29.jpg"
              alt=""
              className="photo1 photo-5 small"
            />
            <img
              src="https://krot.info/uploads/posts/2021-01/1611923231_51-p-fon-s-melkimi-detalyami-61.jpg"
              alt=""
              className="photo1 photo-6 small"
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Post;
