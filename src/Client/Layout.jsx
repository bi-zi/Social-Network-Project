import React from 'react';
import { Outlet } from 'react-router-dom';
import Registration from './Registration/Registration';

import Header from './Header/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet></Outlet>
      <Registration />
    </>
  );
};

export default Layout;
