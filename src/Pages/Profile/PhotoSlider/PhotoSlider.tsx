import React from 'react';
import Slider from 'react-slick';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchSlider, fetchSliderDelete } from '../../../store/slider/slice';
import { setInputNumber } from '../../../store/user/slice';
import { ImageParsing } from '../../../ImageParsing/ImageParsing';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { Garbage } from '../../../Svg';
import 'react-loading-skeleton/dist/skeleton.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.scss';

interface MyParams {
  id: string;
}

export const PhotoSlider: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { id } = useParams<keyof MyParams>() as MyParams;

  const readyPhotos = state.slider?.slider?.[0]?.sliderImg;

  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '0px',
    slidesToShow: 3,
    swipeToSlide: true,
  };

  async function onPhotoDelete(e: React.MouseEvent<HTMLDivElement>, index: number) {
    e.preventDefault();

    if (window.confirm('Are you sure you want to delete the image?')) {
      await dispatch(fetchSliderDelete({ deleteId: index, user: id }));
      dispatch(fetchSlider(id));
    }
  }

  const loadStatus = state.slider.status === 'loaded' && state.user.status === 'loaded';
  const buttonStatus = loadStatus && state.auth.data?._id === id;

  React.useEffect(() => {
    dispatch(fetchSlider(id));
  }, [dispatch, id]);

  return (
    <div className="profile__slider">
      <Slider {...settings}>
        {loadStatus
          ? readyPhotos?.map((image, index) => {
              return (
                <span key={index} className="profile__slider__image">
                  {state.auth.data?._id === id ? (
                    <div style={{stroke: 'white'}}
                      className="profile__slider__image-delete"
                      onClick={(e) => onPhotoDelete(e, index)}>
                      <Garbage />
                    </div>
                  ) : (
                    ''
                  )}
                  <Link to={`/${id}/PhotoSlider/${index}`} key={index}>
                    <div>
                      <img
                        src={image}
                        alt=""
                        className="profile__slider__image-img"
                        width="10px"
                        height="10px"
                      />
                    </div>
                  </Link>
                </span>
              );
            })
          : new Array(5).fill(0).map((jsx, i) => (
              <span className="profile__slider__image" key={i}>
                <Skeleton
                  className="profile__slider__image-img"
                  style={{ borderWidth: 0, cursor: 'auto' }}
                />
              </span>
            ))}
      </Slider>

      {buttonStatus ? (
        readyPhotos === undefined || readyPhotos?.length < 8 ? (
          <button className="profile__slider__button" onClick={() => dispatch(setInputNumber('1'))}>
            <ImageParsing />
            Add photos
          </button>
        ) : (
          <button className="profile__slider__button">Max 8 images</button>
        )
      ) : state.auth.data?._id === id ? (
        <div className="profile__slider__skeleton">
          <Skeleton height={'100%'} style={{ borderRadius: '1.5vh' }} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default PhotoSlider;
