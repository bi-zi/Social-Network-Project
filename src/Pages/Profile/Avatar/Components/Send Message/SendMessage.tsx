import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import {
  fetchMainUserMessages,
  fetchSecondUserMessages,
  fetchCreateMessages,
  fetchCreateChat,
  setSelectedUser,
} from '../../../../../store/messages/slice';
import { fetchUsersForChats } from '../../../../../store/user/slice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSort } from '../../../../Messages/Components/useSort';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface MyParams {
  id: string;
}

export const SendMessage: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const auth = useAppSelector((state) => state.auth?.data);
  const messages = useAppSelector((state) => state.messages);

  const { id } = useParams<keyof MyParams>() as MyParams;

  // проверка есть ли у пользователей чат в базе данных
  const mainUser = !messages.mainUserMessages?.[0];
  const secondUserMessages = !messages.secondUserMessages?.[0];

  // так как в базе данных учитывается создание чата сразу у двух юзеров можно проверять
  // только одного на наличие чата с другим если его нет тогда создаст у двух
  const checkChat = !messages.secondUserMessages?.[0]?.correspondence?.find(
    (chat) => chat?.withWho === auth?._id,
  );

  const createMessages = async () => {
    if (mainUser) {
      await dispatch(fetchCreateMessages({ withWho: id, user: auth?._id }));
    }
    if (secondUserMessages) {
      await dispatch(fetchCreateMessages({ withWho: auth?._id, user: id }));
    }
    if (checkChat) {
      await dispatch(fetchCreateChat({ withWho: id, user: auth?._id }));
    }

    // выбор пользователя при переходе на страницу чатов
    dispatch(setSelectedUser(id));
    await dispatch(fetchMainUserMessages(auth?._id));
    await dispatch(fetchSecondUserMessages(id));
    await dispatch(fetchUsersForChats(auth?._id));
  };

  const loadStatus =
    state.user.status === 'loaded' &&
    state.auth.status === 'loaded' &&
    state.messages.status === 'loaded';

  return (
    <>
      {auth?._id !== id ? (
        loadStatus ? (
          <button className="avatar_send-message-user-interaction__send">
            <Link to="/Messages" onClick={() => createMessages()}>
              Send a message
            </Link>
          </button>
        ) : (
          <div className="avatar_send-message-user-interaction__skeleton">
            <Skeleton height={'100%'} style={{ borderRadius: '1.5vh' }} />
          </div>
        )
      ) : (
        ''
      )}
    </>
  );
};
