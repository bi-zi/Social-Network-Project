import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import {
  fetchUserPostsAll,
  fetchPostLike,
  fetchPostDislike,
  setCreateComment,
  fetchCommentPush,
  fetchPostDelete,
} from '../../store/slices/post';
import './style.css';

function Wall() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const wall = useSelector((state) => state.post.userPosts);
  const [comment, setComment] = React.useState('0');
  const { id } = useParams();

  let wallPost = wall.post?.[0]?.post;
  const buffer = [];
  if (wallPost !== undefined) {
    for (let i = wallPost.length - 1; i !== -1; --i) {
      buffer.push(wallPost[i]);
    }
  }
  wallPost = buffer;

  const like = async (postId) => {
    await dispatch(fetchPostLike({ _id: postId }, id));
    dispatch(fetchUserPostsAll(id));
  };

  const dislike = async (postId) => {
    await dispatch(fetchPostDislike({ _id: postId }, id));
    dispatch(fetchUserPostsAll(id));
  };

  const addComment = async (postId) => {
    await dispatch(
      fetchCommentPush(
        {
          _id: postId,
          text: state.post.createComment,
        },
        id,
      ),
    );
    dispatch(fetchUserPostsAll(id));
    dispatch(setCreateComment(''));
  };

  const deletePost = async (index) => {
    await dispatch(fetchPostDelete({ deleteId: index }, id));
    console.log(index);
    dispatch(fetchUserPostsAll(id));
  };

  return (
    <>
      {wallPost?.map((content, index) => (
        <div className={`wall ${index}`} key={index}>
          <img src={state.user.userOne?.imageUrl} alt="" className="wall_avatar" />

          <div className="wall_fullName">Alexey Tsvetkov</div>
          <div className="wall_date">{content.date}</div>
          <FontAwesomeIcon className="wall_menu" icon="fa-solid fa-ellipsis" />
          <div className="wall_menu_hover" onClick={() => deletePost(content._id)}>
            <span>Delete post</span>
          </div>

          <div className="wall_content">
            {content.text?.length > 0 ? <div className="wall_text">{content.text}</div> : ''}
            {content.imagesPost?.length > 0 ? (
              <div className="wall_images">
                {content.imagesPost.map((image, index) => {
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
            <div className="wall_from">Post from {`${state.user.userOne.fullName}`}</div>

            <FontAwesomeIcon
              className="wall_like_icon"
              icon="fa-regular fa-thumbs-up"
              onClick={() => like(content._id)}
            />
            <span className="like_number">{content.likePost}</span>

            <FontAwesomeIcon
              className="wall_dislike_icon"
              icon="fa-regular fa-thumbs-down"
              onClick={() => dislike(content._id)}
            />
            <span className="dislike_number">{content.dislikePost}</span>

            <FontAwesomeIcon
              className="wall_comment_icon"
              icon="fa-regular fa-comment-dots"
              onClick={() => (comment !== '0' ? setComment('0') : setComment(index))}
            />
            <span className="dislike_number">{content.commentPost.length}</span>

            <FontAwesomeIcon className="wall_share_icon" icon="fa-solid fa-share-nodes" />

            {comment === index ? (
              <div className="comments">
                <textarea
                  className="comment_input"
                  placeholder="Write your comment here"
                  onChange={(e) => dispatch(setCreateComment(e.target.value))}
                />

                <button className="input_button" onClick={() => addComment(content._id)}>
                  <FontAwesomeIcon className="post_make_icon" icon="fa-solid fa-play" />
                </button>

                {content.commentPost?.map((comment, index) => (
                  <div className="comment" key={index}>
                    <img src={state.user.userOne.imageUrl} alt="" className="comment_avatar" />
                    <div className="comment_fullName">{`${state.user.userOne.fullName}`}</div>
                    <div className="comment_time">{comment[1]}</div>
                    <div className="comment_text">{comment[0]}</div>
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
