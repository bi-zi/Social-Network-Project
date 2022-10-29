import React from 'react';
import { useAppSelector } from '../../../store/store';
import { AboutInfo, EditInfo } from './components/index';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

export const UserInfo: React.FC = () => {
  const state = useAppSelector((state) => state);

  const user = state.user?.userOne?.[0];

  const loadStatus = state.about?.status === 'loaded' && state.user?.status === 'loaded';

  return (
    <>
      <div className="about">
        {loadStatus ? (
          <div className="about__full-name">{`${user?.firstName + ' ' + user?.lastName || ''}`}</div>
        ) : (
          <div className="about__full-name-skeleton">
            <Skeleton height={'80%'} />
          </div>
        )}

        {state.about?.closeInfo === 0 ? <AboutInfo /> : <EditInfo />}
      </div>
    </>
  );
};
