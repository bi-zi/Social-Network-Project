import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { setPostText, setPostVideo } from '../../store/post';
import { setPostImagesDelete } from '../../store/images';

import ImageParsing from '../../ImageParsing/ImageParsing';
import { setInputNumber } from '../../store/images';
import { setWallText, setWallImages, setWallVideo, setWallDate, setWallContent } from '../../store/wall';

import { Link } from 'react-router-dom';
import './style.css';

function Post() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [postEffect, setPostEffect] = React.useState();

  localStorage.setItem('postImages', JSON.stringify(state.images.postImages));
  let linkСheck = state.post.postVideo?.split('/');
  linkСheck = linkСheck?.[0] === 'https:' && linkСheck[2] === 'www.youtube.com';

  let readyPhotos = state.images.postImages;
  let url = state.post.postVideo;
  let src = url?.split('/')[3]?.split('=')[1];

  if (src === undefined) src = url?.split('/')[3];
  if (src === 'embed') src = url?.split('/')[4];

  let local = `https://www.youtube.com/embed/${src}`;

  if (linkСheck) localStorage.setItem('postVideo', local);
  if (state.post.postVideo?.length === 0) localStorage.setItem('postVideo', url);

  const textLength = state.post.postText.length;
  const postText = state.post.postText;
  const numImg = readyPhotos.length;

  const sendPost = () => {
    let date = new Date();
    date = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    if (textLength > 0 || numImg > 0 || local.split('/')[4] !== 'undefined') {
      dispatch(setWallContent([state.post.postText, state.images.postImages, local, date, 0, 0, []]));
      dispatch(setWallText(state.post.postText));
      dispatch(setWallImages(state.images.postImages));
      dispatch(setWallVideo(local));
      dispatch(setWallDate(date));
    }

    dispatch(setPostImagesDelete([]));
    dispatch(setPostText(''));
    dispatch(setPostVideo(''));
    setPostEffect();
  };

  return (
    <div className="post_container">
      <img src={state.user.userOne?.[0].imageUrl} alt="" className="post_avatar" />

      <input
        type="text"
        className="post_text_input"
        placeholder="Post an entry"
        maxLength={180}
        onChange={(e) => dispatch(setPostText(e.target.value))}
      />

      <button className="post_make_button" onClick={() => sendPost()}>
        <FontAwesomeIcon className="post_make_icon" icon="fa-solid fa-play" />
      </button>

      {/* imagesInput */}
      <FontAwesomeIcon className="post_image_icon" icon="fa-regular fa-image" />
      {numImg < 3 ? (
        <button onChange={() => dispatch(setInputNumber('2'))} className="post_image_input">
          <ImageParsing />
        </button>
      ) : (
        <div className="post_max_image">MAX</div>
      )}

      {/* videoInput */}
      <FontAwesomeIcon
        className="post_video_icon"
        icon="fa-solid fa-film"
        onClick={() => (postEffect !== 0 ? setPostEffect(0) : setPostEffect(1))}
      />
      {postEffect === 0 && !linkСheck ? (
        <input
          type="text"
          className="post_input_video"
          placeholder="Insert YouTube video link"
          onChange={(e) => dispatch(setPostVideo(e.target.value))}
        />
      ) : (
        ''
      )}

      {/*
      <FontAwesomeIcon className="post_audio_icon" icon="fa-solid fa-music" />
      <FontAwesomeIcon className="post_location_icon" icon="fa-solid fa-location-pin" />
      <FontAwesomeIcon className="post_file_icon" icon="fa-solid fa-file-lines" />
      */}

      <div className="wall_content">
        {/* postText */}
        {textLength > 0 ? <div className="post_show_text">{postText}</div> : ''}

        {/* imagesRender */}
        {numImg > 0 ? (
          <div className="post_images_container">
            {readyPhotos.map((image, index) => {
              return (
                <Link to={`/PhotoPost/${index}`} key={index}>
                  <img
                    key={index}
                    src={image}
                    alt=""
                    className={`post_image-${index} ${
                      index === 0
                        ? 'wall_large_image'
                        : index === 1
                        ? 'wall_small_right_image'
                        : 'wall_small_down_image'
                    }
                    ${numImg === 1 ? 'wall_one_image' : ''}
                    ${
                      numImg === 2 && index === 0
                        ? 'wall_two_image_first'
                        : numImg === 2 && index === 1
                        ? 'wall_two_image_second'
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

        {/* videoRender */}
        {linkСheck ? (
          <>
            <button className="video_delete" onClick={() => dispatch(setPostVideo(''))}>
              Delete video
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${src}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="wall_iframe"></iframe>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Post;
