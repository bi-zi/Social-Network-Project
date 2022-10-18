import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { fetchAbout, setCloseInfo } from '../../../../../store/about/slice';
import { useParams } from 'react-router-dom';
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
    <div className="about__container">
      {state.user?.mainUser?._id === id ? (
        <div
          className="about__info"
          onClick={() => {
            dispatch(setCloseInfo(1));
          }}>
          <span className='about__info__text'>Edit Information</span>
        </div>
      ) : (
        ''
      )}

      <div className="about__info-lives">Lives in - {about?.livesIn}</div>
      <div className="about__info-from">From - {about?.from}</div>
      <div className="about__info-born">Born on - {about?.bornOn}</div>
      <div className="about__info-profession">Profession - {about?.profession}</div>
      <div className="about__info-relationship">In a relationship with - {about?.relations}</div>
      <div className="about__info-student">Student at - {about?.studentAt}</div>
    </div>
  );
};
