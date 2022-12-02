import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { setInputNumber } from '../../../../../store/old store/user/slice';
import { ImageParsing } from '../../../../../ImageParsing/ImageParsing';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

interface MyParams {
  id: string;
}

export const ChangeButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const auth = useAppSelector((state) => state.oldAuth?.data);

  const { id } = useParams<keyof MyParams>() as MyParams;

  const readyPhotos = state.slider?.slider?.[0]?.sliderImg;

  const loadStatus =
    state.user.status === 'loaded' &&
    state.oldAuth.status === 'loaded' &&
    state.slider.status === 'loaded';

  return (
    <>
      {auth?._id === id ? (
        <>
          {loadStatus ? (
            readyPhotos === undefined || readyPhotos?.length < 8 ? (
              <button
                className="change__avatar-button"
                onClick={() => {
                  dispatch(setInputNumber('0'));
                }}>
                {auth === null ? '' : 'Change photo'}

                <ImageParsing />
              </button>
            ) : (
              <button className="change__avatar-button-delete">Delete images in slider</button>
            )
          ) : (
            <div className="change_avatar-button-skeleton ">
              <Skeleton height={'100%'} style={{ borderRadius: '1.5vh' }} />
            </div>
          )}
        </>
      ) : (
        ''
      )}
    </>
  );
};
