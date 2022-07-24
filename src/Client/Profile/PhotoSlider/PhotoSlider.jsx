import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';

import ImageParsing from '../../ImageParsing/ImageParsing';
import { setInputNumber } from '../../store/slices/user';
import { useParams } from 'react-router-dom';
import { fetchSlider } from '../../store/slices/slider.js';


function PhotoSlider() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { id } = useParams();

  let readyPhotos = state.slider?.slider?.find((x) => x.user === id)?.sliderImg;
  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '0px',
    slidesToShow: 3,
    swipeToSlide: true,
  };

  React.useEffect(() => {
    dispatch(fetchSlider());
  }, []);

  return (
    <div className="images">
      <div className="images_backGround">
        {readyPhotos?.length < 2 ? (
          <div className="costili1"></div>
        ) : readyPhotos?.length === 2 ? (
          <div className="costili2"></div>
        ) : (
          ''
        )}
        <Slider {...settings}>
          {readyPhotos?.map((image, index) => {
            return (
              <Link to={`/${id}/PhotoSlider/${index}`} className="slider_link" key={index}>
                <div className="image_item" key={index}>
                  <img src={image} alt="" className="slider_image" width="290px" height="290px" />
                </div>
              </Link>
            );
          })}
        </Slider>

        { state.auth.data?._id === id ?
          <div className="images_button" onChange={() => dispatch(setInputNumber('1'))}>
            <ImageParsing />
            <div className="add_images">Add photos</div>
          </div>
        : ''}
      </div>
    </div>
  );
}

export default PhotoSlider;
