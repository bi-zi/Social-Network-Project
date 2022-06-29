import React from 'react';
import './registration.css';

function Registration() {
  return (
    <div className="registration">
      <form className="registr_form">
        <label>
          <input className="firstName" type="text" name="firstName" placeholder="First name" />
          <input className="lastName" type="text" name="lastName" placeholder="Last name" />
          <input className="password" type="password" name="pass" placeholder="Password" />
        </label>
        <br />
        <input className="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Registration;
