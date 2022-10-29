import React from 'react';
import { useAppSelector } from '../../../../../store/store';
import { useWall } from '../useWall';
import { Post } from '../../../../../store/post/types';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

interface MyParams {
  id: string;
}
interface MyProps {
  data: Post;
}

export const WallHeader: React.FC<MyProps> = ({ data }: MyProps) => {
  const user = useAppSelector((state) => state.user);
  const wall = useAppSelector((state) => state.post.userPosts);

  const { id } = useParams<keyof MyParams>() as MyParams;

  const { deletePost } = useWall(wall.post?.[0]);

  const userOne = user?.userOne?.[0];

  const wallStatus = wall.status === 'loaded' && user.status === 'loaded';

  return (
    <div className="wall__header">
      <div className="wall__header-left">
        {wallStatus ? (
          <img src={userOne?.imageUrl} width={10} alt="" className="wall__header-left__avatar" />
        ) : (
          <Skeleton className="wall__header-left__avatar" />
        )}

        <div className="wall__header-left__header-left__full-name-date">
          {wallStatus ? (
            <span className="wall__header-left__full-name-date__full-name">
              {userOne?.firstName + ' ' + userOne?.lastName}
            </span>
          ) : (
            <Skeleton className="wall__header-left__full-name-date__full-skeleton" />
          )}
          <br />
          {wallStatus ? (
            <span className="wall__header-left__full-name-date__date">{data?.date}</span>
          ) : (
            <Skeleton
              className="wall__header-left__full-name-date__date-skeleton"

            />
          )}
        </div>
      </div>

      {user.mainUser?._id === id ? (
        <div className="wall__header-right">
          <FontAwesomeIcon className="wall__header-right__menu" icon={faEllipsis} />
          <div className="wall__header-right__menu-block">
            <span
              className="wall__header-right__menu-block__delete-post"
              onClick={(e) => (wallStatus ? deletePost(e, data?._id, id) : '')}>
              Delete post
            </span>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
