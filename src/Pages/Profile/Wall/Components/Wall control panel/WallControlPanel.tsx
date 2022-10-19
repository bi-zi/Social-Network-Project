import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import {
  fetchUserPostsAll,
  fetchPostLike,
  fetchPostDislike,
  setComments,
} from '../../../../../store/post/slice';
import { fetchCommentators, setClearCommentators } from '../../../../../store/user/slice';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { Post } from '../../../../../store/post/types';

import { useWall } from '../../useWall';
import './style.scss';

export type MyParams = {
  id: string;
};

interface MyProps {
  data: Post;
  index: number;
}

export const WallControlPanel: React.FC<MyProps> = ({ data, index }: MyProps) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const wall = useAppSelector((state) => state.post.userPosts);
  const auth = useAppSelector((state) => state.auth?.data);

  const { id } = useParams<keyof MyParams>() as MyParams;

  const postIndex = index;

  const { reverseWallPost } = useWall(wall.post?.[0]);

  const wallPost = reverseWallPost();

  const like = async (postId: string, check: boolean) => {
    if (check)
      await dispatch(fetchPostLike({ _id: postId, likeDislike: auth?._id, index: 1, user: id }));

    if (!check)
      await dispatch(
        fetchPostLike({
          _id: postId,
          likeDislike: wallPost?.[0]?.likePost?.findIndex((userId) => userId === auth?._id),
          index: 0,
          user: id,
        }),
      );
    dispatch(fetchUserPostsAll(id));
  };

  const dislike = async (postId: string, check: boolean) => {
    if (check)
      await dispatch(fetchPostDislike({ _id: postId, likeDislike: auth?._id, index: 1, user: id }));

    if (!check)
      await dispatch(
        fetchPostDislike({
          _id: postId,
          likeDislike: wallPost?.[0]?.dislikePost?.findIndex((userId) => userId === auth?._id),
          index: 0,
          user: id,
        }),
      );

    dispatch(fetchUserPostsAll(id));
  };

  const postStatus = state.post.userPosts.status === 'loaded';

  const openCloseComment = async (postIndex: number) => {
    const commentators = wallPost?.[postIndex].commentPost.map((x) => x.userId).join(',');
    
    if (postStatus) {
      if (state.post.comments !== postIndex) {
        await dispatch(fetchCommentators(commentators));
        dispatch(setComments(postIndex));
      } else {
        dispatch(setComments(999999));
        dispatch(setClearCommentators());
      }
    }
  };

  return (
    <div className="wall__control-panel">
      <FontAwesomeIcon
        className="wall__control-panel__like-icon"
        icon={faThumbsUp}
        style={
          data.likePost.find((userId) => userId === auth?._id) ? { color: 'red' } : { color: 'white' }
        }
        onClick={() => {
          if (postStatus) {
            data.likePost?.find((userId) => userId === auth?._id)
              ? like(data._id, false)
              : like(data._id, true);
          }
        }}
      />

      <span className="wall__control-panel__like-number">{data.likePost?.length}</span>

      <FontAwesomeIcon
        className="wall__control-panel__dislike-icon"
        icon={faThumbsDown}
        style={
          data.dislikePost.find((userId) => userId === auth?._id) ? { color: 'red' } : { color: 'white' }
        }
        onClick={() => {
          if (postStatus) {
            data.dislikePost?.find((userId) => userId === auth?._id)
              ? dislike(data._id, false)
              : dislike(data._id, true);
          }
        }}
      />

      <span className="wall__control-panel__dislike-number ">{data.dislikePost?.length}</span>

      <FontAwesomeIcon
        className="wall__control-panel__comment-icon"
        icon={faCommentDots}
        style={state.post.comments === postIndex ? { color: 'black' } : { color: 'white' }}
        onClick={() => {
          openCloseComment(postIndex);
        }}
      />
      <span className="wall__control-panel__dislike-number">{data.commentPost.length}</span>

      <FontAwesomeIcon className="wall__control-panel__share-icon" icon={faShareNodes} />
    </div>
  );
};
