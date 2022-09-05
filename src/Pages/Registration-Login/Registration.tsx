import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchRegister, selectIsAuth } from '../../store/auth/slice';
import { useForm } from 'react-hook-form';
import { NavLink, Navigate } from 'react-router-dom';
import './style.css';

type FormValues = {
  fullName: string;
  email: string;
  password: string;
};

export const Registration = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const data = useAppSelector((state) => state.auth.data);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const onSubmit = async (values: FormValues) => {
    const val = { email: values.email.toLowerCase(), password: values.password };

    const data = await dispatch(fetchRegister(val));
    if (!data.payload) {
      return alert('Не удалось регистрироваться!');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    localStorage.setItem('isAuth', 'true');
    return <Navigate to={`/Profile/${data?._id}`} />;
  }

  return (
    <>
      <div className="attention">
        Do not provide personal email addresses and passwords. The data is encrypted but available to
        everyone!
      </div>
      <div className="registration">
        <form className="registr_form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            <input
              {...register('fullName', { required: 'Укажите полное имя' })}
              className="firstName"
              type="text"
              placeholder="Elon Musk"
              pattern="^[a-zA-Z0-9 ]+$"
              title="Only latin characters can be used"
            />
            <input
              className="lastName"
              type="email"
              placeholder="@gmail.com"
              {...register('email', { required: 'Укажите почту' })}
            />
            <input
              className="password"
              type="password"
              placeholder="password"
              {...register('password', { required: 'Укажите пароль' })}
            />
          </label>
          <br />
          <button type="submit" className="submit_registr" disabled={!isValid}>
            Submit
          </button>
          <br />
          <NavLink to="/Login" className="link_to">
            Sing in
          </NavLink>
        </form>
      </div>
    </>
  );
};
