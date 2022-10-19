import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { setPostIndex } from '../../../../../store/post/slice';
import { Post } from '../../../../../store/post/types';

import { useParams, Link } from 'react-router-dom';

 import './style.scss';

export type MyParams = {
  id: string;
};

interface MyProps {
  data: Post;
  index: number;
  postLength: number;
}

export const WallContent: React.FC<MyProps> = ({ data, index, postLength }: MyProps) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  const { id } = useParams<keyof MyParams>() as MyParams;

  const postIndex = index;

  return (
    <>
      <div className="wall__content-container">
        {data.text?.length > 0 ? <div className="wall_content-container__text">{data.text}</div> : ''}

        {data.imagesPost?.length > 0 ? (
          <div className="wall__content-container__images">
            {data?.imagesPost.map((image, index) => {
              return (
                <span key={index}>
                  <Link
                    to={`/${id}/WallPost/${index}`}
                    style={{ textDecoration: 0 }}
                    onClick={() => dispatch(setPostIndex((postLength - postIndex - 1).toString()))}>
                    <img
                      src={image}
                      alt=""
                      width={10}
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

        {data.videoPost.length > 0 ? (
          <>
            <iframe
              src={data.videoPost}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write;
                   encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="wall__content-container__iframe"></iframe>
          </>
        ) : (
          ''
        )}

        <div className="wall_from">
          Post from {`${state.user.userOne?.[0]?.firstName + ' ' + state.user.userOne?.[0]?.lastName}`}
        </div>
      </div>
    </>
  );
};
