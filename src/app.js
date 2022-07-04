import React from 'react';
import Layout from './Layout.jsx';
import Header from './Header/Header.jsx';
import Profile from './Profile/Profile.jsx'
import Registration from './Registration/Registration.jsx'
import Photo from './Profile/SelectedPhoto/SelectedPhoto.jsx'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPager, faUserGroup, faUsers, faFilm,
  faMusic, faAlignJustify, faLocationPin, faFileLines,
  faShareNodes, faEllipsis, faXmark
} from '@fortawesome/free-solid-svg-icons'
import {
  faCircleUser, faBell, faComment, faImage,
  faThumbsUp, faThumbsDown, faCommentDots
} from '@fortawesome/free-regular-svg-icons'
import './index.css'
import { Routes, Route } from 'react-router-dom';

library.add(
  faPager, faUsers, faUserGroup, faFilm,
  faMusic, faAlignJustify, faLocationPin, faFileLines,
  faShareNodes, faEllipsis, faXmark, faCircleUser, faBell,
  faComment, faImage, faThumbsUp, faThumbsDown,
  faCommentDots)

function App() {
  return (
    <Routes>

      <Route path="/" element={<Layout />}>
        {/* <Route path="/Registration" element={}/> */}
        <Route path="/Profile" element={<Profile />} />,
        <Route path="/Photo/:id" element={<Photo />} />,
      </Route>
    </Routes>
  );
}

export default App;
