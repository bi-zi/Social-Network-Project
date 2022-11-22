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
import { ImageParsing } from '../../../../../ImageParsing/ImageParsing';
import { useParams } from 'react-router-dom';
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
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

interface MyParams {
  id: string;
}

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

  // отправка поста если поле текста или количество видео или картинок больше 0
  // так же идет проверка есть ли вообще у пользователя база данных на сервере если нет она создается
  // возможно эту проверку нужно делать на сервере ну я думаю тут нет разницы особо
  const sendPost = async () => {
    const createPostBool =
      (textLength >= 1 || numImg >= 1 || localStorage.postVideo?.split('/').length > 1) &&
      post === undefined;

    const postPushBool =
      textLength > 0 ||
      numImg > 0 ||
      (localStorage.postVideo?.split('/').length > 1 &&
        post?.post?.length === 0 &&
        post?.post!?.length > 0);

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

    if (textLength > 0 || numImg > 0 || localStorage.postVideo?.split('/').length > 1) {
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

  const imageLoadStatus =
    numImg < 6 && state.user.status === 'loaded' && state.slider.status === 'loaded';

  React.useEffect(() => {
    dispatch(fetchUserPostsAll(id));
  }, [dispatch, id]);

  return (
    <div className="post__control-panel">
      <div className="post__control-panel__icons-container">
        {imageLoadStatus ? (
          <>
            <FontAwesomeIcon
              className="post__control-panel__icons"
              icon={faImage}
              style={{ marginLeft: 0 }}
            />
            <button
              onClick={() => dispatch(setInputNumber('2'))}
              className="post__control-panel__image-icon-input">
              <ImageParsing />
            </button>
          </>
        ) : (
          <FontAwesomeIcon className="post__control-panel__icons" icon={faCircleExclamation} />
        )}

        <FontAwesomeIcon
          className="post__control-panel__icons"
          icon={faFilm}
          onClick={() =>
            postEffect !== '0' && state.post.userPosts.status === 'loaded'
              ? setPostEffect('0')
              : setPostEffect('1')
          }
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
            onChange={(e) =>
              state.post.userPosts.status === 'loaded' ? dispatch(setCreateVid(e.target.value)) : ''
            }
          />
        ) : (
          ''
        )}
      </div>

      {postStatus ? (
        <button className="post__control-panel__make-button" type="submit" onClick={() => sendPost()}>
          <FontAwesomeIcon className="post__control-panel__make-button-icon" icon={faPlay} />
        </button>
      ) : (
        <Skeleton className="post__control-panel__skeleton" />
      )}
    </div>
  );
};
