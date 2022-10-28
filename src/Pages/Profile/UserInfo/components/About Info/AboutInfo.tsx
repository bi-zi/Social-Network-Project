import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { fetchAbout, setCloseInfo } from '../../../../../store/about/slice';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import './style.scss';

export type MyParams = {
  id: string;
};

export const AboutInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const about = useAppSelector((state) => state.about?.data);

  const { id } = useParams<keyof MyParams>() as MyParams;

  React.useEffect(() => {
    dispatch(fetchAbout(id));
  }, [dispatch, id]);

  return (
    <>
      {state.about?.status === 'loaded' ? (
        <div className="about__container">
          {state.user?.mainUser?._id === id ? (
            <div
              className="about__info"
              onClick={() => {
                dispatch(setCloseInfo(1));
              }}>
              <span className="about__info__text">Edit Information</span>
            </div>
          ) : (
            ''
          )}

          <div className="about__info-options">Lives in - {about?.livesIn}</div>
          <div className="about__info-options">From - {about?.from}</div>
          <div className="about__info-options">Born on - {about?.bornOn}</div>
          <div className="about__info-options">Profession - {about?.profession}</div>
          <div className="about__info-options">In a relationship with - {about?.relations}</div>
          <div className="about__info-options">Student at - {about?.studentAt}</div>
        </div>
      ) : (
        <div className="about__container">
          {new Array(6).fill(0).map((jsx, i) => (
            <Skeleton key={i} className="about__info-skeleton" />
          ))}
        </div>
      )}
    </>
  );
};
