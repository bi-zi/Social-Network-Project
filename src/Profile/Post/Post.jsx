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
  //let test = ['photos', 'video', 'music', 'geo', 'file'];

  localStorage.setItem('postImages', JSON.stringify(state.images.postImages));
  let readyPhotos = state.images.postImages;

  let linkСheck = state.post.postVideo.split('/');
  linkСheck = linkСheck[0] === 'https:' && linkСheck[2] === 'www.youtube.com';

  let url = state.post.postVideo;
  let src = url?.split('/')[3]?.split('=')[1];
  console.log(src);
  if (src === undefined) src = url?.split('/')[3];
  if (src === 'embed') src = url?.split('/')[4];
  let local = `https://www.youtube.com/embed/${src}`;
  if (linkСheck) localStorage.setItem('postVideo', local);
  if (state.post.postVideo.length === 0) localStorage.setItem('postVideo', url);




  
    return (
      <div
        className={`post ${state.post.postText.length > 0 ? 'post_text' : ''}
       ${
         readyPhotos.length > 0 && linkСheck > 0
           ? 'post_img_vid'
           : readyPhotos.length > 0
           ? 'post_photos'
           : readyPhotos.length < 1 && linkСheck
           ? 'post_vid'
           : ''
       }

     `}>
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
        <FontAwesomeIcon className="post_image" icon="fa-regular fa-image" />
        {readyPhotos.length < 3 ? (
          <button onChange={() => dispatch(setInputNumber('2'))} className="post_image_input">
            <ImageParsing />
          </button>
        ) : (
          <div className="post_max_img">MAX</div>
        )}

        <FontAwesomeIcon
          className="post_video"
          icon="fa-solid fa-film"
          onClick={() => (postEffect !== 0 ? setPostEffect(0) : setPostEffect(1))}
        />
        {postEffect === 0 && !linkСheck ? (
          <input
            type="text"
            className="post_input_vid"
            placeholder="Insert YouTube video link"
            onChange={(e) => dispatch(setPostVideo(e.target.value))}
          />
        ) : (
          ''
        )}
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
                  ;
                </Link>
              );
            })}
          </div>
        ) : (
          ''
        )}

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
              className={`${
                linkСheck && readyPhotos.length > 0 ? 'post_iframe' : 'post_iframe_small'
              }`}></iframe>
          </>
        ) : (
          ''
        )}
      </div>
    );
}

export default Post;
