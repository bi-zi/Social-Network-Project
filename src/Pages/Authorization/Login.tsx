import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectIsAuth } from '../../store/auth/slice';

import { usePostLoginMutation } from '../../store/auth/authApi';
import { logo } from './logo';

import { useForm } from 'react-hook-form';
import { NavLink, Navigate } from 'react-router-dom';
import { Lock, Unlock } from '../../Svg';

import { FormValues, BackendData, Error } from './types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

export const Login = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const auth = useAppSelector((state) => state.auth.authorizedUser);
  const state = useAppSelector((state) => state);

  const [value, setValue] = React.useState(0);

  const [passwordShown, setPasswordShown] = React.useState(false);

  const [login, { isLoading }] = usePostLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const onSubmit = async (values: FormValues) => {
    const userInfo = {
      email: values.email.toLowerCase(),
      password: values.password,
    };

    const data: any = await login(userInfo);

    if (data.error) {
      return alert(data.error?.data?.message);
    }
    // if (data.data) {
    //   localStorage.setItem('token', data.data?.accessToken);
    // }
  };

  if (isAuth) {
    localStorage.setItem('isAuth', 'true');
    return <Navigate to={`/Profile/${auth?._id}`} />;
  }

  return (
    <div className="authorization">
      <div className="authorization__container">
        <img src={logo} alt="logo" className="authorization__container-logo" />

        <form className="authorization__container__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="authorization__container__form-inputs">
            <input
              type="email"
              defaultValue={'thebizi15@gmail.com'}
              placeholder="Email*"
              pattern="^[a-zA-Z0-9-.@_]*$"
              minLength={5}
              maxLength={40}
              required={true}
              title="Only these characters can be used a-z A-Z 0-9 - . @ _"
              {...register('email', { required: 'Укажите имейл' })}
            />
          </div>

          <div className="authorization__container__form-inputs">
            <input
              type="password"
              defaultValue={13213131312}
              placeholder="Password"
              pattern="^[a-zA-Z0-9!#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$"
              title="Only these characters can be used a-zA-Z0-9!#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~"
              minLength={6}
              maxLength={32}
              required={true}
              {...register('password', { required: 'Укажите пароль' })}
            />
          </div>

          <button className="authorization__container__form-button-down">
            <span className="authorization__container__form-button-up">Submit</span>
          </button>

          <div className="authorization__container__form-link-to">
            <NavLink to="/Registration">Sign up</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
