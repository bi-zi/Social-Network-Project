import React from 'react';
import { selectIsAuth } from './store/slices/auth.js';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import Header from './Header/Header';
const Layout = () => {
  // const state = useSelector((state) => state.auth?.data?._id);
  //  //console.log(state);
  // if (window.location.pathname === '/') {
  //   return <Navigate to={`/Profile/${state}`} />;
  // }
  return (
    <>
      <Header />
      <Outlet></Outlet>
    </>
  );
};

export default Layout;
