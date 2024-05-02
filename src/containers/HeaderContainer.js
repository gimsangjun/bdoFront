import React from "react";
import { MainHeader, NotificationHeader, SubHeader } from "../components/Header";

export default function HeaderContainer() {
  // TODO: 현재 어느 url에 있는지에 따라서 SubHeader아래에 밑줄
  return (
    <>
      <MainHeader />
      <SubHeader />
      <NotificationHeader />
    </>
  );
}
