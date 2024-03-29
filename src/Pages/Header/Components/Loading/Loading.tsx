import React from 'react';
import { useAppSelector } from '../../../../store/store';

export const Loading: React.FC = () => {
  const state = useAppSelector((state) => state);

  const profilePage =
    state.player.status === 'loading' ||
    state.slider.status === 'loading' ||
    state.post.userPosts.status === 'loading' ||
    state.note.status === 'loading' ||
    state.messages.status === 'loading' ||
    state.oldAuth.status === 'loading' ||
    state.about.status === 'loading';

  const friendPage =
    state.player.status === 'loading' ||
    state.note.status === 'loading' ||
    state.oldAuth.status === 'loading';

  const messagesPage =
    state.messages.status === 'loading' ||
    state.oldAuth.status === 'loading' ||
    state.player.status === 'loading';

  const nonePage = state.oldAuth.status === 'loading';

  const path = window.location.pathname.split('/')[1];

  return (
    <>
      {profilePage && path === 'Profile' ? (
        <div className="header__menu-loader"></div>
      ) : friendPage && path === 'Friends' ? (
        <div className="header__menu-loader"></div>
      ) : messagesPage && path === 'Messages' ? (
        <div className="header__menu-loader"></div>
      ) : nonePage && (path === 'Login' || path === 'Register' || path === '') ? (
        <div className="header__menu-loader"></div>
      ) : (
        ''
      )}
    </>
  );
};
