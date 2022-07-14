import React from 'react';
import { Outlet } from 'react-router-dom';
import {  Navigate  } from 'react-router-dom';
import Header from './Header/Header';

const Layout = () => {
  const currentLocation = window.location.pathname;
  if (currentLocation === '/') {
    return <Navigate to="/Profile" />;
  }

   return (
    <>
      <Header />
      <Outlet></Outlet>
    </>
  );
};

export default Layout;
