import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserPostsAll,
  fetchPostLike,
  fetchPostDislike,
  setCreateComment,
  fetchCommentPush,
  fetchCommentDelete,
  fetchPostDelete,
} from '../../store/slices/post';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

function Wall() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const wall = useSelector((state) => state.post.userPosts);
  const [comment, setComment] = React.useState();
  const { id } = useParams();
  const firstRef = React.useRef(null);
  const user = state.user?.userOne?.[0];

  let wallPost = wall.post.find((x) => x.user === id)?.post;
  const buffer = [];
  if (wallPost !== undefined) {
    for (let i = wallPost.length - 1; i !== -1; --i) {
      buffer.push(wallPost[i]);
    }
  }
  wallPost = buffer;

  const like = async (postId, check) => {
    if (check) await dispatch(fetchPostLike({ _id: postId, likeDislike: state.auth?.data?._id, index: 1 }, id));

    if (!check)
      await dispatch(
        fetchPostLike(
          {
            _id: postId,
            likeDislike: wallPost?.[0]?.likePost?.findIndex((x) => x === state.auth?.data?._id),
            index: 0,
          },
          id,
        ),
      );
    dispatch(fetchUserPostsAll(id));
  };

  const dislike = async (postId, check) => {
    if (check) await dispatch(fetchPostDislike({ _id: postId, likeDislike: state.auth?.data?._id, index: 1 }, id));
    console.log(check);
    if (!check)
      await dispatch(
        fetchPostDislike(
          {
            _id: postId,
            likeDislike: wallPost?.[0]?.dislikePost?.findIndex((x) => x === state.auth?.data?._id),
            index: 0,
          },
          id,
        ),
      );
    dispatch(fetchUserPostsAll(id));
  };

  const addComment = async (postId) => {
    let date = new Date();
    date = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    await dispatch(
      fetchCommentPush(
        {
          _id: postId,
          fullName: state.auth.data?.fullName,
          commentText: state.post.createComment,
          commentDate: date,
          userId: state.auth.data._id,
        },
        id,
      ),
    );
    dispatch(fetchUserPostsAll(id));
    dispatch(setCreateComment(''));
    firstRef.current.value = '';
  };

  const deleteComment = async (postId, ind) => {
    await dispatch(fetchCommentDelete({ postId: postId, index: ind }, id));
    dispatch(fetchUserPostsAll(id));
  };

  const deletePost = async (index) => {
    const postIndex = wall.post.find((x) => x.user === id).post.findIndex((x) => x._id === index);
    await dispatch(fetchPostDelete({ deleteId: postIndex }, id));
    dispatch(fetchUserPostsAll(id));
  };

  React.useEffect(() => {
    dispatch(fetchUserPostsAll(id));
  }, []);

  return (
    <>
      {wallPost?.map((content, index) => (
        <div className={`wall ${index}`} key={index}>
          <img src={user?.imageUrl} alt="" className="wall_avatar" />

          <div className="wall_fullName">{user?.fullName}</div>
          <div className="wall_date">{content.date}</div>

          {state.auth.data?._id === id ? (
            <>
              <FontAwesomeIcon className="wall_menu" icon="fa-solid fa-ellipsis" />
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
              icon="fa-regular fa-thumbs-up"
              style={
                content.likePost.find((x) => x === state.auth?.data?._id)
                  ? { color: 'red' }
                  : { color: 'white' }
              }
              onClick={() =>
                content.likePost?.find((x) => x === state.auth?.data?._id)
                  ? like(content._id, false)
                  : like(content._id, true)
              }
            />
            <span className="like_number">{content.likePost?.length}</span>

            <FontAwesomeIcon
              className="wall_dislike_icon"
              icon="fa-regular fa-thumbs-down"
              style={
                content.dislikePost.find((x) => x === state.auth?.data?._id)
                  ? { color: 'red' }
                  : { color: 'white' }
              }
              onClick={() =>
                content.dislikePost?.find((x) => x === state.auth?.data?._id)
                  ? dislike(content._id, false)
                  : dislike(content._id, true)
              }
            />

            <span className="dislike_number">{content.dislikePost?.length}</span>

            <FontAwesomeIcon
              className="wall_comment_icon"
              icon="fa-regular fa-comment-dots"
              style={comment === index ? { color: 'black' } : { color: 'white' }}
              onClick={() =>
                comment !== index
                  ? setComment(index)
                  : comment === index
                  ? setComment('0')
                  : setComment(index)
              }
            />
            <span className="dislike_number">{content.commentPost.length}</span>

            <FontAwesomeIcon className="wall_share_icon" icon="fa-solid fa-share-nodes" />

            {comment === index ? (
              <div className="comments">
                <textarea
                  ref={firstRef}
                  className="comment_input"
                  placeholder="Write your comment here"
                  onChange={(e) => dispatch(setCreateComment(e.target.value))}
                />

                {state.post.userPosts.status === 'loaded' && state.post.createComment.length > 0 ? (
                  <button className="input_button" onClick={() => addComment(content._id)}>
                    <FontAwesomeIcon className="post_make_icon" icon="fa-solid fa-play" />
                  </button>
                ) : (
                  <button className="input_button">
                    <FontAwesomeIcon className="post_make_icon" icon="fa-solid fa-play" />
                  </button>
                )}

                {content.commentPost?.map((comment, index) => (
                  <div className="comment" key={index}>
                    <img
                      src={state.user.usersAll.find((x) => x._id === comment.userId).imageUrl[0]}
                      alt=""
                      className="comment_avatar"
                    />
                    {wall.post.find((x) => x.user === id)?.user === state.auth.data._id ||
                    state.auth.data._id === comment.userId ? (
                      <FontAwesomeIcon
                        className="comment_delete"
                        icon="fa-solid fa-xmark"
                        onClick={() => deleteComment(content?._id, index)}
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
}

export default Wall;
