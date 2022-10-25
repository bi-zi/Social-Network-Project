import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setCreateImg } from '../store/post/slice';
import { fetchUserUpdate, fetchOneUser } from '../store/user/slice';
import { fetchSlider, fetchSliderPost, fetchSliderPush } from '../store/slider/slice';
import { useParams } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import './style.scss';

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

  // Эта функция отправляет картинку на бэк в 3 направлениях все зависит от места загрузки их 3(аватар,слайдер и пост)
  // Если аватар тогда картинка отправится еще и в слайдер в остальных случаях обычное поведение
  const onSendingPicture = React.useCallback(
    async (value: string[]) => {
      if (parsing.inputNumber === '0') {
        await dispatch(fetchUserUpdate({ imageUrl: [value][0], user: id }));

        dispatch(fetchOneUser(id));
        dispatch(fetchSlider(id));
      }

      if (slider === undefined && parsing.inputNumber === '0') {
        await dispatch(fetchSliderPost({ sliderImg: [value][0] }));
        dispatch(fetchSlider(id));
      }

      if ((sliderImgLength! < 1 || sliderImgLength! > 0) && parsing.inputNumber === '0') {
        await dispatch(fetchSliderPush({ sliderImg: [value][0] }));
        dispatch(fetchSlider(id));
      }

      if (slider === undefined && parsing.inputNumber === '1') {
        await dispatch(fetchSliderPost({ sliderImg: [value][0] }));
        dispatch(fetchSlider(id));
      }

      if ((sliderImgLength! < 1 || sliderImgLength! > 0) && parsing.inputNumber === '1') {
        await dispatch(fetchSliderPush({ sliderImg: [value][0] }));
        dispatch(fetchSlider(id));
      }

      if (parsing.inputNumber === '2') {
        dispatch(setCreateImg(value));
      }
    },
    [dispatch, id, parsing.inputNumber, slider, sliderImgLength],
  );

  // Сюда картинка попадает после загрукзки и сжимается на 90% от изначального размера
  // После сжатия она уходит в useState на 85строке на это реагирует useEffect
  async function handleImageUpload(e: any) {
    const imageFile = e.target.files[0];

    let size = (
      +(imageFile['size'] / (1024 * 1024)).toFixed(2) -
      (+(imageFile['size'] / (1024 * 1024)).toFixed(2) * 90) / 100
    ).toFixed(2);

    // console.log('до', +(imageFile['size'] / (1024 * 1024)).toFixed(2));

    const options = {
      maxSizeMB: +size,
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

  // useEffect просто превращет картинку в нужный формат и вызывает функции отправки на бэк
  useEffect(() => {
    if (images.length < 1) return;

    let file = images;

    let fileReader: FileReader = new FileReader();

    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        onSendingPicture([fileReader.result]);
      }
    };
    fileReader.readAsDataURL(file);

    setImages([]);
  }, [images, onSendingPicture]);

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
