import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setCreateImg } from '../store/post/slice';
import { fetchUserUpdate, fetchOneUser } from '../store/user/slice';
import { fetchSlider, fetchSliderPost, fetchSliderPush } from '../store/slider/slice';
import { useParams } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { Line } from 'rc-progress';
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

  const [web, setWeb] = React.useState({
    webWorker: {
      progress: undefined,
    },
    mainThread: {
      progress: undefined,
    },
  });

  function onProgress(p: any, useWebWorker: any) {
    const targetName = useWebWorker ? 'webWorker' : 'mainThread';
    setWeb((prevState) => ({
      ...prevState,
      [targetName]: {
        ...prevState[targetName],
        progress: p,
      },
    }));
  }

  async function compressImage(event: any, useWebWorker: any) {
    const file = event.target.files[0];

    let size = (
      +(file.size / 1024 / 1024).toFixed(2) -
      (+(file.size / 1024 / 1024).toFixed(2) * 90) / 100
    ).toFixed(2);

    const options = {
      maxSizeMB: +size,
      useWebWorker: true,
      onProgress: (p: any) => onProgress(p, useWebWorker),
    };

    const output = await imageCompression(file, options);
    if (+(output.size / 1024 / 1024).toFixed(2) > 0.1) {
      let file = new File([output], 'name', {
        type: output.type,
      });

      compressImage2(file, true);
    } else {
      setImages(output);
    }

    // console.log(1, size, +(file.size / 1024 / 1024).toFixed(2), +(output.size / 1024 / 1024).toFixed(2));
  }

  async function compressImage2(file: any, useWebWorker: any) {
    let size = (
      +(file.size / 1024 / 1024).toFixed(2) -
      (+(file.size / 1024 / 1024).toFixed(2) * 60) / 100
    ).toFixed(2);

    const options = {
      maxSizeMB: +size,
      useWebWorker: true,
      onProgress: (p: any) => onProgress(p, useWebWorker),
    };

    const output = await imageCompression(file, options);

    // console.log(2, size, +(file.size / 1024 / 1024).toFixed(2), +(output.size / 1024 / 1024).toFixed(2));
    setImages(output);
  }

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
        dispatch(setCreateImg([value]));
      }
    },
    [dispatch, id, parsing.inputNumber, slider, sliderImgLength],
  );
  // useEffect просто превращет картинку в нужный формат и вызывает функции отправки на бэк
  useEffect(() => {
    if (images.length < 1) return;

    let fileReader: FileReader = new FileReader();

    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        onSendingPicture([fileReader.result]);
      }
    };
    fileReader.readAsDataURL(images);

    setImages([]);
  }, [images, onSendingPicture]);

  console.log(web.webWorker.progress);
  return (
    <>
      {web.webWorker.progress !== undefined && web.webWorker.progress !== 100 ? (
        <Line
          percent={web.webWorker.progress}
          strokeWidth={4}
          strokeColor="#ffffff"
          trailColor="#ffffff"
          className="image_input_load"
        />
      ) : (
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={(e) => {
            compressImage(e, true);
          }}
          className="image_input_parser"
        />
      )}
    </>
  );
};
