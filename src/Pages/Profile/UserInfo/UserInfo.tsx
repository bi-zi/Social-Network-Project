import React from 'react';
import { AboutForm } from './components/AboutForm';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchOneUser } from '../../../store/user/slice';
import { useParams } from 'react-router-dom';
import './style.scss';

export type MyParams = {
  id: string;
};

export const UserInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { id } = useParams<keyof MyParams>() as MyParams;

  const user = state.user?.userOne?.[0];

  React.useEffect(() => {
    dispatch(fetchOneUser(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="about">
        <div className="about_fullName">{`${(user?.firstName + ' ' + user?.lastName) || ''}`}</div>
        <div className="about_line"></div>

        <AboutForm />
      </div>
    </>
  );
};
