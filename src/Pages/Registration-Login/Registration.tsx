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
    <div className="registration_container">
      <div className="registration_attention">
        Do not provide personal email addresses and passwords. The data is encrypted but available to
        everyone!
      </div>
      <div className="registration">
        Registration
        <form className="registration_form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            <input
              {...register('fullName', { required: 'Укажите полное имя' })}
              className="registration_form_firstName"
              type="text"
              placeholder="First Name"
              title="Only latin characters can be used"
              maxLength={30}
            />
            <input
              {...register('fullName', { required: 'Укажите полное имя' })}
              className="registration_form_firstName"
              type="text"
              placeholder="Last Name"
              title="Only latin characters can be used"
              maxLength={30}
            />
            <input
              className="registration_form_lastName"
              type="email"
              placeholder="@gmail.com"
              {...register('email', { required: 'Укажите почту' })}
              maxLength={60}
            />

              <input
                className="registration_form_password"
                type={passwordShown ? 'text' : 'password'}
                placeholder="password"
                {...register('password', { required: 'Укажите пароль' })}
                maxLength={32}
              />
              {passwordShown ? (
                <FontAwesomeIcon
                  icon={faLockOpen}
                  className="register__password--icon--unlock"
                  onClick={togglePassword}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faLock}
                  className="register__password--icon--lock"
                  onClick={togglePassword}
                />
              )}
          </label>
          <button type="submit" className="registration_form_submit" disabled={!isValid}>
            Submit
          </button>

          <div className="registration_link_to">
            <NavLink to="/Login">Sing in</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
