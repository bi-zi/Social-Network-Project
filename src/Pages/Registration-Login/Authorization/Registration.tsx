import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchRegister, selectIsAuth } from '../../../store/auth/slice';

import { usePostRegistrationMutation } from '../../../store/1newStore/auth/authApi';
import { logo } from '../logo';

import { useForm } from 'react-hook-form';
import { NavLink, Navigate } from 'react-router-dom';
import { Lock, Unlock } from '../../../Svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

type FormValues = {};

export const Reg = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const data = useAppSelector((state) => state.auth.data);
  const state = useAppSelector((state) => state);

  const [addPost, { isLoading }] = usePostRegistrationMutation();
  const [value, setValue] = React.useState(1);

  const [passwordShown, setPasswordShown] = React.useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  if (isAuth) {
    localStorage.setItem('isAuth', 'true');
    return <Navigate to={`/Profile/${data?._id}`} />;
  }

  return (
    <div className="authorization">
      <div className="authorization__container">
        <img src={logo} alt="logo" className="authorization__container-logo" />

        <form className="authorization__container__form">
          <div className="authorization__container__form-block">
            <div className="authorization__container__form-first-name">
              <input type="text" placeholder="First name" />
            </div>

            <div className="authorization__container__form-last-name">
              <input type="text" placeholder="Last name" />
            </div>
          </div>

          <div className="authorization__container__form-inputs">
            <input type="text" placeholder="Login" />
          </div>

          <div className="authorization__container__form-inputs">
            <input type="email" placeholder="Email*" />
          </div>

          <div className="authorization__container__form-inputs">
            <input type="password" placeholder="Password" />
          </div>

          <div className="authorization__container__form-block">
            <span className="authorization__container__form-block-date">Date of Birth</span>

            <div className="authorization__container__form-date-input">
              <input type="date" placeholder="Last name" checked />
            </div>
          </div>

          <div className="authorization__container__form-block">
            <div className="authorization__container__form-block-radio">
              <input type="radio" checked={value === 1 ? true : false} onChange={(e) => setValue(1)} />
              <label>Male</label>
            </div>

            <div className="authorization__container__form-block-radio">
              <input type="radio" checked={value === 2 ? true : false} onChange={(e) => setValue(2)} />
              <label>Woman</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
