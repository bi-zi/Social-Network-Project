import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

type MyProps = {
  images: number;
};

export const ImagesSkeleton: React.FC<MyProps> = ({ images }: MyProps) => {
  return (
    <>
      {Array(images)
        .fill(0)
        .map((user, i) => (
         <span className="profile__slider__image" key={i}>
            <div>
              <Skeleton
                className="profile__slider__image-img"
                style={{ borderWidth: 0, cursor: 'auto' }}
              />
            </div>
          </span>
        ))}
    </>
  );
};
