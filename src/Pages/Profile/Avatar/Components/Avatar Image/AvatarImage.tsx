import React from 'react';
import { useAppSelector } from '../../../../../store/store';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

interface MyParams {
  id: string;
}

export const AvatarImage: React.FC = () => {
  const state = useAppSelector((state) => state);

  const { id } = useParams<keyof MyParams>() as MyParams;

  const user = state.user?.userOne?.[0];

  const loadStatus =
    state.user.status === 'loaded' &&
    state.oldAuth.status === 'loaded' &&
    state.slider.status === 'loaded';

  return (
    <>
      {loadStatus ? (
        <Link to={`/${id}/PhotoAvatar/0`}>
          <div>
            <img src={user?.imageUrl?.[0]} alt="" className="avatar__image" />
          </div>
        </Link>
      ) : (
        <Skeleton height={'24vw'} style={{ marginBottom: '1vw', borderRadius: '1.5vh' }} />
      )}
    </>
  );
};
