import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { setPostIndex } from '../../../../../store/old store/post/slice';
import { Post } from '../../../../../store/old store/post/types';
import { useParams, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

interface MyParams {
  id: string;
}
interface MyProps {
  data: Post;
  index: number;
  postLength: number;
}

export const WallContent: React.FC<MyProps> = ({ data, index, postLength }: MyProps) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  let navigate = useNavigate();
  const { id } = useParams<keyof MyParams>() as MyParams;
  const postIndex = index;

  const textStatus = data?.text?.length > 0 && state.post.userPosts.status === 'loaded';
  const postStatus = state.post.userPosts.status === 'loaded';
  const imagesLength = data?.imagesPost?.length;

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
    navigate(`/${id}/WallPost/${imgIndex}`);
    dispatch(setPostIndex((postLength - postIndex - 1).toString()));
  };

  return (
    <>
      <div className="wall__content-container">
        {textStatus ? (
          <div className="wall_content-container__text">{data?.text}</div>
        ) : data?.text?.length > 0 ? (
          <Skeleton height={'2vh'} style={{ marginBottom: '1vh' }} />
        ) : (
          ''
        )}

        {data?.imagesPost?.length > 0 ? (
          <div className={picturesClassName}>
            {postStatus ? (
              data?.imagesPost.map((image, index) => (
                <img
                  src={image}
                  alt=""
                  key={index}
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
              ))
            ) : (
              <Skeleton className="wall__content-container__skeleton" />
            )}
          </div>
        ) : (
          ''
        )}

        {data?.videoPost?.length > 0 && postStatus ? (
          <>
            <iframe
              src={data.videoPost}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write;
                   encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="wall__content-container__iframe"></iframe>
          </>
        ) : data?.videoPost?.length > 0 ? (
          <Skeleton className="wall__content-container__iframe" />
        ) : (
          ''
        )}

        {postStatus ? (
          <div className="wall_from">
            Post from {`${state.user.userOne?.[0]?.firstName + ' ' + state.user.userOne?.[0]?.lastName}`}
          </div>
        ) : (
          <Skeleton className="wall_from" width={'30%'} />
        )}
      </div>
    </>
  );
};
