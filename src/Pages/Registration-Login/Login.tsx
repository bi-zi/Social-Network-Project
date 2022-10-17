import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchAuth, selectIsAuth } from '../../store/auth/slice';
import { useForm } from 'react-hook-form';
import { NavLink, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

type FormValues = {
  email: string;
  password: string;
};

export const Login = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const data = useAppSelector((state) => state.auth?.data);
  const state = useAppSelector((state) => state);



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
    const val = { email: values.email.toLowerCase(), password: values.password };

    const data = await dispatch(fetchAuth(val));

    if (!data.payload) {
      return alert('Не удалось авторизоваться!');
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
        Authorization
        <form className="registration_form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            <input
              className="registration_form_lastName"
              type="email"
              pattern="^[a-zA-Z0-9-.@_]*$"
              title="Only these characters can be used a-z A-Z 0-9 - . @ _"
              minLength={5}
              maxLength={64}
              placeholder="@gmail.com"
              {...register('email', { required: 'Укажите почту' })}
            />
            <div className="registration_form_password_block">
              <input
                className="registration_form_password"
                type={passwordShown ? 'text' : 'password'}
                placeholder="password"
                pattern="^[a-zA-Z0-9!#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$"
                title="Only these characters can be used a-zA-Z0-9!#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~"
                minLength={8}
                maxLength={32}
                {...register('password', { required: 'Укажите пароль' })}
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
            </div>
          </label>
          <br />
          <button type="submit" className="registration_form_submit" disabled={!isValid}>
            Submit
          </button>

          <div className="registration_link_to">
            <NavLink to="/Register">Register an account</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
