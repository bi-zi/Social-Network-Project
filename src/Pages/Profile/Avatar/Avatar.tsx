import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchMainUserMessages, fetchSecondUserMessages } from '../../../store/old store/messages/slice';
import { AvatarImage, ChangeButton, SendMessage, UserInteraction } from './Components/index';
import { useParams } from 'react-router-dom';
import './style.scss';
interface MyParams {
  id: string;
}

export const Avatar: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { id } = useParams<keyof MyParams>() as MyParams;

  React.useEffect(() => {
    if (state.oldAuth.data?._id !== undefined) dispatch(fetchMainUserMessages(state.oldAuth.data?._id));
    if (state.oldAuth.data?._id !== undefined && state.oldAuth.data?._id !== id)
      dispatch(fetchSecondUserMessages(id));
  }, [dispatch, id, state.oldAuth.data?._id]);

  return (
    <div className="avatar">
      <>
        <AvatarImage />
        <ChangeButton />
        {state.oldAuth.data?._id !== id && state.oldAuth.status === 'loaded' ? (
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
