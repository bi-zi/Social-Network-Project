import React from 'react';
import { useAppSelector } from '../../../../../store/store';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.scss';

interface MyParams {
  id: string;
};

export const AvatarImage: React.FC = () => {
  const state = useAppSelector((state) => state);

  const { id } = useParams<keyof MyParams>() as MyParams;

  const user = state.user?.userOne?.[0];

  const loadStatus =
    state.user.status === 'loaded' && state.auth.status === 'loaded' && state.slider.status === 'loaded';

  return (
    <>
      {loadStatus ? (
        <Link to={`/${id}/PhotoAvatar/0`}>
          <img src={user?.imageUrl} width={10} alt="" className="avatar__image" />
        </Link>
      ) : (
        <img src={user?.imageUrl} width={10} alt="" className="avatar__image" />
      )}
    </>
  );
};
