import React from 'react';
import { useAppSelector } from '../../../../../store/store';
import { useWall } from '../../useWall';
import { Post } from '../../../../../store/post/types';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

export type MyParams = {
  id: string;
};

interface MyProps {
  data: Post;
}

export const WallHeader: React.FC<MyProps> = ({ data }: MyProps) => {
  const user = useAppSelector((state) => state.user);
  const wall = useAppSelector((state) => state.post.userPosts);

  const { id } = useParams<keyof MyParams>() as MyParams;

  const { deletePost } = useWall(wall.post?.[0]);

  const userOne = user?.userOne?.[0];

  const postStatus = wall.status === 'loaded';

  return (
    <div className="wall__header">
      <div className="wall__header-left">
        <img src={userOne?.imageUrl} width={10} alt="" className="wall__header-left__avatar" />

        <div className="wall__header-left__header-left__full-name-date">
          <span className="wall__header-left__full-name-date__full-name">
            {userOne?.firstName + ' ' + userOne?.lastName}
          </span>
          <br />
          <span className="wall__header-left__full-name-date__date">{data?.date}</span>
        </div>
      </div>

      {user.mainUser?._id === id ? (
        <div className="wall__header-right">
          <FontAwesomeIcon className="wall__header-right__menu" icon={faEllipsis} />
          <div className="wall__header-right__menu-block">
            <span
              className="wall__header-right__menu-block__delete-post"
              onClick={() => (postStatus ? deletePost(data?._id, id) : '')}>
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
