import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchSlider, fetchSliderDelete } from '../../../store/slider/slice';
import { setInputNumber } from '../../../store/user/slice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ImageParsing } from '../../../ImageParsing/ImageParsing';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.scss';

export type MyParams = {
  id: string;
};

export const PhotoSlider: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { id } = useParams<keyof MyParams>() as MyParams;

  const readyPhotos = state.slider?.slider?.find((x) => x?.user === id)?.sliderImg;

  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '0px',
    slidesToShow: 3,
    swipeToSlide: true,
  };

  async function onPhotoDelete(index: number) {
    await dispatch(fetchSliderDelete({ deleteId: index, user: id }));
    dispatch(fetchSlider(id));
  }
  React.useEffect(() => {
    dispatch(fetchSlider(id));
  }, [dispatch, id]);

  return (
    <div className="slider_images">
      <Slider {...settings}>
        {readyPhotos?.map((image, index) => {
          return state.slider.status === 'loaded' ? (
            <span key={index}>
              <Link to={`/${id}/PhotoSlider/${index}`} key={index}>

                <div className="slider_image_item">
                  {state.auth.data?._id === id ? (
                    <FontAwesomeIcon
                      className="slider_delete_img"
                      icon={faXmark}
                      onClick={() => onPhotoDelete(index)}
                    />
                  ) : (
                    ''
                  )}
                  <img src={image} alt="" className="slider_image" width="10px" height="10px" />
                </div>
              </Link>
            </span>
          ) : (
            <div className="slider_image_item" key={index}>
              <img src={image} alt="" className="slider_image" width="10px" height="10px" />
            </div>
          );
        })}
      </Slider>

      {state.auth.data?._id === id ? (

        <button className="slider_images_button" onChange={() => dispatch(setInputNumber('1'))}>
          {state.slider.status === 'loaded' && state.user.status === 'loaded' ? (
            <ImageParsing />
          ) : (
            <div className="image_input_parser"></div>
          )}
          Add photos
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default PhotoSlider;
