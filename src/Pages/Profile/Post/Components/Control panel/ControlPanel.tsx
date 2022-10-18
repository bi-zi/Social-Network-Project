import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import {
  setCreatText,
  setCreateImgDelete,
  setCreateVid,
  fetchUserPostsAll,
  fetchCreatePost,
  fetchPostPush,
} from '../../../../../store/post/slice';
import { setInputNumber } from '../../../../../store/user/slice';
import { useParams } from 'react-router-dom';
import { ImageParsing } from '../../../../../ImageParsing/ImageParsing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faMusic,
  faLocationPin,
  faFileLines,
  faFilm,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import './style.scss';

export type MyParams = {
  id: string;
};

export const ControlPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { id } = useParams<keyof MyParams>() as MyParams;

  const [postEffect, setPostEffect] = React.useState('');

  const post = state.post.userPosts.post.find((x) => x?.user === id);
  const readyPhotos = state.post.createImg;
  const textLength = state.post?.createText?.length;
  const postText = state.post.createText;
  const numImg = readyPhotos.length;

  const sendPost = async () => {
    const createPostBool =
      (textLength > 0 || numImg > 0 || localStorage.postVideo?.split('/').length > 0) &&
      post === undefined;

    const postPushBool =
      ((textLength > 0 || numImg > 0 || localStorage.postVideo?.split('/').length > 0) &&
        post?.post?.length === 0) ||
      post?.post!?.length > 0;

    if (createPostBool) {
      await dispatch(
        fetchCreatePost({
          text: postText,
          videoPost: localStorage.postVideo,
          imagesPost: state.post.createImg,
        }),
      );
    }

    if (postPushBool) {
      await dispatch(
        fetchPostPush({
          text: postText,
          videoPost: localStorage.postVideo,
          imagesPost: state.post.createImg,
          user: id,
        }),
      );
    }

    if (textLength > 0 || numImg > 0 || localStorage.postVideo?.split('/').length > 0) {
      await dispatch(fetchUserPostsAll(id));

      dispatch(setCreateImgDelete([]));
      dispatch(setCreatText(''));
      dispatch(setCreateVid(''));
      setPostEffect('');
    }
  };

  const postStatus =
    state.post.userPosts.status === 'loaded' &&
    state.user.status === 'loaded' &&
    state.auth.status === 'loaded';


  React.useEffect(() => {
    dispatch(fetchUserPostsAll(id));
  }, [dispatch, id]);

  return (
    <div className="post__control-panel">
      <div className="post__control-panel__icons-container">
        {numImg < 3 ? (
          <>
            <FontAwesomeIcon className="post__control-panel__image-icon" icon={faImage} />
            <button
              onChange={() => dispatch(setInputNumber('2'))}
              className="post__control-panel__image-icon-input">
              <ImageParsing />
            </button>
          </>
        ) : (
          <FontAwesomeIcon className="post__control-panel__image-icon" icon={faCircleExclamation} />
        )}

        <FontAwesomeIcon
          className="post__control-panel__video-icon"
          icon={faFilm}
          onClick={() => (postEffect !== '0' ? setPostEffect('0') : setPostEffect('1'))}
        />

        {localStorage.postVideo?.split('/')?.[0] === 'https:' ? (
          <button
            className="post__control-panel__iframe-delete"
            onClick={() => (postStatus ? dispatch(setCreateVid('')) : '')}>
            Delete video
          </button>
        ) : (
          ''
        )}
        {postEffect === '0' && localStorage.postVideo?.split('/')?.[0] !== 'https:' ? (
          <input
            type="text"
            className="post__control-panel__input-iframe"
            placeholder="Insert YouTube video link"
            onChange={(e) => dispatch(setCreateVid(e.target.value))}
          />
        ) : (
          ''
        )}

        <FontAwesomeIcon className="post__control-panel__audio-icon" icon={faMusic} />
        <FontAwesomeIcon className="post__control-panel__location-icon" icon={faLocationPin} />
        <FontAwesomeIcon className="post__control-panel__file-icon" icon={faFileLines} />
      </div>

      <button
        className="post__control-panel__make-button"
        type="submit"
        onClick={() => (postStatus ? sendPost() : '')}>
        <FontAwesomeIcon className="post__control-panel__make-button-icon" icon={faPlay} />
      </button>
    </div>
  );
};
