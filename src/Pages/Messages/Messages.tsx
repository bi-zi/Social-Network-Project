import React from 'react';
import { Chats } from './components/Chats';
import { Correspondence } from './components/Correspondence';
import { Navigate } from 'react-router-dom';

import './style.scss';

export const Messages: React.FC = () => {
  if (localStorage.isAuth === undefined) {
    return <Navigate to="/Login" />;
  }

  return (
    <div className="messages__container">
      <Chats />
      <Correspondence />
    </div>
  );
};
