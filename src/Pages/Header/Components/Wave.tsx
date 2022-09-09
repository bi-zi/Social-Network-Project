import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchOneUser, setAttention } from '../../../store/user/slice';
import { NavLink } from 'react-router-dom';

export const Wave: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  return (
    <>
      {!(auth.status === 'loading') ? (
        <NavLink
          style={{ textDecoration: 0, color: 'white' }}
          to={`/Profile/${auth?.data?._id}`}
          className="wave"
          onClick={() => {
            dispatch(fetchOneUser(auth?.data._id));
            dispatch(setAttention(1));
          }}>
          Wave
        </NavLink>
      ) : (
        <div style={{ textDecoration: 0, color: 'white' }} className="wave">
          Wave
        </div>
      )}
    </>
  );
};
