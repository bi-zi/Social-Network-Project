import React from 'react';
import { useAppSelector } from '../../../store/store';
import { AvatarImage, ChangeButton, SendMessage, UserInteraction } from './Components/index';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';
import { Loading } from '../../Header/Components/Loading';
interface MyParams {
  id: string;
}

export const Avatar: React.FC = () => {
  const state = useAppSelector((state) => state);
  const { id } = useParams<keyof MyParams>() as MyParams;

  return (
    <div className="avatar">
      <>
        <AvatarImage />
        <ChangeButton />
        {state.auth.data?._id !== id && state.auth.status === 'loaded' ? (
          <div className="avatar__send-message-user-interaction">
            <SendMessage />
            <UserInteraction />
          </div>
        ) : (
          ''
        )}
      </>
    </div>
  );
};
