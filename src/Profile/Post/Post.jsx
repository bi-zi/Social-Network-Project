import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { setPostText, setPostVideo } from '../../store/post';

import ImageParsing from '../../ImageParsing/ImageParsing';
import { setInputNumber } from '../../store/images';

import { Link } from 'react-router-dom';
import './style.css';

function Post() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [postEffect, setPostEffect] = React.useState();

  localStorage.setItem('postImages', JSON.stringify(state.images.postImages));
  let linkСheck = state.post.postVideo.split('/');
  linkСheck = linkСheck[0] === 'https:' && linkСheck[2] === 'www.youtube.com';

  let readyPhotos = state.images.postImages;
  let url = state.post.postVideo;
  let src = url?.split('/')[3]?.split('=')[1];

  if (src === undefined) src = url?.split('/')[3];
  if (src === 'embed') src = url?.split('/')[4];

  let local = `https://www.youtube.com/embed/${src}`;

  if (linkСheck) localStorage.setItem('postVideo', local);
  if (state.post.postVideo.length === 0) localStorage.setItem('postVideo', url);

  const textLength = state.post.postText.length;
  const postText = state.post.postText;
  const numImg = readyPhotos.length;

  const iframeSize = linkСheck && numImg > 0 ? 'post_iframe' : 'post_iframe_small';

  const cssClass = [
    'post_text_size',
    'post_imges_video_size',
    'post_images_size',
    'post_video_size',
    'post_large_image',
    'post_small_right_image',
    'post_small_down_image',
    'one_image',
    'two_image_first',
    'two_image_second',
  ];

  const containerClass =
    numImg > 0 && linkСheck > 0
      ? cssClass[1]
      : numImg > 0
      ? cssClass[2]
      : numImg < 1 && linkСheck
      ? cssClass[3]
      : '';


  
  return (
    <div className={`post_container ${textLength > 0 ? cssClass[0] : ''} ${containerClass}`}>
      <img src={state.images.avatarImages} alt="" className="post_avatar" />

      <input
        type="text"
        className="post_text_input"
        placeholder="Post an entry"
        maxLength={175}
        onChange={(e) => dispatch(setPostText(e.target.value))}
      />

      <button className="post_make_button">
        <FontAwesomeIcon className="post_make_icon" icon="fa-solid fa-play" />
      </button>

      {/* postText */}
      {textLength > 0 ? <div className="post_show_text">{postText}</div> : ''}

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

      <FontAwesomeIcon className="post_audio_icon" icon="fa-solid fa-music" />
      <FontAwesomeIcon className="post_location_icon" icon="fa-solid fa-location-pin" />
      <FontAwesomeIcon className="post_file_icon" icon="fa-solid fa-file-lines" />

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
                    index === 0 ? cssClass[4] : index === 1 ? cssClass[5] : cssClass[6]
                  }
                    ${numImg === 1 ? cssClass[7] : ''}
                    ${
                      numImg === 2 && index === 0
                        ? cssClass[8]
                        : numImg === 2 && index === 1
                        ? cssClass[9]
                        : ''
                    }`}
                />
                ;
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
            className={iframeSize}></iframe>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default Post;
