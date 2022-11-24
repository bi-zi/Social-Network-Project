import React from 'react';
import { useAppSelector } from '../../../../store/store';
import { NavLink } from 'react-router-dom';

export const Wave: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);

  return (
    <>
      {auth.status === 'loaded' ? (
        <NavLink
          to={`/Profile/${auth?.data?._id}`}
          className="header__wave">
          Wave
        </NavLink>
      ) : (
        <div className="header__wave">
          Wave
        </div>
      )}
    </>
  );
};
