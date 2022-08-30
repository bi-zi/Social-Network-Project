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
} from '../../../store/post/slice';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes, faEllipsis, faXmark, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-regular-svg-icons';

import './style.css';

export type MyParams = {
  id: string;
};

export const Wall: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const wall = useAppSelector((state) => state.post.userPosts);

  const { id } = useParams<keyof MyParams>() as MyParams;
  const firstRef = React.useRef<HTMLTextAreaElement>(null);

  const [comment, setComment] = React.useState(999999);

  const user = state.user?.userOne?.[0];

  let wallPost = wall.post.find((x) => x.user === id)?.post;
  let buffer: any = [];

  if (wallPost !== undefined) {
    for (let i = wallPost.length - 1; i !== -1; --i) {
      buffer.push(wallPost[i]);
    }
  }
  wallPost = buffer;

  const like = async (postId: string, check: boolean) => {
    if (check)
      await dispatch(
        fetchPostLike({ _id: postId, likeDislike: state.auth?.data?._id, index: 1, user: id }),
      );

    if (!check)
      await dispatch(
        fetchPostLike({
          _id: postId,
          likeDislike: wallPost?.[0]?.likePost?.findIndex((x) => x === state.auth?.data?._id),
          index: 0,
          user: id,
        }),
      );
    dispatch(fetchUserPostsAll(id));
  };

  const dislike = async (postId: string, check: boolean) => {
    if (check)
      await dispatch(
        fetchPostDislike({ _id: postId, likeDislike: state.auth?.data?._id, index: 1, user: id }),
      );
    console.log(check);
    if (!check)
      await dispatch(
        fetchPostDislike({
          _id: postId,
          likeDislike: wallPost?.[0]?.dislikePost?.findIndex((x) => x === state.auth?.data?._id),
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
        fullName: state.auth.data?.fullName,
        commentText: state.post.createComment,
        commentDate: date,
        userId: state.auth.data._id,
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

  const deletePost = async (index: string) => {
    const postIndex = wall.post.find((x) => x.user === id)!.post.findIndex((x) => x._id === index);
    await dispatch(fetchPostDelete({ deleteId: postIndex, user: id }));
    dispatch(fetchUserPostsAll(id));
  };

  const postStatus = state.post.userPosts.status === 'loading';


  React.useEffect(() => {
    dispatch(fetchUserPostsAll(id));
  }, [dispatch, id]);

  return (
    <>
      {wallPost?.map((content, index) => (
        <div className={`wall ${index}`} key={index}>
          <img src={user?.imageUrl} alt="" className="wall_avatar" />

          <div className="wall_fullName">{user?.fullName}</div>
          <div className="wall_date">{content.date}</div>

          {state.auth.data?._id === id && !postStatus ? (
            <>
              <FontAwesomeIcon className="wall_menu" icon={faEllipsis} />
              <div className="wall_menu_hover" onClick={() => deletePost(content._id)}>
                <span>Delete post</span>
              </div>
            </>
          ) : (
            ''
          )}
          <div className="wall_content">
            {content.text?.length > 0 ? <div className="wall_text">{content.text}</div> : ''}
            {content.imagesPost?.length > 0 ? (
              <div className="wall_images">
                {content?.imagesPost.map((image, index) => {
                  return (
                    <div key={index}>
                      <img
                        key={index}
                        src={image}
                        alt=""
                        className={`post_image-${index} ${
                          index === 0
                            ? 'wall_large_image'
                            : index === 1
                            ? 'wall_small_right_image'
                            : 'wall_small_down_image'
                        }
                    ${content.imagesPost.length === 1 ? 'wall_one_image' : ''}
                    ${
                      content.imagesPost.length === 2 && index === 0
                        ? 'wall_two_image_first'
                        : content.imagesPost.length === 2 && index === 1
                        ? 'wall_two_image_second'
                        : ''
                    }`}
                      />
                    </div>
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
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="wall_iframe"></iframe>
              </>
            ) : (
              ''
            )}
            <div className="wall_from">Post from {`${state.user.userOne?.[0]?.fullName}`}</div>

            <FontAwesomeIcon
              className="wall_like_icon"
              icon={faThumbsUp}
              style={
                content.likePost.find((x) => x === state.auth?.data?._id)
                  ? { color: 'red' }
                  : { color: 'white' }
              }
              onClick={() => {
                if (!postStatus) {
                  content.likePost?.find((x) => x === state.auth?.data?._id)
                    ? like(content._id, false)
                    : like(content._id, true);
                }
              }}
            />
            <span className="like_number">{content.likePost?.length}</span>

            <FontAwesomeIcon
              className="wall_dislike_icon"
              icon={faThumbsDown}
              style={
                content.dislikePost.find((x) => x === state.auth?.data?._id)
                  ? { color: 'red' }
                  : { color: 'white' }
              }
              onClick={() => {
                if (!postStatus) {
                  content.dislikePost?.find((x) => x === state.auth?.data?._id)
                    ? dislike(content._id, false)
                    : dislike(content._id, true);
                }
              }}
            />

            <span className="dislike_number">{content.dislikePost?.length}</span>

            <FontAwesomeIcon
              className="wall_comment_icon"
              icon={faCommentDots}
              style={comment === index ? { color: 'black' } : { color: 'white' }}
              onClick={() => {
                if (!postStatus) {
                  comment !== index
                    ? setComment(index)
                    : comment === index
                    ? setComment(999999)
                    : setComment(index);
                }
              }}
            />
            <span className="dislike_number">{content.commentPost.length}</span>

            <FontAwesomeIcon className="wall_share_icon" icon={faShareNodes} />

            {comment === index ? (
              <div className="comments">
                <textarea
                  ref={firstRef}
                  className="comment_input"
                  placeholder="Write your comment here"
                  onChange={(e) => dispatch(setCreateComment(e.target.value))}
                />

                {!postStatus && state.post.createComment.length > 0 ? (
                  <button className="input_button" onClick={() => addComment(content._id)}>
                    <FontAwesomeIcon className="post_make_icon" icon={faPlay} />
                  </button>
                ) : (
                  <button className="input_button">
                    <FontAwesomeIcon className="post_make_icon" icon={faPlay} />
                  </button>
                )}

                {content.commentPost?.map((comment, index) => (
                  <div className="comment" key={index}>
                    <img
                      src={state.user.usersAll.find((x) => x._id === comment.userId)!.imageUrl[0]}
                      alt=""
                      className="comment_avatar"
                    />
                    {wall.post.find((x) => x.user === id)?.user === state.auth.data._id ||
                    state.auth.data._id === comment.userId ? (
                      <FontAwesomeIcon
                        className="comment_delete"
                        icon={faXmark}
                        onClick={() => (!postStatus ? deleteComment(content?._id, index) : '')}
                      />
                    ) : (
                      ''
                    )}
                    <div className="comment_fullName">{comment.fullName}</div>
                    <div className="comment_time">{comment.commentDate}</div>
                    <div className="comment_text">{comment.commentText}</div>
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
