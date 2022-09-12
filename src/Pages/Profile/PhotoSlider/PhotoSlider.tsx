import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchSlider } from '../../../store/slider/slice';
import { setInputNumber } from '../../../store/user/slice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ImageParsing } from '../../../ImageParsing/ImageParsing';
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

  console.log(state.slider);

  React.useEffect(() => {
    dispatch(fetchSlider(id));
  }, []);

  return (
    <div className="slider_images">
      {readyPhotos!?.length < 2 ? (
        <div className="slider_image_closed_1"></div>
      ) : readyPhotos?.length === 2 ? (
        <div className="slider_image_closed_2"></div>
      ) : (
        ''
      )}
      <Slider {...settings}>
        {readyPhotos?.map((image, index) => {
          return state.slider.status === 'loaded' ? (
            <Link to={`/${id}/PhotoSlider/${index}`} className="slider_image_link" key={index}>
              <div className="slider_image_item" key={index}>
                <img src={image} alt="" className="slider_image" width="290px" height="290px" />
              </div>
            </Link>
          ) : (
            <div className="slider_image_item" key={index}>
              <img src={image} alt="" className="slider_image" width="290px" height="290px" />
            </div>
          );
        })}
      </Slider>

      {state.auth.data?._id === id ? (
        <div className="slider_images_button" onChange={() => dispatch(setInputNumber('1'))}>
          {state.slider.status === 'loaded' && state.user.status === 'loaded' ? (
            <ImageParsing />
          ) : (
            <div className="slider_images_button"></div>
          )}
          <div className="slider_add_image">Add photos</div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default PhotoSlider;
