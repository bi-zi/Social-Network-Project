import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchMainUserMessages, fetchSecondUserMessages } from '../../../store/messages/slice';
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
    if (state.auth.data?._id !== undefined) dispatch(fetchMainUserMessages(state.auth.data?._id));

    if (state.auth.data?._id !== undefined && state.auth.data?._id !== id)
      dispatch(fetchSecondUserMessages(id));
  }, [dispatch, id, state.auth.data?._id]);

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
