import React from "react";
import {
  MainHeader,
  NotificationHeader,
  SubHeader,
} from "../components/Headers";
import { useLocation } from "react-router-dom";
import { logout } from "../modules/auth";
import { useDispatch } from "react-redux";

export default function HeaderContainer() {
  // 현재 어느 url에 있는지에 따라서 SubHeader아래에 밑줄
  const location = useLocation();

  const dispatch = useDispatch();

  const onLogout = () => dispatch(logout());

  return (
    <div className="min-w-[1080px] top-0 sticky z-50">
      <MainHeader onLogout={onLogout} />
      <SubHeader currentPath={location.pathname} />
      <NotificationHeader />
    </div>
  );
}
