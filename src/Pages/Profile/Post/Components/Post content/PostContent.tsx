import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../store/store';
import { setCreateImgDelete } from '../../../../../store/old store/post/slice';
import { useParams, useNavigate } from 'react-router-dom';
import { Garbage } from '../../../../../Svg';

interface MyParams {
  id: string;
}

export const PostContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  let navigate = useNavigate();
  const { id } = useParams<keyof MyParams>() as MyParams;

  localStorage.setItem('postImages', JSON.stringify(state.post.createImg));
  localStorage.setItem('postText', state.post.createText !== 'undefined' ? state.post.createText : '');

  const readyImages = state.post.createImg;
  const numberOfImages = readyImages.length;

  const postText = state.post.createText;
  const textLength = postText?.length;

  const splitVideoLink = state.post.createVid?.split('/');
  const videoLink = state.post.createVid;

  let videoId = videoLink?.split('/')[3]?.split('=')[1]?.split('&')[0];

  if (videoId === undefined) videoId = videoLink?.split('/')[3];
  if (videoId === 'embed') videoId = videoLink?.split('/')[4];

  const readyVideoLink = videoId === undefined ? '' : `https://www.youtube.com/embed/${videoId}`;

  if (splitVideoLink?.[0] === 'https:') localStorage.setItem('postVideo', readyVideoLink);
  if (state.post.createVid?.length === 0) localStorage.setItem('postVideo', videoLink);

  const imagesLength = readyImages?.length;
  const picturesClassName =
    imagesLength === 1
      ? 'wall__content-container__images-1'
      : imagesLength === 2
      ? 'wall__content-container__images-2'
      : imagesLength === 3
      ? 'wall__content-container__images-3'
      : imagesLength === 4
      ? 'wall__content-container__images-4'
      : imagesLength === 5
      ? 'wall__content-container__images-5'
      : imagesLength === 6
      ? 'wall__content-container__images-6'
      : '';

  const onImageClick = (imgIndex: number) => {
    navigate(`/${id}/CreatePost/${imgIndex}`);
  };

  return (
    <>
      <div className="wall__content-container">
        {textLength > 0 ? <div className="wall_content-container__text">{postText}</div> : ''}

        {numberOfImages > 0 ? (
          <div className={picturesClassName}>
            {readyImages?.map((image, index) => (
              <span
                className={`post_img-container
                    ${
                      index === 1
                        ? 'wall-image-second'
                        : index === 2
                        ? 'wall-image-third'
                        : index === 3
                        ? 'wall-image-fourth'
                        : index === 4
                        ? 'wall-image-fifth'
                        : index === 5
                        ? 'wall-image-sixth'
                        : ''
                    }`}
                key={index}>
                <img
                  src={image}
                  alt=""
                  className={`
                    ${
                      index === 0
                        ? 'wall-image-first'
                        : index === 1
                        ? 'wall-image-second'
                        : index === 2
                        ? 'wall-image-third'
                        : index === 3
                        ? 'wall-image-fourth'
                        : index === 4
                        ? 'wall-image-fifth'
                        : index === 5
                        ? 'wall-image-sixth'
                        : ''
                    }`}
                  onClick={() => onImageClick(index)}
                />
                {state.oldAuth.data?._id === id ? (
                  <div
                    style={{ stroke: 'white' }}
                    className="post-images-delete"
                    onClick={() =>
                      dispatch(
                        setCreateImgDelete(
                          readyImages!.filter((image, thisIndex) => thisIndex !== index),
                        ),
                      )
                    }>
                    <Garbage />
                  </div>
                ) : (
                  ''
                )}
              </span>
            ))}
          </div>
        ) : (
          ''
        )}

        {splitVideoLink?.[0] === 'https:' ? (
          <>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="wall__content-container__iframe"></iframe>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
};
