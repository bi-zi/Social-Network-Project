import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchNotifications } from '../../store/notifications/slice';
import { Avatar } from './Avatar/Avatar';
import { UserInfo } from './UserInfo/UserInfo';
import { PhotoSlider } from './PhotoSlider/PhotoSlider';
import { Post } from './Post/Post';
import { Wall } from './Wall/Wall';
import { Friends } from './Friends/Friends';
import { Subscribers } from './Subscribers/Subscribers';
import { Groups } from './Groups/Groups';
import { Videos } from './Videos/Videos';
import { Music } from './Music/Music';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export type MyParams = {
  id: string;
};

export const Profile: React.FC = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.auth.data);
  const state = useAppSelector((state) => state);

  const { id } = useParams<keyof MyParams>() as MyParams;

  const postLength = state.post.userPosts.post?.[0]?.post?.length;

  React.useEffect(() => {
    dispatch(fetchNotifications(id));
  }, [dispatch, id]);

  if (localStorage.isAuth === undefined) {
    return <Navigate to="/Login" />;
  }
  return (
    <div
      className="profile_container"
      style={postLength === 0 ? { paddingBottom: 0 } : { paddingBottom: 0 }}>
      <div className="left_container">
        <div className="left_container_sticky">
          <Avatar />
          <Friends />
          <Subscribers />
          <Groups />
          <Videos />
          <Music />
        </div>
      </div>

      <div className="profile_rightContainer">
        <UserInfo />
        <PhotoSlider />
        {data?._id === id ? <Post /> : ''}
        <Wall />
      </div>
    </div>
  );
};
