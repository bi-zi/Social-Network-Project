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

type FormValues = {
  login: string;
  firstName: string;
  lastName: string;
  gender: string;
  birdayDate: Date;
  email: string;
  password: string;
};

export const Reg = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const data = useAppSelector((state) => state.auth.data);
  const state = useAppSelector((state) => state);

  console.log(state)

  const [addPost, { isLoading }] = usePostRegistrationMutation();
  const [value, setValue] = React.useState(0);

  const [passwordShown, setPasswordShown] = React.useState(false);

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
      login: values.login,
      firstName: values.firstName[0].toUpperCase() + values.firstName.slice(1).toLowerCase(),
      lastName: values.lastName[0].toUpperCase() + values.lastName.slice(1).toLowerCase(),
      gender: values.gender,
      birdayDate: new Date(values.birdayDate),
      email: values.email.toLowerCase(),
      password: values.password,
    };

    const response:any = await addPost(userInfo);

     localStorage.setItem('token', response.data?.accessToken);

    console.log(response.data);
  };

  if (isAuth) {
    localStorage.setItem('isAuth', 'true');
    return <Navigate to={`/Profile/${data?._id}`} />;
  }

  return (
    <div className="authorization">
      <div className="authorization__container">
        <img src={logo} alt="logo" className="authorization__container-logo" />

        <form className="authorization__container__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="authorization__container__form-block">
            <div className="authorization__container__form-first-name">
              <input
                type="text"
                placeholder="First name"
                pattern="^[a-zA-Z]*$"
                title="You can only use latin characters without spaces"
                minLength={2}
                maxLength={15}
                required={true}
                {...register('firstName', { required: 'Укажите имя' })}
              />
            </div>

            <div className="authorization__container__form-last-name">
              <input
                type="text"
                placeholder="Last name"
                pattern="^[a-zA-Z]*$"
                title="You can only use latin characters without spaces"
                minLength={2}
                maxLength={15}
                required={true}
                {...register('lastName', { required: 'Укажите фамилию' })}
              />
            </div>
          </div>

          <div className="authorization__container__form-inputs">
            <input
              type="text"
              placeholder="Login"
              pattern="^[a-zA-Z_-]*$"
              title="You can only use latin characters with these two characters - _ without spaces"
              minLength={4}
              maxLength={20}
              required={true}
              {...register('login', { required: 'Укажите логин' })}
            />
          </div>

          <div className="authorization__container__form-inputs">
            <input
              type="email"
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
              placeholder="Password"
              pattern="^[a-zA-Z0-9!#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$"
              title="Only these characters can be used a-zA-Z0-9!#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~"
              minLength={6}
              maxLength={32}
              required={true}
              {...register('password', { required: 'Укажите пароль' })}
            />
          </div>

          <div className="authorization__container__form-block">
            <span className="authorization__container__form-block-date">Date of Birth</span>

            <div className="authorization__container__form-date-input">
              <input
                type="date"
                required={true}
                {...register('birdayDate', { required: 'Укажите дату рождения' })}
              />
            </div>
          </div>

          <div className="authorization__container__form-block">
            <label className="authorization__container__form-block-date">Choose your gender</label>

            <div className="authorization__container__form-block-radio">
              <input
                type="radio"
                value="male"
                required={true}
                checked={value === 1 ? true : false}
                {...register('gender', { required: 'Укажите гендер' })}
                onChange={() => setValue(1)}
              />
              <label>Male</label>
            </div>
            <div className="authorization__container__form-block-radio">
              <input
                type="radio"
                value="female"
                required={true}
                checked={value === 2 ? true : false}
                {...register('gender', { required: 'Укажите гендер' })}
                onChange={() => setValue(2)}
              />
              <label>Female</label>
            </div>
          </div>

          <button className="authorization__container__form-button-down">
            <span className="authorization__container__form-button-up">Submit</span>
          </button>

          <div className="authorization__container__form-link-to">
            <NavLink to="/Login">Sing in</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
