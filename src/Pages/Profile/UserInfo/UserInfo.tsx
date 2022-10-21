import React from 'react';
import { useAppSelector } from '../../../store/store';
import { AboutInfo, EditInfo } from './components/index';
import './style.scss';

export const UserInfo: React.FC = () => {
  const state = useAppSelector((state) => state);

  const user = state.user?.userOne?.[0];

  return (
    <>
      <div className="about">
        <div className="about__fullName">{`${user?.firstName + ' ' + user?.lastName || ''}`}</div>

        {state.about?.closeInfo === 0 ? <AboutInfo /> : <EditInfo />}
      </div>
    </>
  );
};
