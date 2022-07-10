import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Compressor from 'compressorjs';
import { setPostImages, setSliderImages, setAvatarImages } from '../store/images';

function ImageParsing() {
  const dispatch = useDispatch();
  const parsing = useSelector((state) => state.images);

  const [images, setImages] = React.useState([]);


  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    console.log(e.target.files[0]['size']);
    new Compressor(image, {
      quality: 0.3, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        setImages(compressedResult);
      },
    });
  };

  useEffect(() => {
    if (images.length < 1) return;

    let file = images;
    console.log(images['size']);
    let reader = new FileReader();
    reader.onload = (e) => {
      parsing.inputNumber === '0'
        ? dispatch(setAvatarImages(e.target.result)) && dispatch(setSliderImages(e.target.result))
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
      <input
        type="file"
        name="file"
        accept="image/*"
        onChange={(e) => handleCompressedUpload(e)}
        className="input_parser"
      />
    </>
  );
}

export default ImageParsing;
