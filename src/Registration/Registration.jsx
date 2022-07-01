import React from 'react';
import './registration.css';
import { useDispatch } from 'react-redux';
import { setFirstName, setLastName } from '../store/registration';

function Registration() {
  const dispatch = useDispatch();



  return (
    <div className="registration">
      <div className="registr_form" >
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
          <input className="password" type="password" name="pass" placeholder="Password" />
        </label>
        <br />
        <button className="submit"  >Submit</button>
      </div>
    </div>
  );
}

export default Registration;
