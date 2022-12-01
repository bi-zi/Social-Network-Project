import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchRegister } from '../../store/auth/slice';
import { selectIsAuth } from '../../store/1newStore/auth/slice';

import { usePostRegistrationMutation } from '../../store/1newStore/auth/authApi';

import { useForm } from 'react-hook-form';
import { NavLink, Navigate } from 'react-router-dom';
import { Lock, Unlock } from '../../Svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const Registration = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const data = useAppSelector((state) => state.auth.data);
  const state = useAppSelector((state) => state);

  const [addPost, { isLoading }] = usePostRegistrationMutation();

  const [passwordShown, setPasswordShown] = React.useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  let user = {
    login: 'bi_zi',
    firstName: 'Aleksey',
    lastName: 'Tsvetkov',
    gender: 'male',
    age: 21,
    email: 'the_bi_zi@mail.ru',
    password: '12345678',
  };

  const onResg = async () => {
    await addPost(user);
  };

  const onSubmit = async (values: FormValues) => {
    const val = {
      firstName: values.firstName[0].toUpperCase() + values.firstName.slice(1).toLowerCase(),
      lastName: values.lastName[0].toUpperCase() + values.lastName.slice(1).toLowerCase(),
      email: values.email.toLowerCase(),
      password: values.password,
    };

    const data = await dispatch(fetchRegister(val));
    if (!data.payload) {
      console.log(data.payload);
      return alert('Не удалось зарегистрироваться!');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

 
  return (
    <div className="registration">
      <div className="registration__attention">
        Do not provide personal email addresses and passwords. The data is encrypted but available to
        everyone!
      </div>

      <div className="registration__block">

        Registration
        <form className="registration__block__form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            {state.auth.status === 'error' ? (
              <>
                <input
                  {...register('firstName', { required: 'Укажите полное имя' })}
                  className="registration__block__form-first-name"
                  type="text"
                  placeholder="First Name"
                  pattern="^[a-zA-Z]*$"
                  title="Only latin characters can be used"
                  minLength={2}
                  maxLength={30}
                />
                <input
                  {...register('lastName', { required: 'Укажите полное имя' })}
                  className="registration__block__form-first-name"
                  type="text"
                  pattern="^[a-zA-Z]*$"
                  placeholder="Last Name"
                  title="Only latin characters can be used"
                  minLength={2}
                  maxLength={30}
                />
                <input
                  className="registration__block__form-first-name"
                  type="email"
                  placeholder="@gmail.com"
                  pattern="^[a-zA-Z0-9-.@_]*$"
                  title="Only these characters can be used a-z A-Z 0-9 - . @ _"
                  {...register('email', { required: 'Укажите почту' })}
                  maxLength={60}
                />{' '}
              </>
            ) : (
              <>
                <Skeleton className="registration__block__form-first-name" />
                <Skeleton className="registration__block__form-first-name" />
                <Skeleton className="registration__block__form-first-name" />
              </>
            )}

            <div className="registration__block__form-pass-block">
              {state.auth.status === 'error' ? (
                <>
                  <input
                    className="registration__block__form-pass-block__password"
                    type={passwordShown ? 'text' : 'password'}
                    placeholder="password"
                    pattern="^[a-zA-Z0-9!#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$"
                    title="Only these characters can be used a-zA-Z0-9!#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~"
                    {...register('password', { required: 'Укажите пароль' })}
                    maxLength={32}
                  />
                  {passwordShown ? (
                    <div
                      className="registration__block__form-pass-block__password-icon-lock"
                      onClick={togglePassword}>
                      <Unlock />
                    </div>
                  ) : (
                    <div
                      className="registration__block__form-pass-block__password-icon-lock"
                      onClick={togglePassword}>
                      <Lock />
                    </div>
                  )}
                </>
              ) : (
                <Skeleton className="registration__block__form-pass-block__password" />
              )}
            </div>
          </label>

          {state.auth.status === 'error' ? (
            <button type="submit" className="registration__block__form-submit" disabled={!isValid}>
              Submit
            </button>
          ) : (
            <Skeleton className="registration__block__form-submit-skeleton" />
          )}

          <div className="registration__block__form-link-to">
            <NavLink to="/Login">Sing in</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
