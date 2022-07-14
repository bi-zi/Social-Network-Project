import React from 'react';
import Layout from './Layout.jsx';
import Header from './Header/Header.jsx';
import Profile from './Profile/Profile.jsx'

import { Registration } from "./Registration-Login/Registration.jsx"
import { Login } from "./Registration-Login/Login.jsx"

import Photo from './Profile/SelectedPhoto/SelectedPhoto.jsx'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPager, faUserGroup, faUsers, faFilm,
  faMusic, faAlignJustify, faLocationPin, faFileLines,
  faShareNodes, faEllipsis, faXmark, faPlay
} from '@fortawesome/free-solid-svg-icons'
import {
  faCircleUser, faBell, faComment, faImage,
  faThumbsUp, faThumbsDown, faCommentDots
} from '@fortawesome/free-regular-svg-icons'
import './index.css'
import { Routes, Route } from 'react-router-dom';


import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from './store/slices/auth.js';

library.add(
  faPager, faUsers, faUserGroup, faFilm,
  faMusic, faAlignJustify, faLocationPin, faFileLines,
  faShareNodes, faEllipsis, faXmark, faPlay, faCircleUser, faBell,
  faComment, faImage, faThumbsUp, faThumbsDown,
  faCommentDots)

function App() {

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/Profile" element={<Profile />} />,
        <Route path="/:category/:id" element={<Photo />} />,
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Registration />} />
      </Route>
    </Routes>
  );
}

export default App;