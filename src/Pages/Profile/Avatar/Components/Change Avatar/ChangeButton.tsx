import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { setInputNumber } from '../../../../../store/user/slice';
import { ImageParsing } from '../../../../../ImageParsing/ImageParsing';
import { useParams } from 'react-router-dom';
import './style.scss';

export type MyParams = {
  id: string;
};

export const ChangeButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const auth = useAppSelector((state) => state.auth?.data);

  const { id } = useParams<keyof MyParams>() as MyParams;

  const loadStatus =
    state.user.status === 'loaded' && state.auth.status === 'loaded' && state.slider.status === 'loaded';

  return (
    <>
      {auth?._id === id ? (
        <>
          <button
            className="change__avatar-button"
            onChange={() => {
              dispatch(setInputNumber('0'));
            }}>
            {auth === null ? '' : 'Change photo'}

            {auth?._id === id && loadStatus ? (
              <ImageParsing />
            ) : (
              <div className="image_input_parser"></div>
            )}
          </button>
        </>
      ) : (
        ''
      )}
    </>
  );
};
