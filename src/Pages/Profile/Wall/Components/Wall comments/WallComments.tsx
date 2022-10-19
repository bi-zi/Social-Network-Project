import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import {
  fetchUserPostsAll,
  setCreateComment,
  fetchCommentPush,
  fetchCommentDelete,
  setComments,
} from '../../../../../store/post/slice';

import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../../../../../store/post/types';
import './style.scss';

export type MyParams = {
  id: string;
};

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
            <input
              className="wall__comments__input"
              placeholder="Write your comment here"
              maxLength={280}
              pattern="^[a-zA-Z0-9 ]+$"
              title="Only latin characters can be used"
              onChange={(e) => dispatch(setCreateComment(e.target.value))}
              ref={firstRef}
            />

            <button
              className="wall__comments__submit-button"
              onClick={() =>
                postStatus && state.post.createComment.length > 0 ? addComment(data._id) : ''
              }>
              <FontAwesomeIcon className="wall__comments__submit-button-icon" icon={faPlay} />
            </button>

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
                    <img
                      src={
                        state.user.commentators.find((user) => user._id === comment.userId)!?.imageUrl[0]
                      }
                      width={10}
                      alt=""
                      className="wall__comments__comment-avatar"
                    />
                  </Link>

                  <div className="wall__comments__comment-full-name-time">
                    <div className="wall__comments__comment-full-name-time__full-name">
                      {comment.firstName + ' ' + comment.lastName}
                    </div>

                    <div className="wall__comments__comment-full-name-time__time">
                      {comment.commentDate}
                    </div>
                  </div>
                </div>

                <div className="wall__comments__comment__right-block">
                  {wall.post.find((userPost) => userPost.user === id)?.user === auth?._id ||
                  auth?._id === comment.userId ? (
                    <FontAwesomeIcon
                      className="wall__comments__comment-delete"
                      icon={faXmark}
                      onClick={() => (postStatus ? deleteComment(data?._id, index) : '')}
                    />
                  ) : (
                    ''
                  )}
                </div>
              </div>

              <div className="wall__comments__comment-text">{comment.commentText}</div>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
    </>
  );
};
