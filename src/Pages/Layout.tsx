import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setClearFindUserFriends, setClearFindUserSubscribers } from '../store/old store/user/slice';
import { setClearUsers } from '../store/old store/friends/slice';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import './style.scss';

export const Layout: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.player);
  const state = useAppSelector((state) => state);

  let navigate = useNavigate();

  if (state.oldAuth.data?._id !== undefined) localStorage.setItem('mainUser', state.oldAuth.data?._id);

  let profile = window.location.pathname.split('/')[1] === 'Profile';

  let friends = window.location.pathname.split('/')[1] === 'Friends';

  // код ниже я использую для дебага первый console.log проверяет загрузку всех fetch
  // а функция показывает размер файла который в нее закинешь

  // console.log([
  //   `-AUTH- ${state.oldAuth.status}`,
  //   `-USER- ${state.player.status}`,
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

  React.useEffect(() => {
    if (window.location.pathname.split(' ')[0] === '/' && state.oldAuth.data?._id !== undefined) {
      return navigate(`/Profile/${state.oldAuth.data._id}`);
    }
    if (window.location.pathname.split(' ')[0] === '/') {
      return navigate('/Login');
    }
  }, [navigate, state.oldAuth.data._id]);

  return (
    <>
      {0 > 0 ? (
        <div className="wrapper" ref={secondRef}>
          <Header />
          <Outlet></Outlet>
          <Footer />
        </div>
      ) : (
        <div className="tex_works">У меня пока что нет времени на разработку этого проекта поэтому я его остановил</div>
      )}
    </>
  );
};
