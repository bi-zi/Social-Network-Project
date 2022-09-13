import React from 'react';
import { useAppSelector } from '../store/store';
import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import {Footer} from './Footer/Footer'
import { NavLink } from 'react-router-dom';
import './style.scss';

export const Layout: React.FC = () => {
  const [close, setClose] = React.useState(true);
  const user = useAppSelector((state) => state.user);
  const state = useAppSelector((state) => state);

  // console.log([
  //   `-AUTH- ${state.auth.status}`,
  //   `-USER- ${state.user.status}`,
  //   `-NOTE- ${state.note.status}`,
  //   `-MESSAGES- ${state.messages.status}`,
  //   `-ABOUT- ${state.about.status}`,
  //   `-SLIDER- ${state.slider.status}`,
  //   `-POST- ${state.post.userPosts.status}`,
  // ]);

  return (
    <div className="wrapper">
      <Header />
      {window.location.pathname.split(' ')[0] === '/' && close && user.deleteAttention === 0 ? (
        <div className="wrapper_container">
          <div className="wrapper_info">
            <p>
              In most cases, after interacting with the site, a spinning ring appears in the upper right
              next to the menu. The server is free, so data is sent or received for a long time.
              Downloading data is indicated by a ring, when it rotates all data sending actions are
              blocked to avoid data writing errors. If the ring didn't appear and the post-submit action
              didn't work, the send control was blocked, most likely the server died :)
              <br />
              <NavLink to="/Register" className="wrapper_link" onClick={() => setClose(false)}>
                Go further
              </NavLink>
            </p>

            <p>
              В большинстве случаев после взаимодействия с сайтом вверху справа рядом с меню появляется
              вращающееся кольцо. Сервер бесплатный, поэтому данные отправляются или принимаются долго.
              Загрузка данных обозначается кольцом, при его вращении все действия по отправке данных
              заблокированы во избежание ошибок записи данных. Если кольцо не появилось и действие
              post-submit не сработало, управление отправкой было заблокировано, скорее всего сервер умер
              :)
              <br />
              <NavLink to="/Register" className="wrapper_link" onClick={() => setClose(false)}>
                Перейти дальше
              </NavLink>
            </p>
          </div>
        </div>
      ) : (
        ''
      )}
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};
