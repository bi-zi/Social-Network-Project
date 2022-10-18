import React from 'react';
import { AvatarInput } from './Components/Avatar input/AvatarInput';
import { PostContent } from './Components/Post content/PostContent';
import { ControlPanel } from './Components/Control panel/ControlPanel';
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
