import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchRegister, selectIsAuth } from '../../store/auth/slice';
import { useForm } from 'react-hook-form';
import { NavLink, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

type FormValues = {
  fullName: string;
  email: string;
  password: string;
};

export const Registration = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const data = useAppSelector((state) => state.auth.data);

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

  const onSubmit = async (values: FormValues) => {
    const val = {
      email: values.email.toLowerCase(),
      password: values.password,
      fullName: values.fullName,
    };

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
      <div className="registration_attention">
        Do not provide personal email addresses and passwords. The data is encrypted but available to
        everyone!
      </div>
      <div className="registration">
        <form className="registration_form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            <input
              {...register('fullName', { required: 'Укажите полное имя' })}
              className="registration_form_firstName"
              type="text"
              placeholder="Elon Musk"
              title="Only latin characters can be used"
            />
            <input
              className="registration_form_lastName"
              type="email"
              placeholder="@gmail.com"
              {...register('email', { required: 'Укажите почту' })}
            />
            <input
              className="registration_form_password"
              type={passwordShown ? 'text' : 'password'}
              placeholder="password"
              {...register('password', { required: 'Укажите пароль' })}
            />
            {passwordShown ? (
              <FontAwesomeIcon
                icon={faLockOpen}
                className="register__password--icon"
                onClick={togglePassword}
              />
            ) : (
              <FontAwesomeIcon
                icon={faLock}
                className="register__password--icon"
                onClick={togglePassword}
              />
            )}
          </label>
          <br />
          <button type="submit" className="registration_form_submit" disabled={!isValid}>
            Submit
          </button>
          <br />
          <NavLink to="/Login" className="registration_link_to">
            Sing in
          </NavLink>
        </form>
      </div>
    </>
  );
};
