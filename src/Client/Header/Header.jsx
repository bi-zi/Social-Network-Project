import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchOneUser } from '../store/slices/user';
import './style.css';
import { logout, selectIsAuth } from '../store/slices/auth';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const state = useSelector((state) => state.auth.data);
  const { id } = useParams();

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      localStorage.removeItem('isAuth');
      window.localStorage.removeItem('token');
    }
  };
  const path = window.location.pathname.split('/')[1];




  return (
    <div className="header">
      <div className="container">
        <NavLink
          style={{ textDecoration: 0, color: 'white' }}
          to={`/Profile/${state?._id}`}
          className="wave">
          Wave
        </NavLink>
        <div className="header_control_panel">
          <NavLink
            to={`/Profile/${state?._id}`}
            style={id === state?._id && path === 'Profile' ? { color: 'black' } : { color: 'white' }}
            onClick={() => dispatch(fetchOneUser(state?._id))}>
            <FontAwesomeIcon className="profile" icon="fa-regular fa-circle-user" />
          </NavLink>

          <FontAwesomeIcon className="bell" icon="fa-regular fa-bell" />
          <FontAwesomeIcon className="news" icon="fa-solid fa-pager" />
          <FontAwesomeIcon className="message" icon="fa-regular fa-comment" />

          <NavLink
            to={`/Friends/${state?._id}`}
            style={id === state?._id && path === 'Profile' ? { color: 'white' } : { color: 'black' }}
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
            <FontAwesomeIcon className="users" icon="fa-solid fa-user-group" />
          </NavLink>

          <FontAwesomeIcon className="community" icon="fa-solid fa-users" />
          <FontAwesomeIcon className="image" icon="fa-regular fa-image" />
          <FontAwesomeIcon className="video" icon="fa-solid fa-film" />
          <FontAwesomeIcon className="music" icon="fa-solid fa-music" />
        </div>
        <FontAwesomeIcon className="menu" icon="fa-solid fa-align-justify" onClick={onClickLogout} />
      </div>
    </div>
  );
}

export default Header;
