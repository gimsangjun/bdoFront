import React from "react";
import { MainHeader, NotificationHeader, SubHeader } from "../components/Header";
import { useLocation } from "react-router-dom";

export default function HeaderContainer() {
  // 현재 어느 url에 있는지에 따라서 SubHeader아래에 밑줄
  const location = useLocation();
  return (
    <>
      <MainHeader />
      <SubHeader currentPath={location.pathname} />
      <NotificationHeader />
    </>
  );
}
