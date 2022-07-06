import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { setPostText, setPostImage } from '../../store/post';
import { Link } from 'react-router-dom';
import './style.css';

function Post() {
  const dispatch = useDispatch();
  const avatar = useSelector((state) => state.photo);
  const post = useSelector((state) => state.post);
  const [postEffect, setPostEffect] = React.useState(11);
  let test = ['photos', 'video', 'music', 'geo', 'file'];

  const [images, setImages] = React.useState([]);

  const onPhotosChange = (e) => {
    setImages([...e.target.files]);
  };

  localStorage.setItem('postImage', post.postImage);

  let readyPhotos = [];
  let local = localStorage.postImage.split(',');
  let bufferPhotos = local;
  if (bufferPhotos[0].length === 0) {
    bufferPhotos.shift();
  }
  if (local.length > 1) {
    bufferPhotos.map((x, i) => (i % 2 === 0 ? readyPhotos.push(x + ',' + local[i + 1]) : ''));
  }
  if (local === 1) {
    readyPhotos = [
      'https://cdn.icon-icons.com/icons2/510/PNG/512/android-arrow-down-right_icon-icons.com_50544.png',
    ];
  }

  console.log(readyPhotos);

  useEffect(() => {
    if (images.length < 1) return;

    let file = images[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      dispatch(setPostImage(e.target.result));
    };
    reader.readAsDataURL(file);

    setImages([]);
  }, [images]);

  return (
    <div
      className={`post ${post.postText.length > 0 ? 'post_text' : ''} ${
        readyPhotos.length > 0 ? 'post_photos' : ''
      }`}>
      <img src={avatar.userAvatar} alt="" className="post_avatar" />
      <input
        type="text"
        className="post_input"
        placeholder="Post an entry"
        maxLength={175}
        onChange={(e) => dispatch(setPostText(e.target.value))}
      />
      <button className="post_button">
        <FontAwesomeIcon className="post_send" icon="fa-solid fa-play" />
      </button>
      <FontAwesomeIcon
        className="post_image"
        icon="fa-regular fa-image"
        onClick={() => (postEffect !== 0 ? setPostEffect(0) : setPostEffect())}
      />
      <input
        type="file"
        name="file"
        accept="image/*"
        onChange={onPhotosChange}
        className="post_image_input"
      />

      <FontAwesomeIcon className="post_video" icon="fa-solid fa-film" />
      <FontAwesomeIcon className="post_audio" icon="fa-solid fa-music" />
      <FontAwesomeIcon className="post_location" icon="fa-solid fa-location-pin" />
      <FontAwesomeIcon className="post_file" icon="fa-solid fa-file-lines" />

      {post.postText.length > 0 ? <div className="postText">{post.postText}</div> : ''}

      {readyPhotos.length > 0 ? (
        <div className="container3">
          {readyPhotos.map((image, index) => {
            return (
              <Link to={`/Photo/Post/${index}`}>
                <img
                  key={index}
                  src={image}
                  alt=""
                  className={`photo-${index} ${
                    index === 0 ? 'large' : index === 1 ? 'small-right' : 'small-down'
                  } ${readyPhotos.length === 1 ? 'one_image' : ''} ${
                    readyPhotos.length === 2 && index === 0
                      ? 'two_image_one'
                      : readyPhotos.length === 2 && index === 1
                      ? 'two_image_two'
                      : ''
                  }`}
                />
              </Link>
            );
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Post;
