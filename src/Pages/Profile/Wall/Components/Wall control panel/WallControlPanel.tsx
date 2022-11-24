import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import {
  fetchUserPostsAll,
  fetchPostLike,
  fetchPostDislike,
  setComments,
} from '../../../../../store/post/slice';
import { fetchCommentators, setClearCommentators } from '../../../../../store/user/slice';
import { useWall } from '../useWall';
import { useParams } from 'react-router-dom';
import { Post } from '../../../../../store/post/types';
import { Like, Dislike, Comments } from '../../../../../Svg';
import Skeleton from 'react-loading-skeleton';
import './style.scss';
interface MyParams {
  id: string;
}
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
          likeDislike: wallPost
            ?.find((id) => id._id === postId)
            ?.likePost?.findIndex((userId) => userId === auth?._id),
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
          likeDislike: wallPost
            ?.find((id) => id._id === postId)
            ?.dislikePost?.findIndex((userId) => userId === auth?._id),
          index: 0,
          user: id,
        }),
      );

    dispatch(fetchUserPostsAll(id));
  };

  const postStatus = state.post.userPosts.status === 'loaded';

  const openCloseComment = async (postIndex: number) => {
    const commentators = data.commentPost.map((x) => x.userId).join(',');

    const filteredCommentators = commentators.split(',').sort((a, b) => (a > b ? 1 : -1));

    const buffer: string[] = [filteredCommentators[0]];

    filteredCommentators.filter(function (element, index) {
      if (element === element[index < filteredCommentators.length - 1 ? index + 1 : index - 1]) {
        buffer.push(element);
      } else if (element !== filteredCommentators[index > 0 ? index + 1 : index]) {
        buffer.push(element);
      }
      return buffer;
    });

    if (postStatus) {
      if (state.post.comments !== postIndex) {
        if (commentators.length > 0) {
          await dispatch(fetchCommentators(buffer.join(',')));
        }
        dispatch(setComments(postIndex));
      } else {
        dispatch(setComments(999999));
        dispatch(setClearCommentators());
      }
    }
  };

  return (
    <div className="wall__control-panel">
      {postStatus ? (
        <>
          <div
            style={
              data.likePost.find((userId) => userId === auth?._id)
                ? { stroke: 'red' }
                : { stroke: 'white' }
            }
            className="wall__control-panel__dislike-icon"
            onClick={() => {
              if (postStatus) {
                data.likePost?.find((userId) => userId === auth?._id)
                  ? like(data._id, false)
                  : like(data._id, true);
              }
            }}>
            {}
            <Like />
          </div>

          <span className="wall__control-panel__like-number">{data.likePost?.length}</span>

          <div
            style={
              data.dislikePost.find((userId) => userId === auth?._id)
                ? { stroke: 'red' }
                : { stroke: 'white' }
            }
            className="wall__control-panel__dislike-icon"
            onClick={() => {
              if (postStatus) {
                data.dislikePost?.find((userId) => userId === auth?._id)
                  ? dislike(data._id, false)
                  : dislike(data._id, true);
              }
            }}>
            <Dislike />
          </div>

          <span className="wall__control-panel__dislike-number ">{data.dislikePost?.length}</span>

          <div
            className="wall__control-panel__comment-icon"
            style={state.post.comments === postIndex ? { fill: 'black' } : { fill: 'white' }}
            onClick={() => {
              openCloseComment(postIndex);
            }}>
            <Comments />
          </div>

          <span className="wall__control-panel__dislike-number">{data.commentPost.length}</span>
        </>
      ) : (
        <Skeleton height={'3vh'} width={'40%'} style={{ margin: '1vh 0' }} />
      )}
    </div>
  );
};
