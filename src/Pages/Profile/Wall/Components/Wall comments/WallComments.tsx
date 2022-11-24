import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import {
  fetchUserPostsAll,
  setCreateComment,
  fetchCommentPush,
  fetchCommentDelete,
  setComments,
} from '../../../../../store/post/slice';
import { fetchCommentators } from '../../../../../store/user/slice';
import { Post } from '../../../../../store/post/types';
import { useParams, Link } from 'react-router-dom';
import { Garbage, Submit } from '../../../../../Svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

interface MyParams {
  id: string;
}
interface MyProps {
  data: Post;
  index: number;
}

export const WallComments: React.FC<MyProps> = ({ data, index }: MyProps) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const wall = useAppSelector((state) => state.post.userPosts);
  const auth = useAppSelector((state) => state.auth?.data);

  const { id } = useParams<keyof MyParams>() as MyParams;
  const firstRef = React.useRef<HTMLInputElement>(null);

  const postIndex = index;

  const addComment = async (postId: string) => {
    let date: any = new Date();
    date = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    const commentators = data.commentPost.map((x) => x.userId).join(',');

    const filteredCommentators = commentators.split(',').sort((a, b) => (a > b ? 1 : -1));

    const buffer: string[] = [filteredCommentators[0], auth._id];

    filteredCommentators.filter(function (element, index) {
      if (element === element[index < filteredCommentators.length - 1 ? index + 1 : index - 1]) {
        buffer.push(element);
      } else if (element !== filteredCommentators[index > 0 ? index + 1 : index]) {
        buffer.push(element);
      }
      return buffer;
    });

    await dispatch(fetchCommentators(commentators.length === 0 ? auth._id : buffer.join(',')));
    await dispatch(
      fetchCommentPush({
        _id: postId,
        firstName: auth?.firstName,
        lastName: auth?.lastName,
        commentText: state.post.createComment,
        commentDate: date,
        userId: auth?._id,
        user: id,
      }),
    );
    dispatch(fetchUserPostsAll(id));

    dispatch(setCreateComment(''));

    if (firstRef.current != null) {
      firstRef.current.value = '';
    }
  };

  const deleteComment = async (postId: string, ind: number) => {
    await dispatch(fetchCommentDelete({ postId: postId, index: ind, user: id }));
    dispatch(fetchUserPostsAll(id));
  };

  const postStatus = state.post.userPosts.status === 'loaded';

  return (
    <>
      {state.post.comments === postIndex ? (
        <div className="wall__comments">
          <div className='wall__comments-input-submit'>
            {postStatus ? (
              <input
                className="wall__comments__input"
                placeholder="Write your comment here"
                maxLength={280}
                pattern="^[a-zA-Z0-9 ]+$"
                title="Only latin characters can be used"
                onChange={(e) => dispatch(setCreateComment(e.target.value))}
                ref={firstRef}
              />
            ) : (
              <Skeleton className="wall__comments__input" />
            )}

            {postStatus ? (
              <button
                className="wall__comments__submit-button"
                onClick={() =>
                  postStatus && state.post.createComment.length > 0 ? addComment(data._id) : ''
                }>
                <div className="wall__comments__submit-button-icon">
                  <Submit />
                </div>
              </button>
            ) : (
              <Skeleton className="wall__comments__submit-skeleton" />
            )}
          </div>

          {data.commentPost?.map((comment, index) => (
            <div className="wall__comments__comment" key={index}>
              <div className="wall__comments__comment__block">
                <div className="wall__comments__comment__left-block">
                  <Link
                    to={`/Profile/${comment.userId}`}
                    onClick={() => {
                      window.scrollTo(0, 0);
                      dispatch(setComments(999999));
                    }}>
                    {state.user.status === 'loaded' ? (
                      <img
                        src={
                          state.user.commentators.find((user) => user._id === comment.userId)!
                            ?.imageUrl[0]
                        }
                        width={10}
                        alt=""
                        className="wall__comments__comment-avatar"
                      />
                    ) : (
                      <Skeleton className="wall__comments__comment-avatar" />
                    )}
                  </Link>

                  <div className="wall__comments__comment-full-name-time">
                    {postStatus ? (
                      <>
                        <div className="wall__comments__comment-full-name-time__full-name">
                          {comment.firstName + ' ' + comment.lastName}
                        </div>

                        <div className="wall__comments__comment-full-name-time__time">
                          {comment.commentDate}
                        </div>
                      </>
                    ) : (
                      <>
                        <Skeleton width={'4vw'} height={'1.5vh'} style={{ marginTop: '0.5vh' }} />
                        <Skeleton width={'6vw'} height={'1vh'} />
                      </>
                    )}
                  </div>
                </div>

                <div className="wall__comments__comment__right-block">
                  {wall.post.find((userPost) => userPost.user === id)?.user === auth?._id ||
                  auth?._id === comment.userId ? (
                    <div
                      className="wall__comments__comment-delete"
                      onClick={() => (postStatus ? deleteComment(data?._id, index) : '')}>
                      <Garbage />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              {postStatus ? (
                <div className="wall__comments__comment-text">{comment.commentText}</div>
              ) : (
                <Skeleton className="wall__comments__comment-text" />
              )}
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
    </>
  );
};
