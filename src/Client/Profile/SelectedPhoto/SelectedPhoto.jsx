import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserUpdate, fetchOneUser } from '../../store/slices/user';
import { fetchSlider, fetchSliderDelete } from '../../store/slices/slider';
import { setCreateImgDelete } from '../../store/slices/post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

function Photo() {
  const dispatch = useDispatch();
  const { user, category, id } = useParams();
  const state = useSelector((state) => state);
  const avatar = state.user?.userOne?.[0];
  const slider = state.slider.slider?.find((x) => x.user === user);

  let readyPhotos =
    category === 'PhotoAvatar'
      ? avatar?.imageUrl
      : category === 'PhotoSlider'
      ? slider?.sliderImg
      : state.post.createImg;

  const onPhotoDelete = async () => {
    if (category === 'PhotoAvatar') {
      await dispatch(
        fetchUserUpdate(
          { imageUrl: 'https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png' },
          user,
        ),
      );
      dispatch(fetchOneUser(user));
    }

    if (category === 'PhotoSlider') {
      await dispatch(fetchSliderDelete({ deleteId: id }, user));
      dispatch(fetchSlider());
    }

    if (category === 'CreatePost') {
      dispatch(setCreateImgDelete(readyPhotos.filter((x, index) => index !== +id)));
    }
  };

  React.useEffect(() => {

    dispatch(fetchSlider(id));
  }, []);

  return (
    <div className="photo_viewing">
      <Link to={`/Profile/${user}`} style={{ color: '#000000' }} className="cloce">
        <FontAwesomeIcon className="close" icon="fa-solid fa-xmark" />
      </Link>
      <img src={readyPhotos?.[id]} alt="" className="photo" />
      <div className="picture_control_panel">
        {state.auth.data?._id === user && state.user.status === 'loaded' ? (
          <Link
            className="delete_photo"
            to={`/Profile/${user}`}
            style={{ color: '#ffffff', textDecoration: 'none' }}
            onClick={() => onPhotoDelete()}>
            Delete image
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Photo;
