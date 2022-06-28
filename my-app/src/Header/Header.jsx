import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.css'

function Header() {
  return (
    <div className="header">
      <div className="wave">Wave</div>
      <FontAwesomeIcon className="profile" icon="fa-regular fa-circle-user" />
      <FontAwesomeIcon className="bell" icon="fa-regular fa-bell" />
      <FontAwesomeIcon className="news" icon="fa-solid fa-pager" />
      <FontAwesomeIcon className="message" icon="fa-regular fa-comment" />
      <FontAwesomeIcon className="users" icon="fa-solid fa-user-group" />
      <FontAwesomeIcon className="community" icon="fa-solid fa-users" />
      <FontAwesomeIcon className="image" icon="fa-regular fa-image" />
      <FontAwesomeIcon className="video" icon="fa-solid fa-film" />
      <FontAwesomeIcon className="music" icon="fa-solid fa-music" />
      <FontAwesomeIcon className="menu" icon="fa-solid fa-align-justify" />
    </div>
  );
}

export default Header;
