import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchAuthMe, } from './store/slices/auth.js';
import { fetchAllUsers, } from './store/slices/user.js';
import { Registration } from "./Registration-Login/Registration.jsx"
import { Login } from "./Registration-Login/Login.jsx"
import Layout from './Layout.jsx';
import Profile from './Profile/Profile.jsx'
import Photo from './Profile/SelectedPhoto/SelectedPhoto.jsx'
import Friends from './Friends/Friends.jsx';
import Messages from './Messages/Messages.jsx'
import { Routes, Route } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faPager, faUserGroup, faUsers, faFilm,
  faMusic, faAlignJustify, faLocationPin, faFileLines,
  faShareNodes, faEllipsis, faXmark, faPlay, faCircleChevronRight, faCircleChevronLeft,faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'

import {
  faCircleUser, faBell, faComment, faImage,
  faThumbsUp, faThumbsDown, faCommentDots
} from '@fortawesome/free-regular-svg-icons'
import './index.css'


library.add(
  faPager, faUsers, faUserGroup, faFilm,
  faMusic, faAlignJustify, faLocationPin, faFileLines,
  faShareNodes, faEllipsis, faXmark, faPlay, faCircleChevronRight, faCircleChevronLeft, faMagnifyingGlass, faCircleUser, faBell,
  faComment, faImage, faThumbsUp, faThumbsDown,
  faCommentDots)


function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
    dispatch(fetchAllUsers());
  }, []);

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

export default App;
