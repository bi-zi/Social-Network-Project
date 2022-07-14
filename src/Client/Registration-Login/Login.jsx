import React from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchAuth, selectIsAuth } from '../store/slices/auth';

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'thebizi15@gmail.com',
      password: '12345',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      return alert('Не удалось авторизоваться!');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };


  if (isAuth) {
    return <Navigate to="/Profile" />;
  }

  return (
    <>
      {0 < 1 ? (
        <div className="registration">
          <form className="registr_form" onSubmit={handleSubmit(onSubmit)}>
            <label>
              <input
                className="lastName"
                type="email"
                helpertext={errors.email?.message}
                {...register('email', { required: 'Укажите почту' })}
                label="E-Mail"
              />
              <input
                className="password"
                type="password"
                helpertext={errors.password?.message}
                {...register('password', { required: 'Укажите пароль' })}
                label="Пароль"
              />
            </label>
            <br />
            <button type="submit" disabled={!isValid}>
              Submit
            </button>
          </form>
        </div>
      ) : (
        ''
      )}
    </>
  );
};