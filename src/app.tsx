import React from "react";
import { useAppDispatch, useAppSelector } from "./store/store";
import { fetchMainUser } from "./store/old store/user/slice";
// import { Registration } from './Pages/Registration-Login/Registration';
// import { Login } from './Pages/Registration-Login/Login';
import { Registration } from "./Pages/Authorization/Registration";
import { Login } from "./Pages/Authorization/Login";
import { useGetRefreshQuery } from "./store/auth/authApi";
import { useGetMainUserQuery } from "./store/user/userApi";
import { selectIsAuth } from "./store/auth/slice";

import { Layout } from "./Pages/Layout";
import { Profile } from "./Pages/Profile/Profile";
import { Photo } from "./Pages/SelectedPhoto/SelectedPhoto";
import { Friends } from "./Pages/Friends/Friends";
import { Messages } from "./Pages/Messages/Messages";
import { Routes, Route, Navigate } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import { skipToken } from "@reduxjs/toolkit/query";
import "./Svg/style.scss";
import "./style.scss";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth?.authorizedUser);
  const state = useAppSelector((state) => state);

  const isAuth = useAppSelector(selectIsAuth);

  const { data: authUser } = useGetRefreshQuery(true);

  const { data: mainUser, isLoading } = useGetMainUserQuery(
    auth?.login ? auth?.login : skipToken
  );

  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="Profile/:id" element={<Profile />} />,
          {/* <Route path="Messages" element={<Messages />} />, */}
          {/* <Route path="Users/:id" element={<Friends />} />, */}
          // <Route path="/:user/:category/:id" element={<Photo />} />,
          <Route path="/Login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
        </Route>
      </Routes>
    </SkeletonTheme>
  );
};
