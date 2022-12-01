import React from 'react';
import { useAppDispatch, useAppSelector } from './store/store';
import { fetchAuthMe } from './store/auth/slice';
import { fetchMainUser } from './store/user/slice';
// import { Registration } from './Pages/Registration-Login/Registration';
// import { Login } from './Pages/Registration-Login/Login';
import { Registration } from './Pages/Registration-Login/Authorization/Registration';
import { Login } from './Pages/Registration-Login/Authorization/Login';

import { selectIsAuth } from './store/1newStore/auth/slice';

import { Layout } from './Pages/Layout';
import { Profile } from './Pages/Profile/Profile';
import { Photo } from './Pages/SelectedPhoto/SelectedPhoto';
import { Friends } from './Pages/Friends/Friends';
import { Messages } from './Pages/Messages/Messages';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';
import './Svg/style.scss';
import './style.scss';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.data);
  const state = useAppSelector((state) => state);

  const isAuth = useAppSelector(selectIsAuth);

  // console.log(isAuth, state.secondAuth.authorizedUser,localStorage.isAuth);

  if (auth?._id !== undefined) localStorage.setItem('mainUser', auth?._id);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
    if (auth?._id !== undefined) dispatch(fetchMainUser(auth?._id));
  }, [dispatch, auth?._id]);



  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="Profile/:id" element={<Profile />} />,
          <Route path="Messages" element={<Messages />} />,
          <Route path="Users/:id" element={<Friends />} />,
          <Route path="/:user/:category/:id" element={<Photo />} />,
          <Route path="/Login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
        </Route>
      </Routes>
    </SkeletonTheme>
  );
};
