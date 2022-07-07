import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { setPostText } from '../../store/post';

import ImageParsing from '../../ImageParsing/ImageParsing';
import { setInputNumber } from '../../store/images';

import { Link } from 'react-router-dom';
import './style.css';

function Post() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  //console.log(asz)

  const [postEffect, setPostEffect] = React.useState(11);
  //let test = ['photos', 'video', 'music', 'geo', 'file'];

  localStorage.setItem('postImages', JSON.stringify(state.images.postImages));
  let readyPhotos = state.images.postImages;


  return (
    <div
      className={`post ${state.post.postText.length > 0 ? 'post_text' : ''} ${
        readyPhotos.length > 0 ? 'post_photos' : ''
      }`}>
      <img src={state.images.avatarImages} alt="" className="post_avatar" />
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
      <button onChange={() => dispatch(setInputNumber('2'))} className="post_image_input">
        <ImageParsing />
      </button>

      <FontAwesomeIcon className="post_video" icon="fa-solid fa-film" />
      <FontAwesomeIcon className="post_audio" icon="fa-solid fa-music" />
      <FontAwesomeIcon className="post_location" icon="fa-solid fa-location-pin" />
      <FontAwesomeIcon className="post_file" icon="fa-solid fa-file-lines" />

      {state.post.postText.length > 0 ? <div className="postText">{state.post.postText}</div> : ''}

      {readyPhotos.length > 0 ? (
        <div className="container3">
          {readyPhotos.map((image, index) => {
            return (
              <Link to={`/PhotoPost/${index}`} key={index}>
                <img
                  key={index}
                  src={image}
                  alt=""
                  className={`photo-${index} ${
                    index === 0 ? 'large' : index === 1 ? 'small-right' : 'small-down'
                  } ${readyPhotos.length === 1 ? 'one_image' : ''} ${
                    readyPhotos.length === 2 && index === 0
                      ? 'two_image_one'
                      : readyPhotos.length === 2 && index === 1
                      ? 'two_image_two'
                      : ''
                  }`}
                />
              </Link>
            );
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Post;
