import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchUserUpdate, fetchOneUser } from '../../store/user/slice';
import { fetchSlider, fetchSliderDelete } from '../../store/slider/slice';
import { setCreateImgDelete } from '../../store/post/slice';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Left, Right, Cross } from '../../Svg';
import './style.scss';

export type MyParams = {
  user: string;
  category: string;
  id: string;
};

export const Photo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, category, id } = useParams<keyof MyParams>() as MyParams;
  const state = useAppSelector((state) => state);
  const avatar = state.user?.userOne?.[0];
  const slider = state.slider.slider?.find((userSlider) => userSlider?.user === user);

  const readyPhotos =
    category === 'PhotoAvatar'
      ? [avatar?.imageUrl?.[0]]
      : category === 'PhotoSlider'
      ? slider?.sliderImg
      : category === 'WallPost'
      ? state?.post?.userPosts?.post?.[0]?.post.filter((x, i) => i === +state?.post?.postIndex)?.[0]
          ?.imagesPost
      : state.post.createImg;

  const onPhotoDelete = async () => {
    if (category === 'PhotoAvatar') {
      await dispatch(
        fetchUserUpdate({
          imageUrl: 'https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png',
          user,
        }),
      );
      dispatch(fetchOneUser(user));
    }

    if (category === 'PhotoSlider') {
      await dispatch(fetchSliderDelete({ deleteId: +id, user }));
      dispatch(fetchSlider(user));
    }

    if (category === 'CreatePost') {
      dispatch(setCreateImgDelete(readyPhotos!.filter((image, index) => index !== +id)));
    }
  };

  React.useEffect(() => {
    dispatch(fetchSlider(user));
    dispatch(fetchOneUser(user));
  }, [dispatch, user]);

  if (localStorage.isAuth === undefined) {
    return <Navigate to="/Login" />;
  }

  const loadStatus =
    state.user.status === 'loaded' && state.auth.status === 'loaded' && state.slider.status === 'loaded';

  return (
    <div className="selected-image">
      <div className="selected-image__container">
        <Link
          to={`/Profile/${user}`}
          style={{ color: '#000000' }}
          className="selected-image__container-close">
          <Cross />
        </Link>

        <img src={readyPhotos?.[+id]} width={10} alt="" className="selected-image__container-img" />

        {readyPhotos?.length !== 1 ? (
          <>
            <Link
              to={`/${user}/${category}/${+id === 0 ? readyPhotos!?.length - 1 : +id - 1}`}
              className="selected-image__container__swap-left">
              <Left />
            </Link>

            <Link
              to={`/${user}/${category}/${readyPhotos!?.length - 1 === +id ? 0 : +id + 1}`}
              className="selected-image__container__swap-right">
              <Right />
            </Link>
          </>
        ) : (
          ''
        )}
        <>
          {state.auth.data?._id === user && loadStatus && category !== 'WallPost' ? (
            <button className="selected-image__container__delete-img">
              <Link
                to={`/Profile/${user}`}
                style={{ color: '#ffffff', textDecoration: 'none' }}
                onClick={() => onPhotoDelete()}>
                Delete image
              </Link>
            </button>
          ) : (
            ''
          )}
        </>
      </div>
    </div>
  );
};
