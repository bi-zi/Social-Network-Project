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
import { ImageParsing } from '../../../ImageParsing/ImageParsing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faMusic, faLocationPin, faFileLines, faFilm } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import './style.scss';

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
  localStorage.setItem('postText', state.post.createText !== 'undefined' ? state.post.createText : '');

  const post = state.post.userPosts.post.find((x) => x?.user === id);
  const user = state.user?.userOne?.[0];
  const readyPhotos = state.post.createImg;
  const textLength = state.post?.createText?.length;
  const postText = state.post.createText;
  const numImg = readyPhotos.length;
  const postStatus =
    state.post.userPosts.status === 'loaded' &&
    state.user.status === 'loaded' &&
    state.auth.status === 'loaded';

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
      // console.log(1);
    }

    if (
      ((textLength > 0 || numImg > 0 || local.length > 0) && post?.post?.length === 0) ||
      post?.post!?.length > 0
    ) {
      await dispatch(
        fetchPostPush({ text: postText, videoPost: local, imagesPost: state.post.createImg, user: id }),
      );
      // console.log(2);
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
                <>
                  <Link to={`/${id}/CreatePost/${index}`} style={{ textDecoration: 0 }} key={index}>
                    <img
                      key={index}
                      src={image}
                      alt=""
                      className={`
                    ${
                      index === 0
                        ? 'wall_first_img'
                        : index === 1
                        ? 'wall_secong_img'
                        : index === 2
                        ? 'wall_third_img'
                        : ''
                    }`}
                    />
                  </Link>
                </>
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

      <div className="post_control_panel">
        <button
          className="post_make_button"
          type="submit"
          onClick={() => (postStatus ? sendPost() : '')}>
          <FontAwesomeIcon className="post_make_icon" icon={faPlay} />
        </button>

        <FontAwesomeIcon className="post_image_icon" icon={faImage} />
        {numImg < 3 ? (
          <button onChange={() => dispatch(setInputNumber('2'))} className="post_image_input">
            <ImageParsing />
          </button>
        ) : (
          <div className="post_max_image">MAX</div>
        )}

        <FontAwesomeIcon
          className="post_video_icon"
          icon={faFilm}
          onClick={() => (postEffect !== '0' ? setPostEffect('0') : setPostEffect('1'))}
        />

        {linkСheck?.[0] === 'https:' ? (
          <button
            className="post_video_delete"
            onClick={() => (postStatus ? dispatch(setCreateVid('')) : '')}>
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

        <FontAwesomeIcon className="post_audio_icon" icon={faMusic} />
        <FontAwesomeIcon className="post_location_icon" icon={faLocationPin} />
        <FontAwesomeIcon className="post_file_icon" icon={faFileLines} />
      </div>
    </div>
  );
};
