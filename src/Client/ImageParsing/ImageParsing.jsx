import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Compressor from 'compressorjs';
import { setCreateImg } from '../store/slices/post';
import { useParams } from 'react-router-dom';
import { fetchUserUpdate, fetchAllUsers } from '../store/slices/user';
import { fetchSlider, fetchSliderPost, fetchSliderPush } from '../store/slices/slider';

function ImageParsing() {
  const dispatch = useDispatch();
  const parsing = useSelector((state) => state.user);
  const state = useSelector((state) => state);
  const { id } = useParams();
  const slider = state.slider?.slider?.find((x) => x.user === id);
  const [images, setImages] = React.useState([]);
  const sliderImgLength = slider?.sliderImg.length;

  const onAvatarAndSlider = async (value) => {
    if (parsing.inputNumber === '0') {
      await dispatch(fetchUserUpdate({ imageUrl: [value][0] }, id));
      dispatch(fetchAllUsers());
      // console.log("ava",parsing.inputNumber);
    }
    if (slider === undefined && parsing.inputNumber === '0') {
      await dispatch(fetchSliderPost({ sliderImg: [value][0] }));
      // console.log("avaSLider", parsing.inputNumber);
    }

    if ((sliderImgLength < 1 || sliderImgLength > 0) && parsing.inputNumber === '0') {
      await dispatch(fetchSliderPush({ sliderImg: [value][0] }));
      // console.log('slider',parsing.inputNumber);
    }

    if (slider === undefined && parsing.inputNumber === '1') {
      await dispatch(fetchSliderPost({ sliderImg: [value][0] }));
      // console.log(parsing.inputNumber);
    }

    if ((sliderImgLength < 1 || sliderImgLength > 0) && parsing.inputNumber === '1') {
      await dispatch(fetchSliderPush({ sliderImg: [value][0] }));
      // console.log(parsing.inputNumber);
    }

    if (parsing.inputNumber === '2') {
      dispatch(setCreateImg(value));
      // console.log(parsing.inputNumber);
    }

    dispatch(fetchSlider());
  };

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];

    console.log(image['size']);
     console.log((image['size'] / (1024 * 1024)).toFixed(2) + 'Mb');

    new Compressor(image, {
      quality: 0.6,
      success: (compressedResult) => {
        setImages(compressedResult)
      },
    });
  };

  useEffect(() => {
    if (images.length < 1) return;

    let file = images;
     console.log((images['size'] / (1024 * 1024)).toFixed(2) + 'Mb');

    let reader = new FileReader();

    reader.onload = (e) => {
      onAvatarAndSlider(e.target.result);
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
        accept="image/jpeg"
        onChange={(e) => handleCompressedUpload(e)}
        className="input_parser"
      />
    </>
  );
}

export default ImageParsing;
