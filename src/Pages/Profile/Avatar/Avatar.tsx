import React from 'react';

import { AvatarImage } from './Components/Avatar Image/AvatarImage';
import { ChangeButton } from './Components/Change Avatar/ChangeButton';
import { SendMessage } from './Components/Send Message/SendMessage';
import { UserInteraction } from './Components/User Interaction/UserInteraction';
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
