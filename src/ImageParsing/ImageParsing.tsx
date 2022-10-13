import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setCreateImg } from '../store/post/slice';
import { fetchUserUpdate, fetchOneUser } from '../store/user/slice';
import { fetchSlider, fetchSliderPost, fetchSliderPush } from '../store/slider/slice';
import { useParams } from 'react-router-dom';
// import Compressor from 'compressorjs';
import imageCompression from 'browser-image-compression';
export type MyParams = {
  id: string;
};

export const ImageParsing: React.FC = () => {
  const dispatch = useAppDispatch();

  const parsing = useAppSelector((state) => state.user);
  const state = useAppSelector((state) => state);

  const { id } = useParams<keyof MyParams>() as MyParams;
  const [images, setImages] = React.useState<any>([]);

  const slider = state.slider?.slider?.find((x) => x?.user === id);
  const sliderImgLength = slider?.sliderImg.length;

  const onAvatarAndSlider = async (value: string[]) => {
    if (parsing.inputNumber === '0') {
      await dispatch(fetchUserUpdate({ imageUrl: [value][0], user: id }));

      dispatch(fetchOneUser(id));
      dispatch(fetchSlider(id));
      // console.log('ava', parsing.inputNumber);
    }

    if (slider === undefined && parsing.inputNumber === '0') {
      await dispatch(fetchSliderPost({ sliderImg: [value][0] }));
      dispatch(fetchSlider(id));
      // console.log("avaSLider", parsing.inputNumber);
    }

    if ((sliderImgLength! < 1 || sliderImgLength! > 0) && parsing.inputNumber === '0') {
      await dispatch(fetchSliderPush({ sliderImg: [value][0] }));
      dispatch(fetchSlider(id));
      // console.log('slider',parsing.inputNumber);
    }

    if (slider === undefined && parsing.inputNumber === '1') {
      await dispatch(fetchSliderPost({ sliderImg: [value][0] }));
      dispatch(fetchSlider(id));
      // console.log(parsing.inputNumber);
    }

    if ((sliderImgLength! < 1 || sliderImgLength! > 0) && parsing.inputNumber === '1') {
      await dispatch(fetchSliderPush({ sliderImg: [value][0] }));
      dispatch(fetchSlider(id));
      // console.log(parsing.inputNumber);
    }

    if (parsing.inputNumber === '2') {
      dispatch(setCreateImg(value));
      // console.log(parsing.inputNumber);
    }
  };

  async function handleImageUpload(e: any) {
    const imageFile = e.target.files[0];

    let a = (
      +(imageFile['size'] / (1024 * 1024)).toFixed(2) -
      (+(imageFile['size'] / (1024 * 1024)).toFixed(2) * 90) / 100
    ).toFixed(2);

    // console.log('до', +(imageFile['size'] / (1024 * 1024)).toFixed(2));

    const options = {
      maxSizeMB: +a,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      
      //  console.log(+(compressedFile['size'] / (1024 * 1024)).toFixed(2));

      setImages(compressedFile);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (images.length < 1) return;

    let file = images;
    // console.log('после', (images['size'] / (1024 * 1024)).toFixed(2) + 'Mb');

    let fileReader: FileReader = new FileReader();

    fileReader.onload = (e: Event) => {
      if (typeof fileReader.result === 'string') {
        onAvatarAndSlider([fileReader.result]);
      }
    };
    fileReader.readAsDataURL(file);

    console.log('срабатывание');
    setImages([]);
  }, [images, onAvatarAndSlider]);

  return (
    <>
      <input
        type="file"
        name="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e)}
        className="image_input_parser"
      />
    </>
  );
};
