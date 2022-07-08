import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

function Wall() {
  const state = useSelector((state) => state);
  const wallPost = state.wall.wallContent;
  console.log([...wallPost].reverse());
  return (
    <>
      {[...wallPost].reverse().map((x, index) => (
        <div className={`wall ${index}`} key={index}>
          <img src={state.images.avatarImages} alt="" className="wall_avatar" />

          <div className="wall_fullName">Alexey Tsvetkov</div>
          <div className="wall_date">{x[3]}</div>
          <FontAwesomeIcon className="wall_menu" icon="fa-solid fa-ellipsis" />

          <div className="wall_content">
            {x[0].length > 0 ? <div className="wall_text">{x[0]}</div> : ''}

            {x[1].length > 0 ? (
              <div className="wall_images">
                {x[1].map((image, index) => {
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
                    ${x[1].length === 1 ? 'wall_one_image' : ''}
                    ${
                      x[1].length === 2 && index === 0
                        ? 'wall_two_image_first'
                        : x[1].length === 2 && index === 1
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

            {x[2] ? (
              <>
                <iframe
                  src={x[2]}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="wall_iframe"></iframe>
              </>
            ) : (
              ''
            )}
            <div className="wall_from">Post from Alexey Tsvetkov</div>

            <FontAwesomeIcon className="wall_like_icon" icon="fa-regular fa-thumbs-up" />
            <FontAwesomeIcon className="wall_dislike_icon" icon="fa-regular fa-thumbs-down" />
            <FontAwesomeIcon className="wall_comment_icon" icon="fa-regular fa-comment-dots" />
            <FontAwesomeIcon className="wall_share_icon" icon="fa-solid fa-share-nodes" />
          </div>
        </div>
      ))}
    </>
  );
}

export default Wall;
