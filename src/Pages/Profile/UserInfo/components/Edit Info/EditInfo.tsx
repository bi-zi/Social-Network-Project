import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import {
  fetchAboutPost,
  fetchAbout,
  fetchAboutUpdate,
  setCloseInfo,
} from '../../../../../store/about/slice';
import { About } from '../../../../../store/about/types';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './style.scss';
export type MyParams = {
  id: string;
};

export const EditInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const about = useAppSelector((state) => state.about);

  const { id } = useParams<keyof MyParams>() as MyParams;

  // отправка информации о пользователе на сервер
  const onSubmit = async (values: About) => {
    about !== null
      ? await dispatch(fetchAboutUpdate({ values, id }))
      : await dispatch(fetchAboutPost({ values }));

    dispatch(setCloseInfo(0));
    dispatch(fetchAbout(id));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<About>({
    mode: 'onSubmit',
  });

  const aboutStatus = about.status === 'loading';

  // Массивых данных для формы чтобы пропустить его через map и писать много input-ов
  const data = [
    {
      title: 'Lives in',
      error: errors.livesIn,
      errorType: errors.livesIn?.type,
      checkTitle: 'livesIn',
      default: about?.data?.livesIn,
    },
    {
      title: 'From',
      error: errors.from,
      errorType: errors.from?.type,
      checkTitle: 'from',
      default: about?.data?.from,
    },
    {
      title: 'Born on',
      error: errors.bornOn,
      errorType: errors.bornOn?.type,
      checkTitle: 'bornOn',
      default: about?.data?.bornOn,
    },
    {
      title: 'Profession',
      error: errors.profession,
      errorType: errors.profession?.type,
      checkTitle: 'profession',
      default: about?.data?.profession,
    },
    {
      title: 'In a relationship with',
      error: errors.relations,
      errorType: errors.relations?.type,
      checkTitle: 'relations',
      default: about?.data?.relations,
    },
    {
      title: 'Student at',
      error: errors.studentAt,
      errorType: errors.studentAt?.type,
      checkTitle: 'studentAt',
      default: about?.data?.studentAt,
    },
  ];

  return (
    <>
      <form className="about__form" onSubmit={handleSubmit(onSubmit)}>
        {data.map((aboutInfo, index) => (
          <div key={index}>
            <input
              className="about__form__input"
              defaultValue={aboutInfo.default !== undefined ? `${aboutInfo.default}` : ''}
              maxLength={25}
              placeholder={aboutInfo.title}
              {...register(
                aboutInfo.checkTitle === 'livesIn'
                  ? 'livesIn'
                  : aboutInfo.checkTitle === 'from'
                  ? 'from'
                  : aboutInfo.checkTitle === 'bornOn'
                  ? 'bornOn'
                  : aboutInfo.checkTitle === 'profession'
                  ? 'profession'
                  : aboutInfo.checkTitle === 'relations'
                  ? 'relations'
                  : 'studentAt',
                {
                  required: true,
                  minLength: 2,
                  maxLength: 25,
                },
              )}
              pattern="^[a-zA-Z0-9 ]+$"
              title="Only latin characters can be used"
            />
            {aboutInfo.error && aboutInfo.errorType === 'minLength' ? (
              <span style={{ color: 'red', paddingLeft: 20, fontSize: 16 }}>
                Minimum length 2 characters
              </span>
            ) : aboutInfo.error && aboutInfo.errorType === 'maxLength' ? (
              <span style={{ color: 'red', paddingLeft: 20, fontSize: 16 }}>
                Max length 25 characters
              </span>
            ) : (
              ''
            )}
            <br />
          </div>
        ))}

        {!aboutStatus ? (
          <button className="about__form__buttton" type="submit">
            Save
          </button>
        ) : (
          <button className="about__form__buttton">Submit</button>
        )}
      </form>
    </>
  );
};
