import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserPhotos } from '../../store/photo';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './photoSlider.css';

function PhotoSlider() {
  const dispatch = useDispatch();
  const photo = useSelector((state) => state.photo);

  const [images, setImages] = React.useState([]);

  const onPhotosChange = (e) => {
    setImages([...e.target.files]);
  };

  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '0px',
    slidesToShow: 3,
    swipeToSlide: true,
  };

  localStorage.setItem('slider', photo.userPhotos);



  let readyPhotos = [];
  let local = localStorage.slider.split(',');
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

  console.log(
    'readyPhotos',
    readyPhotos,
    'localStorage.slider',
    localStorage.slider.split(','),
    'state',
    photo.userPhotos,
  );

    useEffect(() => {
      if (images.length < 1) return;

      let file = images[0];
      let reader = new FileReader();
      reader.onload = function (e) {
        dispatch(setUserPhotos(e.target.result));
      };
      reader.readAsDataURL(file);

      setImages([]);
    }, [images]);

  return (
    <div className="images">
      <div className="images_backGround">
        {readyPhotos.length < 2 ? (
          <div className="costili1"></div>
        ) : readyPhotos.length === 2 ? (
          <div className="costili2"></div>
        ) : (
          ''
        )}
        <Slider {...settings}>
          {photo.userPhotos[0] !== undefined
            ? readyPhotos.map((image, index) => {
                return (
                  <Link to={`/Photo/${index}`} className="slider_link" key={index}>
                    <div className="image_item" key={index}>
                      <img src={image} alt="" className="slider_image" width="290px" height="290px" />
                    </div>
                  </Link>
                );
              })
            : ''}
        </Slider>
        <div className="images_button">
          <input
            type="file"
            name="file"
            multiple
            accept="image/*"
            onChange={onPhotosChange}
            className="images_input"
          />
          <div className="add_images">Add photos</div>
        </div>
      </div>
    </div>
  );
}

export default PhotoSlider;
