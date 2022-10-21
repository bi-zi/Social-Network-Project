import React from 'react';
import { useAppSelector } from '../../../../../store/store';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface MyParams {
  id: string;
}

export const PostContent: React.FC = () => {
  const state = useAppSelector((state) => state);
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

  return (
    <>
      <div className="wall__content-container">
        {textLength > 0 ? <div className="wall_content-container__text">{postText}</div> : ''}

        {numberOfImages > 0 ? (
          <div className="wall__content-container__images">
            {readyImages?.map((image, index) => {
              return (
                <span key={index}>
                  <Link to={`/${id}/CreatePost/${index}`}>
                    <img
                      src={image}
                      width={10}
                      alt=""
                      className={`
                    ${
                      index === 0
                        ? 'wall__content-container__images-first'
                        : index === 1
                        ? 'wall__content-container__images-second'
                        : index === 2
                        ? 'wall__content-container__images-third'
                        : ''
                    }`}
                    />
                  </Link>
                </span>
              );
            })}
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
