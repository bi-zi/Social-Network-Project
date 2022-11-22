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

  const slider = state.slider?.slider?.find((x) => x?.user === id);
  const sliderImgLength = slider?.sliderImg?.length;

  const postImgLength = state.post?.createImg?.length;

  const avatarSlider =
    (sliderImgLength! < 8 || sliderImgLength === undefined) &&
    (parsing.inputNumber === '0' || parsing.inputNumber === '1');

  const postImagesBool = parsing.inputNumber === '2' && postImgLength < 6;

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

  const compressImage = async (event: any, useWebWorker: any) => {
    let file = event.target.files;

    if (parsing.inputNumber === '0') file = [...file].splice(0, 1);
    if (parsing.inputNumber === '1') {
      file = [...file].splice(0, sliderImgLength === undefined ? 8 : 8 - sliderImgLength);
    }

    if (parsing.inputNumber === '2') {
      file = [...file].splice(0, postImgLength === 0 ? 6 : 6 - postImgLength);
    }

    const readyBlob = [];

    for (let i = 0; i < file.length; ) {
      let size = (
        +(file[i].size / 1024 / 1024).toFixed(2) -
        (+(file[i].size / 1024 / 1024).toFixed(2) * 90) / 100
      ).toFixed(2);

      const options = {
        maxSizeMB: +size,
        useWebWorker: true,
        onProgress: (p: any) => onProgress(p, useWebWorker),
      };

      const output = await imageCompression(file[i], options);

      const ouputSize = +(output.size / 1024 / 1024).toFixed(2);

      if (ouputSize > 0.1) {
        let file = new File([output], 'name', {
          type: output.type,
        });

        compressImage2(file, true);
        i++;
      } else if (ouputSize < 0.1) {
        readyBlob.push(output);
        i++;
      }
    }

    if (readyBlob.length > 0) setImages(images.concat(readyBlob));
  };


  const compressImage2 = async (file: any, useWebWorker: any) => {
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

    if (images.length === 0) setImages([output]);
    if (images.length > 0) setImages(images.push(output));
  };


  // Эта функция отправляет картинку на бэк в 3 направлениях все зависит от места загрузки их 3(аватар,слайдер и пост)
  // Если аватар тогда картинка отправится еще и в слайдер в остальных случаях обычное поведение
  const onSendingPicture = React.useCallback(
    async (value: string[]) => {
      if (parsing.inputNumber === '0') {
        await dispatch(fetchUserUpdate({ imageUrl: value, user: id }));

        dispatch(fetchOneUser(id));
        dispatch(fetchSlider(id));
      }

      if (slider === undefined && parsing.inputNumber === '0') {
        await dispatch(fetchSliderPost({ sliderImg: value[0] }));
        dispatch(fetchSlider(id));
      }

      if ((sliderImgLength! < 1 || sliderImgLength! > 0) && parsing.inputNumber === '0') {
        await dispatch(fetchSliderPush({ sliderImg: value[0] }));
        dispatch(fetchSlider(id));
      }

      if (slider === undefined && parsing.inputNumber === '1') {
        const sliderImage = value.length > 1 ? value[0] : value[0];
        const otherImages = value.splice(1, 8);

        await dispatch(fetchSliderPost({ sliderImg: sliderImage }));

        for (let i = 0; i < otherImages.length; i++) {
          await dispatch(fetchSliderPush({ sliderImg: otherImages[i] }));
        }
        dispatch(fetchSlider(id));
      }

      if ((sliderImgLength! < 1 || sliderImgLength! > 0) && parsing.inputNumber === '1') {
        for (let i = 0; i < value.length; i++) {
          await dispatch(fetchSliderPush({ sliderImg: value[i] }));
        }

        dispatch(fetchSlider(id));
      }

      if (parsing.inputNumber === '2') {
        for (let i = 0; i < value.length; i++) {
          dispatch(setCreateImg(value[i]));
        }
      }
    },

    [dispatch, id, parsing.inputNumber, slider, sliderImgLength],
  );

  // useEffect просто превращет картинку в нужный формат и вызывает функции отправки на бэк
  useEffect(() => {
    if (images.length < 1) return;

    const arr: any = [];


    for (let i = 0; i < images.length; i++) {
      let fileReader: FileReader = new FileReader();

      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {
          arr.push(fileReader.result);

          if (arr.length === images.length) {
            onSendingPicture(arr);
            setImages([]);
          }
        }
      };
      fileReader.readAsDataURL(images[i]);
    }
  }, [images, onSendingPicture]);

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
          multiple={avatarSlider ? true : postImagesBool ? true : false}
          onChange={(e) => {
            compressImage(e, true);
          }}
          className="image_input_parser"
        />
      )}
    </>
  );
};
