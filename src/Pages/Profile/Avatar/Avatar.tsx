import React from 'react';
import { AvatarImage, ChangeButton, SendMessage, UserInteraction } from './Components/index';
import './style.scss';

export const Avatar: React.FC = () => {
  return (
    <div className="avatar">
      <AvatarImage />

      <ChangeButton />

      <div className="avatar__send-message-user-interaction">
        <SendMessage />
        <UserInteraction />
      </div>
    </div>
  );
};
