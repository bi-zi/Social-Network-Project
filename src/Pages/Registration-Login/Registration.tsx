import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchRegister, selectIsAuth } from '../../store/auth/slice';
import { useForm } from 'react-hook-form';
import { NavLink, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
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
              {...register('firstName', { required: 'Укажите полное имя' })}
              className="registration_form_firstName"
              type="text"
              placeholder="First Name"
              pattern="^[a-zA-Z]*$"
              title="Only latin characters can be used"
              minLength={2}
              maxLength={30}
            />
            <input
              {...register('lastName', { required: 'Укажите полное имя' })}
              className="registration_form_lastName"
              type="text"
              pattern="^[a-zA-Z]*$"
              placeholder="Last Name"
              title="Only latin characters can be used"
              minLength={2}
              maxLength={30}
            />
            <input
              className="registration_form_lastName"
              type="email"
              placeholder="@gmail.com"
              pattern="^[a-zA-Z0-9-.@_]*$"
              title="Only these characters can be used a-z A-Z 0-9 - . @ _"
              {...register('email', { required: 'Укажите почту' })}
              maxLength={60}
            />
            <div className="registration_form_password_block">
              <input
                className="registration_form_password"
                type={passwordShown ? 'text' : 'password'}
                placeholder="password"
                pattern="^[a-zA-Z0-9!#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$"
                title="Only these characters can be used a-zA-Z0-9!#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~"
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
            </div>
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
