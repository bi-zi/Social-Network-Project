import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchUserPostsAll } from '../../../store/post/slice';

import { useParams } from 'react-router-dom';

import { useWall } from './Components/useWall';
import './style.scss';

import { WallHeader } from './Components/Wall header/WallHeader';
import { WallContent } from './Components/Wall content/WallContent';
import { WallControlPanel } from './Components/Wall control panel/WallControlPanel';
import { WallComments } from './Components/Wall comments/WallComments';

export type MyParams = {
  id: string;
};

export const Wall: React.FC = () => {
  const dispatch = useAppDispatch();
  const wall = useAppSelector((state) => state.post.userPosts);

  const { id } = useParams<keyof MyParams>() as MyParams;

  const { reverseWallPost } = useWall(wall.post?.[0]);
  const wallPost = reverseWallPost();

  React.useEffect(() => {
    dispatch(fetchUserPostsAll(id));
  }, [dispatch, id]);

  return (
    <>
      {wallPost?.map((content, postIndex) => (
        <div className={`wall ${postIndex}`} key={content._id}>
          <WallHeader data={content} />

          <WallContent data={content} index={postIndex} postLength={wallPost!?.length} />

          <WallControlPanel data={content} index={postIndex} />

          <WallComments data={content} index={postIndex} />
        </div>
      ))}
    </>
  );
};
