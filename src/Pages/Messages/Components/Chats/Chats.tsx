import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { setFindChat } from '../../../../store/messages/slice';
import { NavLink } from 'react-router-dom';
import { ChatComponent } from '../Chat/ChatComponent';
import { Search } from '../../../../Svg';
import { ChatsSkeleton } from '../Chat/ChatsSkeleton';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';
import { User } from '../../../../store/auth/types';

export const Chats: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const searchRef = React.useRef<HTMLInputElement>(null);

  // dispatch(setFindChat(e.target.value)
  const auth = useAppSelector((state) => state.auth?.data);
  const messages = useAppSelector((state) => state?.messages);

  const data = messages.mainUserMessages?.[0];
  let users: User[] = []; // Массив для отсортированных пользователей

  // Поиск участников чатов
  const chatsUsers = state.user?.chatUsers.filter((user) =>
    data?.correspondence.map((chat) => chat?.withWho)?.includes(user._id),
  );

  const sortedChats = data?.correspondence
    ?.map((chat) => chat?.messages[chat.messages.length - 1])
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  // Массив id отсортированных участников чата
  const usersId = sortedChats?.map((chat) => chat.withWho);

  // Сортировка участников по времени написания последнего сообщения методом сравнения двух массивов
  for (let i = 0; i < usersId!?.length; i++) {
    for (let j = 0; j < chatsUsers?.length; j++)
      if (usersId![i] === chatsUsers[j]?._id) {
        users.push(chatsUsers[j]);
      }
  }

  // Поиск по поисковому запросу
    users = users.filter(
      (user) =>
        user.firstName[0].toLowerCase().includes(messages?.findChat[0]?.toLowerCase()) &&
        user.firstName.toLowerCase().includes(messages?.findChat?.toLowerCase()),
    );

  if (users.length === 0) users = chatsUsers;

  // Так как сам юзер чата находится в другом месте последнее сообщение нужно тоже
  // найти отсортировать и так же подгонять под поисковой запрос

  let chats = [];
  let lastMessage = sortedChats; // последнее сообщение каждого чата

  // Поиск по уже отсортированным пользователям сравнивая id пользователя и id чата
  // с пользователем (withWho это id юзера с которым чат)
  if (messages?.findChat?.length > 0) {
    for (let i = 0; i < users!?.length; i++) {
      for (let j = 0; j < lastMessage?.length; j++)
        if (users![i]._id === lastMessage[j]?.withWho) {
          chats.push(lastMessage[j]);
        }
    }
    lastMessage = chats;
  }

  const selectedUser = users?.[localStorage.chatIndexWithSort];

  const loadStatus = messages.status === 'loaded' && state.auth.status === 'loaded';

  return (
    <div className="chats-container">
      <form className="chats-form__find-chat">
        {loadStatus ? (
          <>
            <div className="chats-form__search-icon">
              <Search />
            </div>
            <input
              ref={searchRef}
              type="text"
              pattern="^[a-zA-Z0-9 ]+$"
              onChange={(e) => dispatch(setFindChat(e.target.value))}
              className="chats-form__input"
            />
          </>
        ) : (
          <Skeleton className="chats-form__search-icon" />
        )}
      </form>

      {users.length !== 0 && loadStatus ? (
        <div className="chats-users">
          {users.map((user, index) => (
            <ChatComponent
              users={user}
              indexId={index}
              selected={selectedUser}
              lastMessages={lastMessage}
              key={user._id}
            />
          ))}
        </div>
      ) : users.length !== 0 && !loadStatus ? (
        <ChatsSkeleton chats={10} />
      ) : !loadStatus || (users.length === 0 && loadStatus) ? (
        <div className="chats-users">
          <div className="chats-empty">
            <NavLink to={`/Users/${auth?._id}`}>Find friends to chat</NavLink>
          </div>
        </div>
      ) : (
        ''
      )}

      <div className="chats-footer">
        {loadStatus ? (
          <a href="https://github.com/bi-zi" className="chats-footer__link">
            Github
          </a>
        ) : (
          <Skeleton className="chats-footer__link" width={'8vw'} />
        )}
      </div>
    </div>
  );
};
