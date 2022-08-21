import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchSlider } from '../../../store/slider/slice';
import { setInputNumber } from '../../../store/user/slice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ImageParsing from '../../../ImageParsing/ImageParsing';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';


export const PhotoSlider: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { id } = useParams();

  const readyPhotos = state.slider?.slider?.find((x) => x.user === id)?.sliderImg

  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '0px',
    slidesToShow: 3,
    swipeToSlide: true,
  };

  React.useEffect(() => {
    dispatch(fetchSlider());
  }, [dispatch]);

  return (
    <div className="images">
      <div className="images_backGround">
        {readyPhotos!?.length < 2 ? (
          <div className="crutch_1"></div>
        ) : readyPhotos?.length === 2 ? (
          <div className="crutch_2"></div>
        ) : (
          ''
        )}
        <Slider {...settings}>
          {readyPhotos?.map((image, index) => {
            return state.slider.status === 'loaded' ? (
              <Link to={`/${id}/PhotoSlider/${index}`} className="slider_link" key={index}>
                <div className="image_item" key={index}>
                  <img src={image} alt="" className="slider_image" width="290px" height="290px" />
                </div>
              </Link>
            ) : (
              <div className="image_item" key={index}>
                <img src={image} alt="" className="slider_image" width="290px" height="290px" />
              </div>
            );
          })}
        </Slider>

        {state.auth.data?._id === id ? (
          <div className="images_button" onChange={() => dispatch(setInputNumber('1'))}>
            {state.slider.status === 'loaded' && state.user.status === 'loaded' ? (
              <ImageParsing />
            ) : (
              <div className="slider_button"></div>
            )}
            <div className="add_images">Add photos</div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default PhotoSlider;
