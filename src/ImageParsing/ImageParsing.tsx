import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setCreateImg } from '../store/post/slice';
import { fetchUserUpdate, fetchOneUser } from '../store/user/slice';
import { fetchSlider, fetchSliderPost, fetchSliderPush } from '../store/slider/slice';
import { useParams } from 'react-router-dom';
import Compressor from 'compressorjs';

export type MyParams = {
  id: string;
};

export const ImageParsing: React.FC = () => {
  const dispatch = useAppDispatch();
  const parsing = useAppSelector((state) => state.user);
  const state = useAppSelector((state) => state);
  const { id } = useParams<keyof MyParams>() as MyParams;

  const slider = state.slider?.slider?.find((x) => x.user === id);
  const [images, setImages] = React.useState<any>([]);
  const sliderImgLength = slider?.sliderImg.length;

  const onAvatarAndSlider = async (value: string[]) => {
    if (parsing.inputNumber === '0') {
      await dispatch(fetchUserUpdate({ imageUrl: [value][0], user: id }));

      dispatch(fetchOneUser(id));
      dispatch(fetchSlider());
      // console.log('ava', parsing.inputNumber);
    }

    if (slider === undefined && parsing.inputNumber === '0') {
      await dispatch(fetchSliderPost({ sliderImg: [value][0] }));
      dispatch(fetchSlider());
      // console.log("avaSLider", parsing.inputNumber);
    }

    if ((sliderImgLength! < 1 || sliderImgLength! > 0) && parsing.inputNumber === '0') {
      await dispatch(fetchSliderPush({ sliderImg: [value][0] }));
      dispatch(fetchSlider());
      // console.log('slider',parsing.inputNumber);
    }

    if (slider === undefined && parsing.inputNumber === '1') {
      await dispatch(fetchSliderPost({ sliderImg: [value][0] }));
      dispatch(fetchSlider());
      // console.log(parsing.inputNumber);
    }

    if ((sliderImgLength! < 1 || sliderImgLength! > 0) && parsing.inputNumber === '1') {
      await dispatch(fetchSliderPush({ sliderImg: [value][0] }));
      dispatch(fetchSlider());
      // console.log(parsing.inputNumber);
    }

    if (parsing.inputNumber === '2') {
      dispatch(setCreateImg(value));
      // console.log(parsing.inputNumber);
    }
  };

  const handleCompressedUpload = (e: any) => {
    const image = e.target.files[0];

    console.log((image['size'] / (1024 * 1024)).toFixed(2) + 'Mb');

    new Compressor(image, {
      quality: 0.4,
      success: (compressedResult) => {
        setImages(compressedResult);
      },
    });
  };

  useEffect(() => {
    if (images.length < 1) return;

    let file = images;
    console.log((images['size'] / (1024 * 1024)).toFixed(2) + 'Mb');

    let fileReader: FileReader = new FileReader();

    fileReader.onload = (e: Event) => {
      if (typeof fileReader.result === 'string') {
        onAvatarAndSlider([fileReader.result]);
      }
    };
    fileReader.readAsDataURL(file);
    setImages([]);
  }, [images]);

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
};
