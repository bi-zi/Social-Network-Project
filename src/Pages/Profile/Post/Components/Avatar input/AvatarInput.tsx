import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { setCreatText } from '../../../../../store/post/slice';

import './style.scss';

export type MyParams = {
  id: string;
};

export const AvatarInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  const textRef = React.useRef<HTMLInputElement>(null);

  if (textRef.current != null) {
    if (state.post?.createText?.length === 0 && textRef.current?.value.length > 0)
      textRef.current.value = '';
  }


  return (
    <div className="post__avatar-input-container">
      <img
        src={state.user?.userOne?.[0]?.imageUrl}
        width={10}
        alt=""
        className="post__avatar-input-container__avatar"
        onClick={() => window.scrollTo(0, 0)}
      />
        <input
          ref={textRef}
          type="text"
          className="post__avatar-input-container__text-input"
          placeholder="Post an entry"
          maxLength={180}
          defaultValue={state.post?.createText}
          pattern="^[a-zA-Z0-9 ]+$"
          title="Only latin characters can be used"
          onChange={(e) => dispatch(setCreatText(e.target.value))}
        />
    </div>
  );
};
