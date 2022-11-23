import React from 'react';
import { useAppDispatch, useAppSelector } from './store/store';
import { fetchAuthMe } from './store/auth/slice';
import { fetchMainUser } from './store/user/slice';
import { Registration } from './Pages/Registration-Login/Registration';
import { Login } from './Pages/Registration-Login/Login';
import { Layout } from './Pages/Layout';
import { Profile } from './Pages/Profile/Profile';
import { Photo } from './Pages/SelectedPhoto/SelectedPhoto';
import { Friends } from './Pages/Friends/Friends';
import { Messages } from './Pages/Messages/Messages';
import { Routes, Route } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton'
import './Svg/style.scss';
import './style.scss';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.data);

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
          <Route path="Friends/:id" element={<Friends />} />,
          <Route path="/:user/:category/:id" element={<Photo />} />,
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Registration />} />
        </Route>
      </Routes>
    </SkeletonTheme>
  );
};
