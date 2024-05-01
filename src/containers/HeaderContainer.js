import React from "react";
import { MainHeader, NotificationHeader, SubHeader } from "../components/Header";

export default function HeaderContainer() {
  const sublinks = [
    { path: "/", name: "홈" },
    { path: "/", name: "나의 관심 아이템" },
    { path: "/", name: "메뉴2" },
    { path: "/", name: "메뉴3" },
  ];
  return (
    <>
      <MainHeader />
      <SubHeader sublinks={sublinks} />
      <NotificationHeader />
    </>
  );
}
