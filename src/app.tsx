import React from 'react';
import { useAppDispatch, useAppSelector } from './store/store';
import { fetchAuthMe } from './store/auth/slice';
import { fetchAllUsers } from './store/user/slice';
import { Registration } from './Pages/Registration-Login/Registration';
import { Login } from './Pages/Registration-Login/Login';
import { Layout } from './Pages/Layout';
import { Profile } from './Pages/Profile/Profile';
import { Photo } from './Pages/SelectedPhoto/SelectedPhoto';
import { Friends } from './Pages/Friends/Friends';
import { Messages } from './Pages/Messages/Messages';
import { Routes, Route } from 'react-router-dom';
import './style.scss';
export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  if (state.auth.data?._id !== undefined) localStorage.setItem('mainUser', state.auth.data?._id);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
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
  );
}

// import { library } from '@fortawesome/fontawesome-svg-core';
// import {
//   faPager,
//   faUserGroup,
//   faUsers,
//   faFilm,
//   faMusic,
//   faAlignJustify,
//   faLocationPin,
//   faFileLines,
//   faShareNodes,
//   faEllipsis,
//   faXmark,
//   faPlay,
//   faCircleChevronRight,
//   faCircleChevronLeft,
//   faMagnifyingGlass,
// } from '@fortawesome/free-solid-svg-icons';
// import {
//   faCircleUser,
//   faBell,
//   faComment,
//   faImage,
//   faThumbsUp,
//   faThumbsDown,
//   faCommentDots,
// } from '@fortawesome/free-regular-svg-icons';
// library.add(
//   faPager,
//   faUsers,
//   faUserGroup,
//   faFilm,
//   faMusic,
//   faAlignJustify,
//   faLocationPin,
//   faFileLines,
//   faShareNodes,
//   faEllipsis,
//   faXmark,
//   faPlay,
//   faCircleChevronRight,
//   faCircleChevronLeft,
//   faMagnifyingGlass,
//   faCircleUser,
//   faBell,
//   faComment,
//   faImage,
//   faThumbsUp,
//   faThumbsDown,
//   faCommentDots,
// );
