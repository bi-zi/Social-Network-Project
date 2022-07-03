import React from 'react';
import './registration.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstName, setLastName, setPassword, setCheckAuth } from '../store/registration';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Registration() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [checkSubmit, setCheckSubmit] = React.useState(localStorage.checkSubmit);
  const history = useNavigate();

  if (checkSubmit === 1) {
    localStorage.setItem('firstName', user.firstName);
    localStorage.setItem('lastName', user.lastName);
    localStorage.setItem('password', user.password);
    localStorage.setItem('checkSubmit', checkSubmit);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password.length > 0 && user.password.length > 0 && user.password.length > 0) {
      history('/Profile');
      dispatch(setCheckAuth([localStorage.firstName, localStorage.lastName, localStorage.password]));
      setCheckSubmit(0);
    }
  };

  const test = () => {
     setCheckSubmit(1);
  }

  // console.log(
  //   'firstName',
  //   user.firstName,
  //   'lastName',
  //   user.lastName,
  //   'password',
  //   user.password,
  //   'checkSubmit',
  //   localStorage.checkSubmit,
  // );
  // console.log('чек', user.checkAuth);
  // console.log('локал', [localStorage.firstName, localStorage.lastName, localStorage.password]);
  return (
    <>
      {checkSubmit === 1 ? (
        <div className="registration">
          <form className="registr_form">
            <label>
              <input
                className="firstName"
                type="text"
                name="myImg"
                placeholder="First name"
                onChange={(e) => {
                  dispatch(setFirstName(e.target.value));
                }}
              />
              <input
                className="lastName"
                type="text"
                name="lastName"
                placeholder="Last name"
                onChange={(e) => {
                  dispatch(setLastName(e.target.value));
                }}
              />
              <input
                className="password"
                type="password"
                name="pass"
                required={true}
                placeholder="Password"
                onChange={(e) => {
                  dispatch(setPassword(e.target.value));
                }}
              />
            </label>
            <br />
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      ) : (
        <>
          <button onClick={test}></button>
          <Link to="/Profile" className="already_register">
            {' '}
            Вы уже зарегестрировались
          </Link>
        </>
      )}
    </>
  );
}

export default Registration;
