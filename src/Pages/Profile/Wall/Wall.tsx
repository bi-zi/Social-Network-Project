import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import {
  fetchUserPostsAll,
  fetchPostLike,
  fetchPostDislike,
  setCreateComment,
  fetchCommentPush,
  fetchCommentDelete,
  fetchPostDelete,
  setPostIndex,
} from '../../../store/post/slice';
import { fetchCommentators, setClearCommentators } from '../../../store/user/slice';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes, faEllipsis, faXmark, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-regular-svg-icons';

import './style.scss';

export type MyParams = {
  id: string;
};

export const Wall: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const wall = useAppSelector((state) => state.post.userPosts);
  const auth = useAppSelector((state) => state.auth?.data);

  const { id } = useParams<keyof MyParams>() as MyParams;
  const firstRef = React.useRef<HTMLTextAreaElement>(null);

  const [comment, setComment] = React.useState(999999);

  const user = state.user?.userOne?.[0];

  let wallPost = wall.post.find((post) => post?.user === id)?.post;
  let buffer = [];

  if (wallPost !== undefined) {
    for (let i = wallPost.length - 1; i !== -1; --i) {
      buffer.push(wallPost[i]);
    }
  }
  wallPost = buffer;

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
    // console.log(postId, ind)
    await dispatch(fetchCommentDelete({ postId: postId, index: ind, user: id }));
    dispatch(fetchUserPostsAll(id));
  };

  const deletePost = async (index: string) => {
    const postIndex = wall.post
      .find((userPosts) => userPosts.user === id)!
      .post.findIndex((post) => post._id === index);

    await dispatch(fetchPostDelete({ deleteId: postIndex, user: id }));
    dispatch(fetchUserPostsAll(id));
  };

  const postStatus = state.post.userPosts.status === 'loaded';


  const openCloseComment = (postIndex: number) => {
    const commentators = wallPost?.[postIndex].commentPost.map((x) => x.userId).join(',');

    if (postStatus) {
      if (comment !== postIndex) {
        dispatch(fetchCommentators(commentators));
        setComment(postIndex);
      } else {
        setComment(999999);
        dispatch(setClearCommentators());
      }
    }
  };

  React.useEffect(() => {
    dispatch(fetchUserPostsAll(id));
  }, [dispatch, id]);

  return (
    <>
      {wallPost?.map((content, postIndex) => (
        <div className={`wall ${postIndex}`} key={content._id}>
          <img src={user?.imageUrl} width={10} alt="" className="wall_avatar" />

          <div className="wall_fullName_date">
            <span className="wall_fullName">{user?.firstName + ' ' + user?.lastName}</span>
            <br />
            <span className="wall_date">{content.date}</span>
          </div>

          <FontAwesomeIcon className="wall_menu" icon={faEllipsis} />
          <div
            className="wall_menu_hover"
            onClick={() => (auth?._id === id && postStatus ? deletePost(content._id) : '')}>
            <span>Delete post</span>
          </div>
          <div className="wall_content">
            {content.text?.length > 0 ? <div className="wall_text">{content.text}</div> : ''}
            {content.imagesPost?.length > 0 ? (
              <div className="post_images_container">
                {content?.imagesPost.map((image, index) => {
                  return (
                    <span key={index}>
                      <Link
                        to={`/${id}/WallPost/${index}`}
                        style={{ textDecoration: 0 }}
                        onClick={() =>
                          dispatch(setPostIndex((wallPost!?.length - postIndex - 1).toString()))
                        }>
                        <img
                          src={image}
                          alt=""
                          width={10}
                          className={`
                    ${
                      index === 0
                        ? 'wall_first_img'
                        : index === 1
                        ? 'wall_secong_img'
                        : index === 2
                        ? 'wall_third_img'
                        : ''
                    }`}
                        />
                      </Link>
                    </span>
                  );
                })}
              </div>
            ) : (
              ''
            )}
            {content.videoPost.length > 0 ? (
              <>
                <iframe
                  src={content.videoPost}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write;
                   encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="wall_iframe"></iframe>
              </>
            ) : (
              ''
            )}

            <div className="wall_from">
              Post from{' '}
              {`${state.user.userOne?.[0]?.firstName + ' ' + state.user.userOne?.[0]?.lastName}`}
            </div>

            <FontAwesomeIcon
              className="wall_like_icon"
              icon={faThumbsUp}
              style={
                content.likePost.find((userId) => userId === auth?._id)
                  ? { color: 'red' }
                  : { color: 'white' }
              }
              onClick={() => {
                if (postStatus) {
                  content.likePost?.find((userId) => userId === auth?._id)
                    ? like(content._id, false)
                    : like(content._id, true);
                }
              }}
            />
            <span className="wall_like_number">{content.likePost?.length}</span>

            <FontAwesomeIcon
              className="wall_dislike_icon"
              icon={faThumbsDown}
              style={
                content.dislikePost.find((userId) => userId === auth?._id)
                  ? { color: 'red' }
                  : { color: 'white' }
              }
              onClick={() => {
                if (postStatus) {
                  content.dislikePost?.find((userId) => userId === auth?._id)
                    ? dislike(content._id, false)
                    : dislike(content._id, true);
                }
              }}
            />

            <span className="wall_dislike_number">{content.dislikePost?.length}</span>

            <FontAwesomeIcon
              className="wall_comment_icon"
              icon={faCommentDots}
              style={comment === postIndex ? { color: 'black' } : { color: 'white' }}
              onClick={() => {
                openCloseComment(postIndex);
              }}
            />
            <span className="wall_dislike_number">{content.commentPost.length}</span>

            <FontAwesomeIcon className="wall_share_icon" icon={faShareNodes} />

            {comment === postIndex ? (
              <div className="wall_comments">
                <textarea
                  ref={firstRef}
                  className="wall_comment_input"
                  placeholder="Write your comment here"
                  maxLength={280}
                  onChange={(e) => dispatch(setCreateComment(e.target.value))}
                />

                <button
                  className="wall_input_button"
                  onClick={() =>
                    postStatus && state.post.createComment.length > 0 ? addComment(content._id) : ''
                  }>
                  <FontAwesomeIcon className="wall_post_icon" icon={faPlay} />
                </button>

                {content.commentPost?.map((comment, index) => (
                  <div className="wall_comment" key={index}>
                    <Link
                      to={`/Profile/${comment.userId}`}
                      onClick={() => {
                        window.scrollTo(0, 0);
                        setComment(999999);
                      }}>
                      <img
                        src={
                          state.user.commentators.find((user) => user._id === comment.userId)!
                            ?.imageUrl[0]
                        }
                        width={10}
                        alt=""
                        className="wall_comment_avatar"
                      />
                    </Link>
                    {wall.post.find((userPost) => userPost.user === id)?.user === auth?._id ||
                    auth?._id === comment.userId ? (
                      <FontAwesomeIcon
                        className="wall_comment_delete"
                        icon={faXmark}
                        onClick={() => (postStatus ? deleteComment(content?._id, index) : '')}
                      />
                    ) : (
                      ''
                    )}
                    <div className="wall_comment_fullName">
                      {comment.firstName + ' ' + comment.lastName}
                    </div>
                    <div className="wall_comment_time">{comment.commentDate}</div>
                    <div className="wall_comment_text">{comment.commentText}</div>
                  </div>
                ))}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      ))}
    </>
  );
};
