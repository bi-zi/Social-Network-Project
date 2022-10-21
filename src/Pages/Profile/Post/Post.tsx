import React from 'react';
import { AvatarInput, PostContent, ControlPanel } from './Components/index';
import './style.scss';

export const Post: React.FC = () => {
  return (
    <div className="post__container">
      <AvatarInput />
      <PostContent />
      <ControlPanel />
    </div>
  );
};
