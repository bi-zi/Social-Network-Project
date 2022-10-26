import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchUserPostsAll, setComments } from '../../../store/post/slice';
import { WallHeader, WallContent, WallControlPanel, WallComments } from './Components/index';
import { useParams } from 'react-router-dom';
import { useWall } from './Components/useWall';
import './style.scss';
interface MyParams {
  id: string;
}

export const Wall: React.FC = () => {
  const dispatch = useAppDispatch();

  const wall = useAppSelector((state) => state.post.userPosts);

  const { id } = useParams<keyof MyParams>() as MyParams;


  const [hello, setHello] = React.useState('')

  const { reverseWallPost } = useWall(wall.post?.[0]);
  const wallPost = reverseWallPost();

  React.useEffect(() => {
    dispatch(fetchUserPostsAll(id));
    dispatch(setComments(999999));
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
