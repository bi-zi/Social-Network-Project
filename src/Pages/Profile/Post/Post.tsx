import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import {
  setCreatText,
  setCreateImgDelete,
  setCreateVid,
  fetchUserPostsAll,
  fetchCreatePost,
  fetchPostPush,
} from '../../../store/post/slice';
import { setInputNumber } from '../../../store/user/slice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {ImageParsing} from '../../../ImageParsing/ImageParsing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

export type MyParams = {
  id: string;
};

export const Post: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { id } = useParams<keyof MyParams>() as MyParams;

  const firstRef = React.useRef<HTMLInputElement>(null);
  const [postEffect, setPostEffect] = React.useState('');


  localStorage.setItem('postImages', JSON.stringify(state.post.createImg));
  localStorage.setItem('postText', state.post.createText);

  const post = state.post.userPosts.post.find((x) => x.user === id);
  const user = state.user?.userOne?.[0];
  const readyPhotos = state.post.createImg;
  const textLength = state.post?.createText?.length;
  const postText = state.post.createText;
  const numImg = readyPhotos.length;

  let linkСheck = state.post.createVid?.split('/');

  let url = state.post.createVid;
  let src = url?.split('/')[3]?.split('=')[1]?.split('&')[0];
  if (src === undefined) src = url?.split('/')[3];
  if (src === 'embed') src = url?.split('/')[4];
  let local = src === undefined ? '' : `https://www.youtube.com/embed/${src}`;

  if (linkСheck?.[0] === 'https:') localStorage.setItem('postVideo', local);
  if (state.post.createVid?.length === 0) localStorage.setItem('postVideo', url);


  const sendPost = async () => {
    if ((textLength > 0 || numImg > 0 || local.length > 0) && post === undefined) {
      await dispatch(
        fetchCreatePost({ text: postText, videoPost: local, imagesPost: state.post.createImg }),
      );
      console.log(1);
    }

    if (
      ((textLength > 0 || numImg > 0 || local.length > 0) && post?.post?.length === 0) ||
      post?.post!?.length > 0
    ) {
      await dispatch(
        fetchPostPush({ text: postText, videoPost: local, imagesPost: state.post.createImg, user: id }),
      );
      console.log(2);
    }

    if (textLength > 0 || numImg > 0 || local.length > 0) {
      await dispatch(fetchUserPostsAll(id));

      if (firstRef.current != null) {
        firstRef.current.value = '';
      }

      dispatch(setCreateImgDelete([]));
      dispatch(setCreatText(''));
      dispatch(setCreateVid(''));
      setPostEffect('');
    }
  };


  React.useEffect(() => {
    dispatch(fetchUserPostsAll(id));
  }, [dispatch, id]);

  return (
    <div className="post_container">
      <img src={user?.imageUrl} alt="" className="post_avatar" />

      <input
        ref={firstRef}
        type="text"
        className="post_text_input"
        placeholder="Post an entry"
        maxLength={180}
        defaultValue={postText}
        pattern="^[a-zA-Z0-9 ]+$"
        title="Only latin characters can be used"
        onChange={(e) => dispatch(setCreatText(e.target.value))}
      />

      <div className="wall_content">
        {/* postText */}
        {textLength > 0 ? <div className="post_show_text">{postText}</div> : ''}

        {/* imagesRender */}
        {numImg > 0 ? (
          <div className="post_images_container">
            {readyPhotos.map((image, index) => {
              return (
                <Link to={`/${id}/CreatePost/${index}`} key={index}>
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
        {linkСheck?.[0] === 'https:' ? (
          <>
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

      <div className="wall_control_panel">
        {state.post.userPosts.status === 'loaded' ? (
          <button className="post_make_button" type="submit" onClick={() => sendPost()}>
            <FontAwesomeIcon className="post_make_icon" icon="fa-solid fa-play" />
          </button>
        ) : (
          <button className="post_make_button" type="submit">
            <FontAwesomeIcon className="post_make_icon" icon="fa-solid fa-play" />
          </button>
        )}

        <FontAwesomeIcon className="post_image_icon" icon="fa-regular fa-image" />
        {numImg < 3 ? (
          <button onChange={() => dispatch(setInputNumber('2'))} className="post_image_input">
            <ImageParsing />
          </button>
        ) : (
          <div className="post_max_image">MAX</div>
        )}

        <FontAwesomeIcon
          className="post_video_icon"
          icon="fa-solid fa-film"
          onClick={() => (postEffect !== '0' ? setPostEffect('0') : setPostEffect('1'))}
        />

        {linkСheck?.[0] === 'https:' ? (
          <button className="video_delete" onClick={() => dispatch(setCreateVid(''))}>
            Delete video
          </button>
        ) : (
          ''
        )}
        {postEffect === '0' && linkСheck?.[0] !== 'https:' ? (
          <input
            type="text"
            className="post_input_video"
            placeholder="Insert YouTube video link"
            onChange={(e) => dispatch(setCreateVid(e.target.value))}
          />
        ) : (
          ''
        )}

        <FontAwesomeIcon className="post_audio_icon" icon="fa-solid fa-music" />
        <FontAwesomeIcon className="post_location_icon" icon="fa-solid fa-location-pin" />
        <FontAwesomeIcon className="post_file_icon" icon="fa-solid fa-file-lines" />
      </div>
    </div>
  );
};
