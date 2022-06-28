import React from 'react';
import Header from './Header/Header.jsx';
import Profile from './Profile/Profile.jsx'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPager, faUserGroup, faUsers, faFilm, faMusic, faAlignJustify, faLocationPin, faFileLines, faShareNodes,faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { faCircleUser, faBell, faComment, faImage, faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-regular-svg-icons'
import './index.css'

library.add(faPager, faUsers, faUserGroup, faFilm, faMusic, faAlignJustify, faLocationPin, faFileLines, faShareNodes, faEllipsis, faCircleUser, faBell, faComment, faImage, faThumbsUp, faThumbsDown, faCommentDots)

function App() {
  return (
    <>
      <Header />
      <Profile />
    </>
  );
}

export default App;
