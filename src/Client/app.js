import React from 'react';
import Layout from './Layout.jsx';
import Header from './Header/Header.jsx';
import Profile from './Profile/Profile.jsx'

import { Registration } from "./Registration-Login/Registration.jsx"
import { Login } from "./Registration-Login/Login.jsx"
import Photo from './Profile/SelectedPhoto/SelectedPhoto.jsx'
import { library } from '@fortawesome/fontawesome-svg-core'
import './index.css'
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAuthMe, } from './store/slices/auth.js';
import { fetchAllUsers, } from './store/slices/user.js';
import Friends from './Friends/Friends.jsx';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  faPager, faUserGroup, faUsers, faFilm,
  faMusic, faAlignJustify, faLocationPin, faFileLines,
  faShareNodes, faEllipsis, faXmark, faPlay
} from '@fortawesome/free-solid-svg-icons'
import {
  faCircleUser, faBell, faComment, faImage,
  faThumbsUp, faThumbsDown, faCommentDots
} from '@fortawesome/free-regular-svg-icons'
library.add(
  faPager, faUsers, faUserGroup, faFilm,
  faMusic, faAlignJustify, faLocationPin, faFileLines,
  faShareNodes, faEllipsis, faXmark, faPlay, faCircleUser, faBell,
  faComment, faImage, faThumbsUp, faThumbsDown,
  faCommentDots)


function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
    dispatch(fetchAllUsers());
  }, []);

  const state = useSelector((state) => state.auth?.data?._id);
  if (state !== undefined) localStorage.setItem('Link', state)

  if (window.location.pathname === '/') {
    return <Navigate to={`Profile/${localStorage.Link}`} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="Profile/:id" element={<Profile />} />,
        <Route path="Friends" element={<Friends />} />,
        <Route path="/:user/:category/:id" element={<Photo />} />,
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Registration />} />
      </Route>
    </Routes>
  );
}

export default App;
