import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPostImages, setSliderImages, setAvatarImages } from '../store/images';


function ImageParsing() {
  const dispatch = useDispatch();
  const parsing = useSelector((state) => state.images);

  const [images, setImages] = React.useState([]);

  const onPhotosChange = (e) => {
    setImages([...e.target.files]);
  };


  useEffect(() => {
    if (images.length < 1) return;

    let file = images[0];
    let reader = new FileReader();
    reader.onload = function (e) {
      parsing.inputNumber === '0'
        ? dispatch(setAvatarImages(e.target.result))
        : parsing.inputNumber === '1'
        ? dispatch(setSliderImages(e.target.result))
        : dispatch(setPostImages(e.target.result));
    };
    reader.readAsDataURL(file);

    setImages([]);
  }, [images]);

  //console.log('slider', [parsing.sliderImages], 'post', [parsing.postImages]);
  return (
    <>
      <input type="file" name="file" accept="image/*" onChange={onPhotosChange} />
    </>
  );
}

export default ImageParsing;
