import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setClearFindUserFriends, setClearFindUserSubscribers } from '../store/user/slice';
import { setClearUsers } from '../store/friends/slice';
import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { NavLink } from 'react-router-dom';
import './style.scss';

export const Layout: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const state = useAppSelector((state) => state);

  const [close, setClose] = React.useState(true);

  if (state.auth.data?._id !== undefined) localStorage.setItem('mainUser', state.auth.data?._id);

  let profile = window.location.pathname.split('/')[1] === 'Profile';

  let friends = window.location.pathname.split('/')[1] === 'Friends';

  // код ниже я использую для дебага первый console.log проверяет загрузку всех fetch
  // а функция показывает размер файла который в нее закинешь

  // console.log([
  //   `-AUTH- ${state.auth.status}`,
  //   `-USER- ${state.user.status}`,
  //   `-NOTE- ${state.note.status}`,
  //   `-MESSAGES- ${state.messages.status}`,
  //   `-ABOUT- ${state.about.status}`,
  //   `-SLIDER- ${state.slider.status}`,
  //   `-POST- ${state.post.userPosts.status}`,
  // ]);

  // roughSizeOfObject(state);

  // function roughSizeOfObject(object: any) {
  //   var objectList = [];
  //   var stack = [object];
  //   var bytes = 0;

  //   while (stack.length) {
  //     var value = stack.pop();

  //     if (typeof value === 'boolean') {
  //       bytes += 4;
  //     } else if (typeof value === 'string') {
  //       bytes += value.length * 2;
  //     } else if (typeof value === 'number') {
  //       bytes += 8;
  //     } else if (typeof value === 'object' && objectList.indexOf(value) === -1) {
  //       objectList.push(value);

  //       for (var i in value) {
  //         stack.push(value[i]);
  //       }
  //     }
  //   }

  //   let fsizekb = bytes / 1024;
  //   let fsizemb = fsizekb / 1024;
  //   let fsizegb = fsizemb / 1024;
  //   let fsizetb = fsizegb / 1024;
  //   let fsize = '';

  //   if (fsizekb <= 1024) {
  //     fsize = fsizekb.toFixed(3) + ' кб';
  //   } else if (fsizekb >= 1024 && fsizemb <= 1024) {
  //     fsize = fsizemb.toFixed(3) + ' мб';
  //   } else if (fsizemb >= 1024 && fsizegb <= 1024) {
  //     fsize = fsizegb.toFixed(3) + ' гб';
  //   } else {
  //     fsize = fsizetb.toFixed(3) + ' тб';
  //   }

  //   return console.log(fsize);
  // }

  const secondRef = React.useRef<HTMLInputElement>(null);

  // не уверен что это правильный способ но я пока не придумал ничего лучше
  // этот useEffect очищает state которые уже не нужен при переходе на новую страницу
  React.useEffect(() => {
    if (!profile && !friends && user.findUserFriends.length > 0) dispatch(setClearFindUserFriends());
    if (!profile && !friends && user.findUserSubscribers.length > 0)
      dispatch(setClearFindUserSubscribers());
    if (!friends && state.friendsPage.users?.[2].length > 0) dispatch(setClearUsers());
  }, [
    dispatch,
    friends,
    profile,
    state.friendsPage.users,
    user.findUserFriends.length,
    user.findUserSubscribers.length,
  ]);

  return (
    <div className="wrapper" ref={secondRef}>
      <Header />

      {window.location.pathname.split(' ')[0] === '/' && close && user.deleteAttention === 0 ? (
        <div className="layout">
          <p>
            In most cases, after interacting with the site, a spinning ring appears in the upper right
            next to the menu. The server is free, so data is sent or received for a long time.
            Downloading data is indicated by a ring, when it rotates all data sending actions are blocked
            to avoid data writing errors. If the ring didn't appear and the post-submit action didn't
            work, the send control was blocked, most likely the server died :)
          </p>

          <div className="layout__link">
            <NavLink to="/Register" onClick={() => setClose(false)}>
              Go further
            </NavLink>
          </div>

          <p>
            В большинстве случаев после взаимодействия с сайтом вверху справа рядом с меню появляется
            вращающееся кольцо. Сервер бесплатный, поэтому данные отправляются или принимаются долго.
            Загрузка данных обозначается кольцом, при его вращении все действия по отправке данных
            заблокированы во избежание ошибок записи данных. Если кольцо не появилось и действие
            post-submit не сработало, управление отправкой было заблокировано, скорее всего сервер умер
            :)
          </p>

          <div className="layout__link">
            <NavLink to="/Register" onClick={() => setClose(false)}>
              Перейти дальше
            </NavLink>
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
