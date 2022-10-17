import React from 'react';
import { AboutInfo } from './components/About Info/AboutInfo';
import { EditInfo } from './components/Edit Info/EditInfo';
import { useAppSelector } from '../../../store/store';
import './style.scss';

export type MyParams = {
  id: string;
};

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
