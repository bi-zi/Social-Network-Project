import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';

export const Loading: React.FC = () => {
  const state = useAppSelector((state) => state);

  const profilePage =
    state.user.status === 'loading' ||
    state.slider.status === 'loading' ||
    state.post.userPosts.status === 'loading' ||
    state.note.status === 'loading' ||
    state.messages.status === 'loading' ||
    state.auth.status === 'loading' ||
    state.about.status === 'loading';

  const friendPage =
    state.user.status === 'loading' ||
    state.note.status === 'loading' ||
    state.auth.status === 'loading';

  const messagesPage =
    state.messages.status === 'loading' ||
    state.auth.status === 'loading' ||
    state.user.status === 'loading';

  const nonePage = state.auth.status === 'loading' || state.user.status === 'loading';

  const path = window.location.pathname.split('/')[1];

  // console.log(profilePage, path);

  return (
    <>
      {profilePage && path === 'Profile' ? (
        <div className="loader"></div>
      ) : friendPage && path === 'Friends' ? (
        <div className="loader"></div>
      ) : messagesPage && path === 'Messages' ? (
        <div className="loader"></div>
      ) : nonePage && path === '' ? (
        <div className="loader"></div>
      ) : (
        ''
      )}
    </>
  );
};